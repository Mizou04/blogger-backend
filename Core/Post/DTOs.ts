import { CommandDTO, QueryDTO } from "../common/DTOs";
import UID from "../common/UID"

/**
 * for querying a `Post` or `Posts`
 */
export type PostQueryDTO = QueryDTO

/**
 * for creating or updating Post
 */

export type PostCommandDTO = CommandDTO<PostDTO>




export type PostDTO = {
  id : string
  title : string
  content : string
  author : string //AuthorID
  thumbnail : string
  description : string
  comments : string[] // CommentIDs
  likes : string[]
  createdAt : string
  lastModified : string
  [k : string] : string | string[]
}