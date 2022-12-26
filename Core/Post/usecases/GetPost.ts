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
    
    let storedPost = await this.postDBGateway.getPost({...params, id : new UID(params.id)});
    let storedComments = await this.commentDBGateway.getComments(new UID(params.id));
    let storedAuthor = await this.getAuthorByID(storedPost?.author as string);

    let comments : Comment[] = await Promise.all((storedComments as RawComment[]).map(async (strdCmnt)=>{
      let storedCommentAuthor = await this.getAuthorByID(strdCmnt.author);
      let commentAuthor = {
        props : {
          joined : new Date(storedCommentAuthor?.joined as string),
          name : storedCommentAuthor?.name + "",
          photo : storedCommentAuthor?.photo + ""
        },
        id : new UID(storedCommentAuthor?.id)
      };
      return Comment.create({postID : new UID(storedPost?.id), value : strdCmnt.value, author : commentAuthor}, new UID(strdCmnt.id));
    }))
    let author = {props : {joined : new Date(storedAuthor?.joined + ""), name : storedAuthor?.name + "", photo : storedAuthor?.photo + ""}, id : new UID(storedAuthor?.id)};

    let post = Post.create({
        author : author,
        comments : comments || [],
        createdAt : new Date(storedPost?.createdAt + ""),
        content : storedPost?.content + "",
        description : storedPost?.description + "",
        lastModified : new Date(storedPost?.lastModified + ""),
        likes : this.getLikes(storedPost?.likes as string[]) || [],
        thumbnail : storedPost?.thumbnail + "",
        title : storedPost?.title + "",
      },
        new UID(storedPost?.id)
      )

    let data = { // DTO
      ...post.props,
      id : post.id.toString(),
      lastModified : post.props.lastModified.toString(),
      author : {
        ...author.props,
        id : post.props.author.id.toString() as string,
        joined : author.props.joined.toString(),
      },
      comments : comments.map((comment)=>{
        return {...comment.props, id : comment.id?.toString(), author : {
          ...author.props,
          id : post.props.author.id.toString() as string,
          joined : author.props.joined.toString(),
          postID : comment.props.postID.toString() as string
        }}
      })
    }
    // WE SHOULD NOT PASS <ENTITIES> instead of <DATA STRUCTURES>
    return this.outputPort.present(data);

  }

  private async getAuthorByID(id : string) : Promise<Partial<RawAuthor> | undefined | null>{
    let select : QueryDTO<RawAuthor>["select"] = ["id", "name", "photo", "joined"];
    let storedAuthor = await this.authorDBGateway.getAuthor({id : new UID(id), select});
    return storedAuthor;
  }

  private getLikes(likes : string[]){
    return likes.map((like) => new Like(new UID(like)))
  }

  private async getCommentsByPostID(postID : UID) : Promise<RawComment[] | null> {
    let storedComments = await this.commentDBGateway.getComments(postID);
    return storedComments
  }
}

export interface IGetPostPresenter extends OutputPort<any>{}