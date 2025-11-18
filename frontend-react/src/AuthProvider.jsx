import React from 'react'

import {useState, useContext, createContext} from 'react'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isloggedin,setIsLoggedin] = useState(
        !!localStorage.getItem('access_token')
    );
  return (
    <AuthContext.Provider value = {{isloggedin,setIsLoggedin}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext};