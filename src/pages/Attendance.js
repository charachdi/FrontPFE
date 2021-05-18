
import React , {useState , useEffect} from 'react'
import axios from 'axios'
import $ from 'jquery'
import Api_url from './../component/Api_url';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import ReactDatatable from '@ashvin27/react-datatable';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
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
    const [open, setopen] = useState(false)
    const history = useHistory();
    const [users, setusers] = useState([])
    const [endDate, setendDate] = useState([])
    const [comment, setcomment] = useState("")
    const [startDate, setstartDate] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date('2021-08-18T21:11:54'));
    const [refresh, setrefresh] = useState(false)
    const [data, setdata] = useState({
      total:0,
      Present:0,
      Absent:0,
      Conge:0,
      Retard:0,
    })

    




  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: Loading,
    };

    useEffect(() => {
     
       const getuserlist = async ()=>{
         const res = await axios({
           headers: {'Authorization': `Bearer ${token}`},
           method: 'get',
           url : `${Api_url}Presance/user/attend`,  
           });
           console.log(res)
           setusers(res.data.user) 
           setdata({
            total: res.data.Present + res.data.Absent + res.data.Conge + res.data.Retard,
            Present: res.data.Present,
            Absent: res.data.Absent,
            Conge: res.data.Conge,
            Retard: res.data.Retard,
           })
            
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
          url : `${Api_url}Presance/user/attend`,  
          });
          console.log(res)
          setusers(res.data.user) 
         
       }
       else{
        getuserlist()
       }
     } 
   
     getdata()
      
       }, [])

    // datatable
    const [loading, setloading] = useState(true)


  useEffect(() => {
    const loading_screen = ()=>{
       
        setloading(true)
        setTimeout(() => {
          setloading(false)
        }, 1500);

    }
    loading_screen()
  }, [])



  


    const [column, setcolumn] = useState([
      
      {
        key: "full_name",
        text: "Employe",
        cell: (user, index) => {
          return (
            <div className="d-flex flex-row">
                <Avatar src={user.user_img} style={{width:30 , height:30}} />
                <span className=" ml-2">{user.full_name}</span>
             </div>
          );
      }
        
      },
      {
        key: "Action",
        text: "Présance",
        cell: (user, index) => {

          return (
            <Attend user={user} />
          );
      }
      },

      {
        key: "",
        text: "Commentaire",
        className :"text-center",
        cell: (user, index) => {
          return (
            
            
            <TextField id={index} style={{width:"100%"}} placeholder="Commentaire" value={!user.Presances[0] ? "" : user.Presances[0].Comment}   variant="outlined" size='small'/>
            
          );
      }
        
      },
      
  
    
       
    ])

    const config = {
      page_size: 10,
      length_menu: [],
      show_filter: false,
      show_pagination: false,
      pagination: 'advance',
      button: {
          excel: false,
          print: false
      }
    }

  const updateuser = (res)=>{
    setusers(
      users.map(user=>
        user.id === res.UserId 
        ?{  Presances : [res], ...user}
        :user
        )
    )
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
            <h2 class="no-margin-bottom">Présances</h2>
          </div>
        </header>
       
        <div class="breadcrumb-holder container-fluid">
          <ul class="breadcrumb">
          <li class="breadcrumb-item" ><a href="home" >Home </a></li>
            <li class="breadcrumb-item active">Présence</li>
          </ul>
        </div>

      <div className="row  justify-content-center">
          <div className="col-12 text-center">
          
  
</div>
          </div>

          {/* <MuiPickersUtilsProvider utils={DateFnsUtils} >
             <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Choisir date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
           </MuiPickersUtilsProvider> */}

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
{/* 
          <ReactDatatable
              config={config}
              records={users}
              columns={column}/> */}

              <table className="table table-bordered mt-3">
                <thead>
                <tr>
                  <th className="text-center">Employe</th>
                  <th className="text-center">Présance</th>
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
      
    );
}

export default Attendance