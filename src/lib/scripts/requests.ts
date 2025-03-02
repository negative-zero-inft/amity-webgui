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
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const checkServerReachability = async (url:string) => {
    try {
        const response = await fetch(url, {
            cache: 'no-cache'
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}