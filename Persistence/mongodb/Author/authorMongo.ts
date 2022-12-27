import mongoose from "mongoose";
import {IAuthorDBGateway} from "../../../Core/Author/IDBGateway"
import { QueryDTO } from "../../../Core/common/DTOs";
import { RawAuthor } from "../../../Core/Author/rawAuthor";
import { DBError, InvalidInputError } from "../../../Core/common/Errors";
import { extractProjectionFromArrayOfStringsAndExclude_id } from "../helpers";
import { AuthorQueryDTO } from "../../../Core/Author/DTOs";

export default class AuthorMongo implements IAuthorDBGateway{
  
  private db = mongoose;
  private authorSchema = {
    id : String,
    bio : String,
    name : String,
    joined : String,
    lastModified : String,
    photo : String,
    posts : [String],
  }
  private schema = new this.db.Schema<RawAuthor>(this.authorSchema);
  private collection = "Authors";
  private Model = this.db.model(this.collection, this.schema, this.collection);

  async getAuthor(query: AuthorQueryDTO): Promise<Partial<RawAuthor> | undefined> {
    if(query.id && Array.isArray(query.id)) throw new InvalidInputError("too much arguments " + query.id.map(i => i.toString()).join(" "));
    if(!query.id) throw new DBError("you better give an ID or use getAuthors instead");

    let projection = extractProjectionFromArrayOfStringsAndExclude_id(query.select);

    let res = await this.Model.findOne({id : query.id?.toString()}, projection).exec();
    if(!res) return undefined;
    return res?.toObject();
  }

  async getAuthors(query: AuthorQueryDTO) : Promise<Partial<RawAuthor>[] | undefined>{
    let projection = extractProjectionFromArrayOfStringsAndExclude_id(query.select);
    if(query.where){
      if(query.where[1] == "="){
        return await this.Model.find({[query.where[0]] : {$regex : new RegExp(query.where[2], "igm")}}, projection)
          .sort({_id : -1})
          .limit(query?.count ?? 10)
          .exec();
      } else {
        throw new DBError(`query ${query.where[1]} not implemented yet`);
      }
    }
    if(query.id) 
      return await this.Model
      .find({id : {$in : query.id.toString()}}, projection)
      .exec();
    // if 'count' only return last 'count' posts
    if(!query.id) 
      return await this.Model.find({}, projection)
      .sort({_id : -1})
      .limit(query.count ?? 10)
      .exec();
    throw new Error("Method not implemented.");
  }
}