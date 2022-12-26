import { IAuthorDBGateway } from "../Core/Author/IDBGateway";
import { ICommentDBGateway, RawComment } from "../Core/Comment/IDBGateway";
import { QueryDTO } from "../Core/common/DTOs";
import UID from "../Core/common/UID";
import GetPost from "../Core/Post/usecases/GetPost";
import GetPosts from "../Core/Post/usecases/GetPosts";
import SetPost from "../Core/Post/usecases/SetPost";
import  MockPostDB  from "../Persistence/mockDB";
import { st_authors } from "../mocks";
import { RawPost } from "../Core/Post/rawPost";
import { RawAuthor } from "../Core/Author/rawAuthor";
import { PostQueryDTO } from "../Core/Post/DTOs";


let postDB = new MockPostDB();
let commentDB : ICommentDBGateway = {
  getComment: async function (id: UID): Promise<RawComment | null> {
    throw new Error("Function not implemented.");
  },
  getComments: async function (postId: UID): Promise<RawComment[] | null> {
    return []
  }
}

let authorDB : IAuthorDBGateway = {
  async getAuthor({ id: parID, select }: QueryDTO<RawAuthor>): Promise<Partial<RawAuthor>> {
    return st_authors.find(({ id }) => id == (parID as UID).value) as RawAuthor;

  },
  async getAuthors(params: QueryDTO<RawAuthor>) {
    return st_authors
    // throw new Error("Function not implemented.");
  }
}

let getPost = new GetPost({present(input){ return input }}, postDB, commentDB, authorDB);
let setPost = new SetPost({present(input){ return input ? "success" : "failure" } }, postDB, authorDB);
let getPosts = new GetPosts({present(input){return input}}, postDB, authorDB);

let fakeValidPost : RawPost = {
  author: "a123",
  id: "p123456",
  title: "new Article",
  content: `new Article is out there, let getPost = new GetPost({present(input){ return input } }, postDB, commentDB, authorDB);
  let setPost = new SetPost({present(input){ return input } }, postDB, authorDB); new Article is out there, let getPost = new GetPost({present(input){ return input } }, postDB, commentDB, authorDB);
  let setPost = new SetPost({present(input){ return input } }, postDB, authorDB);`,
  thumbnail: "#85a111",
  description: "a very fucked one",
  likes: [],
  comments: [],
  createdAt: new Date(Date.now()-200000).toString(),
  lastModified: new Date(Date.now() - 5000).toString()
}

describe("get Post use cases", ()=>{
  test("Should get post with id p123", async ()=>{
    let res = await getPost.execute({id : "p123"});
    expect(res.id).toBe("p123");
  })
})

describe("set Post use case", ()=>{
  test("Should return success message", async ()=>{
    let res = await setPost.execute({payload : fakeValidPost});
    expect(res).toBe("success");
  })
})
let count = 2;
describe("get Posts usecase", ()=>{
  test(`should return number of posts`, async ()=>{
    let res = await getPosts.execute({count} as PostQueryDTO);
    expect(res?.length).toBeGreaterThanOrEqual(0);
  })
  test(`should return posts of an author`, async ()=>{
    let res = await getPosts.execute({id : [new UID("p123"), new UID("p124")]});
      expect(res![0]?.author.name).toBe("beast");
  })
  // test(`should return posts based on condition`, async ()=>{
  //   let res = await getPosts.execute({where : ["author", "=", "a123"]});
  //   if(res) for(let post of res){
  //     console.log(post);
  //     expect(post?.author.name).toBe("beast");
  //   }
  // })
})
