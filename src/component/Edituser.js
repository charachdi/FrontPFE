import React , { useState , useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Api_url from './../component/Api_url'
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios'
import Switch from '@material-ui/core/Switch';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import home from './../pages/Home'

function Edituser(props) {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token') 
    const [selected, setselected] = useState(props.user)
    const [level, setlevel] = useState(selected.user_level)
    const [email, setemail] = useState(selected.user_email)
    const [banned, setbanned] = useState(selected.banned)
    const [pwd, setpwd] = useState("")
    const [fullname, setfullname] = useState(!selected.full_name ? "":selected.full_name)
    const [type, settype] = useState("password")
    const [usereq, setusereq] = useState(!selected.Equipe ? "" :selected.Equipe.id)
    const [equipes, setequipes] = useState([])
    const [services, setservices] = useState([])

    const [diasbled, setdiasbled] = useState(false)
    const [service, setservice] = useState(selected.Chef ? selected.Chef.ServiceId : "")
    
console.log(selected)

  useEffect(() => {

    const getequipelist = async () =>{
      const res = await axios({
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
        setequipes(res.data)

        if(level === "Chef Service"){
          setdiasbled(true)
        }else{
          setdiasbled(false)
        }
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
              
        setequipes(res.data.equipes)
              
          }
          else{
            getequipelist()
          }
      
         
          }
          getdata()
  }, [])
    const [open, setOpen] = useState(false);
   
    const handleOpen = () => {
        setOpen(true);
     
      };
    
      const handleClose = () => {
        setOpen(false);
      };

//handel update user
   const update = async (e) =>{
    e.preventDefault()
    const data = {
      email :email,
      pwd:pwd,
      level:level,
      full_name : fullname,
      equipe_id : usereq , 
      ServiceId :service
    }
    const res = await axios({

        headers: {'Authorization': `Bearer ${token}`},
        method: 'put',
        url : `${Api_url}user/update/profile/admin/${selected.id}`,
        data
        });
        
        props.changestate(res.data.updateduser)
        if(res.status === 200 ){
            toast.success(`user updated`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
        })
    }
    
   }


   const deleteUs = async (e) =>{
    e.preventDefault()
    const res = await axios({
      headers: {'Authorization': `Bearer ${token}`},
      method: 'delete',
      url : `${Api_url}user/user/${selected.id}`,
      });
      console.log(res)
      if(res.status === 200 ){
        toast.success(`${selected.user_email} supprimer`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
    })

    props.deleteuse(res.data.user)
}
   }


//    const handelchangeexport = async(id , state) =>{
//     const data = {
//         Export :"" 
//     }
//     if(state === "true"){
//         data.Export = "false"
//     }else{
//         data.Export = "true"
//     }
// const res = await axios({
//     headers: {'Authorization': `Bearer ${token}`},
//     method: 'put',
//     url : `${Api_url}permission/export/${id}`,  
//     data
//     });
//  if(res.status === 200){
  
//      setAuths( 
//          Auths.map(item => 
//             item.id === res.data.id
//             ? res.data 
//             : item )
//      )
//  }
// }

const handelchangebanned = async()=>{
      const data = {
        Banned :"" 
    }
    if(banned === 0){
        data.Banned = 1
    }else{
        data.Banned = 0
    }

    const res = await axios({
    headers: {'Authorization': `Bearer ${token}`},
    method: 'put',
    url : `${Api_url}user/Banned/${selected.id}`,  
    data
    });
    if(res.status === 200){
      setbanned(res.data.user.banned)
      toast.success(`${selected.user_email} Modifier`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
})
    }


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

   
  

        <div className=" col-12 justify-content-center text-center  mt-4" >
            
            <div className="mt-5 mb-3 ">
           <TextField className="mr-2 col-5" size="small" variant="outlined" id="fullname" label="Nom et prénom" type="text" value={fullname} onChange={(e)=>{setfullname(e.target.value)}}/>
           <TextField className="ml-2 col-5" size="small" variant="outlined" id="email" label="E-mail" type="email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
           </div>
           <div className="mt-3">
           <TextField className="mr-2 col-5" size="small" variant="outlined" id="password" label="Mot de passe"  type="password" value={pwd} onChange={(e)=>{setpwd(e.target.value)}}/>
           <TextField
                className="ml-2 col-5"
                variant="outlined"
                id="standard-select-currency"
                select
                size="small"
                label="Rôle"
                helperText="Modifier le rôle"
                value={level}
                onChange={(e)=>{setlevel(e.target.value); if(e.target.value==="Chef Service"){setdiasbled(true)}else{setdiasbled(false)}}}
              >
                {
                  level === "Chef Service" ?  <MenuItem value={"Chef Service"}>Chef de service</MenuItem> : null
                }
                {
                  level === "admin" ?  <MenuItem value={"admin"}>admin</MenuItem> : null
                }
                {
                  level === "Chef equipe" ?  <MenuItem value={"Chef equipe"}>Chef d'équipe</MenuItem> : null
                }
                {
                  level === "Chef equipe" ?  <MenuItem value={"Collaborateur"}>Collaborateur</MenuItem> : null
                }

                {
                  level === "Collaborateur" ?  <MenuItem value={"Chef equipe"}>Chef d'équipe</MenuItem> : null
                }
                {
                  level === "Collaborateur" ?  <MenuItem value={"Collaborateur"}>Collaborateur</MenuItem> : null
                }
                {/* {
                  level !== "Chef Service" ?  <MenuItem value={"RH"}>RH</MenuItem> : null
                } */}
                
               
              </TextField>
              <div className="mt-3 row justify-content-center">
              {
                  diasbled ? (
                    <TextField
                className=" col-5"
                id="service"
                select
                size="small"
                label="service"
                helperText="Modifier le service"
                value={service}
                onChange={(e)=>{setservice(e.target.value)}}
              >
                {
                  services.map((ser , index) =>(
                    <MenuItem key={index} value={ser.id}>{ser.Nom_service}</MenuItem>
                  ))
                }
               
                
              </TextField>
                  ) :(

                    level !== "admin" ? (
                      <TextField
                    className="col-5"
                    id="equipe"
                    select
                    size="small"
                    label="equipe"
                    helperText="Sélectionner l'équipe"
                    value={usereq}
                    onChange={(e)=>{setusereq(e.target.value)}}
                  >
                    {
                      equipes.map((equ , index) =>(
                        <MenuItem key={index} value={equ.id}>{equ.Nom_equipe}</MenuItem>
                      ))
                    }
                   
                    
                  </TextField>
                    ):null
                    
                  )
                }

                {
                  user.user_level === "admin" ? (
                    <div className="row col-5 ml-3 mt-3 justify-content-center ">
                        <p className="">Banni</p>
                        <Switch
                                    size="small"
                                    checked={banned === 1 ? true : false}
                                    onChange={(event)=>{handelchangebanned()}}
                                 />
                                 
                        </div>
                  ): (null)
                }

                    
                  </div>
              
                      
                              


              
           </div>

           <br/>
        
           <div className="row col-12 justify-content-center mt-1">
              <button type="submit" className="btn-add cardstat text-capitalize mr-3" style={{width:'25%' , fontSize:12 ,display: selected.id === ""  ? "none" : "block"}} onClick={(e)=>{update(e)}}>Valider les modifications</button>
              <button type="submit" className="btn-danger text-capitalize col-3" style={{width:70 , fontSize:12 ,display: selected.id === ""  ? "none" : "block"}} onClick={(e)=>{deleteUs(e)}}>Supprimer l'utilisateur</button>
            </div>
        </div>

        </>
    )
}

export default Edituser
