import UID from "../common/UID"

export interface ICommentDBGateway{
  getComment(id : UID) : Promise<StoredComment | null>
  getComments(postId : UID) : Promise<StoredComment[] | null>
}

export type StoredComment = { 
  id : string
  postID : string // post.ID
  author : string // author.ID
  value : string
}