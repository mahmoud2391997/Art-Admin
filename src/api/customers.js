function getCustomers(token) {
    axios
      .get("https://art-ecommerce-server.glitch.me/admin/customers",{headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }})
      .then((response) => (response.data))
      .catch((error) => {
        console.error(error);
      });
  }