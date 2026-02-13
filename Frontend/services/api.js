const BASE_URL= "http://192.168.29.203:3000";
// const BASE_URL= "http://192.168.1.7:3000";
// const BASE_URL= "http://192.168.1.14:3000";
// const BASE_URL= "http://10.123.226.243:3000";







export const apiRequest = async(endpoint , options = {}) => {

    try{
        const response = await fetch(`${BASE_URL}${endpoint}` , {
            headers:{
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
            ...options,
        });

        const data = await response.json();
        console.log("This is api response:",data)

        if(!response.ok){
            throw new Error(data.message || 'something went wrong ')
        }

        return data;
    } catch (error){
        console.error("Api Error:" , error.message);
        throw error;
    }
}