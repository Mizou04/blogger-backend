import { EntityToRaw } from "../common/types_utils";
import Author from "./Entity";


/**
 * Posts in raw type are actually Posts IDs
 */
export type RawAuthor = EntityToRaw<Author>;

