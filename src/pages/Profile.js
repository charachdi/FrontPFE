import React , { useState , useEffect} from 'react'
import axios from 'axios'
import './../css/Profile.css'
import $ from 'jquery'
import Api_url from './../component/Api_url'
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import EditIcon from '@material-ui/icons/Edit';
import UserView from './UserView'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';

function Profile(props) {

    const token = localStorage.getItem('token')
    const [user, setuser] = useState()
    const [shownrow, setshownrow] = useState([])
    const [profileimgprev, setprofileimgprev] = useState("")
    const [editopen, seteditopen] = useState(false)
    const [tabopen, settabopen] = useState("profile")
    const [profile, setprofile] = useState({
        "id": 1,
        "full_name": "",
        "user_name": null,
        "ftime": "",
        "pwd": "",
        "user_email": "",
        "user_level": "",
        "user_img": "",
        "user_spec": null,
        "user_sex": "Femme",
        "address": "lafayette",
        "country": "tunisie",
        "tel":"" ,
        "fax":"" ,
        "Website": "",
        "user_ip": null,
        "approved": 0,
        "activation_code": null,
        "banned": 0,
        "ckey": null,
        "ctime": null,
        "tel_ip": null,
        "user_matricule": null,
        "date_reni": null,
        "createdAt": "2021-03-22T15:07:02.000Z",
        "updatedAt": "2021-03-22T15:12:52.000Z",
        "EquipeId": 1
    })
    
    useEffect(() => {
    const getcurrentuser = async()=>{
       const currentuser = JSON.parse(localStorage.getItem('user'))
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'get',
            url : `${Api_url}user/${currentuser.id}`,
   
        });
        setprofile(res.data.user)
        setuser(res.data.user)
        console.log(res.data)
    }

    getcurrentuser()
        
    }, [])
    const [open, setopen] = useState(false)
    const toggle = ()=>{
      setopen(!open)
    }

    // update profile
    const updatedprofile = async (e)=>{
        e.preventDefault()
        

        if (((document.getElementById('profileimg').files[0] !== undefined) === true)){

            const formData = new FormData();
            formData.append('adresse',profile.address);
            formData.append('tel',profile.tel);
            formData.append('fax',profile.fax);
            formData.append('website',profile.Website);
            formData.append('user_sex',profile.user_sex);
            formData.append('country',profile.country);
            formData.append('myImage',document.getElementById('profileimg').files[0]);

            const res = await axios({
                headers: {'Authorization': `Bearer ${token}`},
                method: 'put',
                url : `${Api_url}user/update/profileimg`,
                data :formData
                
            });
        
            console.log(res)
           
                if(res.status === 200){
                  toast.success(`Votre profile à été modifée avec succès`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
                   console.log(res)
                  setprofile(res.data.user)
                  setuser(res.data.user)
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
        else{

            const data = {
                fullName :profile.full_name,
                adresse :profile.address,
                tel :profile.tel,
                fax :profile.fax,
                website :profile.Website,
                user_sex :profile.user_sex,
                country :profile.country,
              }

            const res = await axios({
                headers: {'Authorization': `Bearer ${token}`},
                method: 'put',
                url : `${Api_url}user/update/profile`,
                data
                
            });
        
            console.log(res)
           
                if(res.status === 200){
                  toast.success(`Votre profile à été modifée avec succès`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
                   
                  setprofile(res.data.user)
                  setuser(res.data.user)
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

       
      }
  
        const prev = (e) =>{
            const url = URL.createObjectURL(document.getElementById('profileimg').files[0])
            setprofileimgprev(url)
        }

        const switchtab = (tab) =>{
           
         
               settabopen(tab)
           
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
      <UserView id={props.match.params.id} toggle={toggle}/>
     
              <MDBModal isOpen={open} toggle={()=>toggle()} disableBackdrop={true} size="lg">
              <MDBModalHeader toggle={()=>toggle()} className="text-center"></MDBModalHeader>
              <MDBModalBody>
              <form className="col-12">
                            <div className="form-group row">
                                <label className="col-lg-3 col-form-label text-center form-control-label">site</label>
                           
                                <TextField id="outlined-basic" className="col-8" value={profile ? profile.Website:""} variant="outlined" size="small" onChange={(e)=>{setprofile({...profile , Website : e.target.value})}}/>
                             
                            </div>
                            <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label text-center">photo de profile</label>
                                <div className="row col-lg-9">
                                    <input accept="image/*"  id="profileimg" type="file"  style={{display:'none'}} onChange={(e)=>{prev()}}  required/>
                                    <label htmlFor="profileimg">
                                        <IconButton className="" color="primary"  aria-label="upload picture" component="span">
                                        <PhotoCamera style={{color:'#c2c1c1'}}/>
                                        </IconButton>
                                    </label>
                                    <Avatar  style={{width:50, height:50}} className="profile_img cursor ml-2" alt="photo" src={profileimgprev} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label text-center">Télephone</label>
                              
                                <TextField id="outlined-basic" className="col-8" variant="outlined" size="small" value={profile ? profile.tel:""} onChange={(e)=>{setprofile({...profile , tel : e.target.value})}}/>
                         
                            </div>
                            <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label text-center">Adresse</label>
                              
                                <TextField id="outlined-basic"  className="col-8" variant="outlined" size="small" value={profile ? profile.address:""} onChange={(e)=>{setprofile({...profile , address : e.target.value})}}/> 
                             
                            </div>
                        
                  
                            
                            <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label"></label>
                                <div className="col-lg-9">
                                <Button color="primary" variant="contained" color="primary" startIcon={<EditIcon />} onClick={(e)=>{updatedprofile(e)}}>confirmer</Button>
                                <Button color="primary" variant="contained" className ="ml-3" color="success" >change mdp</Button>
                                </div>
                            </div>
                        </form>
              </MDBModalBody>
              </MDBModal>
        
     

            </>
 
    )
}

export default Profile
