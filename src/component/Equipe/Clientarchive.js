import React , {useState , useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios'
import $ from 'jquery'
import Api_url from './../../component/Api_url';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import Lottie from 'react-lottie';
import Loading from './../../images/loading.json'
import ReactDatatable from '@ashvin27/react-datatable';
import Onecompte from './../../component/Onecompte'


import Archiveprogress from '../Table/Archiveprogress'
import Colture from '../Table/Colture'
import Archive from '../Table/Archive'
import Cours from '../../images/Cours'

function Clientarchive(props) {


    const [loading, setloading] = useState(true)
    const history = useHistory();
    const [archi, setarchi] = useState([]);

    useEffect(() => {
        const loading_screen = ()=>{
           
            setloading(true)
            setTimeout(() => {
              setloading(false)
            }, 800);
    
        }

        const getarchive = ()=>{
          setarchi(props.archive)
        }

        loading_screen()
        getarchive()
      }, [props.archive])


      const [column, setcolumn] = useState([
        {
          key: "name",
          text: "",
          cell: (client, index) => {
            return (
              <>
                  <div className="d-flex flex-row"> <Avatar src={client.Clientimg ? client.Clientimg.img_profile : "aaa"} style={{width: 40, height : 40}} /> 
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
              <>
              <Archiveprogress client={cli} ar={props.archive}/>
               </>
            );
        }
        },
    
        {
          key: "Clôturé",
          text: "Clôturé",
          sortable: true,
          cell: (cli, index) => {
            return (
              <>
             <Colture client={cli}/>
               </>
            );
        }
        },
        {
          key: "cours",
          text: "En cours",
          sortable: true,
          cell: (cli, index) => {
            return <Cours client={cli}/>
        }
        },
    
        {
          key: "Requete",
          text: "Requête",
          sortable: true,
          cell: (cli, index) => {
            return (
              <>
             {cli.Requetes.length}
               </>
            );
        }
        },
        {
          key: "Action",
          text: "Action",
          cell: (cli, index) => {
            return (
              <>
              <IconButton size="small" aria-label="delete" color="primary" onClick={()=>{history.push(`/client/${cli.id}`)}} style={{color :"#388e3c"}}>
                <Visibility />
              </IconButton>    
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
          <>      
              <ReactDatatable
                config={config}
                records={props.archive}
                columns={column}/>
        </>
    )
}

export default Clientarchive
