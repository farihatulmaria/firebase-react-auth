import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase.js';
const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState();

    function login(email,password){
        return auth.createUserWithEmailAndPassword(email,password);
    }
    useEffect(() => {
      const unsubscribe = auth.OnAuthStateChanged(user =>{
          setCurrentUser(user)
      })
      return unsubscribe
    }, [])
    
    const value = {
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// export default AuthContext;