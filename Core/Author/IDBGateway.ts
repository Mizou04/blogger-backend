import { AuthorQueryDTO } from "./DTOs";
import { RawAuthor } from "./rawAuthor";

export interface IAuthorDBGateway{
  getAuthor(params : AuthorQueryDTO) : Promise<Partial<RawAuthor> | undefined>
  getAuthors(params : AuthorQueryDTO) : Promise<Partial<RawAuthor>[] | undefined | null>
}
