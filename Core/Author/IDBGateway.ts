import { QueryDTO } from "../common/DTOs";

export interface IAuthorDBGateway{
  getAuthor(params : QueryDTO) : Promise<Partial<StoredAuthor>>
}

export type StoredAuthor = {
  id : string
  name : string
  joined : string
  lastModified : string
  posts : string[] // Posts IDs
  bio : string
  photo : string 
}