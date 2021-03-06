import React, { useState, useEffect } from "react";
import "./../css/login.css";
import "./../js/login.js";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "./../redux/actions/authAction";
import apiurl from "./../component/Api_url";
import { useHistory } from "react-router-dom";
import wave from "./../images/bg-01.jpg";
import etai from "./../images/etai.png";
import avatar from "./../images/avatar.svg";
import $ from "jquery";
import Stepper from "./Stepperview";
import Popover from "@material-ui/core/Popover";
import { ToastContainer, toast } from "react-toastify";
import "./../images/icons/favicon.ico";
import "./../fonts/iconic/css/material-design-iconic-font.min.css";
import "./../css/util.css";
import "./../css/main.css";


function Login() {

  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [emailpopopen, setemailpopopen] = useState(false);
  const [pwdpopopen, setpwdpopopen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setemailpopopen(false);
  };
  const [error, seterror] = useState({
    email: {
      err: true,
      message: "@infopro-digital.com",
    },
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const dispatchState = (token, user) => dispatch(setLoginStatus(token, user));
  const [email, setemail] = useState("");
  const [pwd, setpwd] = useState("");
  const [disabled, setdisabled] = useState(true);

  const changeemail = (value) => {
    setemail(value);
    const splitres = value.split("@");
    if (splitres[1] === "infopro-digital.com") {
      setdisabled(false);
    } else {
      setdisabled(true);
    }

    if (pwd === "") {
      setdisabled(true);
    }
  };

  const changepwd = (value) => {
    setpwd(value);
    const splitres = email.split("@");
    if (splitres[1] === "infopro-digital.com") {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
    if (value === "") {
      setdisabled(true);
    }
  };

  useEffect(() => {
    const hidesidebar = () => {
      $("#sidebar").hide();
    };

    const checkuser = ()=>{
      const user =JSON.parse(localStorage.getItem('user')) ;
      if(user){
        history.push("/Home");
      }
    }
    checkuser()
    hidesidebar();
  }, []);

  const handellogin = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      pwd: pwd,
    };
    const splitres = email.split("@");
    console.log(splitres[1]);
    // if((splitres[1] !== "@infopro-digital.com") ){

    // setemailpopopen(true)
    // }
    axios.post(`${apiurl}Auth/login`, data).then(function (response) {
      // handle success
      console.log(response);
      //   setemailpopopen(true)

      if (response.status === 200) {
        if (response.data.user.banned === 1) {
          toast.error("account banned", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
        } else if (response.data.user.ftime === "true") {
          dispatchState(
            response.data.token,
            JSON.stringify(response.data.user)
          );
          
          window.setTimeout(() => {
            history.push("/stepper");
          }, 1500);
        } else if (
          response.data.user.user_level === "Chef equipe" ||
          response.data.user.user_level === "Collaborateur"
        ) {
          dispatchState(
            response.data.token,
            JSON.stringify(response.data.user)
          );
          window.setTimeout(() => {
            window.location.replace("/Compteclient");
            $("#sidebar").show();
          }, 1500);
        } else {
          dispatchState(
            response.data.token,
            JSON.stringify(response.data.user)
          );
          window.setTimeout(() => {
            window.location.replace("/home");
            $("#sidebar").show();
          }, 1500);
        }
      }else {
        toast.error('email ou mot de passe incorrect', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          });
      }
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
<div class="limiter">
		<div class="container-login100" style={{backgroundImage: `url(${wave})`  }}>
    
			<div class="wrap-login100 mt-5">
				<form class="login100-form validate-form">
					<span class="login100-form-logo">
          <img src={etai} style={{width:"100px", height:"125px",marginTop:22 }} />
					</span>

					<span class="login100-form-title p-b-34 p-t-27">
						Bienvenue
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Enter username">
						<input class="input100" type="text" name="username" placeholder="Email" value={email}
                  onChange={(e) => {
                    changeemail(e.target.value);
                  }}
                  aria-describedby={emailpopopen ? "email" : undefined}
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                  }}
                  required/>
						<span class="focus-input100" data-placeholder="&#xf207;"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<input class="input100" type="password" name="pass" placeholder="Mot de passe" value={pwd}
                  onChange={(e) => {
                    changepwd(e.target.value);
                  }}
                  aria-describedby={pwdpopopen ? "pwd" : undefined}
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                  }}
                  required/>
						<span class="focus-input100" data-placeholder="&#xf191;"></span>
					</div>
					<div class="container-login100-form-btn">
						<button class="login100-form-btn"value="Login"
              onClick={(e) => {
                handellogin(e);
              }}
              disabled={disabled} >
							Login
						</button>
					</div>

			
				</form>
			</div>
		</div>
	</div>
	

	<div id="dropDownSelect1"></div>



    </>
  );
}

export default Login;
