import { PostQueryDTO, PostCommandDTO, PostDTO } from "./DTOs";
import Post from "./Entity";

export default interface IPostDBGateway{
  getPost(query : PostQueryDTO) : Promise<Partial<PostDTO> | undefined>
  getPosts(query : PostQueryDTO) :  Promise<undefined | Partial<PostDTO>[]>
  setPost(command : Post) : Promise<boolean>
  updatePost(command : PostCommandDTO) : Promise<boolean>
  deletePost(command : PostCommandDTO) : Promise<boolean>
}

// refers to the entity shape in the DB
type PostRaw = {

}