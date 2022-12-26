export interface InputPort<INPUT>{
  outputPort : OutputPort<unknown>
  execute(params : INPUT) : unknown
}

export interface OutputPort<OUTPUT>{
  present(input : unknown) : OUTPUT
}