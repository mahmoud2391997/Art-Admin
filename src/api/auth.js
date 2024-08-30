function loginAuthentication(email, password) {
  axios
    .post(`https://art-ecommerce-server.glitch.me/admin/auth/login`, {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response.data);
      sessionStorage.setItem("token", response.data.token);
    })
    .catch((error) => {
      console.error(error);
    });
}
