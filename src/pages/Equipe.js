import React , {useState , useEffect} from 'react'
import Table from 'react-bootstrap/Table'
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
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios'
import $ from 'jquery'
import Api_url from './../component/Api_url';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import GroupIcon from '@material-ui/icons/Group';
import Select from '@material-ui/core/Select';
// import { mdbTableEditor } from 'mdb-table-editor'


function Equipe() {
    const token = localStorage.getItem('token')
    const [open, setopen] = useState(false)
    const history = useHistory();
    const [suppopen, setsuppopen] = useState(false)
    const [editopen, seteditopen] = useState(false)
    
    const [selectedrow, setselectedrow] = useState({id: 26, Nom_equipe: "hhhh", Service: "Telephonie", createdAt: "2021-03-09T15:20:45.000Z", updatedAt: "2021-03-09T15:20:45.000Z"})
    const [services, setservices] = useState([])
    const [servicename, setservicename] = useState(selectedrow.Service ? selectedrow.Service.Nom_service :"")
    const [change, setchange] = useState({
      first : 0,
      second : 7,
    })
   
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

    useEffect(() => {
   // fonction affiche table
    const getequipelist = async ()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}equipe/`,  
        });
        setequipes(res.data)
        setshownrow(res.data.slice(0,rowselected))
       
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
        setshownrow(res.data.equipes.slice(0,rowselected))
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
    const [shownrow, setshownrow] = useState([])
    const [rowselected, setrowselected] = useState(7)
    const [pageselected, setpageselected] = useState(1)
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
                setshownrow([res.data.equipe ,...shownrow])
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

                setshownrow(
                  shownrow.map(item => 
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
            setshownrow(
              shownrow.filter(item =>item.id !== res.data.equipe.id)
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

const filter = () =>{
    var value = $("#equipe-search").val().toLocaleLowerCase()
    $("#equipe-body .true").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
     console.log( $(this).text())
    }); 
}



const handelchangerow = (e)=>{
  setrowselected(e.target.value)
  setshownrow(equipes.slice(0,e.target.value))
}

const Nextpage = (e) =>{
console.log("next")
setpageselected(pageselected +1)

if(shownrow.length != 0){
  change.first =   parseInt(change.first) +  parseInt(rowselected)
  change.second =   parseInt(change.first) +  parseInt(rowselected) 
  
  setshownrow(equipes.slice(change.first,change.second))
}



setTimeout(() => {
  console.log(`
  prev : ${change.first}
  new : ${change.second}
`)
}, 2000);

}

const Prevpage = (e) =>{
  console.log("prev")
  
  change.first =    parseInt(change.first) -   parseInt(rowselected)
  change.second =   parseInt(change.second) -   parseInt(rowselected)

  if(change.first < 0 ){
    change.first = 0
    change.second = rowselected
  }

  if(pageselected === 1){
    setpageselected(1)
  }
  else{
    setpageselected(pageselected - 1)

  }
 
  
  setshownrow(equipes.slice(change.first,change.second))
  
  setTimeout(() => {
    console.log(`
    prev : ${change.first}
    new : ${change.second}
  `)
  }, 2000);
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
      
      <header class="page-header">
            <div class="container-fluid">
              <h2 class="no-margin-bottom">Liste des équipes</h2>
            </div>
          </header>
          {/* <!-- Breadcrumb--> */}
          <div class="breadcrumb-holder container-fluid">
            <ul class="breadcrumb">
            <li class="breadcrumb-item" ><a href="home" >Home </a></li>
              <li class="breadcrumb-item active">Equipe</li>
            </ul>
          </div>

        <div className="row  justify-content-center">
            <div className="col-12 text-center">
            

            <div className="row col-12 mb-2">
              <div id="ser" className="col-xl-4 col-lg-4 col-md-3 col-sm-4 col-4"> 
              <MDBCol >
                <MDBFormInline className="row md-form">
                  <MDBIcon icon="search" />
                  <TextField className="ml-3 " size="small" style={{width:"50%"}} label="Recherche" variant="outlined" id="equipe-search" type="text" onChange={()=>{filter()}}/>
                </MDBFormInline>
              </MDBCol>
              
               </div> 

               <div  className="row col-xl-4 col-lg-4 col-md-5 col-sm-4 col-4d-flex justify-content-between" style={{width:"50%"}}>
               <h5 id="pagebtn" className="text-center mt-2 "><i class="fas fa-arrow-left mr-5 cursor" onClick={(e)=>{Prevpage(e)}}></i>{pageselected}<i class="fas fa-arrow-right ml-5 cursor" onClick={(e)=>{Nextpage(e)}}></i></h5>
               <TextField className="col-2  mt-2" size="small" type="number" value={rowselected} onChange={(e)=>{handelchangerow(e)}} id="row_shown" />
               </div>
               <div id="addbtn" className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4" style={{width:"50%"}}> 
                <Button variant="contained"  color="primary" startIcon={<AddIcon />} onClick={()=>toggle(!open)}> Ajouter </Button> 
               </div>
            </div> 
                <Table  striped bordered hover>
                    
                    <thead>
                    <tr>
                        <th style={{width:50}}>#</th>
                        <th>Equipe</th>
                        <th>Service</th>
                        <th style={{width:150}}>Action</th>
                      </tr>
                    </thead>
                    <tbody id="equipe-body">


                      {
                        shownrow.map((equipe , index)=>(
                            <tr className="true" key={index} id={equipe.id}>
                        <td> {equipe.id}</td>
                        <td id="Nomeq" > {equipe.Nom_equipe}</td>
                        <td id="Ser"> {equipe.Service ? equipe.Service.Nom_service : "no service"}
                        <IconButton className="float-right mr-2" size="small" aria-label="delete" color="primary" >
                        <GroupIcon /> <span className="ml-2" style={{fontSize:15}}>{equipe.Users.length}</span>
                        </IconButton> </td>
                        <td>
                        <IconButton className="mr-3" size="small" aria-label="delete" color="secondary" onClick={()=> {changeselected(equipe);toggleSupp()}}>
                        <DeleteIcon />
                        </IconButton>
                        <IconButton className="mr-3" size="small" aria-label="delete" color="primary" onClick={()=>{changeselected(equipe); toggleEdit()}}>
                        <EditIcon />
                        </IconButton>
                        <IconButton size="small" aria-label="eye" onClick={()=>{history.push(`/equipe/${equipe.id}`)}} style={{color :"#388e3c"}} >
                        <Visibility />
                        </IconButton>     
                        </td>
                      </tr>
                          ))
                      }
                      


                    </tbody>
            </Table>

                        {/* MODAL ADD */}
              <MDBModal isOpen={open} toggle={()=>toggle()}  size="lg" disableBackdrop={true}>
                <MDBModalHeader toggle={()=>toggle()} className="text-center">Ajouter une nouvelle équipe</MDBModalHeader>
                <MDBModalBody>
                <form className="row col-12 justify-content-center align-middle" >
                      
                      <div className="mb-5 col-12">
                      <TextField className="col-3" value={nomequipe} onChange={(e)=>{setnomequipe(e.target.value)}} id="standard-basic" label="Nom de l'equipe" required />
                      <TextField className="ml-5 col-2" id="standard-select-currency"  select required size="medium" label="Service"value={service} onChange={(e)=>{setservice(e.target.value)}}>
                      <MenuItem ></MenuItem>
                              {
                                services.map((ser , index)=>(
                                  <MenuItem key={index} value={ser.id}>{ser.Nom_service}</MenuItem>
                                ))
                              }
                              
                      </TextField>

                              
                      </div>
                      <div className=" col-7">
                      <Button onClick={(e)=>{Addequipe(e)}} variant="outlined" class="btn btn-outline-success">
                      Ajouter
                      </Button> 
                      </div>
                </form>
                </MDBModalBody>
                </MDBModal>
                        {/* MODAL EDIT */}
                <MDBModal isOpen={editopen} toggle={()=>toggleEdit()} disableBackdrop={true} size="lg">
                <MDBModalHeader toggle={()=>toggleEdit()} className="text-center">Modifier les données de l'équipe</MDBModalHeader>
                <MDBModalBody>
                <form className="row col-12 justify-content-center align-middle" >
              <div>
              <div className="mb-3">
              <TextField value={selectedrow.Nom_equipe} onChange={(e)=>{setselectedrow({...selectedrow , Nom_equipe : e.target.value})}} id="standard-basic" label="Nom de l'equipe" />
                      <TextField
                        className="ml-5"
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
                     
                </div>
                </form>
                </MDBModalBody>
                <MDBModalFooter>
                      <Button onClick={(e)=>{updatedequipe(e)}} variant="outlined" class="btn btn-outline-success">
                      Modifier
                      </Button> 
                      </MDBModalFooter>
                </MDBModal>


                      {/* MODAL SUPP */}
                <MDBModal isOpen={suppopen} toggle={()=>toggleSupp()} size="sm" disableBackdrop={true}>
                <MDBModalHeader toggle={()=>toggleSupp()} className="text-center sm">Supprimer l'équipe</MDBModalHeader>
                    <MDBModalBody>
                        <div className="row col-12 ">
                          <div >
                            <p>vous les vous vraiment supprimer cette équipe ?</p>
                          </div>
                        </div>
                  </MDBModalBody> 
                  <div>
                <MDBModalFooter>
                        <Button color="primary" variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={(e)=>{Suppequipe(e)}}>Supprimer</Button>
                        <Button color="primary" variant="contained" color="primary"  onClick={()=>toggleSupp()}>annuler</Button>
                </MDBModalFooter>
                </div>
                </MDBModal>


      {/* <div className="container">
        <mdb-table-editor
        :data="datatable"
        striped
        bordered
       /> */}
</div>
            </div>
            {/* pagination */}

           
            </>
      
    );
}

export default Equipe