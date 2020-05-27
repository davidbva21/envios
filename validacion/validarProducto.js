export default function validarProducto(valores){
    let errores = {};
    if(!valores.nombre){
        errores.nombre="El nombre es obligatorio"
    }
    if(!valores.empresa){
        errores.empresa="La empresa es obligatorio"
    }
    if(!valores.url){
        errores.url="La url es obligatoria"
    }
    if(!valores.descripcion){
        errores.descripcion="La descripción es obligatorio"
    }

    
    return errores;

}