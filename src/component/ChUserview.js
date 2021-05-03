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
function ChUserview(props) {

    const token = localStorage.getItem('token')
    const [user, setuser] = useState({})
    const [shownrow, setshownrow] = useState([])
    const [profileimgprev, setprofileimgprev] = useState("")
    const [editopen, seteditopen] = useState(false)
    const [profile, setprofile] = useState({})
   
    useEffect(() => {
    const getcurrentuser = async()=>{
                setprofile(props.user)
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
        <div class="row">
                <div class="col-lg-4" >
                   <div class="profile-card-4 z-depth-3">
                    <div class="card">
                      <div class="card-body text-center rounded-top" style={{backgroundColor:"#2DCD94"}}>
                       <div class="user-box text-center">
                       <Avatar  style={{width:200, height:200}} className="profile_img cursor" alt="Haboubi amine" src={user ? user.user_img:"" } />
                      </div>
                      <h5 class="mb-1 text-white">{user ? user.full_name:"" }</h5>
                      <h6 class="text-light">{user ? user.user_level:""}</h6>
                     </div>
                      <div class="card-body">
                        <ul class="list-group shadow-none">
                        <li class="list-group-item">
                          <div class="list-icon">
                            <i class="fa fa-phone-square"></i>
                          </div>
                          <div class="list-details">
                            <span>{user ? user.tel:""}</span>
                            <small>Numéro de télephonezzzzzzeeze</small>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div class="list-icon">
                            <i class="fa fa-envelope"></i>
                          </div>
                          <div class="list-details">
                            <span>{user ? user.user_email:""}</span>
                            <small>Adresse Email</small>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div class="list-icon">
                            <i class="fa fa-globe"></i>
                          </div>
                          <div class="list-details">
                            <span>{user ? user.Website:""}</span>
                            <small>Website Address</small>
                          </div>
                        </li>
                        </ul>
                        <div class="row text-center mt-1">
                          <div class="col ">
                           <h4 class="mb-1 line-height-5">154</h4>
                            <small class="mb-0 font-weight-bold">Projects</small>
                           </div>
                            <div class="col ">
                              <h4 class="mb-1 line-height-5">2.2k</h4>
                             <small class="mb-0 font-weight-bold">Followers</small>
                            </div>
                            <div class="col ">
                             <h4 class="mb-1 line-height-5">9.1k</h4>
                             <small class="mb-0 font-weight-bold">Views</small>
                            </div>
                         </div>
                       </div>
                      
                     </div>
                   </div>
                </div>
                <div class="col-lg-8">
                   <div class="card z-depth-3">
                    <div class="card-body">
                    <ul class="nav nav-pills nav-pills-primary nav-justified">
                        <li class="nav-item">
                            <a href="javascript:void();" data-target="#profile" data-toggle="pill" class="nav-link"><i class="icon-user"></i> <span class="hidden-xs">Profile</span></a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void();" data-target="#messages" data-toggle="pill" class="nav-link"><i class="icon-envelope-open"></i> <span class="hidden-xs">Messages</span></a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void();" data-target="#edit" data-toggle="pill" class="nav-link active show"><i class="icon-note"></i> <span class="hidden-xs">Modifier</span></a>
                        </li>
                    </ul>
                    {/* SHOW DATA PROFILE */}
                    <div class="tab-content p-3">
                        <div class="tab-pane" id="profile">
                            <h5 class="mb-3">User Profile</h5>
                            <div class="row">
                                <div class="col-md-6">
                                    <h6>About</h6>
                                    <p>
                                        Web Designer, UI/UX Engineer
                                    </p>
                                    <h6>Hobbies</h6>
                                    <p>
                                        Indie music, skiing and hiking. I love the great outdoors.
                                    </p>
                                </div>
                                <div class="col-md-6">
                                    <h6>Recent badges</h6>
                                    <a href="javascript:void();" class="badge badge-dark badge-pill">html5</a>
                                    <a href="javascript:void();" class="badge badge-dark badge-pill">react</a>
                                    <a href="javascript:void();" class="badge badge-dark badge-pill">codeply</a>
                                    <a href="javascript:void();" class="badge badge-dark badge-pill">angularjs</a>
                                    <a href="javascript:void();" class="badge badge-dark badge-pill">css3</a>
                                    <a href="javascript:void();" class="badge badge-dark badge-pill">jquery</a>
                                    <a href="javascript:void();" class="badge badge-dark badge-pill">bootstrap</a>
                                    <a href="javascript:void();" class="badge badge-dark badge-pill">responsive-design</a>
                                    <hr/>
                                    <span class="badge badge-primary"><i class="fa fa-user"></i> 900 Followers</span>
                                    <span class="badge badge-success"><i class="fa fa-cog"></i> 43 Forks</span>
                                    <span class="badge badge-danger"><i class="fa fa-eye"></i> 245 Views</span>
                                </div>
                                <div class="col-md-12">
                                    <h5 class="mt-2 mb-3"><span class="fa fa-clock-o ion-clock float-right"></span> Recent Activity</h5>
                                    <table class="table table-hover table-striped">
                                        <tbody>                                    
                                            <tr>
                                                <td>
                                                    <strong>Abby</strong> joined ACME Project Team in <strong>`Collaboration`</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Gary</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Kensington</strong> deleted MyBoard3 in <strong>`Discussions`</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>John</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Skell</strong> deleted his post Look at Why this is.. in <strong>`Discussions`</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
           
                        </div>
                        {/* tab 2 */}
                         <div class="tab-pane" id="messages">
                            <div class="alert alert-info alert-dismissible" role="alert">
                           <button type="button" class="close" data-dismiss="alert">×</button>
                            <div class="alert-icon">
                             <i class="icon-info"></i>
                            </div>
                            <div class="alert-message">
                              <span><strong>Info!</strong> Lorem Ipsum is simply dummy text.</span>
                            </div>
                          </div>
                            <table class="table table-hover table-striped">
                                <tbody>                                    
                                    <tr>
                                        <td>
                                           <span class="float-right font-weight-bold">3 hrs ago</span> Here is your a link to the latest summary report from the..
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                           <span class="float-right font-weight-bold">Yesterday</span> There has been a request on your account since that was..
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                           <span class="float-right font-weight-bold">9/10</span> Porttitor vitae ultrices quis, dapibus id dolor. Morbi venenatis lacinia rhoncus. 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                           <span class="float-right font-weight-bold">9/4</span> Vestibulum tincidunt ullamcorper eros eget luctus. 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                           <span class="float-right font-weight-bold">9/4</span> Maxamillion ais the fix for tibulum tincidunt ullamcorper eros. 
                                        </td>
                                    </tr>
                                </tbody> 
                            </table>
                        </div>  
                        {/* EDIT PROFILE */}
                        <div class="tab-pane active show" id="edit" className="mt-3">
                            <form className="col-12">
                                <div class="form-group row" >
                                    <label class="col-lg-3 col-form-label text-center form-control-label">Nom et Prénom</label>
                                        <TextField id="outlined-basic" className="col-8" value={profile ?profile.full_name:"" } 
                                       onChange={(e)=>{setprofile({...profile , full_name : e.target.value})}} variant="outlined" size="small"/>
                                    </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label text-center form-control-label">site</label>
                               
                                    <TextField id="outlined-basic" className="col-8" value={profile ? profile.Website:""} variant="outlined" size="small" onChange={(e)=>{setprofile({...profile , Website : e.target.value})}}/>
                                 
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label text-center">photo de profile</label>
                                    <div class="row col-lg-9">
                                        <input accept="image/*"  id="profileimg" type="file"  style={{display:'none'}} onChange={(e)=>{prev()}}  required/>
                                        <label htmlFor="profileimg">
                                            <IconButton className="" color="primary"  aria-label="upload picture" component="span">
                                            <PhotoCamera style={{color:'#c2c1c1'}}/>
                                            </IconButton>
                                        </label>
                                        <Avatar  style={{width:50, height:50}} className="profile_img cursor ml-2" alt="photo" src={profileimgprev} />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label text-center">Télephone</label>
                                  
                                    <TextField id="outlined-basic" className="col-8" variant="outlined" size="small" value={profile ? profile.tel:""} onChange={(e)=>{setprofile({...profile , tel : e.target.value})}}/>
                             
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label text-center">Adresse</label>
                                  
                                    <TextField id="outlined-basic"  className="col-8" variant="outlined" size="small" value={profile ? profile.address:""} onChange={(e)=>{setprofile({...profile , address : e.target.value})}}/> 
                                 
                                </div>
                            
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label text-center">Username</label>
                           
                                    <TextField id="outlined-basic" className="col-8" variant="outlined" size="small" value={profile ? profile.user_name:""} onChange={(e)=>{setprofile({...profile , user_name : e.target.value})}}/>
                          
                                </div>
                                
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <Button color="primary" variant="contained" color="primary" startIcon={<EditIcon />} onClick={(e)=>{updatedprofile(e)}}>confirmer</Button>
                                    <Button color="primary" variant="contained" className ="ml-3" color="success" >change mdp</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
              </div>
              </div>
                
            </div>
     

            </>
 
    )
}

export default ChUserview
