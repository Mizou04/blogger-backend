import UID from "./UID";

export default abstract class Entity<T>{
  constructor(public props : T, public readonly id?: UID | string){
    // this.id = id instanceof UID ? typeof id != "string" ? new UID(id.toString()) : new UID(id) ;
    this.id = id instanceof UID 
              ? id 
              : typeof id == "string" || typeof id === "number"
              ? new UID(String(id))
              : undefined;
    this.props = props;
  }

}