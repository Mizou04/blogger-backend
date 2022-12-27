export interface InputPort<INPUT>{
  outputPort : OutputPort<unknown>
  execute(params : INPUT) : unknown
}

export interface OutputPort<INTPUT>{
  present(input : INTPUT) : any
}