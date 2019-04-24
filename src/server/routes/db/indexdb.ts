import * as mysql from "mysql"
import chirps from "./chirpsdb";
import mentions from"./mentions"
import config from "../../config/mysqlCon"

export const Connection = mysql.createConnection(config.mysql);

export const Query = (query:string,values?: Array<string | number>) =>{
return new Promise<Array<any>>((resolve,reject)=>{
    Connection.query(query,values, (err,results) => {
        if(err) return reject(err);
        resolve(results)
    });
});
}

export default {
    chirps,
    mentions
}