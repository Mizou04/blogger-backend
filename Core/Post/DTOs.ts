import { CommandDTO, QueryDTO } from "../common/DTOs";
import { RawPost } from "./rawPost";

/**
 * for querying a `Post` or `Posts`
 */
export type PostQueryDTO = QueryDTO<RawPost>

/**
 * for creating or updating Post
 */

export type PostCommandDTO = CommandDTO<RawPost>



