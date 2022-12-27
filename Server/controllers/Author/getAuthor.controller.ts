import { IGetAuthorInputPort } from "../../../Core/Author/usecases/GetAuthor";
import { InvalidInputError } from "../../../Core/common/Errors";
import BaseController from "../base.controller";

export default class GetAuthorController extends BaseController{
  constructor(public readonly getAuthorUseCase : IGetAuthorInputPort){
    super();
    this.getAuthorUseCase = getAuthorUseCase
  }
  protected async executeImpl(): Promise<any> {
    let id = this.req?.params.id as string;
    try {
      if(!id) throw new InvalidInputError("please provide an id");
      let author = await this.getAuthorUseCase.execute({id});
      if(author){
        return this.res?.status(200).json(author)
      }    
      throw new Error("Internal Error")
    } catch (error) {
      error instanceof Error && this.next!(error)
    }
  }
} 