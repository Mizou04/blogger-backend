import { PostQueryDTO } from "../../Post/DTOs";
import IPostDBGateway from "../../Post/IDBGateway";
import { RawPost } from "../../Post/rawPost";
import UID from "../../common/UID";
import { InputPort, OutputPort } from "../../common/usecase";
import { AuthorQueryDTO } from "../DTOs";
import { IAuthorDBGateway } from "../IDBGateway";
import { RawAuthor } from "../rawAuthor";



export default class GetAuthor implements GetAuthorInputPort{
  constructor
  (
    public outputPort: GetAuthorOutputPort,
    public authorDB: IAuthorDBGateway,
    public postDB: IPostDBGateway
  )
    {
    this.outputPort = outputPort;
    this.authorDB = authorDB;
    this.postDB = postDB;
  }
  async execute(params: { id: UID; }): Promise<any> {
    // get author
    let authorProjection : AuthorQueryDTO["select"] = ["id", "name", "joined", "lastModified", "posts", "bio", "photo"];
    let author = await this.authorDB.getAuthor({id : params.id, select : authorProjection});
    if(!author) return undefined;
    // get author's posts
    let postProjection : PostQueryDTO["select"] = ["id", "title", "description", "thumbnail", "createdAt", "likes"];
    let authorPosts = await this.postDB.getPosts({id : author?.posts?.map(pst => new UID(pst)), select : postProjection});
    if(!authorPosts) authorPosts = [];

    let result = {
      ...author, posts : authorPosts
    }

    return this.outputPort.present(result);
  }

}

export interface GetAuthorInputPort extends InputPort<{id : UID}>{
}


export interface GetAuthorOutputPort extends OutputPort<Omit<RawAuthor, "posts"> & {posts : RawPost[]}>{}