import GetAuthor from "../../../Core/Author/usecases/GetAuthor";
import { AuthorDB, PostDB } from "../../../Persistence"
import GetAuthorPresenter from "../../presenters/Author/getAuthor.presenter";
import GetAuthorController from "../Author/getAuthor.controller";
import {postDB, authorDB} from "./common/dbs"


export default class authorControllers{
  static getAuthorController(){
    let presenter = new GetAuthorPresenter();
    let interactor = new GetAuthor(presenter, authorDB, postDB);
    let controller = new GetAuthorController(interactor);
    return controller
  }
}