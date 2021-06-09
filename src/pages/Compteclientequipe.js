import React , {useState , useEffect} from 'react'
import './../css/clientequipe.css'
import axios from 'axios'
import Api_url from './../component/Api_url'
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from "react-router-dom";
import accesdenied from './../images/ad.png'
import $ from 'jquery'
import TextField from '@material-ui/core/TextField';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import ReactDatatable from '@ashvin27/react-datatable';
import Badge from '@material-ui/core/Badge';
import Progressuser from './../component/Table/Progressuser'
import Colture from './../component/Table/Colture'
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';

import Lottie from 'react-lottie';
import Loading from './../images/loading.json'

function Compteclientequipe() {

    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'));
    const [equipeclient, setequipeclient] = useState([])
    const [length, setlength] = useState(3)
    const history = useHistory();
    const [loding, setloding] = useState(true)
    const [warningcount, setwarningcount] = useState(0)
    

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: Loading,
    };
    useEffect(() => {


        const loding = () =>{
          setloding(true)
            setTimeout(() => {
              setloding(false)
            }, 2000);
        }

        const getequipe = async() =>{
          const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'get',
            url : `${Api_url}user/equipecli/${user.id}`,  
            });
            setequipeclient(res.data.clients)  
            setlength(res.data.clients.length)
        }

        const getWarnningcount = async() =>{
          const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'get',
            url : `${Api_url}user/Requete/false/${user.id}`,  
            });
            console.log(res)
            setwarningcount(res.data.Count)
        }
        getWarnningcount()
        loding()
        getequipe()
        
        }, [])



        const gotoclient = (id , read) =>{
            if(read === "true"){
                history.push(`/client/${id}`)
            }
        }


       


const [column, setcolumn] = useState([
    {
      key: "name",
      text: "",
      cell: (client, index) => {
        return (
          <>
              <div className="d-flex flex-row"> <Avatar src={client.Clientimg.img_profile} style={{width: 40, height : 40}} /> 
              <p className="mt-1 ml-4">{client.Nom_compteCli}</p> </div>
           </>
        );
    }
    },
    {
      key: "prog",
      text: "Progrès",
      cell: (cli, index) => {
        return (
          <span className="text-center">
          <Progressuser client={cli}/>
           </span>
        );
    }
     
    },

    {
        key: "Clôturé",
        text: "Clôturé",
        sortable: true,
        cell: (cli, index) => {
          return (
            <p className="text-center mt-2">
           <Colture client={cli}/>
             </p>
          );
      }
      },

      {
        key: "Requete",
        text: "Requête",
        sortable: true,
        cell: (cli, index) => {
          return (
            <p className="text-center mt-2">
           {cli.Requetes.length}
             </p>
          );
      }
      },

    {
        key: "Action",
        text: "Action",
        cell: (cl, index) => {
          return (
            <p className="text-center">

                            {
                                cl.Auths[0].Permission.Read === "false" ? (
                                    <p className="mt-2" style={{color:'red'}}>denied</p>
                                ) : (
                                    <IconButton size="small" aria-label="eye" onClick={()=> gotoclient(cl.id ,cl.Auths[0].Permission.Read )} style={{color :"#388e3c"}} >
                                    <Visibility />
                                </IconButton> 
                                )
                            }
            
             </p>
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

    return (
        <div className=" col-12 ">

         
          {
              loding ? (
                <Lottie 
	    options={defaultOptions}
        height={"50%"}
        width={"50%"}
      />
              ) :(
                <>
                {/* <!-- Breadcrumb--> */}
                <header class="page-header">
          <div class="container-fluid">
            <h2 class="no-margin-bottom">Liste des clients</h2>
          </div>
        </header>
 <div className="breadcrumb-holder container-fluid">
   <ul className="breadcrumb">
     <li className="breadcrumb-item"><a href="home" onClick={()=>{history.push("/home")}}>Home</a></li>
     <li className="breadcrumb-item active">Clients</li>
     
   </ul>
 </div>

                <div className="row col-12 justify-content-end mb-2">
                <Alert className="cursor" severity="warning" onClick={(e)=>{history.push("/Requetes")}}>{warningcount}</Alert>
                </div>
                <ReactDatatable
                config={config}
                records={equipeclient}
                columns={column}
                tHeadClassName ="text-center"
                />
                </>
              )
          }
               
    
    
        </div>
    )
}

export default Compteclientequipe
