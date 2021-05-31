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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Action from './../component/RH/Action'
import Alert from '@material-ui/lab/Alert';

function RHdemande() {

    const token = localStorage.getItem('token')
    const [isloading, setisloading] = useState(true)
    const [demandes, setdemandes] = useState([])
   

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
            key:"Type",
            text: "Type",
            className :"table-mid text-center ",
        },
        {
            key: "Startdate",
            text: "Date de début",
            className :"table-mid text-center ",
          },
          {
            key: "enddate",
            text: "Date de fin", 
            className :"table-mid text-center ",
          },
        {
            key:"Action",
            text: "Action",
            className :"table-mid text-center ",

            cell: (demande, index) => {
                return (
                    
                    <Action  demande={demande} />
                )
              }

        }
    ])

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
            key:"",
            text: "Prime",
            className :"table-mid text-center ",
        },
        {
            key: "",
            text: "Bonus",
            className :"table-mid text-center ",
          },
        {
            key:"Action",
            text: "Action",
            className :"table-mid text-center ",

            cell: (demande, index) => {
                return (
                    
                    <Action  demande={demande} />
                )
              }

        }
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
             url : `${Api_url}Demande/`,
         })
         if(res.status === 200){
             setdemandes(res.data.demandes)
         }
         
        }
 
 
        loding()
        getalldemande()
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

    return (
        <div>

            <header class="page-header">
                <div class="container-fluid">
                    <h2 class="no-margin-bottom">Liste des demandes </h2>
                </div>
            </header>
   
            <div class="breadcrumb-holder container-fluid">
                <ul class="breadcrumb">
                <li ><a href="home" ><ArrowBackIosIcon /></a></li>
                <li class="breadcrumb-item" >Home</li>
                    <li class="breadcrumb-item active">Demande</li>
                </ul>
            </div>

            <div className="container-fluid card cardstat mt-3 mb-3">
                    <h2 class="no-margin-bottom">Liste des demandes de congé</h2>
 
                    <Alert severity="info" className="mb-3">Les demandes de congé doivent être validé par un responsable des ressources humaines pour aboutir.</Alert>
                </div>

            {
                isloading ? (
                    <Lottie 
                    options={defaultOptions}
                    height={"40%"}
                    width={"40%"}
                    isClickToPauseDisabled={true}
                  />
                ) : (
                    
                <ReactDatatable
                config={config}
                records={demandes}
                columns={column}
                tHeadClassName ="text-center"/>
                
                )
            }
<hr/>
<div className="container-fluid card cardstat mt-3 mb-3">
                    <h2 class="no-margin-bottom">Liste des demandes de prime</h2>
 
                    <Alert severity="info" className="mb-3">Les demandes de primes doivent être validé par un responsable des ressources humaines pour aboutir.</Alert>
                </div>
            {
                isloading ? (
                    <Lottie 
                    options={defaultOptions}
                    height={"40%"}
                    width={"40%"}
                    isClickToPauseDisabled={true}
                  />
                  
                ) : (
                    
                <ReactDatatable
                config={config}
                records={demandes}
                columns={column2}
                tHeadClassName ="text-center"/>
                
                )
            }
          
        </div>
    )
}

export default RHdemande
