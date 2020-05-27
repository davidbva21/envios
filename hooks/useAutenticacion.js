import React,{useEffect,useState} from 'react';
import firebase from '../firebase';


function useAutenticacion(){
    const[usuario,guardarUsuario] = useState(null);

    useEffect(()=>{
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario =>{
            if(usuario){
                guardarUsuario(usuario);
            }else{
                guardarUsuario(null);
            }
        });
        return () => unsuscribe();
    
    },[usuario])
    return usuario;
}

export default useAutenticacion;


