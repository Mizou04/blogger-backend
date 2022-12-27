import { ProjectionType } from "mongoose";

export function extractProjectionFromArrayOfStringsAndExclude_id<RawData>(select?: (keyof RawData)[] | undefined) : ProjectionType<RawData>{

  let projection = select?.reduce((obj : {[k in keyof RawData]?: number}, curr : keyof RawData)=>{
    obj[curr] = 1;
    return obj;
  }, {});
  if(projection)
    return {
      ...projection, _id : 0
    }
  return {};
}
