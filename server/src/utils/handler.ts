import { Request, Response, NextFunction } from 'express';
import { ApiErr } from "./apiErr";
import { ReqWithUser } from '../types/globals';


type AsyncHandler = (req: ReqWithUser | Request, res: Response, next: NextFunction) => Promise<any>;

export const handler = (fn: AsyncHandler) => {
    return async (req: ReqWithUser | Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.error("Error occurred in handler:", error);
            next(new ApiErr(500, "Internal server error")); 
        }
    };
};
