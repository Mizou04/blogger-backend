import { AuthorMinVM } from "../Author/VMs"
import { CommentVM } from "../Comment/VMs"
import { LikeVM } from "../Like/VMs"

export type PostVM = {
  id : string
  title : string
  content : string
  author : AuthorMinVM
  thumbnail : string
  comments : CommentVM[]
  likes : number // Likes count
  createdAt : string
  lastModified : string
}

export type PostMinVM = {
  id : string
  title : string
  description : string
  author : AuthorMinVM
  thumbnail : string
  likes : number // likes count
  createdAt : Date
}
