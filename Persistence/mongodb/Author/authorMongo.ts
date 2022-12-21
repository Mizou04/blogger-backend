import mongoose from "mongoose";
import {IAuthorDBGateway} from "../../../Core/Author/IDBGateway"
import { QueryDTO } from "../../../Core/common/DTOs";
import { RawAuthor } from "../../../Core/Author/rawAuthor";

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

  getAuthor(params: QueryDTO): Promise<Partial<RawAuthor> | null | undefined> {
    throw new Error("Method not implemented.");
  }
}