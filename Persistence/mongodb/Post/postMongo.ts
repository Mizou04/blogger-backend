import mongoose from "mongoose";
import { PostCommandDTO } from "../../../Core/Post/DTOs";
import IPostDBGateway from "../../../Core/Post/IDBGateway"
import { RawPost } from "../../../Core/Post/rawPost";
import { QueryDTO } from "../../../Core/common/DTOs";
import { DBError } from "../../../Core/common/Errors";

export default class PostMongo implements IPostDBGateway{
  private postSchema = {
    title: String,
    description: String,
    content: String,
    author: String,
    thumbnail: String,
    likes: [String],
    comments : [{
      id : String,
      postId : String,
      author : String,
      value : String
    }],
    createdAt: String,
    lastModified: String,
    id: String
  }
  private db = mongoose
  private collection = "Posts"
  private schema = new this.db.Schema<RawPost>(this.postSchema);
  private Model = this.db.model(this.collection, this.schema, this.collection)
  
  async getPost(query: QueryDTO<RawPost>): Promise<Partial<RawPost> | undefined> {
    if(Array.isArray(query.id)){
      throw new DBError("too many arguments [" + query.id.join(",") + "]");
    }
    if(!query.id) throw new DBError("you better give an ID or use getPosts instead");
    let projection = query.select && query.select.join(" ");
    let result = await this.Model.findOne({id : query.id.toString()}, projection);
    if(!result) return undefined;
    return result.toObject();
  }

  async getPosts(query: QueryDTO<RawPost>): Promise<Partial<RawPost>[] | undefined> {
    // if 'where' clause return 'count' posts with conditional
    if(query.where){
      if(query.where[1] == "="){
        return await this.Model.find({[query.where[0]] : {$regex : new RegExp(query.where[2], "igm")}}, query.select)
          .sort({_id : -1})
          .limit(query?.count ?? 10)
          .exec();
      } else {
        throw new DBError(`query ${query.where[1]} not implemented yet`);
      }
    } 
    // if 'ids' clause return posts with 'ids'
    if(query.id) 
      return await this.Model
      .find({id : {$in : query.id.toString()}}, query.select)
      .exec();
    // if 'count' only return last 'count' posts
    if(!query.id) 
      return await this.Model.find({}, query.select)
      .sort({_id : -1})
      .limit(query.count ?? 10)
      .exec();
    throw new Error("Method not implemented.");
  }
  async setPost(command: PostCommandDTO): Promise<boolean> {
    let post = new this.Model(command.payload);
    if(post.isNew){
      await post.save();
      return true 
    }
    return false
  }
  updatePost(command: PostCommandDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deletePost(command: PostCommandDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}