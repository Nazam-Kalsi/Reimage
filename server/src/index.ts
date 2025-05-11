import { app } from "./app";
import { connection } from "./db/db";

connection()
.then(()=>{
    app.on('error',()=>{
        console.log("Error while running server")
    })

    app.listen(process.env.PORT,()=>{
        console.log('Server running on port',process.env.PORT);
    })
})
.catch((error)=>{
    console.log("error occur",error);
})
