import React , {useState , useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios'
import $ from 'jquery'
import Api_url from './../component/Api_url';
import { ToastContainer, toast } from 'react-toastify';
import Popover from '@material-ui/core/Popover';
import { useHistory } from "react-router-dom";
import ReactDatatable from '@ashvin27/react-datatable';

import Lottie from 'react-lottie';
import Loading from './../images/loading.json'
// import { mdbTableEditor } from 'mdb-table-editor'


function Service(props) {
    const token = localStorage.getItem('token')
    const [open, setopen] = useState(false)
    const [suppopen, setsuppopen] = useState(false)
    const [editopen, seteditopen] = useState(false)
    const [popopen, setpopopen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedrow, setselectedrow] = useState({id: 26, Nom_service: "hhhh", createdAt: "2021-03-09T15:20:45.000Z", updatedAt: "2021-03-09T15:20:45.000Z"})
    const history = useHistory();
    const [loading, setloading] = useState(true)
    

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: Loading,
    };

    const toggle = () =>{
        setopen(!open)
    }

    const toggleSupp = () =>{
      setsuppopen(!suppopen)
    }


    const changeselected = (service) =>{
      setselectedrow(service)
      
    }

    const toggleEdit = () =>{
     
      seteditopen(!editopen)

     
    } 

    //datatable
    useEffect(() => {
      const loading_screen = ()=>{
         
          setloading(true)
          setTimeout(() => {
            setloading(false)
          }, 1500);
  
      }
      loading_screen()
    }, [])

    const [column, setcolumn] = useState([
     
      {
        key: "Nom_service",
        text: "Service",
      },
  
      {
        key: "Action",
        text: "Action",
        className:"table-mid",
        cell: (service, index) => {
          return (
            <>
              <IconButton className="float-right mr-3" size="small" aria-label="delete" color="secondary" onClick={()=> {changeselected(service);toggleSupp()}}>
              <DeleteIcon />
              </IconButton>
              <IconButton className="float-right mr-3" size="small" aria-label="delete" color="primary" onClick={()=>{changeselected(service); toggleEdit()}}>
              <EditIcon />
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




    useEffect(() => {
   // fonction affiche table
    const getservicelist = async ()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}service/`,  
        });
        setservices(res.data)
        
    }

    getservicelist()
    }, [])
  
    const [nomservice, setnomservice] = useState("")
    const [services, setservices] = useState([]);

    const [search, setsearch] = useState("")

// fonction add row table
    const Addservice = async (e) =>{
      e.preventDefault()
      const data = {
        nomService :nomservice,
       
      }
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'post',
        url : `${Api_url}service/`,
        data
        
        });
        console.log(res)
        if(res.status === 200){
          toast.success(`Le service ${res.data.service.Nom_service} a été ajoutée avec succès`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
              setTimeout(() => {
                setservices([res.data.service ,...services])
              }, 500);

              setnomservice("")


            
        }
        else {
          toast.error('error', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
        }
          
        


    }
  
  // fonction update table
    const updatedservice = async (e)=>{
      e.preventDefault()
      const data = {
         nomService : selectedrow.Nom_service,
       
      }
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'put',
        url : `${Api_url}service/update/service/${selectedrow.id}`,
        data
        
    });
   
        if(res.status === 200){
          toast.success(`Le service ${res.data.service.Nom_service} a été modifée avec succès`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
              setTimeout(() => {
                setservices(
                  services.map(item => 
                    item.id === res.data.service.id 
                    ? res.data.service 
                    : item )
                )
               
              }, 200);   
              seteditopen(!editopen)
        }
        else {
          toast.error('error', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
        }
    }

// fonction delete row table
const Suppservice = async (e)=>{
  e.preventDefault()
  const res = await axios({
    headers: {'Authorization': `Bearer ${token}`},
    method: 'delete',
    url : `${Api_url}service/${selectedrow.id}`
   
    
});

    if(res.status === 200){
      toast.success(`Le service ${res.data.service.Nom_service} a été supprimée avec succès`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        });
          setTimeout(() => {
            setservices(
                services.filter(item =>item.id !== res.data.service.id)
            )

          
          }, 200);   
          setsuppopen(!suppopen)
    }
    else {
      toast.error('error', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        });
    }
}





    return (
      <>
      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      

      {
        loading ? (
          <Lottie 
          options={defaultOptions}
            height={"70%"}
            width={"70%"}
            isClickToPauseDisabled={true}
          />
        ) : (
          <>
          <header class="page-header">
            <div class="container-fluid">
              <h2 class="no-margin-bottom">Liste des services</h2>
            </div>
        </header>
        {/* <!-- Breadcrumb--> */}
        <div class="breadcrumb-holder container-fluid">
          <ul class="breadcrumb">
              <li ><a href="home" ><ArrowBackIosIcon /></a></li>
              <li class="breadcrumb-item" >Home</li>
              <li class="breadcrumb-item active">Service</li>
          </ul>
        </div>

       
              <div className="row col-12 mb-2 justify-content-center">
          
                  <div className="col-4 mb-2"> 
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={()=>toggle(!open)}> Ajouter un nouveau service </Button> 
                  </div>
             </div>
          
                  <ReactDatatable
                    config={config}
                    records={services}
                    columns={column}
                    tHeadClassName ="text-center"
                    />
              
               
             

            
                      {/* MODAL ADD */}
            <MDBModal isOpen={open} toggle={()=>toggle()} size="lg">
              <MDBModalHeader toggle={()=>toggle()} className="text-center">Ajouter un nouveau service</MDBModalHeader>
              <MDBModalBody>
              <form className="row col-12 justify-content-center align-middle" >
                <div>
                      <div className="mb-5">
                        <TextField value={nomservice} onChange={(e)=>{setnomservice(e.target.value)}} id="standard-basic" label="Nom du service" required />
                      </div>
                      <Button onClick={(e)=>{Addservice(e)}} variant="outlined" class="btn btn-outline-success">
                      Ajouter
                      </Button> 
                </div>
              </form>
              </MDBModalBody>
              </MDBModal>
                      {/* MODAL EDIT */}
          <MDBModal isOpen={editopen} toggle={()=>toggleEdit()} size="lg">
              <MDBModalHeader toggle={()=>toggleEdit()} className="text-center">Modifier les données du service</MDBModalHeader>
              <MDBModalBody>
              <form className="row col-12 justify-content-center align-middle" >
            <div>
            <div className="mb-5">
            <TextField value={selectedrow.Nom_service} onChange={(e)=>{setselectedrow({...selectedrow , Nom_service : e.target.value})}} id="standard-basic" label="Nom du service" />
                    
                    </div>
                    <Button onClick={(e)=>{updatedservice(e)}} variant="outlined" class="btn btn-outline-success">
                    Modifier
                    </Button> 
              </div>
              </form>
              </MDBModalBody>
              </MDBModal>


                    {/* MODAL SUPP */}
              <MDBModal isOpen={suppopen} toggle={()=>toggleSupp()} size="lg">
              <MDBModalHeader toggle={()=>toggleSupp()} className="text-center sm">Supprimer le service</MDBModalHeader>
                  <MDBModalBody>
                      <div className="row col-12 ">
                        <div >
                          <p>Voulez-vous vraiment supprimer ce service ?</p>
                        </div>
                      </div>
                </MDBModalBody> 
                <div>
              <MDBModalFooter>
                      <Button color="primary" variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={(e)=>{Suppservice(e)}}>Supprimer</Button>
                      <Button color="primary" variant="contained" color="primary"  onClick={()=>toggleSupp()}>annuler</Button>
              </MDBModalFooter>
              </div>
              </MDBModal>

   

         
         
              </>

        )
      }
     
            </>
      
    );
}

export default Service