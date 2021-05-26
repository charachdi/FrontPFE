import React , { useState , useEffect} from 'react'
import axios from 'axios'
import './../css/Profile.css'
import $ from 'jquery'
import Api_url from './../component/Api_url'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {  withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import ReactDatatable from '@ashvin27/react-datatable';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Lottie from 'react-lottie';
import Loading from './../images/loading.json'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import * as locales from 'react-date-range/dist/locale';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';

import Divider from '@material-ui/core/Divider';








const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);



function UserView(props) {

    const [datec, setDatec] = useState(null);
    const token = localStorage.getItem('token')
    const localuser = JSON.parse(localStorage.getItem('user'))
    const userId =  !props.id ? props.match.params.id : props.id
    const [user, setuser] = useState({})
    const [isloading, setisloading] = useState(true)
    const [locale, setLocale] = React.useState('fr');

    const [Clientsdata, setClientsdata] = useState([])
    const [colors, setcolors] = useState([])
    const [presance, setpresance] = useState([]);
    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ]);
 // Line data
    const [date, setdate] = useState([])
    const [date_value, setdate_value] = useState([])

//pie data

    const [clients, setclients] = useState([])
    const [clients_value, setclients_value] = useState([])

  //bar data

  const [Orgine, setOrgine] = useState([])
  const [Origine_value, setOrigine_value] = useState([])

    useEffect(() => {

      const loading_screen = () =>{
        setisloading(true)
        setTimeout(() => {
            setisloading(false)
        }, 2500);
      }

      const getuser = async () =>{
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'get',
            url : `${Api_url}user/${userId}`,
            });
          
           setuser(res.data.user)
      }


      const nameMapper = {
        fr: 'French'
      };
      
      
      const getclients = async () =>{
        const res = await axios({
          headers: { Authorization: `Bearer ${token}` },
          method: "get",
          url: `${Api_url}user/stat/clients/${userId}`,
          
        });
       console.log(res)
       setClientsdata(res.data.Clients)
      }
      const getLine = async () =>{
        const Line = await axios({
          headers: { Authorization: `Bearer ${token}` },
          method: "get",
          url: `${Api_url}user/stat/line/${userId}`,
          
        });
        setdate(Line.data.date)
        setdate_value(Line.data.value)
      }

      const getpIE = async () =>{
        const Pie = await axios({
          headers: { Authorization: `Bearer ${token}` },
          method: "get",
          url: `${Api_url}user/stat/pie/${userId}`,
          
        });
        setclients(Pie.data.client)
        setclients_value(Pie.data.value)
      
      }
      
      const getBar = async () =>{
        const Bar = await axios({
          headers: { Authorization: `Bearer ${token}` },
          method: "get",
          url: `${Api_url}user/stat/bar/${userId}`,
        });
          setOrgine(Bar.data.Origine)
          setOrigine_value(Bar.data.value)
        
      }

      const getpre = async ()=>{
        const res = await axios({
          headers: { Authorization: `Bearer ${token}` },
          method: "get",
          url: `${Api_url}user/presance/${userId}`,
        });
        console.log(res)
      
        res.data.forEach(ele => {
          const element = {
            startDate: new Date(ele.date),
            endDate: new Date(ele.date),
          }
          // setpresance([...presance , element])
          presance.push(element)
          if(ele.Present === true){
            colors.push( "#2DCD94")
          }
          else if (ele.Absent === true){
            colors.push( "#F40010")
          }
          else if (ele.Conge === true){
            colors.push( "#C5C5C5")
          }
          else if (ele.Retard === true){
            colors.push( "#fedb1a")
          }
        });

        console.log(presance)
        console.log(colors)
      }
      
      //

      loading_screen()
      getBar()
      getuser()
      getLine()
      getclients()
      getpIE()
      getpre()
    }, [])


    const piedata = {
      labels: clients,
      datasets: [{
        label: 'My First Dataset',
        data: clients_value,
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

    const pieoption={
      legend: {
        display: false,
        position : 'bottom',
    }
    }

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: Loading,
    };

    const bardata = {
      labels: Orgine,
      datasets: [{
        label: Orgine,
        data: Origine_value,
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

    const baroption={
      legend: {
        display: false,
        position : 'top',
    }
    }

    const linedata = {
      labels: date,
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
        data: date_value,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0
      }]
    };
{/*  */}
    const [column, setcolumn] = useState([
      {
        key: "name",
        text: "Client",
        className : "text-center",
        cell: (client, index) => {
          return (
            <div className="d-flex flex-row">
                <div className="d-flex flex-row"> <Avatar src={client.profile ? client.profile : ""} alt={client.client} style={{width: 40, height : 40}} /> 
                <p className="mt-2 ml-4" style={{fontSize : 13}}>{client.client}  </p>
                 </div>
                
             </div>
          );
      }
    },
    {
      key: "",
      text: "progres",
      className : "text-center",
      cell: (client, index) => {
        return (
          <div className="mt-3" style={{minWidth:250}}>
             <BorderLinearProgress variant="determinate" value={client.prog_value} color=""  />
           </div>
        );
    }
  },
  {
    key: "",
    text: "",
    className : "text-center",
    cell: (client, index) => {
      return (
        <div className="mt-1">
           <Box position="relative" display="inline-flex" className="">
                                <CircularProgress variant="determinate" style={{color :"#1A90FF"}} value={client.prog_value} />
                                <Box
                                    top={0}
                                    left={0}
                                    bottom={0}
                                    right={0}
                                    position="absolute"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Typography variant="caption" component="div"   style={{color: "#212529" , fontSize:10}}>{`${client.prog_value}%`}</Typography>
                                </Box>
                                </Box>
         </div>
      );
  }
},
    {
      key: "ok",
      text: "Clôturé",
      className : "text-center",
      cell: (client, index) => {
        return (
          <>
             <p className="text-center">{client.ok}</p>
           </>
        );
    }
       },
      {
      key: "ko",
      text: "En cours",
      className : "text-center table-mid",
      cell: (client, index) => {
        return (
          <>
             <p className="text-center">{client.ko}</p>
           </>
        );
    }
       },
       {
        key: "total_Requetes",
        text: "Total",
        cell: (client, index) => {
          return (
            <>
               <p className="text-center">{client.total_Requetes}</p>
             </>
          );
      }
         },
       
    ])
    const config = {
      page_size: 3,
      length_menu: [3, 5, 10],
      show_filter: true,
      show_pagination: true,
      pagination: 'advance',
      button: {
          excel: false,
          print: false
      }
    }
      
        
    return (
        <div className="row col-12 justify-content-center " style={{height:"90vh"}}>

          {
            isloading ? (
              <Lottie 
          options={defaultOptions}
            height={"70%"}
            width={"70%"}
            isClickToPauseDisabled={true}
          />
            ) : (
              <>
                <div className="row col-12 justify-content-center  mb-5">

                    <div className="d-flex flex-column mt-3 mb-3 text-center">
                    <Avatar src={user.user_img} className="mx-auto"  style={{width : 150 , height:150}}/>
                      <h2>{user.full_name}</h2>
                    </div>
                    {
                      userId === `${localuser.id}` ? (
                        <IconButton style={{position : 'absolute', right :20 , bottom :20}} onClick={()=>{props.toggle()}}>
                        <EditIcon />
                      </IconButton>
                      ) : null
                    }
               
                  </div>
                <div className="col-12">
                 
                    <div className="row col-12 justify-content-around nopad ">
                   
                    {/* SHOW DATA PROFILE */}
                  
                  
                    <div className="card col-4 mt-3 cardstat" >
                    <h5 className="card-title mt-3 text-center">Requête de l'employé</h5>
                    <Divider />
                      <div className="card-body">
                      <Line  data={linedata} options={baroption} width={10} height={8}/>
                      </div>
                      </div>
                  
                  
                  
                      <div className="card col-4 mt-3 cardstat " >
                    <h5 className="card-title mt-3 text-center">Requête par client</h5>
                    <Divider />
                      <div className="card-body">
                      <Pie  data={piedata} width={10} options={pieoption} height={8}/>
                      </div>
                      </div>


                      <div className="card col-4 mt-3 cardstat " >
                    <h5 className="card-title mt-3 text-center">Origin des requêtes</h5>
                    <Divider />
                      <div className="card-body">
                      <Bar  data={bardata} options={baroption} width={10} height={8}/>
                      </div>
                      </div>
                    


                      </div>
              
                      <div className="row col-12 justify-content-around nopad ">

                    <div className="col-8 mt-5 mb-5">
                    <ReactDatatable
                        config={config}
                        records={Clientsdata}
                        columns={column}
                        tHeadClassName ="text-center "
                        
                        
                        />
                    
                    </div>
 
                    


                    <div className=" col-4 mt-5 justify-content-center  ">
                    <h5 className="card-title text-center">Présance de l'employé</h5>
                    <Divider style={{width:329}} className=" ml-4 "/>
                    <DateRange
                      className="cardstat ml-4"
                      editableDateInputs={false}
                      showSelectionPreview={false}
                      showDateDisplay={false}
                      onChange={item => setState([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={presance}
                      rangeColors={colors}
                      locale={locales[locale]}
                      />
                    </div>

                    </div>
                    
                   
                   
                    
             
            
              
    
            </div>
            </>
            )
          }

                  
       </div>
    )
}

export default UserView
