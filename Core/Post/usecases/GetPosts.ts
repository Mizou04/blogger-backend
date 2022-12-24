import {InputPort, OutputPort} from "../../common/usecase"
import {PostQueryDTO} from "../DTOs"
class GetPosts implements IGetPostsInputPort{
  outputPort: OutputPort<any>
  execute(params: PostQueryDTO) {
    throw new Error("Method not implemented.")
  }
}





interface IGetPostsInputPort extends InputPort<PostQueryDTO>{}