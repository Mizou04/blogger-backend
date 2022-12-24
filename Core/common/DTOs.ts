import UID from "./UID"
/**
 * for querying a `Element` or `Elements`
 */
export type QueryDTO<T = string> = {
  id?: UID | UID[] // get elements by their IDs
<<<<<<< HEAD
  select?: T extends Record<string | number | symbol, string> ? (keyof T)[] : string;
=======
  select?: T extends Record<string | number | symbol, any> ? (keyof T)[] : string;
>>>>>>> 7af3475 (wrote test for GetPosts first + changed queryDTO to generic type)
  where?: string[]
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
