//first bring the elements
let formTarea = document.querySelector("#formTarea");
let inputTarea = document.querySelector("#inputTarea");
let tareaContainer = document.querySelector("#tareaContainer");

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
    }
//guardamos en el array
tareas.push(nuevaTarea);

//guardar en el localStorage
localStorage.setItem("tareas", JSON.stringify(tareas));
console.log(tareas);
formTarea.reset();

}