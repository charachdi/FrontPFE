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
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

function UserView(props) {


    const token = localStorage.getItem('token')
    const userId = props.match.params.id
    const [user, setuser] = useState({})


    const piedata = {
      labels: ["1" ,"2"],
      datasets: [{
        label: 'My First Dataset',
        data: ["1" ,"2"],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(218, 92, 250)',
          'rgb(43, 200, 145)'
        ],
        hoverOffset: 4
      }]
    };

    const linedata = {
      labels: ["1" ,"2"],
      datasets: [{
        spanGaps: true,
        lineTension: 0,
          backgroundColor: "transparent",
          borderColor: '#FAFAFA',
          pointBorderColor: '#da4c59',
          pointHoverBackgroundColor: '#da4c59',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          borderWidth: 1,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 5,
          pointHoverRadius: 8,
          pointHoverBorderColor: "#fff",
         pointHoverBorderWidth: 2,
         pointRadius: 1,
         pointHitRadius: 0,
        label: 'Requetes',
        data: ["1" ,"2"],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0
      }]
    };
        useEffect(() => {
            const getuser = async () =>{
                const res = await axios({
                    headers: {'Authorization': `Bearer ${token}`},
                    method: 'get',
                    url : `${Api_url}user/${userId}`,
                    });
                  
                   setuser(res.data.user)
              }
              getuser()
        }, [])

           
    return (
        <div className="col-12 justify-content-center " style={{height:"90vh"}}>
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
                            <small>Numéro de télephone</small>
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
                        
                       </div>
                      
                     </div>
                   </div>
                </div>
                <div class="col-lg-8">
                   <div class="card z-depth-3">
                    <div class="row card-body">
                   
                    {/* SHOW DATA PROFILE */}
                    <div className="col-6">
                    <Pie  data={piedata} width={50} height={40}/>
                    </div>
                    <div className="col-6">
                    <Line  data={linedata} width={50} height={40}/>
                    </div>
                    
                </div>
              </div>
              </div>
                
            </div>
       </div>
    )
}

export default UserView
