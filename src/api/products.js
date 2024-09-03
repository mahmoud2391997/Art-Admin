function getProducts() {
  axios
    .get("https://art-ecommerce-server.glitch.me/api/products")
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.error(error);
    });
}

function getProduct(productId) {
  axios
    .get(`https://art-ecommerce-server.glitch.me/api/products/${productId}`)
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.error(error);
    });
}

function addProduct(product,token) {
  axios
    .post(`https://art-ecommerce-server.glitch.me/admin/products`, product,{headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }})
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.error(error);
    });
}

function editProduct(productId, editedProduct,token) {
  axios
    .put(
      `https://art-ecommerce-server.glitch.me/api/products/${productId}`,
      editedProduct,{headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }}
    )
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.error(error);
    });
}

function deleteProduct(productId,token) {
  axios
    .delete(`https://art-ecommerce-server.glitch.me/api/products/${productId}`,{headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }})
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.error(error);
    });
}
