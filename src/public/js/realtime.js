console.log("Probando cliente");

const socketClient = io();
const formPost = document.getElementById("formPost");
const formDelete = document.getElementById("formDelete");

formPost.onsubmit = (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;

    const product ={
        title: title,
        description: description,
        code:code,
        price:price,
        stock:stock,
        category:category
    };
    socketClient.emit('newProduct',product);
}

socketClient.on("productAdded", (product) => {
    console.log(product);
    // Obtener el tbody existente
    const tbody = document.getElementById("productTableBody");

    // Encontrar el valor máximo actual en la columna ID
    const maxId = Array.from(tbody.querySelectorAll("tr")).reduce((max, row) => {
        const idCell = row.querySelector("td:first-child");
        const id = parseInt(idCell.textContent, 10);
        return id > max ? id : max;
    }, 0);

    // Calcular el siguiente ID incrementado en 1
    const nextId = maxId + 1;

    // Agregar la fila nueva
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${nextId}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
    `;
    tbody.appendChild(row);

});

formDelete.onsubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById("idproduct").value;
    socketClient.emit('deleteProduct',id);
}

socketClient.on("productDeleted", (idToDelete) => {
    console.log(idToDelete);
    // Obtener el tbody existente
    const tbody = document.getElementById("productTableBody");

    // Busca la fila correspondiente en la tabla utilizando el atributo data-id
    const rowToDelete = document.querySelector(`tr[data-id="${idToDelete}"]`);

    rowToDelete.remove();
});