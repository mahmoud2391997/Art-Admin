import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default async function loginAuthentication(email, password) {
  const navigate = useNavigate();
  
  await axios
  .post(`https://art-ecommerce-server.glitch.me/admin/auth/login`, {
    email: email,
    password: password,
  })
  .then((response) => {
    (response.data);
    sessionStorage.setItem("token", response.data.token);
      navigate("/",{ replace:true});
      
    })
    .catch((error) => {
      console.error(error);
    });
}
