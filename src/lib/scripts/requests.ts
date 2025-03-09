import { user } from "./globalData"

export const getUser = async (isHttps:boolean, server:string, port:number, token:string) =>{
    user.set(await fetchData(`http${isHttps ? "s" : ""}://${server}:${port}/user/me?token=${token}`))
}

export const iconList = ()=>{
    try {
        const modules = import.meta.glob('/static/icons/**/*');
        var icons:string[] = Object.keys(modules);
        return icons
    } catch (error) {
        throw error
    }
}

export const fetchData = async (url: string) => {
    console.log(`attempting to fetch ${url}`)
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
        console.log(await response)
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const checkServerReachability = async (url:string) => {
    try{
        console.log(`checking reachability for ${url}`)
        const response = await fetch(url + "/heartbeat", {
            cache: 'no-cache'
        });
        console.log(await response)
    }catch(err){
        console.log('AOSUJDHNIUASJH')
        return false
    }

    return true
}