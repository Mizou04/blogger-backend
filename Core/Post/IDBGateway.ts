import { PostQueryDTO, PostCommandDTO } from "./DTOs";
import Post from "./Entity";
import { RawPost } from "./rawPost";

export default interface IPostDBGateway{
  getPost(query : PostQueryDTO) : Promise<Partial<RawPost> | undefined>
  getPosts(query : PostQueryDTO) :  Promise<undefined | Partial<RawPost>[]>
  setPost(command : PostCommandDTO) : Promise<boolean>
  updatePost(command : PostCommandDTO) : Promise<boolean>
  deletePost(command : PostCommandDTO) : Promise<boolean>
}

// refers to the entity shape in the DB
