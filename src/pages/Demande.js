import React,{ useState , useEffect , forwardRef} from 'react'
import ReactDatatable from '@ashvin27/react-datatable';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import Api_url from './../component/Api_url';
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Lottie from 'react-lottie';
import Loading from './../images/loading.json'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import UpdateIcon from '@material-ui/icons/Update';
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import * as locales from 'react-date-range/dist/locale';
import Alert from '@material-ui/lab/Alert';

function Demande() {

    const token = localStorage.getItem('token')
    const user =  JSON.parse(localStorage.getItem('user'))
    const [isloading, setisloading] = useState(true)
    const [open, setopen] = useState(false)
    const [editopen, seteditopen] = useState(false)
    const [Demande, setDemande] = useState([])
    const [prime, setprime] = useState([]);
    const [Request, setRequest] = useState([
        {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }
])

const nameMapper = {
       fr: 'French'
  };
  

  const [locale, setLocale] = React.useState('fr');

  

    const [selectedrow, setselectedrow] = useState({
        "id": 3,
        "Type": "Conge",
        "Startdate": "5/11/2021",
        "enddate": "5/21/2021",
        "Approved": false,
        "waiting": true,
        "createdAt": "2021-05-11T15:46:32.000Z",
        "updatedAt": "2021-05-11T15:46:32.000Z",
        "UserId": 9,
        "User": {
            "id": 9,
            "full_name": "Haboubi amine",
            "user_name": null,
            "ftime": "false",
            "pwd": "$2a$10$tKCNi8rVxQf.3C6RsmNV3.DacAS1B24wwCabuKKhwP5unh4ilD6Ye",
            "user_email": "haboubi@infopro-digital.com",
            "user_level": "admin",
            "user_img": "http://localhost:3001/userimg/1620425459463.jpg",
            "user_spec": null,
            "user_sex": "Homme",
            "address": "Manouba",
            "country": "",
            "tel": 21861159,
            "fax": 0,
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
            "img_path": "C:\\Users\\amine\\Desktop\\PFE\\pfeserver\\uploads\\userimg\\1620425459463.jpg",
            "createdAt": "2021-04-22T18:52:16.000Z",
            "updatedAt": "2021-05-07T22:10:59.000Z",
            "EquipeId": null
        }
    })
    const [selectedRequest, setselectedRequest] = useState([
        {
        startDate: new Date(selectedrow.Startdate),
        endDate: new Date(selectedrow.enddate),
        key: 'selection'
    }
    ])
    const [type, settype] = useState("Conge")
    const [column, setcolumn] = useState([
        {
          key: "Employee",
          text: "Employé",
          cell: (demande, index) => {
            return (
              <div className="d-flex flex-row">
                    <Avatar src={demande.User.user_img} />
                    <p className="mt-2 ml-4">{demande.User.full_name}</p>
              </div>
            )
          }
        },
        {
          key: "Type",
          text: "Type",
          className :"table-mid text-center "
        },
        {
          key: "Startdate",
          text: "Date de début",
          sortable : true ,
          className :"table-mid text-center"
        },
        {
          key: "enddate",
          text: "Date de fin", 
          className :"table-mid text-center"
        },
         {
          key: "Approved",
          text: "Approuvé", 
          className : "table-mid text-center",
           cell: (demande, index) => {
            return (
             <div className="text-center">

                 {
                     demande.waiting ? (
                        <i style={{color:"#2ECD94"}} className=" fas fa-spinner fa-spin fa-2x mt-2"></i>
                      
                     ) : (

                        demande.Approved ? (
                            <IconButton size="small" style={{color:"white" , backgroundColor :"#2ECD94"}}>
                              <CheckIcon   />
                            </IconButton>
    
                        ) : (
                            <IconButton size="small" style={{color:"white" , backgroundColor :"#ff0000"}}>
                             <CloseIcon />
                            </IconButton>
                        )
                        


                     )
                 }
           
             </div>
            )
          }
        },
        {
            key : "Action",
            text:'Modifier',
            className : "table-mid text-center text-center",
            cell: (demande, index) => {
                return (
                    <div className="mt-2">
                    {
                        demande.waiting ? (
                            <IconButton onClick={()=>{setselectedrow(demande);setselectedRequest([ {key: 'selection' ,  startDate: new Date(demande.Startdate) , endDate: new Date(demande.enddate)}]);seteditopen(!editopen)}} size="small" style={{color:"white" , backgroundColor :  "#007BFF"}}>
                            <EditIcon   />
                            </IconButton>
                        ) : null
                    }
                    </div>
                )
           
        }
    }
    ])

    // Full texts	
    // id
    // date
    // Bonus
    // Prime
    // Comment
    const [column2, setcolumn2] = useState([
        {
          key: "Employee",
          text: "Employé",
          cell: (demande, index) => {
            return (
              <div className="d-flex flex-row">
                    <Avatar src={demande.User.user_img} />
                    <p className="mt-2 ml-4">{demande.User.full_name}</p>
              </div>
            )
          }
        },
        {
          key: "Type",
          text: "Type",
          className :"table-mid text-center ",
          cell: (demande, index) => {
            return (
              "Prime"
            )
          }
        },
        {
          key: "Bonus",
          text: "Bonus",
          className :"table-mid text-center"
        },
        {
          key: "Prime",
          text: "Prime", 
          className :"table-mid text-center"
        },
        {
            key: "Comment",
            text: "Comment", 
            className :"table-mid text-center"
          },
         {
          key: "Approved",
          text: "Approuvé", 
          className : "table-mid text-center",
           cell: (demande, index) => {
            return (
             <div className="text-center">

                 {
                     demande.waiting ? (
                        <i style={{color:"#2ECD94"}} className=" fas fa-spinner fa-spin fa-2x mt-2"></i>
                      
                     ) : (

                        demande.Approved ? (
                            <IconButton size="small" style={{color:"white" , backgroundColor :"#2ECD94"}}>
                              <CheckIcon   />
                            </IconButton>
    
                        ) : (
                            <IconButton size="small" style={{color:"white" , backgroundColor :"#ff0000"}}>
                             <CloseIcon />
                            </IconButton>
                        )
                        


                     )
                 }
           
             </div>
            )
          }
        },
        
    ])
    useEffect(() => {
       const loding = ()=>{
        setisloading(true)
        setTimeout(() => {
            setisloading(false)
        }, 2500);
       }


       const getalldemande = async()=>{
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'get',
            url : `${Api_url}Demande/${user.id}`,
        })
        if(res.status === 200){
            setDemande(res.data.demandes)
        }
        
       }

       const getallprime = async()=>{
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'get',
            url : `${Api_url}Demande/sprime/${user.id}`,
        })
        if(res.status === 200){
            setprime(res.data.prime)
        }
        
       }


       loding()
       getalldemande()
       getallprime()
    }, [])
    const config = {
        page_size: 10,
        length_menu: [10, 20, 50],
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
            info: "Affiche  _START_ à  _END_ de _TOTAL_ entrées",
            pagination: {
                first: "Premier",
                previous: "Précédent",
                next: "Suivant",
                last: "Dernier"
            }
        }
      }
      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Loading,
      };
      const toggle = ()=>{
        setopen(!open)
      }

      const edittoggle = ()=>{
        seteditopen(!editopen)
      }

      const AddRequest= async ()=>{

        const data = {
            startDate : Request[0].startDate.toLocaleDateString("en-US"),
            endDate : Request[0].endDate.toLocaleDateString("en-US"),
            type : type,
        }
       
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'post',
            url : `${Api_url}Demande/`,
            data
        })
        if(res.status===200){
            setDemande([res.data.Newdemande , ...Demande])
            toggle()
            setRequest([
              {
              startDate: new Date(),
              endDate: new Date(),
              key: 'selection'
          }
      ])
        }
       
       
      }

    const  updateRequest = async ()=>{
        const data = {
            startDate : selectedRequest[0].startDate.toLocaleDateString("en-US"),
            endDate : selectedRequest[0].endDate.toLocaleDateString("en-US"),
        }
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'put',
            url : `${Api_url}Demande/${selectedrow.id}`,
            data
        })
        if(res.status === 200){
            setDemande(
                Demande.map(dem => 
                    dem.id === res.data.updateddem
                    ?  res.data.updateddem
                    :   dem
                    )
            )
        }
        console.log(res)
    }


    return (
        <>

<header class="page-header">
                <div class="container-fluid">
                    <h2 class="no-margin-bottom">Liste des demandes</h2>
                </div>
            </header>
   
            <div class="breadcrumb-holder container-fluid">
                <ul class="breadcrumb">
                <li ><a href="home" ><ArrowBackIosIcon /></a></li>
                <li class="breadcrumb-item" >Accueil</li>
                    <li class="breadcrumb-item active">demandes</li>
                </ul>
            </div>
        {
            isloading ? (
                <Lottie 
                options={defaultOptions}
                height={"60%"}
                width={"60%"}
                isClickToPauseDisabled={true}
              />
            ) : (

               


                <section className=" ">
                    <div className="row col-12 justify-content-center">
                   

                    <div className="col-3 mb-2"> 
                    <button variant="contained" className="btn-add cardstat text-capitalize" style={{width:"100%"}}  onClick={()=>{toggle()}}> <i class="fas fa-plus mr-2"></i>Demander un congé </button> 
                    </div>
                    </div>
                    <h4 class="no-margin-bottom">Liste des demandes de congé</h4>
                    <Alert severity="info" className="mb-3">Les demandes de congé doivent être validé par un responsable des ressources humaines pour aboutir.</Alert>
              
                <ReactDatatable
                config={config}
                records={Demande}
                columns={column}
                tHeadClassName ="text-center"
              
                />

               
                <h4 class="no-margin-bottom mt-4">Liste des demandes de prime</h4>
                <Alert severity="info" className="mb-3">Les demandes de primes doivent être validé par un responsable des ressources humaines pour aboutir.</Alert>

               <ReactDatatable
               config={config}
               records={prime}
               columns={column2}
               tHeadClassName ="text-center"
             
               />
                 </section>
            )
        }

     


      

        <MDBModal isOpen={open} toggle={()=>toggle()} size="md" disableBackdrop={true}>
              <MDBModalHeader toggle={()=>toggle()} className="text-center">Demander un congé</MDBModalHeader>
              <MDBModalBody>
                  <div className="d-flex justify-content-center">
                  <TextField className="col-6 text-center " id="standard-select-currency"
                        select required size="medium"
                        label="Type de congé"
                        value={type}
                        onChange={(e)=>{settype(e.target.value)}}>
                        <MenuItem  value={"Conge"}>Congé</MenuItem>
                    </TextField><br/>
                  </div>
            
              <div className="text-center justify-content-center">
              <DateRange
                    className="mt-5"
                    editableDateInputs={true}
                    onChange={item => setRequest([item.selection]) }
                    moveRangeOnFirstSelection={false}
                    ranges={Request}
                    locale={locales[locale]}
                /><br />
                <div className="row  justify-content-center col-12">
                <div className="col-6">
                <button onClick={()=>{AddRequest()}}  className="btn-add cardstat text-capitalize" style={{width:"100%"}} >
                    Valider
                </button>
                </div>
              </div>
              </div>
              </MDBModalBody>
              </MDBModal>

                {/* Update */}
              <MDBModal isOpen={editopen} toggle={()=>edittoggle()} size="md" disableBackdrop={true}>
              <MDBModalHeader toggle={()=>edittoggle()} className="text-center">Modifier le type ou/et la date du congé</MDBModalHeader>
              <MDBModalBody>
                  <div className="d-flex justify-content-center">
                  <TextField className="col-6 text-center " id="standard-select-currency"
                        select required size="medium"
                        label="Type de congé"
                        value={type}
                        onChange={(e)=>{settype(e.target.value)}}>
                        <MenuItem  value={"Conge"}>Congé</MenuItem>
                    </TextField><br/>
                  </div>
            
              <div className="text-center ">
              <DateRange
                    className="mt-5"
                    editableDateInputs={true}
                    onChange={(item) => setselectedRequest([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={selectedRequest}
                    locale={locales[locale]}
                />
                <br />
                    <div className="row  justify-content-center col-12">
                <div className="col-6">
                <button onClick={()=>{updateRequest()}} className="btn-add cardstat text-capitalize" style={{width:"100%"}} >
                    Modifier
                </button>
                </div>
              </div>
              </div>
              </MDBModalBody>
              </MDBModal>
              </>
    );
}

export default Demande
