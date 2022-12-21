import { InputPort, OutputPort } from "../../common/usecase";
import IPostDBGateway from "../IDBGateway";
import { PostCommandDTO } from "../DTOs";
import { IAuthorDBGateway } from "../../Author/IDBGateway";
import { ICommentDBGateway } from "../../Comment/IDBGateway";
import Post from "../Entity";
import UID from "../../common/UID";
import Author from "../../Author/Entity";
import { RawPost } from "../rawPost";


export default class SetPost implements InputPort<PostCommandDTO>{
  constructor(
    public outputPort: OutputPort<boolean>,
    public postGatway : IPostDBGateway,
    public authorGateway : IAuthorDBGateway
    ){
    this.outputPort = outputPort;
    this.postGatway = postGatway;
    this.authorGateway = authorGateway;
  }

  async execute(params: PostCommandDTO) {
    // 
    let {payload, id} = params;
    let authorDTO = await this.authorGateway.getAuthor({id : new UID(payload?.author)});
    let author = {
      props :{
        name : authorDTO?.name as string, 
        joined : new Date(authorDTO?.joined as string),
        photo : authorDTO?.photo as string
      },
      id : new UID(authorDTO?.id) 
      };
    
    let post = Post.create({
    author : author,
    comments : [],
    likes : [],
    content : payload?.content as string,
    createdAt : new Date(),
    lastModified : new Date(),
    description : payload?.description as string,
    thumbnail : payload?.thumbnail as string,
    title : payload?.title as string
    }, id as UID);
    let result = await this.postGatway.setPost({id : post.id, payload : {...post.props, createdAt : post.props.createdAt.toString(), lastModified : post.props.lastModified.toString(), author : post.props.author.id.toString(), likes : []}});    
    return this.outputPort.present(result);
  }
}