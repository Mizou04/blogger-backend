import {InputPort, OutputPort} from "../../common/usecase"
import UID from "../../common/UID";
import Post from "../Entity";
import { EXCEPTIONS } from "../Errors";
import IPostDBGateway from "../IDBGateway";
import { IAuthorDBGateway } from "../../Author/IDBGateway";
import { ICommentDBGateway, RawComment } from "../../Comment/IDBGateway";
import Comment from "../../Comment/Entity";
import { RawAuthor } from "../../Author/rawAuthor";
import Like from "../../Like";
import { QueryDTO } from "../../common/DTOs";

export default class GetPost implements InputPort<{id : string}>{
  constructor(
    public outputPort : IGetPostPresenter, 
    public postDBGateway : IPostDBGateway,
    public commentDBGateway : ICommentDBGateway,
    public authorDBGateway : IAuthorDBGateway
  ) {
    this.outputPort = outputPort;
    this.postDBGateway = postDBGateway;
    this.authorDBGateway = authorDBGateway;
    this.commentDBGateway = commentDBGateway
  }
  async execute(params: {id : string}){
    
    let post = await this.postDBGateway.getPost({...params, id : new UID(params.id)});
    let st_comments = await this.commentDBGateway.getComments(new UID(params.id));
    let author = await this.getAuthorByID(post?.author as string);

    let comments : any[] = await Promise.all((st_comments as RawComment[]).map(async (strdCmnt)=>{
      let storedCommentAuthor = await this.getAuthorByID(strdCmnt.author);
      
      return {id : strdCmnt.id, postID : post?.id as string, value : strdCmnt.value, author : storedCommentAuthor};
    }))

    if(post && post.id){
      let data = { // DTO
        ...post,
        author,
        comments
      }
      // WE SHOULD NOT PASS <ENTITIES> instead of <DATA STRUCTURES>
      return this.outputPort.present(data);
    }

  }

  private async getAuthorByID(id : string) : Promise<Partial<RawAuthor> | undefined | null>{
    let select : QueryDTO<RawAuthor>["select"] = ["id", "name", "photo", "joined"];
    let author = await this.authorDBGateway.getAuthor({id : new UID(id), select});
    return author;
  }

  private getLikes(likes : string[]){
    return likes.map((like) => new Like(new UID(like)))
  }

  private async getCommentsByPostID(postID : UID) : Promise<RawComment[] | null> {
    let comments = await this.commentDBGateway.getComments(postID);
    return comments
  }
}

export interface IGetPostPresenter extends OutputPort<any>{}