import { IAuthorDBGateway } from "../Core/Author/IDBGateway";
import { ICommentDBGateway, RawComment } from "../Core/Comment/IDBGateway";
import { QueryDTO } from "../Core/common/DTOs";
import UID from "../Core/common/UID";
import GetPost from "../Core/Post/usecases/GetPost";
import SetPost from "../Core/Post/usecases/SetPost";
import  MockPostDB  from "../Persistence/mockDB";
import { st_authors } from "../mocks";
import { RawPost } from "../Core/Post/rawPost";
import { RawAuthor } from "../Core/Author/rawAuthor";


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
  async getAuthor({id : parID, select}: QueryDTO): Promise<Partial<RawAuthor>> {
    return st_authors.find(({id}) => id == (parID as UID).value) as RawAuthor;

  }
}

let getPost = new GetPost({present(input){ return input }}, postDB, commentDB, authorDB);
let setPost = new SetPost({present(input){ return input ? "success" : "failure" } }, postDB, authorDB);
let getPosts = {
  async execute(query : QueryDTO){
  return [{author : {name : "Joe"}}, {author : {name : "Joe"}}];
}};

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
  test(`should return ${count} of posts`, async ()=>{
    let res = await getPosts.execute({count} as QueryDTO);
    expect(res.length).toBe(count);
  })
  test(`should return posts based on condition`, async ()=>{
    let res = await getPosts.execute({where : ["author.name", "=", "Joe"]} as QueryDTO);
    for(let post of res){
      expect(post.author.name).toBe("Joe");
    }
  })
})
