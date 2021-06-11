import React , {useState , useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import ReplayIcon from '@material-ui/icons/Replay';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios'
import $ from 'jquery'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Api_url from './../component/Api_url';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import ReactDatatable from '@ashvin27/react-datatable';
import GroupIcon from '@material-ui/icons/Group';
import Select from '@material-ui/core/Select';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Lottie from 'react-lottie';
import Loading from './../images/loading.json'
import { Avatar } from '@material-ui/core';
// import { mdbTableEditor } from 'mdb-table-editor'


function Equipe(props) {
    const token = localStorage.getItem('token')
    const [open, setopen] = useState(false)
    const history = useHistory();
    const [primecheck, setprimecheck] = useState(false);
    const [suppopen, setsuppopen] = useState(false)
    const [editopen, seteditopen] = useState(false)
    const [primeopen, setprimeopen] = useState(false);
    const [selectedrow, setselectedrow] = useState({id: 26, Nom_equipe: "hhhh", Service: "Telephonie", createdAt: "2021-03-09T15:20:45.000Z", updatedAt: "2021-03-09T15:20:45.000Z"})
    const [services, setservices] = useState([])
    const [servicename, setservicename] = useState(selectedrow.Service ? selectedrow.Service.Nom_service :"")
    const [primeloading, setprimeloading] = useState(true);
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
    const [Prime, setPrime] = useState([])
   
    const [hovered, sethovered] = useState(false)
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


    const changeselected = (equipe) =>{
      setselectedrow(equipe)
    }

    const toggleEdit = () =>{
     
      seteditopen(!editopen)

     
    } 

   

    // datatable
    const [loading, setloading] = useState(true)


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
        key: "Nom_equipe",
        text: "Equipe",
        className:"text-center",
        
        
      },
  
      {
        key: "Service",
        text: "Service",
        className:"text-center",
        cell: (equipe, index) => {
          return equipe.Service.Nom_service
      }
      },
      {
        key: "",
        text: "Member d'equipe",
        className : "table-mid text-center",
        cell: (equipe, index) => {
          return (
            <IconButton className="float-center mr-2" size="small" aria-label="delete" color="primary" >
            <GroupIcon /> <span className="ml-2" style={{fontSize:15}}>{equipe.Users.length}</span>
            </IconButton> 
          )
      }
      },
      {
        key: "",
        text: "Accorder prime",
        className : "table-mid text-center",
        cell: (equipe, index) => {
          return (
            <div className="text-center">

              {
                  equipe.Primes[0] ? (
                    <IconButton size="small" className="float-center mr-3" aria-label="eye" style={{color :"#388e3c"}} onClick={(e)=>{ setequipedemande(equipe.Primes[0]) ; setprimeopen(!primeopen)}} >
                    <Visibility />
                    </IconButton> 
                  ) : (
                    <IconButton className="float-center mr-3" disabled={equipe.Users.length === 0 ? true : false} size="small" aria-label="delete" color="primary" onClick={()=>{getequipeprime(equipe.id); setprimeopen(!primeopen)}}>
                    <EditIcon />
                    </IconButton>
                  )
              }


            </div>
          )
      }
      },
      {
        key: "Action",
        text: "Action",
        className : "table-action text-center",
        cell: (equipe, index) => {
          return (
            <>
                       
                       
                        <IconButton className="float-right mr-3" disabled={equipe.Users.length !== 0 ? true : false} size="small" aria-label="delete" color="secondary" onClick={()=> {changeselected(equipe);toggleSupp()}}>
                        <DeleteIcon />
                        </IconButton>

                        <IconButton className="float-right mr-3" size="small" aria-label="delete" color="primary" onClick={()=>{changeselected(equipe); toggleEdit()}}>
                        <EditIcon />
                        </IconButton>
                        <IconButton size="small" className="float-right mr-3" aria-label="eye" onClick={()=>{history.push(`/equipe/${equipe.id}`)}} style={{color :"#388e3c"}} >
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

    useEffect(() => {
   // fonction affiche table
    const getequipelist = async ()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}equipe/`,  
        });
        setequipes(res.data)
        console.log(res)
     
       
    }


    const getservices = async () =>{
        const res = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'get',
          url : `${Api_url}service/`,  
          });
            setservices(res.data)
          
    }


    const getdata = async() =>{
      const user =  JSON.parse(localStorage.getItem('user'))
//get the current user 
      const currentuser = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}user/${user.id}`,  
        });

      
    if(currentuser.data.user.user_level === "Chef Service"){
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}service/dataservice/${currentuser.data.user.Chef.ServiceId}`,  
        });
        console.log(res)
        setservices([res.data.service])
        setequipes(res.data.equipes)
      
    }
    else{
      getequipelist()
      getservices()
    }

  } 

  getdata()
   
    }, [])
   
    const [nomequipe, setnomequipe] = useState("")
    const [service, setservice] = useState("")
    const [equipes, setequipes] = useState([]);

    const [search, setsearch] = useState("")
// fonction add row table
    const Addequipe = async (e) =>{
      e.preventDefault()
      const data = {
        ServiceID :service,
        nomEquipe:nomequipe,
      }
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'post',
        url : `${Api_url}equipe/`,
        data
        
        });
        console.log(res)
        if(res.status === 200){
          toast.success(`L'équipe ${res.data.equipe.Nom_equipe} a été ajoutée avec succès`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
              setTimeout(() => {
                setequipes([res.data.equipe ,...equipes])
              }, 500);

              setnomequipe("")
              setservice("")
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
    const updatedequipe = async (e)=>{
      e.preventDefault()
      const data = {
        ServiceID :selectedrow.Service.id,
        nomEquipe:selectedrow.Nom_equipe,
      }
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'put',
        url : `${Api_url}equipe/update/equipe/${selectedrow.id}`,
        data
        
    });

    console.log(res)
   
        if(res.status === 200){
          toast.success(`L'équipe ${res.data.equipe.Nom_equipe} a été modifée avec succès`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
           
              setTimeout(() => {
                setequipes(
                  equipes.map(item => 
                    item.id === res.data.equipe.id 
                    ? res.data.equipe 
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
const Suppequipe = async (e)=>{
  e.preventDefault()
  const res = await axios({
    headers: {'Authorization': `Bearer ${token}`},
    method: 'delete',
    url : `${Api_url}equipe/${selectedrow.id}`
   
    
});

    if(res.status === 200){
      toast.success(`L'équipe ${res.data.equipe.Nom_equipe} a été supprimée avec succès`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        });
          setTimeout(() => {          
            setequipes(
              equipes.filter(item =>item.id !== res.data.equipe.id)
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


const getequipeprime = async (id)=>{
  const res = await axios({
    headers: {'Authorization': `Bearer ${token}`},
    method: 'get',
    url : `${Api_url}Demande/equipe/prime/${id}`
  })
 
  setequipedemande(res.data.demandes)
  console.log(equipedemande)
}



const createPrime = async ()=>{
  const data = {
    Prime : {
        eqId :equipedemande.eqid,
        M: equipedemande.M,
        Y: equipedemande.Y,
    },
    Sprime : equipedemande.SPrimes
  }
  
  const res = await axios({
    headers: {'Authorization': `Bearer ${token}`},
    method: 'post',
    url : `${Api_url}Demande/equipe/prime`,
    data
  })
  setprimeopen(!primeopen)
  setequipes(
    equipes.map(item => 
        item.id === res.data.eq.id 
        ? res.data.eq 
        : item 
))
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
            <h2 class="no-margin-bottom">Liste des équipes</h2>
          </div>
        </header>
       
        <div class="breadcrumb-holder container-fluid">
          <ul class="breadcrumb cardstat">
          <li > <a onMouseEnter={() => sethovered(true)} onMouseLeave={() => sethovered(false)} style={{color : hovered ? "#38D39F" : ""}}  onClick={()=>{ window.history.back()}}  ><ArrowBackIosIcon /></a></li>
          <li class="breadcrumb-item" >Accueil</li>
            <li class="breadcrumb-item active">Equipe</li>
          </ul>
        </div>
       
        
              <div className="row col-12 mb-2 justify-content-center">
             
          
             <div id="addbtn" className="col-3 mb-2" >  
            <button className="btn-add cardstat text-capitalize" onClick={()=>toggle(!open)} style={{width:"100%"}}><i class="fas fa-plus mr-2"></i>Ajouter une nouvelle équipe </button>
             </div>
              </div>

             <ReactDatatable
              config={config}
              records={equipes}
              columns={column}
              tHeadClassName ="text-center"
              />
             
          

                      {/* MODAL ADD */}
            <MDBModal isOpen={open} toggle={()=>toggle()}  size="lg" disableBackdrop={true}>
              <MDBModalHeader toggle={()=>toggle()} className="text-center">Ajouter une nouvelle équipe</MDBModalHeader>
              <MDBModalBody>
              <Alert severity="info" className="mb-3 justify-content-center">les deux zones doivent être remplies pour finaliser l'ajout !</Alert>
              <form className="row col-12 justify-content-center align-middle" >
                    
                    <div className="mb-5 col-12">
                    <TextField className="col-6" value={nomequipe} onChange={(e)=>{setnomequipe(e.target.value)}} id="standard-basic" label="Nom de l'equipe" required />
                    <TextField className="ml-5 col-5" id="standard-select-currency"  select required size="medium" label="Service"value={service} onChange={(e)=>{setservice(e.target.value)}}>
                    <MenuItem ></MenuItem>
                            {
                              services.map((ser , index)=>(
                                <MenuItem key={index} value={ser.id}>{ser.Nom_service}</MenuItem>
                              ))
                            }
                            
                    </TextField>

                            
                    </div>
                    <div className=" col-4">
                    <button onClick={(e)=>{Addequipe(e)}} variant="outlined" className="btn-add cardstat text-capitalize">
                    Ajouter
                    </button> 
                    </div>
              </form>
              </MDBModalBody>
              </MDBModal>

                      {/* MODAL EDIT */}
              <MDBModal isOpen={editopen} toggle={()=>toggleEdit()} disableBackdrop={true} size="lg">
              <MDBModalHeader toggle={()=>toggleEdit()} className="text-center">Modifier les données de l'équipe</MDBModalHeader>
              <MDBModalBody>
              <Alert severity="info" className="justify-content-center mb-3">Vous pouvez changer le nom de l'équipe ou/et le service !</Alert>
            <form className="row col-12 justify-content-center align-middle" >
              <div className="mb-5 col-12">
                    <TextField value={selectedrow.Nom_equipe} onChange={(e)=>{setselectedrow({...selectedrow , Nom_equipe : e.target.value})}}  className="col-6" id="standard-basic" label="Nom de l'equipe" />
                            <TextField
                              className="ml-5 col-5"
                              id="standard-select-currency"
                              select
                              size="medium"
                              label="Service"
                              defaultValue="aaaaa"
                              value={selectedrow.Service ? selectedrow.Service.id : null}
                              onChange={(e)=>{setselectedrow({...selectedrow , Service : {
                                id : e.target.value
                              } })}}
                            >
                          { 
                              services.map((ser , index)=>(
                                <MenuItem key={index} value={ser.id}>{ser.Nom_service}</MenuItem>
                              ))
                            }
                    </TextField>
                </div>
                <div className=" col-4 ">
                        <button onClick={(e)=>{updatedequipe(e)}} variant="outlined" className="btn-add cardstat text-capitalize">
                          Modifier
                        </button> 
                </div>
           </form>
              </MDBModalBody>
              </MDBModal>


                    {/* MODAL SUPP */}
              <MDBModal isOpen={suppopen} toggle={()=>toggleSupp()} size="lg" disableBackdrop={true}>
              <MDBModalHeader toggle={()=>toggleSupp()} className="text-center sm">Supprimer l'équipe</MDBModalHeader>
                  <MDBModalBody>
                     <Alert severity="warning" className="justify-content-center">Seule les équipes n'ayant aucun collaborateur peuvent être supprimer !</Alert>
                      <div className="row col-12 ">
                         <p>Voulez-vous vraiment supprimer cette équipe ?</p>
                      </div>
                </MDBModalBody> 
                <div>
              <MDBModalFooter>
                      <Button color="primary" variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={(e)=>{Suppequipe(e)}}>Supprimer</Button>
                      <Button color="primary" variant="contained" color="primary"  onClick={()=>toggleSupp()}>annuler</Button>
              </MDBModalFooter>
              </div>
              </MDBModal>
              


  
                    {/* MODAL prime */}
                    <MDBModal isOpen={primeopen} toggle={()=>setprimeopen(!primeopen)} size="lg" disableBackdrop={false}>
              <MDBModalHeader toggle={()=>setprimeopen(!primeopen)} className="text-center sm">Demande Prime</MDBModalHeader>
                  <MDBModalBody>
                    
                      <div className="row col-12 ">
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
                  <td className="d-flex flex-row">
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
                     {
                       equipedemande.New ? (
                        <div className="d-flex justify-content-center">
                        {/* <Alert severity="success" className="text-center  mr-4">votre demande sera traitée</Alert> */}
                        <div className="row col-12 justify-content-center">
                            <button  className="btn-add cardstat text-capitalize"  onClick={()=>createPrime()} style={{width:"30%" }}>Valider</button>
                        </div> 
                       </div>
                       
                       ) : (
                        <div className="row col-12 justify-content-center">
                        {
                          equipedemande.waiting ? (
                            <div className="d-flex justify-content-center">
                            <Alert severity="info" className="text-center mr-4">votre demande sera traitée</Alert>
                            <i style={{color:"#2ECD94"}} className=" fas fa-spinner fa-spin fa-2x mt-1"></i>
                           </div>
                          ) : (
                           equipedemande.Approved ? (
                              <div className="d-flex justify-content-center">
                              <Alert severity="success" className="text-center  mr-4">votre demande a été acceptée</Alert>
                             <IconButton size="small" className="float-center" style={{color:"white" , backgroundColor :"#2ECD94" , width : 50 , height : 50}}>
                               <CheckIcon />
                             </IconButton>
                             </div>
                         ) : (
                           <>
                          <div className="d-flex justify-content-center">
                          <Alert severity="error" className="text-center mr-4">votre demande a été refusée</Alert>
                             <IconButton size="medium" style={{color:"white" , backgroundColor :"#ff0000"}}>
                              <CloseIcon />
                             </IconButton>
                           
                             </div><br />
                             <IconButton size="medium" className="ml-5" style={{color:"white" , backgroundColor :"#f2c857"}}>
                              <ReplayIcon />
                             </IconButton>
                          </>
                         )
                          )
                        }
                        </div>
   
                       )
                     }
                     
                </MDBModalBody> 
              
             
                 
              
              
              
              </MDBModal>

         
          </>
        )
      }
     
      

            
            </>
      
    );
}

export default Equipe