import { QueryDTO } from "../common/DTOs";
import { RawAuthor } from "./rawAuthor";

export interface IAuthorDBGateway{
  getAuthor(params : QueryDTO) : Promise<Partial<RawAuthor> | undefined | null>
}
