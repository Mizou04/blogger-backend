import mongoose from "mongoose";
import {IAuthorDBGateway} from "../../../Core/Author/IDBGateway"
import { QueryDTO } from "../../../Core/common/DTOs";
import { RawAuthor } from "../../../Core/Author/rawAuthor";
import { InvalidInputError } from "../../../Core/common/Errors";

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

  async getAuthor(params: QueryDTO<RawAuthor>): Promise<Partial<RawAuthor> | null | undefined> {
    if(params.id && Array.isArray(params.id)) throw new InvalidInputError("too much arguments " + params.id.map(i => i.toString()).join(" "));
    let res = await this.Model.findOne({id : params.id?.toString()}).exec();
    return res;
  }
  async getAuthors(params: QueryDTO<RawAuthor>) : Promise<Partial<RawAuthor>[] | null | undefined>{
    throw new Error("Method not implemented.");
  }
}