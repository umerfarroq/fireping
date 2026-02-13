// import { createContext , useContext , useEffect, useState } from "react";
// import * as SecureStore from "expo-secure-store";

// import {getProfile, login as loginApi} from "../services/auth.service";
// import { router } from "expo-router";

// const AuthContext = createContext(null);

// export const AuthProvider = ({children}) => {
//     const [user , setUser]=useState(null);
//     const [token , setToken] = useState(null);
//     const [isAuthenticated , setIsAuthenticated] = useState(false);
//     const [isLoading , setIsLoading] = useState(false);
//     // const [ hasFireAlert , setHasFireAlert] = useState(true);

//     //login function
//     const login = async(beltNo,password) => {
//         try{
//             setIsLoading(true)
//             const response = await loginApi(beltNo , password)

//             const {token , user} = response;
//             //store token securely

//             await SecureStore.setItemAsync("token" , token)
             
//             //update state
//             setToken(token)
//             setUser(user)
//             setIsAuthenticated(true)

//             return response;
            
//         } catch(error){
//             throw error;
//         } finally{
//             setIsLoading(false)
//         }
//     }



//     //Logout function
//     const logout=async() => {
//         console.log('token before delete:',token)
//         await SecureStore.deleteItemAsync("token")
       
//         setToken(null)
//          console.log('token after delete:',token)

//         setUser(null)
//         setIsAuthenticated(false)
//     }


//     //Restore Session

//     const restoreSession = async() => {
//         try{
//             setIsLoading(true)
//             const storedToken = await SecureStore.getItemAsync("token");

//             if(!storedToken){
//                 return
//             }

//             //validate token with backend


//             const profile = await getProfile(storedToken);

//             setToken(storedToken)
//             setUser(profile.user);
//             setIsAuthenticated(true)
            
//         } catch(error){
//             await SecureStore.deleteItemAsync("token");
//             setToken(null);
//             setUser(null);
//             setIsAuthenticated(false);
//         } finally{
//             setIsLoading(false)
//         }
//     }

// // Run once when app loads

// useEffect(() => {
//     restoreSession()
// },[])


//     return(
//     <AuthContext.Provider value={{user, token , isAuthenticated , setUser , setToken , setIsAuthenticated , login , logout , isLoading   }}>
//         {children}

//     </AuthContext.Provider>
// )
// }





// export const useAuth = () => {
//     return useContext(AuthContext);
// }





import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { getProfile, login as loginApi } from "../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start as true

  // Login function
  const login = async (beltNo, password) => {
    try {
      setIsLoading(true);
      const response = await loginApi(beltNo, password);

      const { token, user } = response;

      // Store token securely
      await SecureStore.setItemAsync("token", token);

      // Update state
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);

      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      console.log("Logging out...");
      await SecureStore.deleteItemAsync("token");

      setToken(null);
      setUser(null);
      setIsAuthenticated(false);

      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Restore Session
  const restoreSession = async () => {
    try {
      setIsLoading(true);
      const storedToken = await SecureStore.getItemAsync("token");

      if (!storedToken) {
        console.log("No stored token found");
        return;
      }

      console.log("Restoring session with token:", storedToken.substring(0, 20) + "...");

      // Validate token with backend
      const profile = await getProfile(storedToken);

      setToken(storedToken);
      setUser(profile.user);
      setIsAuthenticated(true);

      console.log("Session restored successfully");
    } catch (error) {
      console.error("Session restore failed:", error);
      // Clear invalid token
      await SecureStore.deleteItemAsync("token");
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Run once when app loads
  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        setUser,
        setToken,
        setIsAuthenticated,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
