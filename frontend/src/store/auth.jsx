
import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react'

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [token,setToken]=useState(localStorage.getItem("scet-token"));
    const[user,setUser]=useState(JSON.parse(localStorage.getItem("scet-user")) || null)
     const[isLoading,setIsLoading]=useState(true)
    
   
    const storetokenInLs=(serverToken)=>{
        localStorage.setItem(`scet-token`,serverToken);   //localitem ma aa token save thai jai.....add mate setItem melva mate getItem aave...
         setToken(serverToken);
     

    }
    let isloggedin=!!token  //token value true to true false to false
    console.log(isloggedin)
    const  LogOutUser=()=>{
     setToken("");
     setUser(""); 
     return localStorage.removeItem('scet-token')
    }

    //jwt authentication-to get currently loggedin user data
    const userAuthentication=async()=>{
        try {
            setIsLoading(true)
            const response=await fetch("http://localhost:5000/api/auth/user",{
                method:"GET",
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            if(response.ok){
                const data=await response.json()
                console.log(`user data`,data.userdata)
                setUser(data.userdata)
                setIsLoading(false)
            }


        } catch (error) {
            console.log("Error fetching user data")
        }
    }

    
    useEffect(()=>{
        if (token) {
        userAuthentication();
    }
    },[token])

    return(
        <AuthContext.Provider value={{isloggedin,storetokenInLs,LogOutUser,isLoading,user,token}}>
            {children}
        </AuthContext.Provider>
    )
}




//jema use krvu che te..
export const useAuth=()=>{
    return useContext(AuthContext)
}