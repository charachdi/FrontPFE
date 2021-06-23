
import React , {useState , useEffect} from 'react'
import axios from 'axios'
import $ from 'jquery'
import Api_url from './../component/Api_url';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import ReactDatatable from '@ashvin27/react-datatable';
import Select from '@material-ui/core/Select';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Avatar from "@material-ui/core/Avatar";
import 'date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Attend from './../component/Attend'
import Comment from './../component/Comment'

import Lottie from 'react-lottie';
import Loading from './../images/loading.json'
// import { mdbTableEditor } from 'mdb-table-editor'


function Attendance (props) {
    const token = localStorage.getItem('token')
    const [date, setdate] = useState("");
    const [open, setopen] = useState(false)
    const history = useHistory();
    const [users, setusers] = useState([])
    const [endDate, setendDate] = useState([])
    const [loading, setloading] = useState(true)
    const [comment, setcomment] = useState("")
    const [startDate, setstartDate] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date('2021-08-18T21:11:54'));
    const [refresh, setrefresh] = useState(false)
    const [data, setdata] = useState({
      total: 0,
      Present:0,
      Absent:0,
      Conge:0,
      Retard:0,
    })

    
    const [filterloading, setfilterloading] = useState(false);



  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: Loading,
    };

    useEffect(() => {

      const loading_screen = ()=>{
       
        setloading(true)
        setTimeout(() => {
          setloading(false)
        }, 1500);

    }
     
       const getuserlist = async ()=>{
         const res = await axios({
           headers: {'Authorization': `Bearer ${token}`},
           method: 'get',
           url : `${Api_url}Presance/user/attend`,  
           });
           console.log(res)
           setusers(res.data.user)
           changestat(res.data.user) 
       }
       const getdata = async() =>{
         const user =  JSON.parse(localStorage.getItem('user'))
   //get the current user 
         const currentuser = await axios({
           headers: {'Authorization': `Bearer ${token}`},
           method: 'get',
           url : `${Api_url}user/${user.id}`,  
           });
   
       if(currentuser.data.user.user_level === "Chef Service"){
        const res = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'get',
          url : `${Api_url}Presance/Service/user/attend/${currentuser.data.user.Chef.Service.id}`,  
          });
        
          setusers(res.data.user) 
          changestat(res.data.user)
         
       }
       else{
        getuserlist()
       }
     } 
     loading_screen()
     getdata()
      
       }, [])


    const  getAttendbydate = async (D)=>{

    const result =   D.split('-')
       
    const date = {
      y :result[0] ,
      M :result[1] ,
      d :result[2] ,
    }
    
    if(parseInt(result[1]) < 9 ){
      date.M =  result[1].substring(1)
    }
        const finalldate = `${date.M}/${date.d}/${date.y}`

        const data ={
          datee :finalldate
        }
        const res = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'post',
          url : `${Api_url}Presance/attend/bydate`,  
          data 
          });
          console.log(res)
         
          if(res.status === 200){
          console.log(res)
         setusers(res.data.user)
            changestat(res.data.user)
            setTimeout(() => {
              setfilterloading(false)
            }, 2000);


          }
      }

       const changestat = (data)=>{
        const changeddata = {
          total: 0,
          Present:0,
          Absent:0,
          Conge:0,
          Retard:0,
        }
        data.forEach(user => {
            if(user.Presances.length !== 0){
              if(user.Presances[0].Present){
               changeddata.total++
               changeddata.Present++
              }
              else if(user.Presances[0].Absent){
                changeddata.total++
                changeddata.Absent++
              }
              else if(user.Presances[0].Conge){
                changeddata.total++
                changeddata.Conge++
              }
              else if(user.Presances[0].Retard){
                changeddata.total++
                changeddata.Retard++
              }
  
            }
         });
         setdata(changeddata)
       }

       const updatestat = (data , newdata)=>{
        const changeddata = {
          total: 0,
          Present:0,
          Absent:0,
          Conge:0,
          Retard:0,
        }
        data.forEach(user => {
            if(user.Presances.length !== 0){

              if(user.Presances[0].id === newdata.id){
                if(newdata.Present){
                  changeddata.total++
                  changeddata.Present++
                 }
                 else if(newdata.Absent){
                   changeddata.total++
                   changeddata.Absent++
                 }
                 else if(newdata.Conge){
                   changeddata.total++
                   changeddata.Conge++
                 }
                 else if(newdata.Retard){
                   changeddata.total++
                   changeddata.Retard++
                 }
              }
              
              else{
                if(user.Presances[0].Present){
                  changeddata.total++
                  changeddata.Present++
                 }
                 else if(user.Presances[0].Absent){
                   changeddata.total++
                   changeddata.Absent++
                 }
                 else if(user.Presances[0].Conge){
                   changeddata.total++
                   changeddata.Conge++
                 }
                 else if(user.Presances[0].Retard){
                   changeddata.total++
                   changeddata.Retard++
                 }
              }
            
  
            }
         });
         setdata(changeddata)
       }




 

  const updateuser = (res)=>{
    setusers(
      users.map(user=>
        user.id === res.UserId 
        ?{  Presances : [res], ...user}
        :user
        )
    )
    updatestat(users , res)
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
        loading ? (
           <Lottie 
          options={defaultOptions}
            height={"70%"}
            width={"70%"}
            isClickToPauseDisabled={true}
          />
        ) : (
          <>
          <header class="page-header">
          <div class="container-fluid">
            <h2 class="no-margin-bottom">Présence</h2>
          </div>
        </header>
       
        <div class="breadcrumb-holder container-fluid">
          <ul class="breadcrumb cardstat">
          <li ><a href="home" ><ArrowBackIosIcon /></a></li>
          <li class="breadcrumb-item" >Accueil</li>
            <li class="breadcrumb-item active">Présence</li>
          </ul>
        </div>

      <div className="row col-12 justify-content-center ">
          
            
            <div className="text-center d-flex flex-row">
            <p className="mt-3 mr-5">Choisir une date </p>
          <TextField
          id="date"
          label="date"
          type="date"
          value={date}
          defaultValue={date}
          onChange={(e)=>{setdate(e.target.value) ; getAttendbydate(`${e.target.value}`); setfilterloading(!filterloading)}}
          InputLabelProps={{
            shrink: true,
          }}
        />
</div>
          </div>

          
{
  filterloading ? (
    <i id="loading" style={{position : 'absolute' , right : '43%' , top : '50%'}}  className="fas fa-spinner fa-spin fa-3x "></i>
  ) : (
                <>
                <div className="row col-12 mb-4 justify-content-center">

                <div style={{minHeight:80}}  className="col-2 card z-depth-3 my-3 mx-2 text-center">
                <span className="mt-2 mb-2 " style={{fontSize:12}}>Total</span><i class="fas fa-archive fa-2x mb-2" style={{color:"#8086b7"}}></i>{data.total}

                </div>

                <div  style={{minHeight:80}} className="col-2 card z-depth-3 my-3 mx-2 text-center">
                <span className="mt-2 mb-2" style={{fontSize:12}}>Présent</span><i class="fas fa-check-circle fa-2x mb-2" style={{color:"#2DCD94"}}></i>{data.Present}

                </div>

                <div style={{minHeight:80}}  className="col-2 card z-depth-3 my-3 mx-2 text-center">
                <span className="mt-2 mb-2" style={{fontSize:12}}>Absent</span><i class="fas fa-ban fa-2x mb-2" style={{color:"#F40010"}}></i>{data.Absent}

                </div>

                <div style={{minHeight:80}}  className="col-2 card z-depth-3 my-3 mx-2 text-center">
                <span className="mt-2 mb-2" style={{fontSize:12}}>Congé</span><i class="fas fa-mug-hot fa-2x mb-2" style={{color:"#767192"}}></i>{data.Conge}

                </div>

                <div style={{minHeight:80}}  className="col-2 card z-depth-3 my-3 mx-2 text-center">
                <span className="mt-2 mb-2" style={{fontSize:12}}>Retard</span><i class="fas fa-exclamation-circle fa-2x mb-2" style={{color:"#fedb1a"}}></i>{data.Retard}

                </div>



                </div>


                <table className="table table-bordered mt-3">
                  <thead>
                  <tr>
                    <th className="text-center">Employé</th>
                    <th className="text-center">Présence</th>
                    <th className="text-center">Commentaire</th>
                  </tr>
                  </thead>
              

                  <tbody>
                    {
                      users.map((user,index)=>(
                        <tr key={index}>
                      <td>
                      <div className="d-flex flex-row">
                        <Avatar src={user.user_img} style={{width:30 , height:30}} />
                      <span className=" ml-2">{user.full_name}</span>
              </div>
                      </td>
                      <td><Attend user={user} update={updateuser} refr={refresh} /></td>
                      <td> 
                      <Comment user={user} comment={!user.Presances[0] ? "" : user.Presances[0].Comment}/></td>
                        </tr>
                      
                      ))
                    }
                  
                  </tbody>
                </table>
                </>
  )
}



          </>
        )
      }
     
      

            
            </>
      
    );
}

export default Attendance