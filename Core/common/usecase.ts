export interface InputPort<INPUT>{
  outputPort : OutputPort<any>
  execute(params : INPUT) : any
}

export interface OutputPort<INPUT>{
  present(input : INPUT) : any
}