import Entity from "./BaseEntity";

/* 
  The goal is to transform an entity to a raw strings data

  Card = {
    id : UID
    props : {
      serial : number
    }
  }

  agent = {       ---->      agentRaw = {
    id : UID                      id : string
    props : {                     name : string
      name : string,              age : number
      age : number,               card : string // UID.value
      card : Card            }
    }
  }

*/


export type EntityToRaw<T> = T extends Entity<infer props> 
? 
  {id?: string} & 
  {
    -readonly [key in keyof props]?: props[key] extends any[] ? string[] : string
  }
: never


