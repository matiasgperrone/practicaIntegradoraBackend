(function () {
  const socket = io();

  document
    .getElementById("form-create-products")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const newProduct = {
        title: document.getElementById("input-title").value,
        description: document.getElementById("input-description").value,
        price: document.getElementById("input-price").value,
        code: document.getElementById("input-code").value,
        stock: document.getElementById("input-stock").value,
        category: document.getElementById("input-category").value,
      };
      console.log(newProduct.title);
      socket.emit("addProduct", newProduct);
      document.getElementById("input-title").value = "";
      document.getElementById("input-description").value = "";
      document.getElementById("input-price").value = "";
      document.getElementById("input-code").value = "";
      document.getElementById("input-stock").value = "";
      document.getElementById("input-category").value = "";
      document.getElementById("input-title").focus();
    });

  socket.on("listProducts", (products) => {
    const divProducts = document.getElementById("productsRealTime");
    divProducts.innerText = "";
    products.forEach((p) => {
      const productElement = document.createElement("div");
      productElement.innerHTML = `
          <h3>${p.title}</h3>
          <p>Description: ${p.description}</p>
          <p>Category: ${p.category}</p>
          <p>Price: ${p.price}</p>
          <p>Stock: ${p.stock}</p>
          <p id="idProd">Id:${p.id}</p>
          `;
      divProducts.appendChild(productElement);
    });
  });

  document
    .getElementById("form-delete-products")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const idToDelete = document.getElementById("input-id-delete").value;
      console.log(idToDelete);
      socket.emit("deleteProduct", idToDelete);
      document.getElementById("input-id-delete").value = "";
      document.getElementById("input-id-delete").focus();
    });
})();
