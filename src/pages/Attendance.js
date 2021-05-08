
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

import Lottie from 'react-lottie';
import Loading from './../images/loading.json'
// import { mdbTableEditor } from 'mdb-table-editor'


function Attendance (props) {
    const token = localStorage.getItem('token')
    const [open, setopen] = useState(false)
    const history = useHistory();
    const [users, setusers] = useState([])
    const [endDate, setendDate] = useState([])
    const [startDate, setstartDate] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date('2021-08-18T21:11:54'));

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
           url : `${Api_url}user/`,  
           });
           setusers(res.data)  
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
           url : `${Api_url}service/dataservice/${currentuser.data.user.Chef.ServiceId}`,  
           });
           console.log(res)
           
           setusers(res.data.equipes)
         
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
        sortable: true,
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
            <>
                       <i class="fas fa-check-circle fa-2x mr-2" style={{color:"#2dcd94"}} ></i>
                       <i class="fas fa-ban fa-2x mr-2" style={{color:"#aaa7a8"}}></i>
                       <i class="fas fa-mug-hot fa-2x mr-2" style={{color:"#aaa7a8"}}></i>
                       <i class="fas fa-exclamation-circle fa-2x mr-2" style={{color:"#aaa7a8"}}></i>
             </>
          );
      }
      },

      {
        key: "",
        text: "Commentaire",
        cell: (user, index) => {
          return (
            <>
                       <TextField id="outlined-basic"  variant="outlined" size='small'/>
             </>
          );
      }
        
      },
      
  
    
       
    ])

    const config = {
      page_size: 10,
      length_menu: [10, 20, 50],
      show_filter: true,
      show_pagination: true,
      pagination: 'advance',
      button: {
          excel: false,
          print: false
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
<span className="mt-2 mb-2 " style={{fontSize:12}}>Total</span><i class="fas fa-archive fa-2x mb-2" style={{color:"#8086b7"}}></i>10

</div>

<div  style={{minHeight:80}} className="col-2 card z-depth-3 my-3 mx-2 text-center">
<span className="mt-2 mb-2" style={{fontSize:12}}>Présent</span><i class="fas fa-check-circle fa-2x mb-2" style={{color:"#2dcd94"}}></i>3

</div>

<div style={{minHeight:80}}  className="col-2 card z-depth-3 my-3 mx-2 text-center">
<span className="mt-2 mb-2" style={{fontSize:12}}>Absent</span><i class="fas fa-ban fa-2x mb-2" style={{color:"#aaa7a8"}}></i>8

</div>

<div style={{minHeight:80}}  className="col-2 card z-depth-3 my-3 mx-2 text-center">
<span className="mt-2 mb-2" style={{fontSize:12}}>Congé</span><i class="fas fa-mug-hot fa-2x mb-2" style={{color:"#FFD43B"}}></i>8

</div>

<div style={{minHeight:80}}  className="col-2 card z-depth-3 my-3 mx-2 text-center">
<span className="mt-2 mb-2" style={{fontSize:12}}>Retard</span><i class="fas fa-exclamation-circle fa-2x mb-2" style={{color:"#f40010"}}></i>8

</div>



</div>

          <ReactDatatable
              config={config}
              records={users}
              columns={column}/>


          </>
        )
      }
     
      

            
            </>
      
    );
}

export default Attendance