import React,{useContext,useState,useEffect} from 'react';
import styled from '@emotion/styled';
import {useRouter} from 'next/router';
import Layout from '../../componentes/layouts/Layouts';
import {FirebaseContext} from '../../firebase';
import Error404 from '../../componentes/layouts/404';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {es} from 'date-fns/locale';
import {Campo,InputSubmit} from '../../componentes/ui/Formulario';
import Boton from '../../componentes/ui/Boton';

const Titulo = styled.h1`
        margin-top:5rem;
        text-align:center;
    `;

const COntenedorProducto = styled.div`
    @media (min-width:768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const Imagen = styled.img`
    max-width:100%;
`;

const TextoCentrado = styled.p`
text-align:center;
`;

const DescripcionProducto = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap:2rem;
`;

const Producto = () => {
    const router = useRouter();
    const {firebase,usuario} = useContext(FirebaseContext);
    const [producto,guardarProducto] = useState({});
    const [error,guardarError] = useState(false);
    const [comentario, guardarComentario] = useState({});
    const { query:{id}} = router;
        useEffect(() => {            
                const consultarProductos = async () =>{
                    if(id) {
                        try{
                            const productoQuery = await firebase.db.collection('productos').doc(id);
                            const producto = await productoQuery.get();
                            if(producto.exists){
                                guardarProducto(producto.data());
                            
                            }else{
                                guardarError(true);
                            }
                        }catch(error){
                            console.log(error);
                        }
                    }
                };
           
            consultarProductos();            
        }, [id])

    if(Object.keys(producto).length === 0 )return (<Layout> 'cargando...'</Layout>)  ;

    const {nombre,empresa,url,urlImagen, descripcion, votos,comentarios, creado,creador,haVotado} = producto;
  

    const votarProducto = () =>{
        if(!usuario){
            return router.push('/login');
        }


        if(haVotado.includes(usuario.uid)){
            return;
        }
        const haVotadoNuevo = [...haVotado,usuario.uid];

        const nuevosVotos = votos +1;
        guardarProducto({
            ...producto,
            votos:nuevosVotos,
            haVotado:haVotadoNuevo
        })
        console.log
        firebase.db.collection('productos').doc(id).update({votos:nuevosVotos,haVotado:haVotadoNuevo});
        console.log(producto);

    }

    const comentarioChange = e =>{
        guardarComentario({
            ...comentario,
            [e.target.name] : e.target.value
        });

    }

    const agregarComentario = e =>{
        e.preventDefault();

        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        const nuevoComentario = [...comentarios, comentario];
        firebase.db.collection('productos').doc(id).update({
            comentarios:nuevoComentario
        });
        guardarProducto({
            ...producto,
            comentarios:nuevoComentario
        })
        
    }
  

    return (
       
            <Layout> 
                <>
                    {   error && <Error404/> }                   
                    <div className="contenedor">
                        <Titulo>{nombre} </Titulo>    
                    
                        <COntenedorProducto>
                            <div>
                                <p>Publicado hace: {formatDistanceToNow(new Date(creado),{locale:es})  }</p>
                                <p>Por: {creador.nombre} de: {empresa}</p>
                                <Imagen src={urlImagen} />
                                
                                <DescripcionProducto>{descripcion}</DescripcionProducto>
                                
                                {usuario && ( 
                                    <>
                                    <h2>Agrega tu comentario</h2>
                                    <form onSubmit={agregarComentario}>   
                                        <Campo>
                                            <input type="text" onChange={comentarioChange} name="mensaje"></input>
                                        </Campo>
                                        <InputSubmit 
                                            type="submit"
                                            value="Agregar Comentario"
                                        />

                                    </form> 
                                    </>
                                    ) }
                                   



                                    <h2>Comentarios</h2>
                                    {comentario.length ===0?'Aun no hay comentarios':(
                                        <ul
                                            
                                        >
                                        {comentarios.map((comentario,i) =>(
                                            <li key={`${comentario.usuarioId}-${i}`}>
                                                <p>{comentario.mensaje}</p>
                                                <p>Escrito por:{comentario.usuarioNombre}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    )}
                                        
                            </div>
                            <aside>
                           
                                    <Boton                                       
                                        bgColor="true"
                                        target='_blank'
                                        href={url}                                    
                                    >
                                    Visitar url
                                    </Boton> 
                                    
                                   
                            
                                <div>
                                    <TextoCentrado>{votos} Votos</TextoCentrado>
                                    {usuario && ( 
                                    <>
                                        <Boton     
                                            onClick={votarProducto}                                  
                                            >
                                        Votar
                                        </Boton>
                                    </>)}
                                </div>
                            </aside>
                        </COntenedorProducto>
                    </div> 
                </>
            </Layout> );
       
}
 
export default Producto;