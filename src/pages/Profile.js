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

import DeleteIcon from '@material-ui/icons/Delete';
function Profile(props) {

    const token = localStorage.getItem('token')
    const [user, setuser] = useState()
    
    useEffect(() => {
    const getcurrentuser = ()=>{
        setuser(JSON.parse(localStorage.getItem('user')))
        console.log(user)
    }

    getcurrentuser()
        
    }, [])

    
    return (

        <div >
        <div class="row">
                <div class="col-lg-4">
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
                            <small>Mobile Number</small>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div class="list-icon">
                            <i class="fa fa-envelope"></i>
                          </div>
                          <div class="list-details">
                            <span>{user ? user.user_email:""}</span>
                            <small>Email Address</small>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div class="list-icon">
                            <i class="fa fa-globe"></i>
                          </div>
                          <div class="list-details">
                            <span>www.example.com</span>
                            <small>Website Address</small>
                          </div>
                        </li>
                        </ul>
                        <div class="row text-center mt-4">
                          <div class="col p-2">
                           <h4 class="mb-1 line-height-5">154</h4>
                            <small class="mb-0 font-weight-bold">Projects</small>
                           </div>
                            <div class="col p-2">
                              <h4 class="mb-1 line-height-5">2.2k</h4>
                             <small class="mb-0 font-weight-bold">Followers</small>
                            </div>
                            <div class="col p-2">
                             <h4 class="mb-1 line-height-5">9.1k</h4>
                             <small class="mb-0 font-weight-bold">Views</small>
                            </div>
                         </div>
                       </div>
                       <div class="card-footer text-center">
                         <a href="javascript:void()" class="btn-social btn-facebook waves-effect waves-light m-1"><i class="fa fa-facebook"></i></a>
                         <a href="javascript:void()" class="btn-social btn-google-plus waves-effect waves-light m-1"><i class="fa fa-google-plus"></i></a>
                         <a href="javascript:void()" class="list-inline-item btn-social btn-behance waves-effect waves-light"><i class="fa fa-behance"></i></a>
                         <a href="javascript:void()" class="list-inline-item btn-social btn-dribbble waves-effect waves-light"><i class="fa fa-dribbble"></i></a>
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
                            <a href="javascript:void();" data-target="#edit" data-toggle="pill" class="nav-link active show"><i class="icon-note"></i> <span class="hidden-xs">Edit</span></a>
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
                            <form>
                                <div class="form-group row" >
                                    <label class="col-lg-3 col-form-label form-control-label">Full name</label>
                                    <div class="col-lg-9">
                                        <TextField id="outlined-basic" value={user ?user.full_name:"" } variant="outlined" size="small"/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Email</label>
                                    <div class="col-lg-9">
                                    <TextField id="outlined-basic" value={user ? user.user_email:""} variant="outlined" size="small"/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Change profile</label>
                                    <div class="col-lg-9">
                                    <IconButton className="" color="primary"  aria-label="upload picture" component="span">
                                     <PhotoCamera style={{color:'#c2c1c1'}}/>
                                    </IconButton>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Website</label>
                                    <div class="col-lg-9">
                                    <TextField id="outlined-basic"  variant="outlined" size="small"/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Address</label>
                                    <div class="col-lg-9">
                                    <TextField id="outlined-basic" label="rue" variant="outlined" size="small"/> 
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-6">
                                    <TextField id="outlined-basic" label="ville" variant="outlined" size="small"/>
                                    </div>
                                    <div class="col-lg-3">
                                    <TextField id="outlined-basic" label="pays" variant="outlined" size="small"/>
                                    </div>
                                </div>
                               
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Username</label>
                                    <div class="col-lg-9">
                                    <TextField id="outlined-basic"  variant="outlined" size="small"/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Password</label>
                                    <div class="col-lg-9">
                                    <TextField  className="add-password" label="Password"  id="standard-size-"   size="small" required /><i className="far fa-eye mt-3 eye"></i>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Confirm password</label>
                                    <div class="col-lg-9">
                                    <TextField  className="add-password" label="Password"  id="standard-size-"   size="small" required /><i className="far fa-eye mt-3 eye"></i>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <Button color="primary" variant="contained" color="secondary" startIcon={<DeleteIcon />} >Supprimer</Button>
                                    <Button color="primary" variant="contained" className ="ml-3" color="primary" >annuler</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
              </div>
              </div>
                
            </div>
        </div>   

            
 
    )
}

export default Profile