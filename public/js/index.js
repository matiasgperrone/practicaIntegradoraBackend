(function () {
  const socket = io();
  const formProducts = document.getElementById("form-products");
  const inputTitle = document.getElementById("input-title");
  const inputDescription = document.getElementById("input-description");
  const inputPrice = document.getElementById("input-price");
  const inputCode = document.getElementById("input-code");
  const inputStock = document.getElementById("input-stock");
  const inputCategory = document.getElementById("input-category");
  const productsRealTime = document.getElementById("productsRealTime")

  formProducts.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const price = inputPrice.value;
    const code = inputCode.value;
    const stock = inputStock.value;
    const category = inputCategory.value;
    socket.emit("new-product", {
      title,
      description,
      price,
      code,
      stock,
      category,
    });
    console.log("Nuevo producto creado", {
      title,
      description,
      price,
      code,
      stock,
      category,
    });
    inputTitle.value = "";
    inputDescription.value = "";
    inputPrice.value = "";
    inputTinputCodeitle.value = "";
    inputStock.value = "";
    inputCategory.value = "";
    inputTitle.focus();
  });

  function updateProducts (products){
    
  }

  function updateLogMessages(messages) {
    logMessages.innerText = '';
    messages.forEach((msg) => {
      const p = document.createElement('p');
      p.innerText = `${msg.username}: ${msg.text}`;
      logMessages.appendChild(p);
    });
  }
  // form-message
  const formMessage = document.getElementById("form-message");
  // input-message
  const inputMessage = document.getElementById("input-message");
  // log-messages
  const logMessages = document.getElementById("log-messages");
});
