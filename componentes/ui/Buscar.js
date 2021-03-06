import React from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';

const InputText = styled.input`
    border:1px solid var(--gris3);
    padding:1rem;
    min-width:300px;
    font-size:1.5rem;
`;

const ButtonSubmit = styled.button`
    height:3rem;
    width:3rem;
    display:block;
    background-size:4rem;
    background-image:url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position:absolute;
    right:1rem;
    top:1px;
    background-color:white;
    border:none;
    text-indent: -9999px;

    &:hover{
        cursor:pointer;
    }
`;

const FormSubmit = styled.form`
    position:relative;
`;


const Buscar = () => {
    return ( 
        <FormSubmit>
            <InputText type="text" placeholder="Buscar Productos"/>
            <ButtonSubmit type="submit">Buscar</ButtonSubmit>
        </FormSubmit>

     );
}
 
export default Buscar;

