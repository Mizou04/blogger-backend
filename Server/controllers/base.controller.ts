import { Request, Response, NextFunction } from "express";

export default abstract class BaseController{
  protected req : Request | undefined;
  protected res : Response | undefined;
  protected next : NextFunction | undefined;

  protected abstract executeImpl() : Promise<void | any>

  execute(req: Request, res : Response, next : NextFunction){
    this.req = req;
    this.res = res;
    this.next = next;

    this.executeImpl();
  }

}