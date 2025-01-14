import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthAndRole } from '../../services/api';

const Me = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(()=>{
    async function authUser() {
        if(token){
            const user = await checkAuthAndRole(token);
            const role = user?.data?.role;
            console.log(user);
            if(role==='ADMIN'){
                navigate('/admin')
            }
            else if(role==="PANTRY_STAFF"){
                navigate("/pantry");
            }
        }
        else{
            navigate('/auth');
        }
    }
    authUser();
  },[navigate, token]);
  return null;
};

export default Me;