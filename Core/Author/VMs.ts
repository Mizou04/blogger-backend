import { PostMinVM } from "../Post/VM"
import { AuthorMin } from "./Entity"

export type AuthorVM = {
  readonly name : string
  readonly id : string
  readonly joined : string
  readonly lastModified : string
  readonly posts : Omit<PostMinVM, "author">[]
  readonly bio : string
  readonly photo : string 
}

export type AuthorMinVM = Readonly<{
  readonly name : string
  readonly id : string
  readonly joined : string
  readonly photo : string 
}>;

