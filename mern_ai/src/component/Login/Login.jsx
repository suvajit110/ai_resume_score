import React from 'react'
import styles from './Login.module.css'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GoogleIcon from '@mui/icons-material/Google';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import axios from '../../utils/axios';
const Login = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      };

      const response = await axios.post('/api/user', userData);

      console.log("BACKEND USER :", response.data.user)
      setUserInfo(response.data.user);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));

      setLogin(true);
      localStorage.setItem("isLogin", "true");

      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong");
    }
  };
  const { isLogin, setLogin, userInfo, setUserInfo } = useContext(AuthContext)
  const navigate = useNavigate();

  return (
    <div className={styles.Login}>
      <div className={styles.loginCard}>
        <div className={styles.loginCardTitle}>
          <h1>Login</h1>
          <VpnKeyIcon />
        </div>
        <div className={styles.googleBtn} onClick={handleLogin} ><GoogleIcon sx={{ fontSize: 20, color: "red" }} />Sign in with Google</div>
      </div>
    </div>
  )
}

export default Login