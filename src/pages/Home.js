import React, { useState, useEffect } from "react";
import './../css/sidebar.css'
import './../js/sidebar'
import './../css/Home.css'
import axios from 'axios'
import $ from 'jquery'
import User from './../component/User'
import Userview from './../component/Userview'
import AccountTabs from './../component/AccountTabs'
import avatar from './../images/avatar.svg'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Api_url from './../component/Api_url'
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import Lottie from 'react-lottie';
import Loading from './../images/loading.json'
import etai from './../images/etai.png'


function Home() {
  const token = localStorage.getItem('token')
  const user =  JSON.parse(localStorage.getItem('user'))
  const [loding, setloding] = useState(true)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading,
  };


  useEffect(() => {
    const showsidebar = ()=>{
      $('#sidebar').show()
    }
    const loding = ()=>{
          setloding(true)
          setTimeout(() => {
            setloding(false)
          }, 3000);
    }

    const getuserlist = async ()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}user/`,  
        });
        console.log(res)

      const equiperes = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}equipe/`,  
        });

        const seviceres = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'get',
          url : `${Api_url}service/`,  
          });
          
        setservices(seviceres.data)
        setusers(res.data)
        setequipe(equiperes.data)
     
  }



    const getdata = async() =>{
     
//get the current user 
      const currentuser = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}user/${user.id}`,  
        });
        console.log()
      
    if(currentuser.data.user.user_level === "Chef Service"){
      
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}service/dataservice/${currentuser.data.user.Chef.ServiceId}`,  
        });
        console.log(res)
        setusers(res.data.users)
        setequipe(res.data.equipes)
        
    }
    else{
      getuserlist()
    }


    }

    loding()
    getdata()
    showsidebar()
    }, [])

   

    $('.eye').mouseenter( ()=>{
     settype("text")
    } )
    .mouseleave( ()=>{
     settype("password")
    } );

    const [equipe, setequipe] = useState([])
    

    const [type, settype] = useState("password")
    const [level, setlevel] = useState("")
    const [email, setemail] = useState("")
    const [pwd, setpwd] = useState("")
    const [selecteduser, setselecteduser] = useState({
      id : ""
    });
    const [service, setservice] = useState()
    const [users, setusers] = useState([]);
    const [usereq, setusereq] = useState("")

    const [fullname, setfullname] = useState("")


    const [eqdisabled, seteqdisabled] = useState(false)
    const [services, setservices] = useState([])
    
    const [domaine, setdomaine] = useState("")

    const Adduser = async (e) =>{
      e.preventDefault()
      const data = {
        email :email,
        pwd:pwd,
        level:level,
        equipe_id : usereq,
        ServiceId : service,
        domaine : domaine,
        fullname : fullname
      }

      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'post',
        url : `${Api_url}user/`,
        data
        
        });
        console.log(res)
          if(res.status === 200){
            toast.success(`${res.data.uuser.user_email}  added`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              });
                setTimeout(() => {
                  setusers([res.data.uuser ,...users])
                }, 500);

                setemail("")
                setdomaine("")


              
          }
          else {
            toast.error('error', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              });
          }


    }


    const updateuser = (user) =>{
      setusers(
        users.map(item => 
            item.id === user.id 
            ? user 
            : item 
    ))
    console.log(user)
    setselecteduser(user)
      
    }

    const deleteuser = (user) =>{
      setusers(
     users.filter(item => item.id !== user.id)
    )
      setselecteduser({
        id : "",
        
      })
    }



const oneuser = (user) =>{
  setselecteduser(user)
  $("#add-account").hide()
  $("#user-profile").show()
  $("#addacc").removeClass("picked-left")
  $("#profile").addClass("picked-right")
}
 
       

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

    {
      loding ? (
        <Lottie 
        options={defaultOptions}
          height={"70%"}
          width={"70%"}
          isClickToPauseDisabled={true}
        />
      ) : (
        <div id="account-box" className="row col-12 justify-content-center "  >
          <AccountTabs />
            <div id="user-list" className="col-xl-3  mr-4" style={{ borderRadius : 25 }}>
            {users.map((user, index) => (


                 <div id={user.id}  className="border  grow mb-2 mt-2 mr-2 ml-2 user cardstat" key={index} onClick={()=>{oneuser(user)}} style={{backgroundColor :'white' , borderRadius : 30}}>
                 <div className="card-body d-flex flex-row text-break">
                     <div className="avatar float-left"> <Avatar style={{width:70, height:70}} alt={user.full_name} src={user.user_img} /></div>
                     <div id="user_info" className="ml-2">
                       <h4 className="text-center" style={{fontSize:13}}>{ !user.full_name ? null :user.full_name }</h4>
                       <h4 className="text-center" style={{fontSize:11}}>{user.user_email}</h4>
                       <h6 className="text-center" style={{fontSize:13}}>
                         {
                         user.user_level === "admin" ? "Administrateur" : null
                         }
                        {
                          user.user_level === "Chef Service" ? "Chef de service" : null
                        }
                        {
                          user.user_level === "Chef equipe" ? "Chef d'équipe" : null
                        }
                        {
                          user.user_level === "Collaborateur" ? "Collaborateur" : null
                        }
                        {
                          user.user_level === "RH" ? "Responsable des ressources humaines" : null
                        }
                       </h6>
                     </div>
                 </div>
                
               </div>
                // <User key={index} index={index} user={user}  />
            ))}
            </div>
            <div id="view" className="col-xl-8  z-depth-3" >
            <Userview selected={selecteduser} setstate={updateuser} delete={deleteuser} showEdit={false} />

            <div id="add-account" className="city" >
            <form className="row col-12 justify-content-center align-middle" autoComplete={"off"}>
              <div className="mt-5 text-center">
              <img className="mb-2" src={etai} style={{width:150 , height:150 , borderRadius : "50%" , border : 'black'}} />
              <hr />
              <br />
              <div className="row" >
              <TextField variant="outlined"   value={email} onChange={(e)=>{setemail(e.target.value)}} className="float-left  col-5" label="Email" id="standard-size-small" type="email" style={{width:250}}  size="small" required/>
              <TextField
                  className="mx-auto col-5 float-right"
                  style={{width:250}}
                  variant="outlined" 
                  id="domaine"
                  select
                  size="small"
                  label="domaine"
                  value={domaine}
                  onChange={(e)=>{setdomaine(e.target.value)}}
                >
                 <MenuItem  value={"@infopro-digital.com"}>@infopro-digital.com</MenuItem>
                
                </TextField>
              </div>


             
              <br />
              <div className="row" >
               <TextField
                className="float-center  mt-3 col-11"
                id="role"
                variant="outlined" 
                select
                size="small"
                label="Rôle"
                helperText="Sélectionner le rôle"
                value={level}
                onChange={(e)=>{setlevel(e.target.value); if(e.target.value==="Chef Service"){seteqdisabled(true)}else{seteqdisabled(false)}}}
              >


                {
                  user.user_level !== "Chef Service" ? <MenuItem value={"admin"}>Administrateur</MenuItem> : null
                }
                
                {
                  user.user_level !== "Chef Service" ? <MenuItem value={"Chef Service"}>Chef de service</MenuItem> : null
                }

                {
                  user.user_level !== "Chef Service" ? <MenuItem value={"Chef equipe"}>Chef d'équipe</MenuItem> : null
                }

                {
                  user.user_level !== "Chef Service" ? <MenuItem value={"Collaborateur"}>Collaborateur</MenuItem> : null
                }

                {
                  user.user_level !== "Chef Service" ? <MenuItem value={"RH"}>Responsable des ressources humaines</MenuItem> : null
                }




                {
                  user.user_level === "Chef Service" ? <MenuItem value={"Chef equipe"}>Chef d'équipe</MenuItem> : null
                }

                {
                  user.user_level === "Chef Service" ? <MenuItem value={"Collaborateur"}>Collaborateur</MenuItem> : null
                }

                
                


                
              </TextField>

              {
                level === "Chef Service" ? (
                  <TextField
                  variant="outlined" 
                  className=" mt-3 col-11"
                  id="Service"
                  select
                  size="small"
                  label="Service"
                  style={{width:250}}
                  helperText="Sélectionner un service"
                  value={service}
                  onChange={(e)=>{setservice(e.target.value)}}
                >
                  {
                    services.map((ser , index) =>(
                      <MenuItem key={index} value={ser.id}>{ser.Nom_service}</MenuItem>
                    ))
                  }
                
                </TextField>
                ): null
              }
{/* Collaborateur Collaborateur*/}
              {
                level === "Chef equipe"  ? (
               
                      <TextField
                      disabled={eqdisabled}
                      style={{width:250}}
                      className="mt-3 col-11"
                      id="equipe"
                      select
                      variant="outlined" 
                      size="small"
                      label="equipe"
                      helperText="Sélectionner une équipe"
                      value={usereq}
                      onChange={(e)=>{setusereq(e.target.value)}}
                    >
                      {
                        equipe.map((equ , index) =>(
                          <MenuItem key={index} value={equ.id}>{equ.Nom_equipe}</MenuItem>
                        ))
                      } 
                     
                      
                </TextField>
                ) : null
              }

              {
                level === "Collaborateur"  ? (
               
                      <TextField
                      disabled={eqdisabled}
                      style={{width:250}}
                      className=" mt-3 col-11"
                      id="equipe"
                      select
                      variant="outlined" 
                      size="small"
                      label="equipe"
                      helperText="Sélectionner une équipe"
                      value={usereq}
                      onChange={(e)=>{setusereq(e.target.value)}}
                    >
                      {
                        equipe.map((equ , index) =>(
                          <MenuItem key={index} value={equ.id}>{equ.Nom_equipe}</MenuItem>
                        ))
                      } 
                     
                      
                </TextField>
                ) : null
              }

            <TextField variant="outlined"   value={fullname} onChange={(e)=>{setfullname(e.target.value)}} className="mt-3 col-11" label="Nom et Prénom" id="standard-size-small" type="text"   size="small" required/>

              </div>
             
              {/* {
                eqdisabled ? (
                  <TextField
                  variant="outlined" 
                  className="float-right mt-3 col-5"
                  id="Service"
                  select
                  size="small"
                  label="Sérvice"
                  style={{width:250}}
                  helperText="Sélectionner un service"
                  value={service}
                  onChange={(e)=>{setservice(e.target.value)}}
                >
                  {
                    services.map((ser , index) =>(
                      <MenuItem key={index} value={ser.id}>{ser.Nom_service}</MenuItem>
                    ))
                  }
                
                </TextField>
                ) : (
                  <TextField
                  disabled={eqdisabled}
                  style={{width:250}}
                  className="float-center mt-3 col-6"
                  id="equipe"
                  select
                  variant="outlined" 
                  size="small"
                  label="Equipe"
                  helperText="Sélectionner une équipe"
                  value={usereq}
                  onChange={(e)=>{setusereq(e.target.value)}}
                >
                  {
                    equipe.map((equ , index) =>(
                      <MenuItem key={index} value={equ.id}>{equ.Nom_equipe}</MenuItem>
                    ))
                  } 
                 
                  
                </TextField>
                )
              }
             
            */}



              <div className="row justify-content-center mt-4">
              <button type="submit" className="btn-add text-capitalize" style={{width:100}}  onClick={(e)=>{Adduser(e)}}>Valider</button>
              </div>
              </div>

            </form>
            </div>



            </div>
    </div>
      )
    }
    
    </>
  );
}

export default Home;
