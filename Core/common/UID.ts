import {v4 as UUID4} from "uuid"


export default class UID {
  constructor(public value? : string){
    this.value = value ? value : UUID4().replace(/-/g, "");
  }

  toString(){
    return this.value?.toString();
  }
}
