import { RawPost } from "../Post/rawPost";
import UID from "./UID"
/**
 * for querying a `Element` or `Elements`
 */

// type WHERE<T> = [
//   T[keyof T] extends Record<string | number, any> ? `${Exclude<keyof T, symbol>}.${Exclude<keyof T[keyof T], symbol>}` : T[keyof T] extends string ? keyof T : keyof T
//   , "=" | ">" | ">=" | "<"| "<=", 
//   T[keyof T]
// ]

export type QueryDTO<T> = {
  id?: UID | UID[] // get elements by their IDs
  select?: (keyof T)[];
  where?: [keyof T, "=" | ">" | ">=" | "<"| "<=", string]
  count?: number
}


/**
 * for creating or updating Element
 */
export type CommandDTO<T> = {
  /**
   * @param id  if we need to update/delete existing one(s)
   */
  id?: UID | UID[],
  payload: Partial<T>
}
