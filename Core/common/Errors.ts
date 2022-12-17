export class InvalidInputError extends Error{
  constructor(message: string = "Invalid Input Error"){
    super(message);
  }
}

export class DBError extends Error{
  constructor(message: string = "Database Error"){
    super(message);
  }
}

