import Entity from "../common/BaseEntity"
import UID from "../common/UID"
import { PostProps } from "../Post/Entity"

type PostMin = {
  id?: UID;
  props : {
    readonly [k in keyof Omit<PostProps, "author" | "content" | "comments">]-?: PostProps[k];
  }
}


export type AuthorProps = {
  readonly name : string
  readonly joined : Date
  readonly lastModified : Date
  readonly posts : PostMin[]
  readonly bio : string
  readonly photo : string 
}

export type AuthorMinProps = Pick<Author["props"], "name" | "photo" | "joined"> 


export default class Author extends Entity<AuthorProps>{
  private constructor(props : AuthorProps, id : UID) {
    super(props, id);
  }

  static create(props : AuthorProps, id : UID) : Author{
    return new Author(props, id)
  }
}

