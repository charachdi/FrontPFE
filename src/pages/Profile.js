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


    // update profile
    const updatedprofile = async (e)=>{
        e.preventDefault()
        

        if (((document.getElementById('profileimg').files[0] !== undefined) === true)){

            const formData = new FormData();
            formData.append('fullName',profile.full_name);
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
        <div className="row">
                <div className="col-lg-4" >
                   <div className="profile-card-4 z-depth-3">
                    <div className="card">
                      <div className="card-body text-center rounded-top" style={{backgroundColor:"#2DCD94", width:"100%"}}>
                       <div className="user-box text-center">
                       <Avatar  style={{width:200, height:200}} className="profile_img cursor" alt="Haboubi amine" src={user ? user.user_img:"" } />
                      </div>
                      <h5 className="mb-1 text-white">{user ? user.full_name:"" }</h5>
                      <h6 className="text-light">{user ? user.user_level:""}</h6>
                     </div>
                      <div className="card-body">
                        <ul className="list-group shadow-none">
                        <li className="list-group-item">
                          <div className="list-icon">
                            <i className="fa fa-phone-square"></i>
                          </div>
                          <div className="list-details">
                            <span>{user ? user.tel:""}</span>
                            <small>Numéro de télephonessss</small>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="list-icon">
                            <i className="fa fa-envelope"></i>
                          </div>
                          <div className="list-details">
                            <span>{user ? user.user_email:""}</span>
                            <small>Adresse Email</small>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="list-icon">
                            <i className="fa fa-globe"></i>
                          </div>
                          <div className="list-details">
                            <span>{user ? user.Website:""}</span>
                            <small>Website Address</small>
                          </div>
                        </li>
                        </ul>
                        
                       </div>
                      
                     </div>
                   </div>
                </div>
                <div className="col-lg-8">
                   <div className="card z-depth-3">
                    <div className="card-body">
                    <ul className="nav nav-pills nav-pills-primary nav-justified">
                        <li className="nav-item">
                            <a href="javascript:void();" onClick={()=>{switchtab("profile")}} data-target="#profile" data-toggle="pill" className="nav-link active"><i className="icon-user"></i> <span className="hidden-xs">Profile</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="javascript:void();" onClick={()=>{switchtab("edit")}} data-target="#edit" data-toggle="pill" className="nav-link active "><i className="icon-note"></i> <span className="hidden-xs">Modifier</span></a>
                        </li>
                    </ul>

                    
                    {/* SHOW DATA PROFILE */}
                    <div className="tab-content p-3">
                    {
                        tabopen === "profile" ? (
                            <div className="tab-pane active show" id="profile">
                             <form className="col-12">
                            <div className="form-group row" >
                                <label className="col-lg-3 col-form-label text-center form-control-label">Nom et Prénom</label>
                                   <h5 className="mt-2">{profile ? profile.full_name:""}</h5>
                            </div>

                              
                            <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label text-center">Télephone</label>
                                <h6 className="mt-2">{profile ? profile.tel:""}</h6>
                            </div>


                            {
                              profile.user_level !== "Chef Service"? (
                                <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label text-center">equipe</label>
                                <h6 className="mt-2">{profile.Equipe ? profile.Equipe.Nom_equipe:""}</h6>
                            </div>
                              ) : (
                                null
                              )
                            }
                           

                            <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label text-center">Service</label>
                                <h6 className="mt-2">{profile.Chef ? profile.Chef.Service.Nom_service:""}</h6>
                            </div>

                            <div className="form-group row">
                                <label className="col-lg-3 col-form-label text-center form-control-label">site</label>
                           
                                <h6 className="mt-2">{profile ? profile.Website:""}</h6>
                            </div>
                         

                            <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label text-center">Fax</label>
                                <h6 className="mt-2">{profile ? profile.fax:""}</h6>
                            </div>

                          

                            <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label text-center">Adresse</label>
                              
                                <h6 className="mt-2">{profile ? profile.address:""}</h6>
                            </div>                
                            
                        </form>
           
                        </div>
                        ) : (
                        <div className="col-12 tab-pane active show" id="edit" className="mt-3">
                        <form className="col-12">
                            <div className="form-group row" >
                                <label className="col-lg-3 col-form-label text-center form-control-label">Nom et Prénom</label>
                                    <TextField id="outlined-basic" className="col-8" value={profile ?profile.full_name:"" } 
                                   onChange={(e)=>{setprofile({...profile , full_name : e.target.value})}} variant="outlined" size="small"/>
                                </div>
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
                                <label className="col-lg-3 col-form-label form-control-label text-center">Username</label>
                       
                                <TextField id="outlined-basic" className="col-8" variant="outlined" size="small" value={profile ? profile.user_name:""} onChange={(e)=>{setprofile({...profile , user_name : e.target.value})}}/>
                      
                            </div>
                            
                            <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label"></label>
                                <div className="col-lg-9">
                                <Button color="primary" variant="contained" color="primary" startIcon={<EditIcon />} onClick={(e)=>{updatedprofile(e)}}>confirmer</Button>
                                <Button color="primary" variant="contained" className ="ml-3" color="success" >change mdp</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                        )
                    }
                      
                        
                    </div>
                </div>
              </div>
              </div>
                
            </div>
     

            </>
 
    )
}

export default Profile
