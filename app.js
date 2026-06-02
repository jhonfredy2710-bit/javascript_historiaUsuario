        const id = document.getElementById("id")
        const producto = document.getElementById("producto");
        const cantidad = document.getElementById("cantidad");
        const precio = document.getElementById("precio");
        const resultado = document.getElementById("resultado");
        
        function agregar (){
            if (producto.value.trim() === "" && cantidad.value.trim() === "" && precio.value.trim() === ""){
            alert("rellena todos los campos")
        } else if (producto.value && cantidad.value.trim() === "")
            alert("ingresa la cantidad") 
          else if (producto.value && precio.value.trim() === "")
          alert ("!falta el precio")
        else if (producto.value &&
    cantidad.value &&
    precio.value){
            resultado.textContent = producto.value + " " + cantidad.value + " "+ precio.value
            
        }
         else {
            alert("ingresa el producto")
         }
        } 
        const lista = {
                    id :id.value,
                    producto: producto.value,
                    cantidad: cantidad.value,
                    precio: precio.value
                        }
        

        let listas = JSON.parse(localStorage.getItem("listas")) || [] ; listas.push(lista);
         localStorage.setItem("listas", JSON.stringify(listas));

         function renderizar() {

            const listas =
                JSON.parse(localStorage.getItem("listas")) || [];

             listas.forEach(item => {

            const li = document.createElement("li");

             li.textContent =
            `${item.producto} ${item.cantidad} ${item.precio}`;

            

    });
}

        renderizar();
        
         document.body.appendChild(resultado)

        const botonEliminar = document.createElement("button");
       
         botonEliminar.id = ("btn-delete")
         botonEliminar.textContent = "eliminar"
         botonEliminar.style.background = "red"
         botonEliminar.style.color = "white"
      
         document.body.appendChild(botonEliminar)
         
         botonEliminar.addEventListener("click", () => {
    resultado.textContent = "";
});

            async function obtener() {

    try {

        const resp = await fetch(
            "http://localhost:3003/listas"
        );

        const datos = await resp.json();

        const lista = document.getElementById("listas");

        lista.innerHTML = "";

        datos.forEach(listas => {

            const li = document.createElement("li");

            li.textContent =
                `${listas.producto} - ${listas.cantidad} - ${listas.precio}`;

            lista.appendChild(li);

        });

    } catch (error) {

        console.log("Error:", error);

    }
}
        

obtener();
     

        async function add () {


        const lista = {
                    id: id.value,
                    producto: producto.value,
                    cantidad: cantidad.value,
                    precio: precio.value
                        };    

                         if (!producto.value.trim() ||!cantidad.value.trim() ||!precio.value.trim()) {
                            return;
}
            try {
                const resp = await fetch('http://localhost:3003/listas', {
                    method : "POST",
                    headers: {
                                 "Content-Type": "application/json"
                        },
                body: JSON.stringify(lista)

                });
                const datos = await resp.json();
                console.log(datos)
                obtener();
            }catch (error) {
                console.log(error)
            }            
        }

        async function actualizarProducto(){
          const lista = {
                    id : id.value,
                    producto: producto.value,
                    cantidad: cantidad.value,
                    precio: precio.value
                        };  
                        
                       
    try {

        const resp = await fetch("http://localhost:3003/listas/1",
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    id: 1,
                    nombre: "Cafe",
                    precio: 5000
                })
            }
        );

        const datos = await resp.json();

        console.log(datos);

    } catch(error) {

        console.log(error);

    }

}   

    async function eliminarProducto() {
        const lista = {
                    id : id.value,
                    producto: producto.value,
                    cantidad: cantidad.value,
                    precio: precio.value
                        };   
    try {

        const resp = await fetch("http://localhost:3003/listas/${id}",
            {
                method: "DELETE"
            }
        );

        console.log("Producto eliminado");

    } catch(error) {

        console.log(error);

    }

}

const btnadd = document.getElementById("bAdd")

btnadd.addEventListener("click", async () => {
    agregar();
    await add();
});

botonEliminar.addEventListener("click", resultado)

const btnact = document.getElementById("upDate");
btnact.addEventListener("click",actualizarProducto )

const delet = document.getElementById("delete")
delet.addEventListener("click", () => {
                eliminarProducto(item.id)})
