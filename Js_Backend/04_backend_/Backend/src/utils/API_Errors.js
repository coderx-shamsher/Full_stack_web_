class ApiErrors extends Error {
    constructor(
        statuscode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
      // using super 
      /// overwriting message
      super(message)
      this.statusCode = statuscode
      this.data = null
      this.message = message
      this.success = false
      this.errors = errors
   
      // in production based logic 
      if(stack){
         this.stack = stack
      }else{
        Error.captureStackTrace(this, this.constructor)
      }
    }
}

// export class 

export default ApiErrors
