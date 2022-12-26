import { IAuthorDBGateway } from "../../Author/IDBGateway";
import { RawAuthor } from "../../Author/rawAuthor";
import { DBError, InvalidInputError } from "../../common/Errors";
import UID from "../../common/UID";
import {InputPort, OutputPort} from "../../common/usecase"
import {PostQueryDTO} from "../DTOs"
import IPostDBGateway from "../IDBGateway";
import { RawPost } from "../rawPost";

export default class GetPosts implements IGetPostsInputPort{
  constructor(
    public outputPort: OutputPort<any>, 
    public postDBGatway : IPostDBGateway,
    public authorDBGateway : IAuthorDBGateway
    ){
    this.outputPort = outputPort;
    this.postDBGatway = postDBGatway;
    this.authorDBGateway = authorDBGateway;
  }
  async execute(query : PostQueryDTO){
    //copy query
    let queryCopy = {...query};
    // don't accept query if :
    //  -id clause is not array
    if(queryCopy.id && !Array.isArray(queryCopy.id)) throw new InvalidInputError("id must be an array of more than 1 'id's")
    //  -it has less than 2 IDs 
    if(queryCopy.id && Array.isArray(queryCopy.id) && queryCopy.id.length < 2) throw new InvalidInputError("too many arguments")
    //  -it has the IDs clause and count clause; 
    if(queryCopy.id && queryCopy.count) throw new InvalidInputError("can't specify 'id' and 'count' in the same query");
    //  -it has where clause and IDs
    if(queryCopy.id && queryCopy.where) throw new InvalidInputError("can't accept 'where' in query with 'id' clause set");
    // if query accepted :
    //  -get some fields for each post (this always set like this)
    let select : PostQueryDTO["select"] = ["title", "description", "author", "thumbnail", "comments", "likes", "createdAt", "lastModified"];
    // if the where field is looking for author name 
    if(queryCopy.where && queryCopy.where[0] == "author"){
      // get authors with that criteria
      let authors = await this.authorDBGateway.getAuthors({where : ["name", "=", queryCopy.where[2]]})
      // get the ids of the posts of that user (those users)
      let authorsPostsIds : UID[] = [];
      authors?.forEach((author)=>{
        authorsPostsIds.concat((author.posts as string[]).map(pst => new UID(pst)));
      });
      //alter the query copy
      queryCopy = {...queryCopy, id : authorsPostsIds}
    }
    let posts = await this.postDBGatway.getPosts({...queryCopy, select});
    if(posts){
      let authorsIds = posts.map(pst => new UID(pst.author)); 
      let authors = await this.authorDBGateway.getAuthors({select : ["id", "name", "photo", "joined"], id : authorsIds});
      return this.outputPort.present(posts.map((pst) => {
        //  -for each post get an author that its id match the post author id;
        let postAuthor = authors?.find((atr)=> atr.id == pst.author);
        // return posts but with author field replaced with actual author
        return {...pst, author : postAuthor}
      }))
    } 
    return this.outputPort.present(undefined)
  }
}





export interface IGetPostsInputPort extends InputPort<PostQueryDTO>{}


export interface IGetPostsOutputPort extends OutputPort<unknown[]>{
  
}
