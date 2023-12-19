import {useContext} from 'react';
import {createContext, useState, useEffect} from 'react';
import {getData, USER_DATA} from '@redux/reducer/userSlice';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    useEffect(() => {
        (async () => {
            const res = await getData(USER_DATA).then((res) => res);
            setAuth(res);
        })();
    }, []);
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthConsumer = AuthContext.Consumer;

export const useAuth = () => useContext(AuthContext);