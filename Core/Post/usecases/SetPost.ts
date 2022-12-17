import { InputPort, OutputPort } from "../../common/usecase";
import IPostDBGateway from "../IDBGateway";
import { PostCommandDTO } from "../DTOs";
import { IAuthorDBGateway } from "../../Author/IDBGateway";
import { ICommentDBGateway } from "../../Comment/IDBGateway";
import Post from "../Entity";
import UID from "../../common/UID";
import Author, { AuthorMin } from "../../Author/Entity";


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
    let author = AuthorMin.create({
      name : authorDTO.name as string, 
      joined : new Date(authorDTO.joined as string),
      photo : authorDTO.photo as string
      },
      new UID(authorDTO.id));
    
      let post = Post.create({
      author : author,
      comments : [],
      likes : [],
      content : payload?.content,
      createdAt : new Date(),
      lastModified : new Date(),
      description : payload?.description,
      thumbnail : payload?.thumbnail,
      title : payload?.title
    }, new UID(id));
    
    return this.outputPort.present(await this.postGatway.setPost(post));

  }
}