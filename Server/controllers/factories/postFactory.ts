import GetPost from "../../../Core/Post/usecases/GetPost";
import GetPostPresenter from "../../presenters/Post/getpost.presenter";
import GetPostController from "../Post/getPost.controller";
import {postDB, commentDB, authorDB} from "./common/dbs"

export default class PostControllersFactory {
  
  static getPostController(){
    let presenter = new GetPostPresenter();
    let usecase = new GetPost(presenter, postDB, commentDB, authorDB);
    return new GetPostController(usecase)
  }
}
