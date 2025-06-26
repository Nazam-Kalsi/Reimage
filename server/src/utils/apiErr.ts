// export const apiErr = (status: number, message: string, details?: any) => {
//     const error = new Error(message) as any;
//     error.status = status;
//     if (details) error.details = details;
//     return error;
//   };

class ApiErr extends Error{
    statusCode:number;
    message:string;
    errors:string[];
    stack:any
    constructor(statusCode:number, message:string = "Invalid", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiErr}
