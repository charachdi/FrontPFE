import React, { useState, useEffect } from "react";
import './../css/sidebar.css'
import './../js/sidebar'
import Avatar from '@material-ui/core/Avatar';
import profile from './../images/profile.jpg'
import { Logout } from "../redux/actions/authAction";
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import $ from 'jquery'
import axios from 'axios'
import Api_url from './../component/Api_url'
function Sidebar() {


  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  const [url, seturl] = useState("")
  const [fullname, setfullname] = useState("")
  const user = JSON.parse(localStorage.getItem('user')) ;
  
  
const [current, setcurrent] = useState("")
  useEffect(() => {
   
    const info = async() =>{
      const user = JSON.parse(localStorage.getItem('user')) ;
  
      const currentuser = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}user/${user.id}`,  
        });
        setcurrent(currentuser.data.user.user_level)

    }

    if(user){
      info()
    }

    
  }, [])
  
  

  const handelLogout = () =>{
      dispatch( Logout() );
      seturl("")
      window.setTimeout(() => {
        window.location.replace("/"); 
            }, 500);
  
  }

  

    return (
       
      <nav id="sidebar">
      <div className="custom-menu">
        <button type="button" id="sidebarCollapse" className="btn btn-success">
          <i className="fa fa-bars"></i>
          <span className="sr-only">Toggle Menu</span>
        </button>
      </div>
      <div id="bigicon" className="p-4">
      
        <ul className="list-unstyled components mb-5">
        <li className="text-center d-flex flex-column mb-3">
          <div id="sidebarprofile" className="d-flex justify-content-center mb-2">

          <Avatar  style={{width:80, height:80}} className="profile_img cursor" alt="Haboubi amine" src={user ? user.user_img : "" } onClick={()=>{history.push("/myprofile")}} />
          </div>
        <h6 id="username" className="text-capitalize">{user ? user.full_name :""}</h6>
        
          </li>
          {
            current === "admin" ? (
              <li className="active">
              <a className="text-left hover" onClick={()=>{history.push("/home")}}><i className="fas fa-user-friends mr-3"></i>Comptes</a>
            </li>
            ) : (
              null
            )
          }

        {
            current === "Chef Service" ? (
              <li className="active">
              <a className="text-left hover" onClick={()=>{history.push("/home")}}><i className="fas fa-user-friends mr-3"></i>Comptes</a>
            </li>
            ) : (
              null
            )
          }

{
            current === "admin" ? (
              <li>
              <a className="text-left hover" onClick={()=>{history.push("/equipe")}}><span className="fa fa-user mr-3"></span>equipes</a>
          </li>
            ) : (
              null
            )
          }

        {
            current === "Chef Service" ? (
              <li>
              <a className="text-left hover" onClick={()=>{history.push("/equipe")}}><span className="fa fa-user mr-3"></span>equipes</a>
          </li>
            ) : (
              null
            )
          }


{
            current === "admin" ? (
              <li>
              <a className="text-left hover" onClick={()=>{history.push("/service")}}><span className="fa fa-cogs mr-2"></span> Services</a>
            </li>
            ) : (
              null
            )
          }

        

        

{
            current === "admin" ? (
              <li>
              <a className="text-left hover"  onClick={()=>{history.push("/client")}}><span className="fa fa-sticky-note mr-3"></span> Clients</a>
            </li>
            ) : (
              null
            )
          }

        {
            current === "Chef Service" ? (
              <li>
              <a className="text-left hover"  onClick={()=>{history.push("/client")}}><span className="fa fa-sticky-note mr-3"></span> Clients</a>
            </li>
            ) : (
              null
            )
          }
        
         
          
        {
            current === "Chef Service" ? (
            //   <li>
            //   <a className="text-left hover" onClick={()=>{history.push("/Chefscomptecli")}}><span className="fa fa-suitcase mr-3"></span> Compte</a>
            // </li>
            <>
            </>
            ) : (
              <li>
            <a className="text-left hover" onClick={()=>{history.push("/Compteclient")}}><span className="fa fa-suitcase mr-3"></span> Compte</a>
          </li>
            )
          }
         
       
          <li>
            <a className="text-left" href="#" onClick={()=>{handelLogout()}}><i class="fas fa-sign-out-alt mr-3" style={{color:'white'}}></i> logout</a>
          </li>
        </ul>
  
        
  
       
  
      </div>


      <div id="smallicon" className="p-4 ">
      
        <ul className="list-unstyled components mb-5">
        <li className="text-center d-flex flex-column mb-3">
         
        
          </li>
          {
            current === "admin" ? (
              <li className="active">
              <a className="text-left hover" onClick={()=>{history.push("/home")}}><i className="fas fa-user-friends "></i></a>
            </li>
            ) : (
              null
            )
          }

        {
            current === "Chef Service" ? (
              <li className="active">
              <a className="text-left hover" onClick={()=>{history.push("/home")}}><i className="fas fa-user-friends "></i></a>
            </li>
            ) : (
              null
            )
          }

{
            current === "admin" ? (
              <li>
              <a className="text-left hover" onClick={()=>{history.push("/equipe")}}><span className="fa fa-user "></span></a>
          </li>
            ) : (
              null
            )
          }

        {
            current === "Chef Service" ? (
              <li>
              <a className="text-left hover" onClick={()=>{history.push("/equipe")}}><span className="fa fa-user "></span></a>
          </li>
            ) : (
              null
            )
          }


{
            current === "admin" ? (
              <li>
              <a className="text-left hover" onClick={()=>{history.push("/service")}}><span className="fa fa-cogs mr-2"></span> </a>
            </li>
            ) : (
              null
            )
          }

        

        

{
            current === "admin" ? (
              <li>
              <a className="text-left hover"  onClick={()=>{history.push("/client")}}><span className="fa fa-sticky-note "></span> </a>
            </li>
            ) : (
              null
            )
          }

        {
            current === "Chef Service" ? (
              <li>
              <a className="text-left hover"  onClick={()=>{history.push("/client")}}><span className="fa fa-sticky-note "></span> </a>
            </li>
            ) : (
              null
            )
          }
        
         
          
        {
            current === "Chef Service" ? (
            //   <li>
            //   <a className="text-left hover" onClick={()=>{history.push("/Chefscomptecli")}}><span className="fa fa-suitcase "></span> </a>
            // </li>
            <>
            </>
            ) : (
              <li>
            <a className="text-left hover" onClick={()=>{history.push("/Compteclient")}}><span className="fa fa-suitcase "></span> </a>
          </li>
            )
          }
         
       
          <li>
            <a className="text-left" href="#" onClick={()=>{handelLogout()}}><i class="fas fa-sign-out-alt " style={{color:'white'}}></i> </a>
          </li>
        </ul>
  
        
  
       
  
      </div>
    </nav>
        
    )
}

export default Sidebar
