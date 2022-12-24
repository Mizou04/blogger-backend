export interface InputPort<INPUT>{
  outputPort : OutputPort<any>
  execute(params : INPUT) : any
}

export interface OutputPort<OUTPUT>{
  present(input : any) : OUTPUT
}