import { AuthorProps } from "../Author/Entity";
import Entity from "../common/BaseEntity";
import UID from "../common/UID";

type AuthorMin = {  
  readonly id : UID;
  readonly props : {
  [k in keyof Pick<AuthorProps, "name" | "photo">] : AuthorProps[k]
}
}
type CommentProps = {
  postID : UID
  author : AuthorMin
  value : string
}

export default class Comment extends Entity<CommentProps>{
  private constructor(props : CommentProps, id : UID){
    super(props, id);
  }

  static create(props : CommentProps, id : UID) : Comment{
    return new Comment(props, id);
  }
}

