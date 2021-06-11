import React , {useState , useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import './../css/Home.css'
import { TwitterPicker } from 'react-color';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios'
import $ from 'jquery'
import Api_url from './../component/Api_url';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from "react-router-dom";
import Permission from './../component/Comptcli/Permission'
import Requete from './../component/Comptcli/Requete'
import Historique from '../component/Comptcli/Historique'
import Clidata from './../component/Comptcli/Clidata'
import domtoimage from 'dom-to-image';

import Lottie from 'react-lottie';
import Loading from './../images/loading.json'
// import { mdbTableEditor } from 'mdb-table-editor'


function CompteCli(props) {
    const token = localStorage.getItem('token')
    const client_id = props.match.params.id
    const [client, setclient] = useState({})
    const history = useHistory();
    const [Auths, setAuths] = useState([])

    const [exportauth , setexportauth] = useState(false)
    const [Writeauth, setWriteauth] = useState(false)

    const [profimg, setprofimg] = useState({})
    const [proftheme, setproftheme] = useState({})
    const [service, setservice] = useState({})
    const [equipe, setequipe] = useState({})

    const [isloading, setisloading] = useState(true)
    const [requete, setrequete] = useState([])

    const [isopen, setisopen] = useState(false)
    const [isadchef, setisadchef] = useState(false)
    

    const [selectedrow, setselectedrow] = useState({})

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: Loading,
    };

    useEffect(() => {

      const getcurrentuser = async()=>{
        const user =JSON.parse(localStorage.getItem('user')) ;
        const currentuser = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'get',
          url : `${Api_url}user/${user.id}`,  
          });
          if((currentuser.data.user.user_level === "admin") ||( currentuser.data.user.user_level === "Chef Service")){
            setisadchef(true)
            setexportauth(true)
            getrequetesadmin()
         }else{
           getrequetecollab()
         }
      
       }



      //loding screen
      const loading_screen = ()=>{
       
        setisloading(true)
        setTimeout(() => {
            setisloading(false)
        }, 3500);

        

    }
   // fonction affiche table
    const getequipelist = async ()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}clients/${client_id}`,  
        });
        console.log(res.data.compteCli)
        setAuths(res.data.compteCli.Auths)
        setclient(res.data.compteCli)
        setselectedrow(res.data.compteCli)
        setprofimg(res.data.compteCli.Clientimg)
        setproftheme(res.data.compteCli.Theme)
        setequipe(res.data.compteCli.Equipe)
        setservice(res.data.compteCli.Service)
        const user =JSON.parse(localStorage.getItem('user')) ;
        
        res.data.compteCli.Auths.forEach(au => {
          if(au.UserId === user.id){
              // Permission.Read
            if(au.Permission.Read === "false"){
              console.log("true") 
              history.push('/compteclient')
            }
            console.log(au.Permission.export)
            if(au.Permission.export === 'true'){
                 setexportauth(true)
            }

            if(au.Permission.Write === 'true'){
              setWriteauth(true)
         }
            
          }
     });

        
    }

    const getrequetesadmin = async()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}clients/requete/${client_id}`,  
        });
        setrequete(res.data.compteCli.Requetes)
    }

    const getrequetecollab = async()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}clients/requete/collab/${client_id}`,  
        });
        setrequete(res.data.compteCli.Requetes)
    }

    getcurrentuser()
    getequipelist()
    loading_screen()
    
    
    }, [])
  
    
const switchtodata = () =>{
  $("#requetetab").hide()
  $("#permissiontab").hide()
  $("#historitab").hide()
  $("#Datatab").show()

  $("#reqbtn").removeClass("active")
  $("#databtn").addClass("active")
  $("#hisbtn").removeClass("active")
  $("#perbtn").removeClass("active")
}
const switchtoreq = () =>{

  $("#permissiontab").hide()
  $("#Datatab").hide()
  $("#historitab").hide()
  $("#requetetab").show()
  

  $("#perbtn").removeClass("active")
  $("#databtn").removeClass("active")
  $("#hisbtn").removeClass("active")
  $("#reqbtn").addClass("active")
}

const switchtoper = () =>{

  $("#requetetab").hide()
  $("#Datatab").hide()
  $("#historitab").hide()
  $("#permissiontab").show()

  $("#reqbtn").removeClass("active")
  $("#databtn").removeClass("active")
  $("#hisbtn").removeClass("active")
  $("#perbtn").addClass("active")
}

const switchtohist = () =>{

  $("#requetetab").hide()
  $("#Datatab").hide()
  $("#permissiontab").hide()
  $("#historitab").show()

  $("#reqbtn").removeClass("active")
  $("#databtn").removeClass("active")
  $("#perbtn").removeClass("active")
  $("#hisbtn").addClass("active")

  
  
}



const deleterequete = async (id)=>{
const res = await axios({
  headers: { Authorization: `Bearer ${token}` },
  method: "delete",
  url: `${Api_url}clients/Requete/${id}`,
});
if(res.status === 200){
  setrequete(requete.filter(item => item.id !== res.data.id))
  toast.success(`Requete Supprimer`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    });
}

}

const updaterequete = async (req) =>{
 
 

  const data = {
    Statut : req.Statut,
    Origine_de_la_requete : req.Origine_de_la_requete,
    Motifs_de_resiliation : req.Motifs_de_resiliation,
    Heure_de_fermeture : req.Heure_de_fermeture,
    Famille_de_demande_RC : req.Famille_de_demande_RC,
  }

   const res = await axios({
    headers: {'Authorization': `Bearer ${token}`},
    method: 'put',
    url : `${Api_url}clients/requete/${req.id}`,  
    data
    });
    

    if(res.status === 200){
      toast.success(`Requete Modifier`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        });

      setrequete(
        requete.map(item => 
            item.id === res.data.requete.id
            ? res.data.requete 
            : item 
    ))
    }
}
const upprev = () => {
  const url = URL.createObjectURL(
    document.getElementById("up-client-img").files[0]
  );
  // Clientimg img_profile img_background
  setselectedrow({
    ...selectedrow,
    Clientimg: {
      ...selectedrow.Clientimg,
      img_profile: url,
    },
  });
};

const upprev2 = () => {
  const url = URL.createObjectURL(
    document.getElementById("up-client-bg").files[0]
  );
  setselectedrow({
    ...selectedrow,
    Clientimg: {
      ...selectedrow.Clientimg,
      img_background: url,
    },
  });
};

const toggleEdit = ()=>{
  setisopen(!isopen)
}

const handelupdatecolor = (col) => {
  setselectedrow({
    ...selectedrow,
    Theme: {
      Color: col.hex,
    },
  });
};
 // fonction update table
 const updatedclient = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  // formData.append('clientimg[]',document.getElementById('up-client-img').files[0]);
  // formData.append('clientimg[]',document.getElementById('up-client-bg').files[0]);
  formData.append("Nom_compteCli", selectedrow.Nom_compteCli);
  formData.append("ServiceId", selectedrow.Service.id);
  formData.append("EquipeId", selectedrow.Equipe.id);
  formData.append("description", selectedrow.description);
  formData.append("color", selectedrow.Theme.Color);

  if (
    (document.getElementById("up-client-bg").files[0] !== undefined) ===
      true &&
    (document.getElementById("up-client-img").files[0] !== undefined) ===
      false
  ) {
    formData.append(
      "clientimg[]",
      document.getElementById("up-client-bg").files[0]
    );
    const res = await axios({
      headers: { Authorization: `Bearer ${token}` },
      method: "put",
      url: `${Api_url}clients/update/clients/bg/${selectedrow.id}`,
      data: formData,
    });
    console.log(res);
    if (res.status === 200) {
      toast.success(
        `Le client ${res.data.client.Nom_client} a été modifée avec succès`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        }
      );
      setprofimg(res.data.client.Clientimg)
      setproftheme(res.data.client.Theme)
      // setclient({ Clientimg :  res.data.client.Clientimg , Theme : res.data.client.Theme , description : res.data.client.description , Nom_compteCli : res.data.client.Nom_compteCli ,  ...client})
      console.log(client)
      setisopen(!isopen)
    } else {
      toast.error("error", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  } else if (
    (document.getElementById("up-client-bg").files[0] !== undefined) ===
      false &&
    (document.getElementById("up-client-img").files[0] !== undefined) === true
  ) {
    formData.append(
      "clientimg[]",
      document.getElementById("up-client-img").files[0]
    );
    const res = await axios({
      headers: { Authorization: `Bearer ${token}` },
      method: "put",
      url: `${Api_url}clients/update/clients/prof/${selectedrow.id}`,
      data: formData,
    });
    console.log(res);
    if (res.status === 200) {
      toast.success(
        `Le client ${res.data.client.Nom_client} a été modifée avec succès`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        }
      );
      setprofimg(res.data.client.Clientimg)
      setproftheme(res.data.client.Theme)
      setisopen(!isopen)
    } else {
      toast.error("error", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  } else if (
    (document.getElementById("up-client-bg").files[0] !== undefined) ===
      true &&
    (document.getElementById("up-client-img").files[0] !== undefined) === true
  ) {
    formData.append(
      "clientimg[]",
      document.getElementById("up-client-img").files[0]
    );
    formData.append(
      "clientimg[]",
      document.getElementById("up-client-bg").files[0]
    );
    const res = await axios({
      headers: { Authorization: `Bearer ${token}` },
      method: "put",
      url: `${Api_url}clients/update/clients/${selectedrow.id}`,
      data: formData,
    });
    console.log(res);
    if (res.status === 200) {
      toast.success(
        `Le client ${res.data.client.Nom_client} a été modifée avec succès`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        }
      );
      setprofimg(res.data.client.Clientimg)
      setproftheme(res.data.client.Theme)
      setisopen(!isopen)
    } else {
      toast.error("error", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  } else if (
    (document.getElementById("up-client-bg").files[0] !== undefined) ===
      false &&
    (document.getElementById("up-client-img").files[0] !== undefined) ===
      false
  ) {
    const data = {
      Nom_compteCli: selectedrow.Nom_compteCli,
      ServiceId: selectedrow.Service.id,
      EquipeId: selectedrow.Equipe.id,
      description: selectedrow.description,
      color: selectedrow.Theme.Color,
    };
    const res = await axios({
      headers: { Authorization: `Bearer ${token}` },
      method: "put",
      url: `${Api_url}clients/update/clients/false/${selectedrow.id}`,
      data,
    });
    console.log(res);
    if (res.status === 200) {
      toast.success(
        `Le client ${res.data.client.Nom_client} a été modifée avec succès`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        }
      );
      //
      setprofimg(res.data.client.Clientimg)
      setproftheme(res.data.client.Theme)
      setisopen(!isopen)
    } else {
      toast.error("error", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  }
};

const addrequte = (req)=>{
  toast.success("Requete Ajouter", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  });
    setrequete([req , ...requete])

}

    return (
      <>
      <div className="comptecli" style={{backgroundColor : "#F8F9FE"}}>
          
      
     
      {
        isloading ? (
          <Lottie 
	    options={defaultOptions}
        height={"40%"}
        width={"40%"}
        isClickToPauseDisabled={true}
      />
        ) : (
          <>
         
 <header  className="page-header">
            
 </header>
 {/* <!-- Breadcrumb--> */}
 <div className="breadcrumb-holder container-fluid">
   <ul className="breadcrumb cardstat">
     <li className="breadcrumb-item"><a href="home" onClick={()=>{history.push("/home")}}>Accueil</a></li>
     <li className="breadcrumb-item active">Clients</li>
     <li className="breadcrumb-item active">{client.Nom_compteCli}</li>
   </ul>
 </div>



<div className="row  justify-content-center" style={{backgroundColor :"#F8F9FE"}}>
   <div  className="col-12 text-center" style={{backgroundColor : "#F8F9FE"}} >
   

{/* Profile client */}




<div className="z-depth-3">
   <div className="profile-header-cover">
   <img  id="client-background" style={{width:"100%"}}  src={profimg.img_background}   />
   </div>
   <div className="profile-header-content">
       <div className="profile-header-img ">
       
          <div id="client-image" className="row ml-2">
          <span ><Avatar  src={profimg.img_profile} className="mb-4" style={{width:140,height:140}} alt=""/></span> 
          <h4 className="mt-5 ml-2" style={{color: proftheme ? proftheme.Color : "black"}} >{client.Nom_compteCli}</h4>
          </div>
         
       </div>

       <div className="profile-header-info text-right">
          
           <h6 className="mr-4 ">{service.Nom_service} / {equipe.Nom_equipe}</h6>
           
           {
             isadchef ? <Button onClick={(e)=>{toggleEdit()}} className="float-right" href="#" color="primary"><EditIcon /></Button> : null
           }
           
       </div>
   </div>

<ul id="navheader" className="profile-header-tab nav nav-tabs row col-12 mb-4 justify-content-center ">
   
   <li onClick={(e)=>{switchtodata()}} className="nav-item" style={{display: exportauth ? "block": "none"}}><span id="databtn"  className="nav-link cursor active" style={{borderRadius : 15}} data-toggle="tab">DATA</span></li>
   
   <li onClick={(e)=>{switchtoreq()}} className="nav-item"><span  id="reqbtn"  className="nav-link cursor" style={{borderRadius : 15}} data-toggle="tab">Requetes</span></li>
   {
     isadchef ?  <li onClick={(e)=>{switchtoper()}} className="nav-item"><span  id="perbtn"  className="nav-link cursor" style={{borderRadius : 15}} data-toggle="tab">Permission</span></li> : null
   }

    {
     isadchef ?  <li onClick={(e)=>{switchtohist()}} className="nav-item"><span  id="hisbtn"  className="nav-link cursor" style={{borderRadius : 15}} data-toggle="tab">historique</span></li> : null
   }
  
</ul>
</div>
           
              
    <div id="Datatab" className="row col-12 mb-2" style={{display: exportauth ? "block": "none" , backgroundColor :"#F8F9FE"}}>
   
     <Clidata id={client_id}  />
    </div>  

   <div id="permissiontab" className="row col-12 mb-2" style={{display:"none"}}>
     <Permission clientID={client_id} cuurentclient={client}/>
   </div>

   <div id="requetetab" style={{display: exportauth ? "none": "block"}} className="row col-12 mb-2">
     <Requete Requetelist={requete} deletereq={deleterequete} updatereq={updaterequete} auth={Writeauth} admin={isadchef} clientID={client_id} clientname={client.Nom_compteCli} add={addrequte} />
   </div>

   <div id="historitab" style={{display: "none" , minHeight : 600}} className="row col-12 justify-content-center mb-2">
     <Historique  clientID={client_id}/>
   </div>
  
   </div>
   </div>
   </>
        )
      }
   
 
            </div>
            
            
              {/* MODAL EDIT */}
              <MDBModal isOpen={isopen} toggle={()=>toggleEdit()} disableBackdrop={true} size="lg">
                <MDBModalHeader toggle={()=>toggleEdit()} className="text-center">Modifier les données du client</MDBModalHeader>
                <MDBModalBody>
                <form className="row col-12 justify-content-center align-middle" >
                  <div className="col-12 mt-2">
                    <div className="text-right right_button">
                    <input accept="image/*"  id="up-client-bg" type="file"  style={{display:'none'}}   onChange={(e)=>{upprev2()}}/>
                    <label htmlFor="up-client-bg">
                      <IconButton className="" color="primary"  aria-label="upload picture" component="span">
                        <PhotoCamera style={{color:'#c2c1c1'}}/>
                      </IconButton>
                    </label>
                    </div>
                <div  className="d-flex justify-content-center " >

                <div className="profile-header-cover-modal">
                <img  style={{width:"100%", borderRadius:10}} className=""  alt="" src={selectedrow.Clientimg ? selectedrow.Clientimg.img_background : ""} />
               
               </div>
                 
                  
                  <div id="client-image" className="row">
                    <section>
                    <Avatar className="ml-3" style={{width:100, height:100}}  alt="" src={selectedrow.Clientimg ? selectedrow.Clientimg.img_profile : ""} />
                  <input accept="image/*"  id="up-client-img" type="file" className="mb-3"  style={{display:'none'}}   required onChange={(e)=>{upprev()}} />
                  <label htmlFor="up-client-img">
                    <IconButton className="mt-2 ml-5" color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera style={{color:'#2DCD94'}}/>
                    </IconButton>
                  </label>
                    </section>
                  
                  <h3 id="compteclientnom" className=" ml-3 mt-4"  style={{color: selectedrow.Theme ? selectedrow.Theme.Color : "black"}}>{selectedrow.Nom_compteCli}</h3>
                  </div>
                
            
             </div>
               
            </div>
            <section className="row col-12 justify-content-end">

              <div className="row col-12 mt-5 ">
                <div className="col-7">
                <TextField className="col-12 mt-1 float-right" value={selectedrow.Nom_compteCli}  id="standard-basic" label="Nom du client" required />
                <TextField value={selectedrow.description ? "" : selectedrow.description}  className="col-12 mt-3" id="time" type="text" label="description" multiline={true} variant="outlined" size="small" rows={7} />
                      
                      


                     
                </div>

                <div className="col-4">
                <TwitterPicker color={"black"}
                onChangeComplete={(color) => {
                  handelupdatecolor(color);
                }}  className="ml-1 mt-5 " /><br/>

               
               
                </div>
                <div className="row col-12 justify-content-center">
                  <button onClick={(e) => {updatedclient(e);}} variant="outlined" className="btn-add cardstat text-capitalize" style={{width:"40%"}}>
                    Modifier
                  </button>
                </div>



              </div>
            
            </section>
                </form>
                </MDBModalBody>
                </MDBModal>
            
            </>
      
    );
}

export default CompteCli