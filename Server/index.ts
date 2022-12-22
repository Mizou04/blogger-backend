import express, { Errback, NextFunction, Request, Response } from "express"
import cors from "cors"
import helmet from "helmet";
import { DBError, InvalidInputError } from "../Core/common/Errors";
import { postControllers } from "./controllers/factories";

let {getPostController} = postControllers;

let app = express();

app.use(cors({
  origin : "*"
}));

app.use(helmet())

let api = express.Router();

// get one post
/* api.get("/posts-:id", async (req, res, next)=>{
  try {
    let {id} = req.params;
    console.log(id)
    let postRes = await postDB.getPost({id : new UID(id)});
    if(postRes && postRes.id){
      console.log(postRes)
      return res.status(200).json(postRes);
    }
    next(new DBError("post not found"))
    } catch (error) {
    next(error);
  }
})
 */
api.get("/posts/:id", async (req, res, next) => getPostController().execute(req, res, next))

app.use("/api", api);

//basic error middleware
app.use((err : Errback, req : Request, res : Response, next : NextFunction)=>{
  if(err){
    if(err instanceof DBError){ 
      res.status(404).send(err.message);
      return;
    } else if(err instanceof InvalidInputError){
      res.status(422).send(err.message);
      return;
    } 
    res.status(500).send("internal server error");
    return;
  }
  next();
})


const PORT = 4000;
app.listen(PORT ,()=>{
  console.log("listening at port: ", PORT)
})