import { AuthorMinVM } from "../Author/VMs"

export type CommentVM = {
  postID : string
  author : AuthorMinVM
  value : string
}