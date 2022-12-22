import UID from "../common/UID"

export interface ICommentDBGateway{
  getComment(id : UID) : Promise<RawComment | null>
  getComments(postId : UID) : Promise<RawComment[] | null>
}

export type RawComment = { 
  id : string
  postID : string // post.ID
  author : string // author.ID
  value : string
}