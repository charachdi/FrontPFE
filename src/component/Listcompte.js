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
import Api_url from './../component/Api_url';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import Lottie from 'react-lottie';
import Loading from './../images/loading.json'
import ReactDatatable from '@ashvin27/react-datatable';
import Onecompte from './../component/Onecompte'

function Listcompte(props) {

//    props.clients
const [loading, setloading] = useState(true)
const history = useHistory();
const filter = ()=>{
  
    var value = $("#equipclient").val()
    $("#equipeclitab tbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  }


  useEffect(() => {
    const loading_screen = ()=>{
       
        setloading(true)
        setTimeout(() => {
          setloading(false)
        }, 800);

    }
    loading_screen()
  }, [])


console.log(props.clients)


  const [column, setcolumn] = useState([
    {
      key: "Numero_de_la_requete",
      text: "#",
    },
     {
      key: "Numero_de_la_requete",
      text: "#",
    },
     {
      key: "Numero_de_la_requete",
      text: "#",
    },
    {
      key: "Numero_de_la_requete",
      text: "#",
    },
    {
      key: "Numero_de_la_requete",
      text: "#",
    },
    {
      key: "Numero_de_la_requete",
      text: "#",
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
        

                    {/* <MDBFormInline className="md-form mb-4">
                        <MDBIcon icon="search" className="mr-1" />
                        <TextField id="equipclient" onChange={filter} label="search" variant="outlined" size='small' />
                    </MDBFormInline> */}
              <ReactDatatable
                config={config}
                records={props.clients}
                columns={column}/>
         {/* <Table id="equipeclitab" className="col-12 justify-content-center" size={"small"}  striped bordered hover>
                    
                    <thead>
                    <tr>
                        <th style={{width:"80%"}}></th>
                        <th style={{width:"10%"}}>Progress</th>
                        <th style={{width:"10%"}}>Cl??tur??</th>
                        <th style={{width:"10%"}}>En cours</th>
                        <th style={{width:"10%"}}>Requete</th>
                        <th style={{width:"10%"}}>Action</th>
                      </tr>
                    </thead>
                    <tbody id="client-body">

                        
                    {
                        props.clients.map((cli,index)=>(
                       <Onecompte key={index} client={cli}/>
                        ))
                    }
                    
                        
                    </tbody>
                    </ Table > */}
        </>
    )
}

export default Listcompte
