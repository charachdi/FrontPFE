import React , { useState , useEffect} from 'react'
import axios from 'axios'
import './../css/Profile.css'
import $ from 'jquery'
import DeleteIcon from '@material-ui/icons/Delete';
import Api_url from './../component/Api_url'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
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
import chartsloding from './../images/chartsloding.json'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import * as locales from 'react-date-range/dist/locale';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import PlanComment from './../component/PlanComment'
import Divider from '@material-ui/core/Divider';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Alert from '@material-ui/lab/Alert';







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

    const [plans, setplans] = useState([]);
    const [locale, setLocale] = React.useState('fr');
    const [Request, setRequest] = useState([
      {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
  }
  ])
  const [colors2, setcolors2] = useState(['#32B66A'])

    const [Clientsdata, setClientsdata] = useState([])
    const [colors, setcolors] = useState([])
    const [presance, setpresance] = useState([]);
    const [plancomm, setplancomm] = useState("");
    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ]);
    const [hovered, sethovered] = useState(false)
 // Line data
    const [date, setdate] = useState([])
    const [date_value, setdate_value] = useState([])

//pie data

    const [clients, setclients] = useState([])
    const [clients_value, setclients_value] = useState([])

  //bar data

  const [Orgine, setOrgine] = useState([])
  const [Origine_value, setOrigine_value] = useState([])



  const [open, setopen] = useState(false)
  const [open2, setopen2] = useState(false)

  const toggle = () =>{
    setopen(!open)
  }
  const toggle2 = () =>{
    setopen2(!open2)
  }
  const deleteplan = async (id)=>{
    const res = await axios({
      headers: {'Authorization': `Bearer ${token}`},
      method: 'delete',
      url : `${Api_url}plan/${id}`,
      });    
        console.log(res)
      if(res.status === 200){
        setplans(res.data)
      }
      
  }

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
      }
      const getplans = async ()=>{
        const res = await axios({
          headers: { Authorization: `Bearer ${token}` },
          method: "get",
          url: `${Api_url}plan/${userId}`,
        });
       
        setplans(res.data)     
        }
      //

      loading_screen()
      getBar()
      getuser()
      getLine()
      getclients()
      getpIE()
      getpre()
      getplans()
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

    const statOptions = {
      loop: true,
      autoplay: true,
      animationData: chartsloding,
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
    const [plan, setplan] = useState([
      {
        key: "Text",
        text: "Erreur commise",
        className : "text-center",
        cell: (plan, index) => {
          return (
            <PlanComment comment={plan.Text} id={plan.id}/>
          );
      }
    },
    {
      key: "Action",
      text: "Action",
      className : "table-ssmal text-center",
      cell: (plan, index) => {
        return (
          <>
                
                      <IconButton className=""  size="small" aria-label="delete" color="secondary" onClick={()=>{deleteplan(plan.id)}} >
                      <DeleteIcon />
                      </IconButton>

                     

                    
           </>
        );
    }
    },
    ])

    /////////////////////////////////
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
      text: "progr??s",
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
      text: "Cl??tur??",
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
      },
      language: {
          length_menu: "Afficher  _MENU_ enregistrements par page",
          filter: "Recherche...",
          info: "Affiche  _START_ ??  _END_ de _TOTAL_ entr??es",
          pagination: {
              first: "Premier",
              previous: "Pr??c??dent",
              next: "Suivant",
              last: "Dernier"
          }
      }
    }
    const configplan = {
      page_size: 6,
      length_menu: [6, 15, 20],
      show_filter: true,
      show_pagination: true,
      pagination: 'basic',
      button: {
          excel: false,
          print: false
      },
      language: {
          length_menu: "Afficher  _MENU_ enregistrements par page",
          filter: "Recherche...",
          info: "Affiche  _START_ ??  _END_ de _TOTAL_ entr??es",
          pagination: {
              first: "Premier",
              previous: "Pr??c??dent",
              next: "Suivant",
              last: "Dernier"
          }
      }
    }


    const switchtoadd = ()=>{
      $('#planadd').show()
      $('#plantable').hide()
      $('#addbtn').hide()
      $('#back').show()


    }

    const switchtotable = ()=>{
      $('#planadd').hide()
      $('#plantable').show()
      $('#back').hide()
      $('#addbtn').show()
    }

    const Addplan = async ()=>{
        const data = {
          Text : plancomm
        }
      const res = await axios({
        headers: { Authorization: `Bearer ${token}` },
        method: "post",
        url: `${Api_url}plan/${userId}`,
        data
      });
      console.log(res)
      if(res.status === 200){
        setplans([...plans , res.data])
        setplancomm("")
        toast.success('Plan Ajouter', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          });
          switchtotable()

      }
    }


    const filter = async () =>{
      var start = Request[0].startDate.toLocaleDateString('en-US').split("/")
      var  end = Request[0].endDate.toLocaleDateString('en-US').split("/")
      const data = {
        startdate : `${start[1]}/${start[0]}/${start[2]}`,
        enddate : `${end[1]}/${end[0]}/${end[2]}`
      }
     
        const Line = await axios({
          headers: { Authorization: `Bearer ${token}` },
          method: "post",
          url: `${Api_url}user/stat/line/date/${userId}`,
          data
        });
      
    
        const Pie = await axios({
          headers: { Authorization: `Bearer ${token}` },
          method: "post",
          url: `${Api_url}user/stat/pie/date/${userId}`,
          data
        });
      
      
        const Bar = await axios({
          headers: { Authorization: `Bearer ${token}` },
          method: "post",
          url: `${Api_url}user/stat/bar/date/${userId}`,
          data
        });

          setdate(Line.data.date)
          setdate_value(Line.data.value)

          setclients(Pie.data.client)
          setclients_value(Pie.data.value)

          setOrgine(Bar.data.Origine)
          setOrigine_value(Bar.data.value)
        
      
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

                    <div className="row d-flex flex-column mt-3 mb-3 text-center">
                    <Avatar src={user.user_img} className="mx-auto "  style={{width : 150 , height:150}}/>
                      <h4 className="text-capitalize">{user.full_name}</h4>
                    </div>
                    {
                      localuser.user_level === "admin" ? (
                      <button className=" btn-danger cardstat text-capitalize" style={{position : 'absolute', right :20 , top :150 ,width:'17%'}} onClick={()=>{toggle()}} >
                         Signaler une erreur <ErrorOutlineIcon/>
                      </button>
                      ) : null
                    }

                    {
                      localuser.user_level === "Chef Service" ? (
                      <button className=" btn-danger cardstat text-capitalize" style={{position : 'absolute', right :20 , top :150 ,width:'17%'}} onClick={()=>{toggle()}} >
                        Signaler une erreur <ErrorOutlineIcon/>
                      </button>
                      ) : null
                    }
                    
                    {
                      userId === `${localuser.id}` ? (
                        <IconButton style={{position : 'absolute', right :20 }} onClick={()=>{props.toggle()}}>
                        <EditIcon />
                      </IconButton>
                      ) : null
                    }
          
                <Divider className="col-12 mb-3 mt-3"/>
                  <div className="row col-12 ">
                  <ul className="row col-12 justify-content-start" style={{listStyle: "none"}}>
                  <div class="container-fluid">
                    <h2 class="no-margin-bottom text-center">Les erreurs commises ce mois-ci</h2>
                    <Alert severity="warning" >Si vous avez plus de trois erreurs par mois, Vous allez perdre votre bonus !</Alert>
                </div>
                  {
                      plans.map((plan , index)=>(
                        <li className="col-4 my-3 text-start" key={index}>
                          <small><i class="fas fa-circle mr-2 mt-2" style={{fontSize : 5}}></i>{plan.Text}</small>
                        </li>
                      ))
                  }
                  </ul>
                  </div>
                
              
                  </div>
                 {
                       date.length === 0 ? (
                        <Lottie 
                        options={statOptions}
                          height={"70%"}
                          width={"70%"}
                          isClickToPauseDisabled={true}
                        />
                       ) : (
                        <div className="col-12">
                        <div className="row col-12 justify-content-around nopad ">
                        <Divider className="col-12 mb-3 mt-3"/>
                        <button className="btn-Filter cardstat mr-5" onClick={()=>{toggle2()}} style={{width:"6%"}}><i class="fas fa-filter"></i><small  className="text-capitalize">filter</small></button>

                        <h4 className="col-12 text-center">Les statistiques de l'employ??</h4>
                        {/* SHOW DATA PROFILE */}
                      
                      
                        <div className="card col-4 mt-3 cardstat" >
                        <p className="card-title mt-3 text-center">Requ??te de l'employ??</p>
                        <Divider />
                          <div className="card-body">
                          <Line  data={linedata} options={baroption} width={10} height={8}/>
                          </div>
                          </div>
                      
                      
                      
                          <div className="card col-4 mt-3 cardstat " >
                        <p className="card-title mt-3 text-center">Requ??te par client</p>
                        <Divider />
                          <div className="card-body">
                          <Pie  data={piedata} width={10} options={pieoption} height={8}/>
                          </div>
                          </div>
    
    
                          <div className="card col-4 mt-3 cardstat " >
                        <p className="card-title mt-3 text-center">Origine des requ??tes</p>
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
                            tHeadClassName ="text-center"
                            
                            
                            />
                        
                        </div>
     
                        
    
    
                        <div className=" col-4 mt-5 justify-content-center  ">
                        <p className="card-title text-center">Pr??sence de l'employ??</p>
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
                       )
                 }
                
            </>
            )
          }

        <MDBModal isOpen={open} toggle={()=>toggle()}  size="lg" disableBackdrop={false} >
              <MDBModalHeader toggle={()=>toggle()} className="text-capitalize">plan d'accompagnement</MDBModalHeader>
              <MDBModalBody className="">
           <Alert severity="warning" >Plus de trois erreurs par mois, l'employ?? perdra son bonus !</Alert>
                <div className="row col-12 justify-content-center ml-1"  >
                 <a id="back" className="mr-auto p-2" onMouseEnter={() => sethovered(true)} onMouseLeave={() => sethovered(false)} style={{color : hovered ? "#38D39F" : "" , display : 'none'}}  onClick={()=>{ switchtotable()}}  ><ArrowBackIosIcon /></a>
                
                <button id="addbtn" type="submit" className="btn-danger cardstat text-capitalize ml-auto p-2 mr-5" style={{width:160}} onClick={()=>{switchtoadd()}}>signaler une erreur</button>
                </div>
           <div className=" col-12 justify-content-center">

             <div id="plantable" className="ml-3" style={{width : '100%'}}>
                      <ReactDatatable
                        config={configplan}
                        records={plans}
                        columns={plan}
                        tHeadClassName ="text-center"
                        />
             </div>
                   


                        <div id="planadd"  className="row col-12 justify-content-center mb-4" style={{display : 'none' , height : '50vh'}}>
                         
                           <TextField
                              id="outlined-multiline-static"
                              label="Ajouter un commentaire"
                              multiline
                              value={plancomm}
                              rows={4}
                              onChange={(e)=>{setplancomm(e.target.value)}}
                              className="col-6 xl text-center mt-5"
                              defaultValue="Default Value"
                              variant="outlined"
                            />
                      
                          <div className="row col-12 justify-content-center">
                          <button  type="submit" className="btn-add cardstat text-capitalize " style={{width:100}} onClick={()=>{Addplan()}} >Valider</button>

                          </div>

                        </div>
           </div>
         
              </MDBModalBody>
              </MDBModal>    

              <MDBModal isOpen={open2} toggle={()=>toggle2()} size="md" disableBackdrop={false}>
              <MDBModalHeader toggle={()=>toggle2()} className="text-center"></MDBModalHeader>
              <MDBModalBody>
              <div className="text-center ">
              <DateRange
                    className="mt-5"
                    editableDateInputs={true}
                    onChange={item => setRequest([item.selection]) }
                    moveRangeOnFirstSelection={false}
                    ranges={Request}
                    rangeColors={colors2}
                    locale={locales[locale]}
                /><br />

                    <IconButton style={{backgroundColor : "#32B66A"}} className="mt-5" onClick={()=>{filter() ; toggle2() ; setdate([])}}>
                    <i class="fas fa-filter" style={{color : "white"}}></i>
                    </IconButton>
              </div>
              </MDBModalBody>
              </MDBModal>
       </div>
    )
}

export default UserView
