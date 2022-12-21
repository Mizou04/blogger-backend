import Author, { AuthorProps } from "../Author/Entity";
import Comment from "../Comment/Entity";
import Like from "../Like";
import Entity from "../common/BaseEntity";
import { InvalidInputError } from "../common/Errors";
import UID from "../common/UID";


type AuthorMin = {
  readonly id : UID;
  readonly props : {
    [k in keyof Pick<AuthorProps, "name" | "photo" | "joined">] : AuthorProps[k];
  }
}

export type PostProps = {
  title : string
  description : string
  content : string
  author : AuthorMin
  thumbnail : string
  comments : Comment[] | []
  likes : Array<Like> // Like object to string
  readonly createdAt : Date
  lastModified : Date
}


export default class Post extends Entity<PostProps>{
  private constructor(public props : PostProps, public id: UID){
    super(props, id);
    this.id = id;
  }

  static create(props : PostProps, id : UID) : Post{
    // this.validate(props);
    return new Post(props, id);
  }

  private static validate(props : PostProps){
    if(props.title.length > 120 && props.title.length < 20) throw new InvalidInputError("title must be between 20 and 120 characters long");
    if(props.description.length > 260) throw new InvalidInputError("description must be less than 260 characters long")
    if(props.content.length < 300) throw new InvalidInputError("content must be more than 300 characters long");
  }

}

