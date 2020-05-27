import React,{useEffect, useState,useContext} from 'react';
import styled from '@emotion/styled';
import Layout from '../componentes/layouts/Layouts';
import {FirebaseContext} from '../firebase';
import DetalleProducto from '../componentes/layouts/DetalleProducto';


const Home = () => {

  const {usuario,firebase} = useContext(FirebaseContext);
  const [productos,guardarProductos] = useState([]);

  useEffect(()=>{
    const consultarProductos = ()=>{
      firebase.db.collection('productos').orderBy('creado','desc').onSnapshot(manejarSnapshot);
    };
    consultarProductos();
  },[]);

  function manejarSnapshot(snapshot){
    const prod = snapshot.docs.map(doc =>{
        return{
            id:doc.id,
            ...doc.data()
        }
    });
    guardarProductos(prod);
}

  return (
     <div>

        <Layout> 
            <div className="listado-productos">
                <div className="contenedor">
                    <div className="bg-white">
                    { productos.map(producto =>(
                      <DetalleProducto  
                        key={producto.id}
                        producto={producto}
                        />

                      ))}
                                </div>

                </div>
            </div>
        

        </Layout>
     
        

     </div>  
  );

}
 
export default Home;