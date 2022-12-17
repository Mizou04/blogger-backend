import {InputPort, OutputPort} from "../../common/usecase"
import UID from "../../common/UID";
import { PostQueryDTO } from "../DTOs";
import Post, {PostProps} from "../Entity";
import { EXCEPTIONS } from "../Errors";
import IPostDBGateway from "../IDBGateway";
import { IAuthorDBGateway, StoredAuthor } from "../../Author/IDBGateway";
import { ICommentDBGateway, StoredComment } from "../../Comment/IDBGateway";
import Like from "../../Like";
import Comment from "../../Comment/Entity";
import { AuthorMin } from "../../Author/Entity";

export default class GetPost implements InputPort<{id : UID}>{
  constructor(
    public outputPort : GetPostPresenter, 
    public postDBGateway : IPostDBGateway,
    public commentDBGateway : ICommentDBGateway,
    public authorDBGateway : IAuthorDBGateway
  ) {
    this.outputPort = outputPort;
    this.postDBGateway = postDBGateway;
    this.authorDBGateway = authorDBGateway;
    this.commentDBGateway = commentDBGateway
  }
  async execute(params: {id : UID}){
    let storedPost = await this.postDBGateway.getPost(params);
    let storedComments = await this.commentDBGateway.getComments(params.id);
    let storedAuthor = await this.getAuthorByID(storedPost?.author as string);
    console.log(storedAuthor?.joined)
    let comments = await Promise.all((storedComments as StoredComment[]).map(async (strdCmnt)=>{
      let storedCommentAuthor = await this.getAuthorByID(strdCmnt.author);
      let commentAuthor = AuthorMin.create({joined : new Date(storedCommentAuthor.joined as string), name : storedCommentAuthor.name + "", photo : storedCommentAuthor.photo + ""}, new UID(storedCommentAuthor.id))
      return Comment.create({postID : new UID(storedPost?.id), value : strdCmnt.value, author : commentAuthor}, new UID(strdCmnt.id));
    }))
    
    let author = AuthorMin.create({joined : new Date(storedAuthor?.joined + ""), name : storedAuthor?.name + "", photo : storedAuthor?.photo + ""}, new UID(storedAuthor?.id));

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
    let data = {
      ...post.props,
      lastModified : post.props.lastModified.toString(),
      author : {
        ...author.props,
        id : post.props.author.id.value.toString() as string,
        joined : author.props.joined.toString(),
      },
      id : post.id.value.toString(),
      comments : comments.map((comment)=>{
        return {...comment.props, id : comment.id.value.toString(), author : {
          ...author.props,
          id : post.props.author.id.value.toString() as string,
          joined : author.props.joined.toString(),
          postID : comment.props.postID.value.toString() as string
        }}
      })
    }
    // WE SHOULD NOT PASS <ENTITIES> instead of <DATA STRUCTURES>
    return this.outputPort.present(data);

  }

  private async getAuthorByID(id : string) : Promise<Partial<StoredAuthor>>{
    let select = ["id", "name", "photo", "joined"];
    return new Promise((res, _)=>{
      let storedAuthor = this.authorDBGateway.getAuthor({select, id : new UID(id)});
      res(storedAuthor);
    })
  }

  private getLikes(likes : string[]){
    return likes.map(like => new Like(new UID(like)))
  }

  private async getCommentsByPostID(postID : UID) : Promise<StoredComment[] | null> {
    let storedComments = await this.commentDBGateway.getComments(postID);
    return storedComments
  }
}

export interface GetPostPresenter extends OutputPort<any>{
  
}