import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WithAuthHOC = (WrappedComponent) => {
  return function AuthComponent(props) {

    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {

      const isLogin = localStorage.getItem("isLogin");

      if (!isLogin) {
        navigate("/");
      } else {
        setChecking(false);
      }

    }, []);

    if (checking) {
      return <h1>Loading...</h1>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default WithAuthHOC;