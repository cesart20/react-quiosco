import  {useEffect} from "react";
import useSWR from "swr";
import {useNavigate} from 'react-router-dom';
import clienteAxios from "../../config/axios";

export const useAuth = ({ middleware, url}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const { data: user, error, mutate } = useSWR('/api/user', () => 
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            throw Error(err?.response?.data?.errors)
        })
    )

    const login = async (datos, setErrores) => {

        try {
            const {data} = await clienteAxios.post('/api/login', datos)

            localStorage.setItem('token', data.token)
            setErrores([])
            await mutate()
        } catch (error) {
            // console.log(error.response.data);
            setErrores(Object.values(error?.response?.data?.errors))
        }

    }

    const registro = async(datos, setErrores) => {
        try {
            const {data} = await clienteAxios.post('/api/registro', datos)

            console.log(data.token)
            localStorage.setItem('token', data.token)
            setErrores([])
            await mutate()
        } catch (error) {
            // console.log(error.response.data);
            setErrores(Object.values(error.response.data.errors))
        }
    }

    const logout = async () => {
       try {
         await clienteAxios.post('/api/logout', null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
         })
         localStorage.removeItem('token')
         await mutate(undefined)

       } catch (error) {
            throw Error(error?.response?.data?.errors)
       }
    }

    // console.log("user", user);
    // console.log("error", error);
    
    useEffect(() => {
        if(middleware === 'guest' && url && user) {
            navigate(url)
        }
        if(middleware === 'auth' && error) {
            navigate('/auth/login')
        }
    }, [user, error]);
    
    // console.log("middleware", middleware);
    // console.log('url', url);

    return {
        login,
        registro,
        logout,
        user,
        error
    }

}