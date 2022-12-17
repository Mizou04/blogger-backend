import UID from "./UID";

export default abstract class Entity<T>{
  constructor(public props : T, public readonly id?: UID | any){
    this.id = new UID(id);
    this.props = props;
  }

}