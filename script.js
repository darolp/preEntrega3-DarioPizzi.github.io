let arrayLista = [];
const inputText = document.getElementById("input-text");
const list = document.getElementById("list");
const filtro = document.getElementById("filtro");

function guardarEnLocalStorage(){
    const json = JSON.stringify(arrayLista);
    localStorage.setItem("to-dos" , json);
}

function obtenerLista(){
    const almacenamiento = localStorage.getItem("to-dos");
    const jsonAlmacenamiento = JSON.parse(almacenamiento);
    return jsonAlmacenamiento;
}

//cargar los items al iniciar la pagina
window.onload = function (){
    if(obtenerLista()){
        arrayLista = obtenerLista();
        agregarElementos(arrayLista);
    }
} 

function crearObjeto(texto, completado){
    let random = Math.random();
    let tarea = {
        "texto" : texto,
        "completado" : completado,
        "id" : random * 1000
    }
    return tarea;
}

function agregarElementos(array){
    let lista = '';
    array.forEach(element => {
        lista += `<li class="list-item ${element.completado? "completado" : ""}" name="${element.id}"><input type="checkbox" name="${element.id}"" ${element.completado? "checked" : ""} onclick="completarTarea(name, this)"> ${element.texto} <i class="fas fa-trash-alt tacho" id="${element.id}" onclick="eliminarTarea(id)"></i></li>`
    });
    list.innerHTML = lista;
}

//guardar elementos en un arrayLista y local storage
inputText.addEventListener("keyup", (e)=>{
    const key = e.key;
    if(key == "Enter" && inputText.value != ""){
        arrayLista.push(crearObjeto(inputText.value, false));
        agregarElementos(arrayLista);
        guardarEnLocalStorage();
        inputText.value = "";
    }
}, false);

filtro.addEventListener("change", () =>{
    filtrar();
});

//comprobamos el estado del select y filtamos el array original
function filtrar(){
    let opcion = filtro.value;
    switch(opcion){
        case "completado":
            agregarElementos(arrayLista.filter( (e) => e.completado));
            break;
        case "sinCompletar":
            agregarElementos(arrayLista.filter( (e) => !e.completado));
            break;
        case "todo":
            agregarElementos(arrayLista);
            break;
    }
}

//al dar click en check el elemento tiene que pasar a completado
function completarTarea(id, checkbox){
    for (const item of arrayLista) {
        if(item.id == id){
            if(checkbox.checked){
                item.completado = true;
            }else{
                item.completado = false;
            }
        }
    }
    guardarEnLocalStorage();
    filtrar();
}

function eliminarTarea(id){
    for (const item of arrayLista) {
        if(item.id == id){
            let indice = arrayLista.indexOf(item);
            arrayLista.splice(indice,1);
        }
    }
    guardarEnLocalStorage();
    filtrar();
}