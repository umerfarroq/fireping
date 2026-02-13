import { apiRequest } from "./api";

export const login = (beltNo , password) => {
    return apiRequest("/login" , {
        method:"POST",
        body:JSON.stringify({beltNo , password})
    })
}

export const getProfile = (token) => {
    return apiRequest("/profile", {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}