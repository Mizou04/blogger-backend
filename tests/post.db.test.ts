import { IAuthorDBGateway, StoredAuthor } from "../Core/Author/IDBGateway";
import { ICommentDBGateway, StoredComment } from "../Core/Comment/IDBGateway";
import { QueryDTO } from "../Core/common/DTOs";
import UID from "../Core/common/UID";
import { PostDTO } from "../Core/Post/DTOs";
import { PostProps } from "../Core/Post/Entity";
import GetPost from "../Core/Post/usecases/GetPost";
import SetPost from "../Core/Post/usecases/SetPost";
import { st_authors } from "../mocks";
import MockPostDB from "../Persistence";

let postDB = new MockPostDB();
let commentDB : ICommentDBGateway = {
  getComment: async function (id: UID): Promise<StoredComment | null> {
    throw new Error("Function not implemented.");
  },
  getComments: async function (postId: UID): Promise<StoredComment[] | null> {
    return []
  }
}

let authorDB : IAuthorDBGateway = {
  async getAuthor({id : parID, select}: QueryDTO): Promise<Partial<StoredAuthor>> {
    return st_authors.find(({id}) => id == (parID as UID).value) as StoredAuthor;

  }
}

let getPost = new GetPost({present(input){ return input }}, postDB, commentDB, authorDB);
let setPost = new SetPost({present(input){ return input ? "success" : "failure" } }, postDB, authorDB);

let fakeValidPost : PostDTO = {
  author: "a123",
  id: "p123456",
  title: "new Article",
  content: `new Article is out there, let getPost = new GetPost({present(input){ return input } }, postDB, commentDB, authorDB);
  let setPost = new SetPost({present(input){ return input } }, postDB, authorDB); new Article is out there, let getPost = new GetPost({present(input){ return input } }, postDB, commentDB, authorDB);
  let setPost = new SetPost({present(input){ return input } }, postDB, authorDB);`,
  thumbnail: "#85a111",
  description: "a very fucked one",
  comments: [],
  likes: [],
  createdAt: new Date(Date.now()-200000).toString(),
  lastModified: new Date(Date.now() - 5000).toString()
}

describe("get Post use cases", ()=>{
  test("Should get post with id p123", async ()=>{
    let res = await getPost.execute({id : new UID("p123")});
    expect(res).toHaveProperty("content");
  })
})

describe("set Post use case", ()=>{
  test("Should return success message", async ()=>{
    let res = await setPost.execute({payload : fakeValidPost});
    expect(res).toBe("success");
  })
})