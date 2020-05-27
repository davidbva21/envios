import React,{useContext,useState} from 'react';
import styled from '@emotion/styled';
import Router from 'next/router';
import {css} from '@emotion/core';
import Layout from '../componentes/layouts/Layouts';
import {Formulario,Campo,InputSubmit,Error} from '../componentes/ui/Formulario';
import useValidacion from '../hooks/useValidacion';
import validarLogin from '../validacion/validarLogin';
import firebase from '../firebase';

const STATE_INICIAL ={
  email:'',
  password:''
}
const Titulo = styled.h1`
text-align:center;
margin-top:5rem;
font-weight:bold;
`;
const Login = () => {

  const {valores, errores,handleSubmit,handChange,handBlur} 
          = useValidacion(STATE_INICIAL,validarLogin,login);

const {email,password} = valores;

const [error,guardarError] = useState(false);


async function login(){
      try{
        const usuario = await firebase.login(email,password);
          Router.push('/');
      }catch(error){
          console.log('Error al iniciar sesión',error.message);
          guardarError(error.message);
      }
}


    return (
       <div>
  
          <Layout> 
          <Formulario onSubmit={handleSubmit} noValidate>
            <Titulo>Inicio de Sesión</Titulo>
             {errores.nombre && <Error>{ errores.nombre }</Error>}
             <Campo>
                <label htmlFor="email">Email</label>
                <input type="text"
                        id="email"
                        placeholder="Tu email"
                        name="email"
                        value={email}
                        onChange={handChange}
                        onBlur={handBlur}
                />
             </Campo>
             {errores.email && <Error>{ errores.email }</Error>}
             <Campo>
                <label htmlFor="password">Password</label>
                <input type="password"
                        id="password"
                        placeholder="Tu password"
                        name="password"
                        value={password}
                        onChange={handChange}
                        onBlur={handBlur}
                />
             </Campo>
             {errores.password && <Error>{ errores.password }</Error>}
                <InputSubmit type="submit"  value="Iniciar Sesión"  ></InputSubmit>
                {error && <Error>{ error }</Error>}
           
           


          </Formulario>
  
          </Layout>
       
          
  
       </div>  
    );
  
  }
   
export default Login;