/// <reference types="@clerk/express/env" />

import { Request } from "express"


declare module 'express-serve-static-core' {
  export interface Request {
    user?: any;
    file?:any;
    file?:any
  }
}

export interface ReqWithUser extends Request {
  user?: any;
  file?:any;
  file?:any;
}