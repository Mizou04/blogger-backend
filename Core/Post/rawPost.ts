import type { EntityToRaw } from "../common/types_utils";
import Post, { PostProps } from "./Entity";

export type RawPost = Omit<EntityToRaw<Post>, "comments">;
