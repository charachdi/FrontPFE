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
// import "./../vendor/bootstrap/css/bootstrap.min.css";
import "./../fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./../fonts/iconic/css/material-design-iconic-font.min.css";
import "./../vendor/css-hamburgers/hamburgers.min.css";
import "./../vendor/animsition/css/animsition.min.css";
import "./../vendor/select2/select2.min.css";
import "./../vendor/daterangepicker/daterangepicker.css";
import "./../vendor/animate/animate.css";
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
      {/* <img className="wave" src={wave} />
      
      <div className="container " style={{ height: "80vh" }}>
        <div className="img">
       
        </div>
        <div className="login-content">
          <form action="index.html">
            <img src={etai} style={{width:"150px", height:"200px" }} />
            <h2 className="title">Bienvenue</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  type="email"
                  id="email"
                  className="input"
                  value={email}
                  onChange={(e) => {
                    changeemail(e.target.value);
                  }}
                  aria-describedby={emailpopopen ? "email" : undefined}
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                  }}
                  required
                />
              </div>
            </div>
            <Popover
              id={email}
              className="ml-3"
              onClose={() => {
                setemailpopopen(false);
              }}
              open={emailpopopen}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "center",
                horizontal: "right",
              }}
            >
              {error.email.err ? (
                <p className="mx-5" style={{ color: "red" }}>
                  {error.email.message}
                </p>
              ) : null}
            </Popover>

            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Mot de passe</h5>
                <input
                  type="password"
                  id="password"
                  className="input"
                  value={pwd}
                  onChange={(e) => {
                    changepwd(e.target.value);
                  }}
                  aria-describedby={pwdpopopen ? "pwd" : undefined}
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                  }}
                  required
                />
              </div>
            </div>

            <input
              type="submit"
              className="btn"
              value="Login"
              onClick={(e) => {
                handellogin(e);
              }}
              disabled={disabled}
            />
          </form>
        </div>
      </div> */}
<div class="limiter">
		<div class="container-login100" >
			<div class="wrap-login100">
				<form class="login100-form validate-form">
					<span class="login100-form-logo">
						<i class="zmdi zmdi-landscape"></i>
					</span>

					<span class="login100-form-title p-b-34 p-t-27">
						Log in
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Enter username">
						<input class="input100" type="text" name="username" placeholder="Username" onChange={(e)=>{setemail(e.target.value)}}/>
						<span class="focus-input100" data-placeholder="&#xf207;"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<input class="input100" type="password" name="pass" placeholder="Password" onChange={(e)=>{setpwd(e.target.value)}}/>
						<span class="focus-input100" data-placeholder="&#xf191;"></span>
					</div>

					<div class="contact100-form-checkbox">
						<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
						<label class="label-checkbox100" for="ckb1">
							Remember me
						</label>
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn"  onClick={(e) => {
                handellogin(e);
              }}>
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
