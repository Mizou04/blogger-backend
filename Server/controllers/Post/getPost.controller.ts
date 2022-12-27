import BaseController from "../base.controller";
import GetPostInputPort from "../../../Core/Post/usecases/GetPost"
import { InvalidInputError } from "../../../Core/common/Errors";


export default class GetPostController extends BaseController{
  constructor(private readonly getPostUseCase : GetPostInputPort){
    super();
    this.getPostUseCase = getPostUseCase;
  }
  
  protected async executeImpl(): Promise<any> {
    let id = this.req?.params.id as string;
    try {
      if(!id) throw new InvalidInputError("please provide an id");
      let post = await this.getPostUseCase.execute({id});
      if(post){
        return this.res?.status(200).json(post)
      }
      
      throw new Error("Internal Error")
    } catch (error) {
      error instanceof Error && this.next!(error)
    }
  }
}