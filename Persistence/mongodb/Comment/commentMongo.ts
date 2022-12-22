import mongoose from "mongoose";
import {ICommentDBGateway, RawComment} from "../../../Core/Comment/IDBGateway"
import { QueryDTO, CommandDTO } from "../../../Core/common/DTOs";
import UID from "../../../Core/common/UID";

export default class CommentMongo implements ICommentDBGateway{
  private db = mongoose;
  private commentSchema = { 
    id : String,
    postID : String, // post.ID
    author : String, // author.ID
    value : String
  }
  private schema = new this.db.Schema<RawComment>(this.commentSchema);
  private collection = "Comments";
  private Model = this.db.model(this.collection, this.schema, this.collection);

  getComment(id: UID): Promise<RawComment | null> {
    throw new Error("Method not implemented.");
  }
  async setComment(command : CommandDTO<RawComment>): Promise<boolean> {
    let res = await new this.Model(command.payload);
    if(res.isNew){    
	await res.save();
	return true;
    }
    return false;
  }
  async getComments(postID: UID): Promise<RawComment[] | null > {
    let res = await this.Model.find({postID : postID.toString()});
    return res;
  }  
}
