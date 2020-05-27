import React,{useContext,useState} from 'react';
import styled from '@emotion/styled';
import {Router,useRouter} from 'next/router';
import {css} from '@emotion/core';
import Layout from '../componentes/layouts/Layouts';
import {Formulario,Campo,InputSubmit,Error} from '../componentes/ui/Formulario';
import useValidacion from '../hooks/useValidacion';
import validarProducto from '../validacion/validarProducto';
import {FirebaseContext} from '../firebase';

import FileUploader from 'react-firebase-file-uploader';

import Error404 from '../componentes/layouts/404';


const NuevoProducto = () => {
  const STATE_INICIAL ={
    nombre:'',
    empresa:'',
    imagen:'',
    url:'',
    descripcion:''
  }

  const[nombreImagen,guardarNombreImagen] = useState('');
 const [subiendo, guardarSubiendo] = useState(false);
 const [progreso, setprogreso] = useState(0);
 const [urlImagen, seturlImagen] = useState('');

  const [error,guardarError] = useState(false);

 const Titulo = styled.h1`
    text-align:center;
    margin-top:5rem;
    font-weight:bold;
 `;

 const {valores, errores,handleSubmit,handChange,handBlur} 
                  = useValidacion(STATE_INICIAL,validarProducto,crearProducto);

const {nombre,empresa,imagen,descripcion,url} = valores;

const router = useRouter();

const {usuario,firebase} = useContext(FirebaseContext);

async function crearProducto(){
  try{
      if(!usuario){
         router.push('/login');
         return;
      }

      const producto={
         nombre,
         empresa,
         url,
         urlImagen,
         descripcion,
         votos:0,
         comentarios:[],
         creado:Date.now(),
         creador:{
            id:usuario.uid,
            nombre: usuario.displayName
         },
         haVotado:[]
      }
      console.log(producto);
      firebase.db.collection('productos').add(producto);
      return router.push('/');
  }catch(error){
    console.log('Error al producto',error.message);
    guardarError(error.message);
  }
}


const handleUploadStart = () =>{
   setprogreso(0);
   guardarSubiendo(true);
}    
const handleProgress = progreso =>{
   setprogreso({progreso});
}   
const handleUploadError = error =>{
   guardarSubiendo({error});
   console.log(error);
}

const handleUploadSuccess = async (nombreImg) =>{
   
   setprogreso(100);
   guardarSubiendo(false);
   guardarNombreImagen(nombreImg);
   const url = await firebase.storage.ref("productos").child(nombreImg).getDownloadURL();
   console.log(url);
   seturlImagen(url);

}



  return (
     <div>
        <Layout>
        {!usuario? (  <Error404/> ):
        (
         
       
          <Formulario onSubmit={handleSubmit} noValidate>
          <Titulo>Nuevo Producto</Titulo>

          <fieldset>
            <legend>Información General</legend>

         

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
                <label htmlFor="empresa">Empresa</label>
                <input type="text"
                        id="empresa"
                        placeholder="empresa"
                        name="empresa"
                        value={empresa}
                        onChange={handChange}
                        onBlur={handBlur}
                />
             </Campo>
             {errores.empresa && <Error>{ errores.empresa }</Error>}
             <Campo>
                <label htmlFor="imagen">Imagen</label>
                <FileUploader
                                accept='image/*'
                                id='imagen'
                                name='imagen'
                                randomizeFilename
                                storageRef={firebase.storage.ref("productos")}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                            />
             </Campo>
             {errores.imagen && <Error>{ errores.imagen }</Error>}

             <Campo>
                <label htmlFor="url">Url</label>
                <input type="url"
                        id="url"
                        name="url"
                        value={url}
                        onChange={handChange}
                        onBlur={handBlur}
                />
             </Campo>
             {errores.url && <Error>{ errores.url }</Error>}
       </fieldset>  

       <fieldset>
          <legend>Sobre tu producto</legend>
          <Campo>
                <label htmlFor="nombre">Descripción</label>
                <textarea 
                        id="descripcion"
                        placeholder="Descripción" 
                        name="descripcion"
                        value={descripcion}
                        onChange={handChange}
                        onBlur={handBlur}
                />
             </Campo>
             {errores.descripcion && <Error>{ errores.descripcion }</Error>}
       </fieldset>
       <InputSubmit type="submit" value="Crear Producto"/>
       {error && <Error>{ error }</Error>}
           


          </Formulario>
       

        )}

</Layout>
     
        

     </div>  
  );

}
 
export default NuevoProducto;