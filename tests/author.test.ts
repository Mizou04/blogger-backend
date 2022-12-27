import { AuthorQueryDTO } from "../Core/Author/DTOs";
import { IAuthorDBGateway } from "../Core/Author/IDBGateway";
import { RawAuthor } from "../Core/Author/rawAuthor";
import GetAuthor, { GetAuthorOutputPort } from "../Core/Author/usecases/GetAuthor";
import UID from "../Core/common/UID";
import MockPostDB from "../Persistence/mockDB";
import { st_authors } from "../mocks";

let getAuthorPresenter : GetAuthorOutputPort = {
  present: function (input: Omit<{ id?: string | undefined; } & { name?: string | undefined; joined?: string | undefined; lastModified?: string | undefined; posts?: string[] | undefined; bio?: string | undefined; photo?: string | undefined; }, "posts"> & { posts: ({ id?: string | undefined; } & { title?: string | undefined; description?: string | undefined; content?: string | undefined; author?: string | undefined; thumbnail?: string | undefined; comments?: string[] | undefined; likes?: string[] | undefined; createdAt?: string | undefined; lastModified?: string | undefined; })[]; }) {
    return input
  }
}

let postDB = new MockPostDB();

let authorDB : IAuthorDBGateway = {
  async getAuthor({ id: parID, select }: AuthorQueryDTO): Promise<Partial<RawAuthor>> {
    return st_authors.find(({ id }) => id == (parID as UID).value) as RawAuthor;

  },
  async getAuthors(params: AuthorQueryDTO) {
    return st_authors
    // throw new Error("Function not implemented.");
  }
}

let getAuthor = new GetAuthor(getAuthorPresenter, authorDB, postDB);


describe("Author Tests", ()=>{
  it("get an Author", async ()=>{
    let author = await getAuthor.execute({id : new UID("a123")});
    expect(author.id).toBe("a123");  
  })

  it("Author doesn't exist so it returns undefined", async ()=>{
    let author = await getAuthor.execute({id : new UID("a224")});
    expect(author).toBe(undefined);
  })

  // it("get a list of authors", async ()=>{
  //   let authors = await getAuthors.execute({id : [new UID("a123"), new UID("a124")]});
  //   expect(authors.length).toBeGreaterThan(1);  
  // })
})