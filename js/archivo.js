//first bring the elements
let formTarea = document.querySelector("#formTarea");
let inputTarea = document.querySelector("#inputTarea");
let tareasContenedor = document.querySelector("#tareasContenedor");

//design empty variable
let tareas;

if (localStorage.getItem("tareas") == null) {
  tareas = [];
} else {
  tareas = JSON.parse(localStorage.getItem("tareas"));
}

// Agregamos una tarea

//primer evento

formTarea.onsubmit = (event) => {
  event.preventDefault();
  let nuevaTarea = {
    id: Date.now().toString(36),
    tarea: inputTarea.value,
    estado: false,
  };
  //guardamos en el array
  tareas.push(nuevaTarea);

  //guardar en el localStorage
  localStorage.setItem("tareas", JSON.stringify(tareas));
  console.log(tareas);
  mostrarTareas();
  formTarea.reset();
};

//funcion y creacion de elementos ("div") y sus clases

const mostrarTareas = () => {
  tareasContenedor.innerHTML = " ";

  tareas.forEach((tarea, index) => {
    let tareaBox = document.createElement("div");
    tareaBox.classList.add("d-flex", "mt-3", "justify-content-between", "align-items-center");
    tareasContenedor.appendChild(tareaBox);

    let tareaTexto = document.createElement("p");
    tareaTexto.classList.add("align-self-end");

    if (tareas[index].estado === true) {
      tareaTexto.classList.add("text-decoration-line-through");
    }
    tareaTexto.innerHTML = tarea.tarea;
    tareaBox.appendChild(tareaTexto);

    let div = document.createElement("div");
    tareaBox.appendChild(div);

    //boton eliminar

    let btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger", "ms-2");
    btnEliminar.innerHTML = "Eliminar";
    div.appendChild(btnEliminar);

    //evento
    btnEliminar.onclick = () => {
       tareas = tareas.filter(tarea => tarea.id !== tareas[index].id);
       localStorage.setItem("tareas", JSON.stringify(tareas));
       mostrarTareas();
    }

    //boton Realizado

    let btnRealizado = document.createElement("button");
    btnRealizado.classList.add("btn", "btn-success", "ms-2");
    btnRealizado.innerHTML = "Realizado";
    div.appendChild(btnRealizado);

    //evento
    btnRealizado.onclick = () => {
        if(tareas[index].estado === false) {
            tareas[index].estado = true;
           tareaTexto.classList.add("text-decoration-line-through"); 
            localStorage.setItem("tareas", JSON.stringify(tareas));
        }else if(tareas[index].estado === true) {
            tareas[index].estado = false;
             tareaTexto.classList.remove("text-decoration-line-through");
              localStorage.setItem("tareas", JSON.stringify(tareas));
        } 
    }

  });
};

mostrarTareas();
