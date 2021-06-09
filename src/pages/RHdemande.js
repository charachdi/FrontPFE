import React,{ useState , useEffect , forwardRef} from 'react'
import ReactDatatable from '@ashvin27/react-datatable';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import Api_url from './../component/Api_url';
import Visibility from '@material-ui/icons/Visibility';
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
import Primeaction from './../component/RH/Primeaction'
import Alert from '@material-ui/lab/Alert';

function RHdemande() {

    const token = localStorage.getItem('token')
    const [isloading, setisloading] = useState(true)
    const [demandes, setdemandes] = useState([])
    const [prime, setprime] = useState([]);
    const [open, setopen] = useState(false);
    const [equipedemande, setequipedemande] = useState({
      "M": "01",
      "Y": "01",
      "SPrimes": [
          {
              "Bonus": 1200,
              "Prime": 12000,
              "Comment": "commentaire",
              "User": {
                  "id": 2,
                  "full_name": "Amira KHEZAMI",
                  "user_img": null
              }
          },
          {
              "Bonus": 1200,
              "Prime": 12000,
              "Comment": "commentaire",
              "User": {
                  "id": 4,
                  "full_name": "Talel Tazni",
                  "user_img": "http://localhost:3001/userimg/1622299199511.jpg"
              }
          }
      ]
  })
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
          key: "Equipe",
          text: "Equipe",
          cell: (demande, index) => {
            return (
             <p className="text-center">{demande.Equipe.Nom_equipe}</p>
            )
          }
        },
        {
            key:"Service",
            text: "Service",
            cell: (demande, index) => {
              return (
               <p className="text-center">{demande.Equipe.Service.Nom_service}</p>
              )
            }

        },
        {
          key:"Date",
          text: "Date",
          cell: (demande, index) => {
            return (
             <p className="text-center">{demande.M}/{demande.Y} </p>
            )
          }

      },
        {
            key: "Primes",
            text: "Primes",
            className : "table-ssmall text-center",
            cell: (demande, index) => {
              return (
                <IconButton size="small" className="float-center " aria-label="eye" style={{color :"#388e3c"}} onClick={()=>{setequipedemande(demande);toggle()}}>
                <Visibility />
                </IconButton> 
              )
            }

          },
        {
            key:"Action",
            text: "Action",
            className :"table-mid text-center ",

            cell: (demande, index) => {
                return (
                    
                    <Primeaction  demande={demande} />
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
        const getalldemandeprime = async()=>{
          const res = await axios({
              headers: {'Authorization': `Bearer ${token}`},
              method: 'get',
              url : `${Api_url}Demande/Prime/RH`,
          })
          if(res.status === 200){
             setprime(res.data.prime)
          }
          
         }
 
        loding()
        getalldemande()
        getalldemandeprime()
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
                <li class="breadcrumb-item" >Accueil</li>
                    <li class="breadcrumb-item active">Demande</li>
                </ul>
            </div>

            <div className="container-fluid card cardstat mt-3 mb-3">
                 
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
                    <>
              <h2 class="no-margin-bottom">Liste des demandes de congé</h2>
    <Alert severity="info" className="mb-3">Les demandes de congé doivent être validé par un responsable des ressources humaines pour aboutir.</Alert>
                <ReactDatatable
                config={config}
                records={demandes}
                columns={column}
                tHeadClassName ="text-center"/>
<hr />
<h2 class="no-margin-bottom mt-4">Liste des demandes de prime</h2>
 
 <Alert severity="info" className="mb-3">Les demandes de primes doivent être validé par un responsable des ressources humaines pour aboutir.</Alert>

                <ReactDatatable
                config={config}
                records={prime}
                columns={column2}
                tHeadClassName ="text-center"/>
                </>
                )
            }
 {/* MODAL prime */}
 <MDBModal isOpen={open} toggle={()=>toggle()} size="lg" disableBackdrop={false}>
              <MDBModalHeader toggle={()=>toggle()} className="text-center sm">Demande Prime</MDBModalHeader>
                  <MDBModalBody>
                    
                      <div className="row col-12 " >
                              <table className="table  ">
            <thead style={{backgroundColor: "#E9ECEF" , color : "black"}} >
                <tr className="text-center">
                    <th>Employee</th>
                    <th>Prime</th>
                    <th>Bonus</th>
                    <th>Commentaire</th>
                    
                </tr>
            </thead>
            <tbody className="text-center">
            {
                equipedemande.SPrimes.map((dem , index)=>(
                  <tr>
                  <td className="d-flex flex-row text-center">
                    <Avatar src={dem.User ? dem.User.user_img : ""} alt={dem.User ? dem.User.full_name : ""} style={{width : 50 , height : 50}}/>
                    <span className="mt-2 ml-3">{dem.User ? dem.User.full_name : ""}</span>
                  </td>
                  <td >{dem.Prime}</td>
                  <td>{dem.Bonus}</td>
                  <td>{dem.Comment}</td>

                  </tr>
            ))
             
                               
                              }
                  
            </tbody>
            
        </table>
                      </div>
                   
                </MDBModalBody> 
              
              </MDBModal>
        </div>
    )
}

export default RHdemande
