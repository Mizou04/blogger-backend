import UID from "./UID"
/**
 * for querying a `Element` or `Elements`
 */
export type QueryDTO<T = string> = {
  id?: UID | UID[] // get elements by their IDs
  select?: T extends Record<string | number | symbol, any> ? (keyof T)[] : string;
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
