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
import SettingsIcon from '@material-ui/icons/Settings';
import { ToastContainer, toast } from 'react-toastify';
import {socket} from './../Socket/Socket'
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Editrequete from './../component/Notification/Editrequete'


const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -15,
    top: 15,
    padding: '0 4px',
  },
}))(Badge);


function Sidebar(props) {

  const [count, setcount] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  const [url, seturl] = useState("")
  const [fullname, setfullname] = useState("")
  const user = JSON.parse(localStorage.getItem('user')) ;

  const [Serviceroom, setServiceroom] = useState("0")

  const [active, setactive] = useState(0);
  
 

const [current, setcurrent] = useState("")
  useEffect(() => {

    const Rhcount = async ()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}Demande/RH/count`,  
        });

        setcount(res.data.count)
    }
   
    const info = async() =>{
      const user = JSON.parse(localStorage.getItem('user')) ;
  
      const currentuser = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}user/${user.id}`,  
        });
        setcurrent(currentuser.data.user.user_level)
        if(currentuser.data.user.Chef){

          setServiceroom(currentuser.data.user.Chef.Service.Roomid)
        }
       

       

    }
    // Chef.Service.Roomid
    const socketon = ()=>{
      
        // console.log(data)
      if(user){
        if(user.user_level === "Chef Service"){

          socket.on(`${Serviceroom}`, (data)=>{

          
             toast.info( <Editrequete data={data}/>,{
            position: "bottom-right",
            autoClose: 3500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

          });
         
         
      
        }
      }
        
        
      
    }
   
    if(user){
      info()
    }
    socketon()
    Rhcount()
  }, [])
  
  

  const handelLogout = () =>{
      dispatch( Logout() );
      seturl("")
      window.setTimeout(() => {
        window.location.replace("/"); 
            }, 500);
  
  }

  

    return (
       
      <nav id="sidebar" className="cardstat">
        {/* <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      /> */}
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

          <Avatar  style={{width:80, height:80}} className="profile_img cursor" alt="Haboubi amine" src={user ? user.user_img : "" } onClick={()=>{history.push(`/myprofile/${user.id}`)}} />
          </div>
        <h6 id="username" className="text-capitalize">{user ? user.full_name :""}</h6>
        
          </li>
          {
            current === "admin" ? (
              <li className={active === 0 ? 'active' : null} onClick={()=>{setactive(0)}}>
              <a className="text-left hover" onClick={()=>{history.push("/home")}}><i className="fas fa-user-friends mr-3"></i>Comptes</a>
            </li>
            ) : (
              null
            )
          }

        {
            current === "Chef Service" ? (
              <li className={active === 0 ? 'active' : null} onClick={()=>{setactive(0)}}>
              <a className="text-left hover" onClick={()=>{history.push("/home")}}><i className="fas fa-user-friends mr-3"></i>Comptes</a>
            </li>
            ) : (
              null
            )
          }

{
            current === "admin" ? (
              <li className={active === 1 ? 'active' : null} onClick={()=>{setactive(1)}}>
              <a className="text-left hover" onClick={()=>{history.push("/equipe")}}><span className="fa fa-user mr-3"></span>Equipes</a>
          </li>
            ) : (
              null
            )
          }

        {
            current === "Chef Service" ? (
              <li className={active === 1 ? 'active' : null} onClick={()=>{setactive(1)}}>
              <a className="text-left hover" onClick={()=>{history.push("/equipe")}}><span className="fa fa-user mr-3"></span>Equipes</a>
          </li>
            ) : (
              null
            )
          }

          {
            current === "DG" ? (
              <li className={active === 1 ? 'active' : null} onClick={()=>{setactive(1)}}>
              <a className="text-left hover" onClick={()=>{history.push("/equipe")}}><span className="fa fa-user mr-3"></span>Equipes</a>
          </li>
            ) : (
              null
            )
          }



{
            current === "admin" ? (
              <li className={active === 2 ? 'active' : null} onClick={()=>{setactive(2)}}>
              <a className="text-left hover" onClick={()=>{history.push("/service")}}><span className="fa fa-cogs mr-2"></span> Services</a>
            </li>
            ) : (
              null
            )
          }

{
            current === "DG" ? (
              <li className={active === 2 ? 'active' : null} onClick={()=>{setactive(2)}}>
              <a className="text-left hover" onClick={()=>{history.push("/service")}}><span className="fa fa-cogs mr-2"></span> Services</a>
            </li>
            ) : (
              null
            )
          }

        

        

{
            current === "admin" ? (
              <li className={active === 3 ? 'active' : null} onClick={()=>{setactive(3)}}>
              <a className="text-left hover"  onClick={()=>{history.push("/client")}}><span className="fa fa-sticky-note mr-3"></span>Clients</a>
            </li>
            ) : (
              null
            )
          }

        {
            current === "Chef Service" ? (
              <li className={active === 3 ? 'active' : null} onClick={()=>{setactive(3)}}>
              <a className="text-left hover"  onClick={()=>{history.push("/client")}}><span className="fa fa-sticky-note mr-3"></span>Clients</a>
            </li>
            ) : (
              null
            )
          }

    {
            current === "DG" ? (
              <li className={active === 3 ? 'active' : null} onClick={()=>{setactive(3)}}>
              <a className="text-left hover"  onClick={()=>{history.push("/client")}}><span className="fa fa-sticky-note mr-3"></span>Clients</a>
            </li>
            ) : (
              null
            )
          }
        
         
          
        {
            current === "Collaborateur" ? (
           
              <li className={active === 4 ? 'active' : null} onClick={()=>{setactive(4)}}>
              <a className="text-left hover" onClick={()=>{history.push("/Compteclient")}}><span className="fa fa-suitcase mr-3"></span>Client</a>
            </li>
            ) : null
          }

          {
            current === "Chef equipe" ? (
              <li className={active === 4 ? 'active' : null} onClick={()=>{setactive(4)}}>
              <a className="text-left hover" onClick={()=>{history.push("/Compteclient")}}><span className="fa fa-suitcase mr-3"></span>Client</a>
            </li>
            ) : null
          }
         

         {
            current === "admin" ? (
              <li className={active === 5 ? 'active' : null} onClick={()=>{setactive(5)}}>
              <a className="text-left hover" onClick={()=>{history.push("/Attendance")}}><i class="fas fa-clipboard-list mr-3"></i>Pr??sence</a>
          </li>
            ) : (
              null
            )
          }

        {
            current === "Chef Service" ? (
              <li className={active === 5 ? 'active' : null} onClick={()=>{setactive(5)}}>
              <a className="text-left hover" onClick={()=>{history.push("/Attendance")}}><i class="fas fa-clipboard-list mr-3"></i>Pr??sence</a>
          </li>
            ) : (
              null
            )
          }

          {
            current !== "admin" && current !=="DG" ? (
              <li className={active === 6 ? 'active' : null} onClick={()=>{setactive(6)}}>
              <a className="text-left hover" onClick={()=>{history.push("/Demande")}}><i class="fas fa-clipboard-list mr-3"></i>Demande</a>
          </li>
            ) : (
              null
            )
          }

          {
            current === "admin" ? (
         
          <li className={active === 7 ? "d-flex flex-row active" : "d-flex flex-row"} onClick={()=>{setactive(7)}}>
              <a className="text-left hover" onClick={()=>{history.push("/Demandes")}}><i class="fas fa-clipboard-list mr-3"></i>Demande</a>
              <StyledBadge  badgeContent={count} color="error" />
          </li>
            ) : (
              null
            )
          }

          {
            current === "admin" ? (
              <li className={active === 8 ? "active" : null} onClick={()=>{setactive(8)}}>
            <a className="text-left hover"  onClick={()=>{history.push("/Settings")}}><i class="fas fa-cog mr-2"></i>Param??tre</a>
          </li>
            ) : (
              null
            )
          }
       

         

         

          <li>
            <a className="text-left hover" href="/" onClick={()=>{handelLogout()}}><i class="fas fa-sign-out-alt mr-3" style={{color:'white'}}></i>logout</a>
          </li>
        </ul>
  
        
  
       
  
      </div>

{/* ////////////////////////////////////// */}
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
            <a className="text-left" href="#" onClick={()=>{handelLogout()}}><SettingsIcon style={{color:'white'}} /> </a>
          </li>
       
          <li>
            <a className="text-left" href="#" onClick={()=>{handelLogout()}}><i class="fas fa-sign-out-alt " style={{color:'white'}}></i> </a>
          </li>
        </ul>
  
        
  
       
  
      </div>
    </nav>
        
    )
}

export default Sidebar
