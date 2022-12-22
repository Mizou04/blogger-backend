export {PostDB} from "./mongodb/Post"
export {AuthorDB} from "./mongodb/Author"
export {CommentDB} from "./mongodb/Comment"

import dbConnect from "./mongodb/configs"

dbConnect();
