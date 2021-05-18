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
import Action from './../component/RH/Action'

function RHdemande() {

    const token = localStorage.getItem('token')
    const [isloading, setisloading] = useState(true)
    const [demandes, setdemandes] = useState([])

    const [column, setcolumn] = useState([
        {
          key: "Employee",
          text: "Employee",
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
            className : "table-ssmall",
        },
        {
            key: "Startdate",
            text: "Startdate",
            className :"table-ssmall"
          },
          {
            key: "enddate",
            text: "enddate", 
            className :"table-ssmall"
          },
        {
            key:"Action",
            text: "Action",
            className : "table-ssmall",

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
                    <h2 class="no-margin-bottom">Liste des demandes de congé </h2>
                </div>
            </header>
   
            <div class="breadcrumb-holder container-fluid">
                <ul class="breadcrumb">
                    <li class="breadcrumb-item" ><a href="home" >Home </a></li>
                    <li class="breadcrumb-item active">Demande</li>
                </ul>
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
                columns={column}/>
                )
            }
          
        </div>
    )
}

export default RHdemande
