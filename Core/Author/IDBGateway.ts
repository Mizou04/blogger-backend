import { QueryDTO } from "../common/DTOs";
import { RawAuthor } from "./rawAuthor";

export interface IAuthorDBGateway{
  getAuthor(params : QueryDTO<RawAuthor>) : Promise<Partial<RawAuthor> | undefined | null>
  getAuthors(params : QueryDTO<RawAuthor>) : Promise<Partial<RawAuthor>[] | undefined | null>
}
