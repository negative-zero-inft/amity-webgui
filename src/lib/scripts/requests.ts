import { user } from "./globalData"

export const getUser = async (isHttps:boolean, server:string, port:number, token:string) =>{
    try{
        const response = await fetch(`http${isHttps ? "s" : ""}://${server}:${port}/user/me?token=${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        user.set(JSON.parse(await response.text()))
    }catch(e){
        throw e
    }
}