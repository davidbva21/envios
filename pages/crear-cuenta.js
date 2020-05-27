import React,{useContext,useState} from 'react';
import styled from '@emotion/styled';
import Router from 'next/router';
import {css} from '@emotion/core';
import Layout from '../componentes/layouts/Layouts';
import {Formulario,Campo,InputSubmit,Error} from '../componentes/ui/Formulario';
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';
import firebase from '../firebase';

const STATE_INICIAL ={
  nombre:'',
  email:'',
  password:''
}
const CrearCuenta = () => {

  const [error,guardarError] = useState(false);

 const Titulo = styled.h1`
    text-align:center;
    margin-top:5rem;
    font-weight:bold;
 `;
 

const {valores, errores,handleSubmit,handChange,handBlur} 
                  = useValidacion(STATE_INICIAL,validarCrearCuenta,crearCuenta);

const {nombre,email,password} = valores;

async function crearCuenta(){
  try{
    await firebase.registrar(nombre,email,password);
    Router.push('/');
  }catch(error){
    console.log('Error al crear el usuario',error.message);
    guardarError(error.message);
  }
}

  return (
     <div>

        <Layout> 
          <Formulario onSubmit={handleSubmit} noValidate>
          <Titulo>Crear Cuenta</Titulo>
             <Campo>
                <label htmlFor="nombre">Nombre</label>
                <input type="text"
                        id="nombre"
                        placeholder="Tu nombre"
                        name="nombre"
                        value={nombre}
                        onChange={handChange}
                        onBlur={handBlur}
                />
             </Campo>
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
                <InputSubmit type="submit"  value="Crear Cuenta"  ></InputSubmit>
                {error && <Error>{ error }</Error>}
           


          </Formulario>
        </Layout>
     
        

     </div>  
  );

}
 
export default CrearCuenta;