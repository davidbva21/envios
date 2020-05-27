import React,{useContext} from 'react';
import Buscar from '../ui/Buscar';
import Navegacion from './Navegacion';
import Link from 'next/link';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import Boton from '../ui/Boton'
import {FirebaseContext} from '../../firebase';
import Router from 'next/router';

const ContenedorHeader = styled.div`
    max-width:1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px){
        display:flex;
        justify-content:space-between;
    }
`;

const Logo = styled.p`
    color: var(--naranja);
    font-size:4rem;
    line-height:0;
    line-weight:700;
    font-family:'Roboto Slab',serif;
    margin-right:2rem;
    &:hover{
        cursor:pointer;
    }
`;
const HeaderComponent = styled.header`
    border-bottom:4px solid var(--gris3);
    padding: 1rem 0;
`;


const DivNombre = styled.div`
    display: flex;
    align-items:center;
`;

const NombreUsuario = styled.div`
    margin-right: 2rem
`;


const Header = () => {
    const {usuario,firebase} = useContext(FirebaseContext);

    async function  cerrarSesion() {
        try{
            firebase.cerrarSesion();
            Router.push('/login');
        }catch(error){
            console.log(error);
        }

    }

    return ( 
        <HeaderComponent>
            <ContenedorHeader>
                <DivNombre>
                        <Link href="/">
                            <Logo>Ps</Logo>
                        </Link>
                           
                        <Buscar/>
                        <Navegacion usuario={usuario}/>
                </DivNombre>
                <DivNombre>
                    {usuario?(
                        <>
                            <NombreUsuario>hola: {usuario.displayName}</NombreUsuario>
                            <Boton onClick={cerrarSesion} bgColor="true">Cerrar Sesión</Boton>
                        </>
                    )
                    :(
                        <>
                            <Link href="/login">
                            <Boton bgColor="true">
                                Login
                            </Boton>
                            </Link>
                            <Link href="/crear-cuenta">
                                <Boton>
                                    Crear cuenta
                                </Boton>
                            </Link>
                        </>
                    )}



                    
                    
                </DivNombre>
                
            </ContenedorHeader>
        </HeaderComponent>

     );
}
 
export default Header;