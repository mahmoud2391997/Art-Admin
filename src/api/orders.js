function getOrders(token) {
 
  
  axios
    .get("https://art-ecommerce-server.glitch.me/admin/orders",{headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }})
    .then((response) => (response.data))
    .catch((error) => {
      console.error(error);
    });
}
function getOrder(orderId,token) {
  axios
    .get(`https://art-ecommerce-server.glitch.me/admin/orders/${orderId}`,{headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }})
    .then((response) => (response.data))
    .catch((error) => {
      console.error(error);
    });
}

function updateOrderStatus(orderId, newStatus,token) {
  axios
    .put(
      `https://art-ecommerce-server.glitch.me/admin/orders/${orderId}`,
      newStatus,{headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }}
    )
    .then((response) => (response.data))
    .catch((error) => {
      console.error(error);
    });
}
