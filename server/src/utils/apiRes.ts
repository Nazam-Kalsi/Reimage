export type responseT = {
    statusCode:number;
    message:string;
    data?:any;
    success:boolean;
}

export const ApiRes = (statusCode:number,message:string,data?:any) =>{
    return(
        {statusCode, message, success:statusCode<300, data}
    )
}