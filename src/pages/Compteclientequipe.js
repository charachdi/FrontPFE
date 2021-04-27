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


function Compteclientequipe() {

    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'));
    const [equipeclient, setequipeclient] = useState([])
    const [length, setlength] = useState(3)
    const history = useHistory();
    
    useEffect(() => {


        const loding = () =>{
            
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
        getequipe()
        
        }, [])



        const gotoclient = (id , read) =>{
            if(read === "true"){
                history.push(`/client/${id}`)
            }
        }


        const filter = () =>{
            var value = $("#client-search").val().toLowerCase();
        $("#clientlist #client").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            console.log($(this).text().toLowerCase())
            
  });  

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
      text: "Progress",
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
        text: "Requete",
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
                                    <img src={accesdenied} className="access" style={{filter:"none"}}/>
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
    }
  }

    return (
        <div className="row col-12 justify-content-center">
               
     <ReactDatatable
                config={config}
                records={equipeclient}
                columns={column}/>
    
        </div>
    )
}

export default Compteclientequipe
