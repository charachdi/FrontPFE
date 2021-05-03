import React,{ useState , useEffect , forwardRef} from 'react'
import ReactDatatable from '@ashvin27/react-datatable';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import EditIcon from '@material-ui/icons/Edit';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { TextareaAutosize } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Api_url from './../../component/Api_url';
import axios from 'axios'
import DatePicker from 'react-datepicker'


function Requete(props) {

    const [open, setopen] = useState(false)
    const [openadd, setopenadd] = useState(false)
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user')) ;

const update = (id)=>{
    props.updatereq(id)

    setTimeout(() => {
        setopen(!open)
    }, 500);
}

const toggle = () =>{
  setopen(!open)
}

const [startDate, setStartDate] = useState(new Date());

const ExampleCustomInput = forwardRef(
  ({ value, onClick }, ref) => (
    <button className="" onClick={onClick} ref={ref}>
      {value}
    </button>
  ))

const [reqete, setreqete] = useState({
  Statut : "",
  Origine_de_la_requete : "",
  Heure_douverture : "",
  Type_de_la_demande_RC : "",
  Famille_de_demande_RCtut : "",
  Motifs_de_resiliation : "",
  Anciennete : 0,
  Raison_sociale_du_compte : props.clientname,
  CompteClientId: props.clientID,
  UserId: user.id

})

const [selectedrow, setselectedrow] = useState({
  "id": 1,
  "Proprietaire_de_la_requete": "Amira KHEZAMI",
  "Statut": "En attente retour client",
  "Origine_de_la_requete": "Courrier postal",
  "Heure_douverture": "05/06/2020 15:20",
  "heure_de_derniere_modification_de_la_requete": null,
  "Heure_de_fermeture": null,
  "Objet": "Envoi d’un message : GARAGE ROMERO R1A18541244098 SAM 05 06 2020",
  "Numero_de_la_requete": 297557,
  "Type_de_la_demande": "",
  "Famille_de_demande": "",
  "Motifs_de_resiliation": "Arrêt d’activité",
  "Sous_motif_de_resiliation": "Vente-Cession",
  "Autre_motif_de_resiliation": "",
  "date_ouverture": "2020-05-05T23:00:00.000Z",
  "date_de_fermeture": null,
  "Famille_de_demande_RC": "Réclamation",
  "Type_de_la_demande_RC": "Demande de résiliation écrite",
  "Raison_sociale_du_compte": "ROMERO AUTOMOBILES",
  "Anciennete": "48",
  "createdAt": "2021-04-20T23:05:32.000Z",
  "updatedAt": "2021-04-20T23:05:32.000Z",
  "CompteClientId": 1,
  "FileId": 1,
  "UserId": 8
})


const [dis, setdis] = useState(true)
const [column, setcolumn] = useState([
  {
    key: "Numero_de_la_requete",
    text: "#",
    className:"datatabel",
  },
  {
    key: "Proprietaire_de_la_requete",
    text: "Proprietaire de la requete",
    className: "datatabel Name",
    cell: (req, index) => {
      return (
        <div className="d-flex flex-row">
            <Avatar src={req.User.user_img} style={{width:30 , height:30}} />
            <span className=" ml-2">{req.User.full_name}</span>
         </div>
      );
  }
  },
  {
    key: "Statut",
    text: "Statut",
    className: "datatabel status",
    sortable :true
  },
  {
    key: "Origine_de_la_requete",
    text: "Origine de la requete",
    className: "datatabel colum",
  },
  {
    key: "Heure_douverture",
    text: "Heure d'ouverture",
    className:"datatabel date"
  },
  {
    key: "Heure_de_fermeture",
    text: "Heure de fermeture",
    className:" datatabel date"
  },
  {
    key: "Type_de_la_demande_RC",
    text: "Type de la demande",
    className:"datatabel Type_de_la_demande_RC"
  },
  {
    key: "Famille_de_demande_RC",
    text: "Famille de demande",
    className:"datatabel Type_de_la_demande_RC"
  },
  {
    key: "Motifs_de_resiliation",
    text: "Motifs de resiliation",
    className:"datatabel Type_de_la_demande_RC"
  },
  {
    key: "Raison_sociale_du_compte",
    text: "Raison sociale du compte",
    className:"datatabel Type_de_la_demande_RC"
  },
  {
    key: "Anciennete",
    text: "Anciennete",
    className:"datatabel Anciennete",
    sortable :true
  },

  {
    key: "action",
    text: "action",
    cell: (req, index) => {
      return (
        <>
        {
        props.auth ? (
            <IconButton className="float-right mr-3" size="small" aria-label="delete" color="primary" onClick={()=>{setselectedrow(req);toggle();setdis(TextareaAutosize)}}>
            <EditIcon />
            </IconButton>
        ) : (
            null
        )
        }

      {
        props.admin ? (
          <div className="d-flex flex-row">
            <IconButton className="float-right mr-3" size="small" aria-label="delete" color="primary" onClick={()=>{setselectedrow(req);toggle();setdis(true)}}>
            <EditIcon />
            </IconButton>
            
             <IconButton className="float-right mr-3" size="small" aria-label="delete" color="secondary" onClick={()=>{setselectedrow(req);toggle();setdis(true)}}>
             <DeleteIcon />
             </IconButton>
             </div>
        ) : (
            null
        )
        }

        


          
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
  }
}


const addrequete = async ()=>{
  const res = await axios({
    headers: { Authorization: `Bearer ${token}` },
    method: "post",
    url: `${Api_url}clients/add/requete/`,
    data : reqete,
  });
  console.log(res);
  if(res.status === 200){

    setreqete({...reqete , 
    Statut : "",
    Origine_de_la_requete : "",
    Heure_douverture : "",
    Type_de_la_demande_RC : "",
    Famille_de_demande_RCtut : "",
    Motifs_de_resiliation : "",
    Anciennete : 0,
    })
    setopenadd(!openadd)
    props.add(res.data.req)
    
  }
}


return (
    <div id='requetetable' className="row col-12 justify-content-center">

<Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={()=>setopenadd(!openadd)}> Ajouter </Button> 
     <ReactDatatable
                config={config}
                records={props.Requetelist}
                columns={column}/>



                  {/* MODAL add */}
            <MDBModal isOpen={openadd} toggle={()=>setopenadd(!openadd)} size="lg">
              <MDBModalHeader toggle={()=>setopenadd(!openadd)} className="text-center"></MDBModalHeader>
              <MDBModalBody>
              <form className="col-12 " >
                <div className="d-flex flex-row col-12 justify-content-center mb-3">
                  <Avatar src={user ? user.user_img : ""}/>
                  <span className="mt-2 ml-3">
                  {user ? user.full_name :""}
                  </span>
                </div><br/>

                <div className="col-12">
                  <div  className="d-flex flex-row">
                   <span className="mr-4 col-4" style={{fontSize:13}} > Status  </span>   <TextField className="col-6" value={reqete.Statut} onChange={(e)=>{setreqete({...reqete , Statut : e.target.value});setdis(false)}} />
                  </div>
                </div>
               
                <div className="col-12 mt-4">
                  <div  className="d-flex flex-row">
                   <span className="mr-4 col-4" style={{fontSize:13}} > Origine de la requete  </span>   <TextField className="col-6" value={reqete.Origine_de_la_requete}   onChange={(e)=>{setreqete({...reqete , Origine_de_la_requete : e.target.value});setdis(false)}}/>
                  </div>
                </div>

                  <div className="col-12 mt-4">
                  <div  className="d-flex flex-row">
                   <span className="mr-4 col-4" > Famille de demande  </span>   <TextField className="col-6" value={reqete.Famille_de_demande_RC} onChange={(e)=>{setreqete({...reqete , Famille_de_demande_RC : e.target.value});setdis(false)}}/>
                  </div>
                </div>


                <div className="col-12 mt-4">
                  <div  className="d-flex flex-row">
                    <span className="mr-4 col-4" > Motifs de resiliation  </span>   <TextField className="col-6" value={reqete.Motifs_de_resiliation} onChange={(e)=>{setreqete({...reqete , Motifs_de_resiliation : e.target.value});setdis(false)}}/>
                  </div>
                </div>


                <div className="col-12 mt-4">
                  <div  className="d-flex flex-row">
                    <span className="mr-4 col-4" > Anciennete  </span>   <TextField className="col-6" value={reqete.Anciennete} onChange={(e)=>{setreqete({...reqete , Anciennete : e.target.value});setdis(false)}}/>
                  </div>
                </div>

                <div className="col-12 mt-4">
                  <div  className="d-flex flex-row">
                    <span className="mr-4 col-4" > Heure douverture  </span>     
                                      <TextField
                                        id="datetime-local"
                                        label="Next appointment"
                                        type="datetime-local"
                                        defaultValue="2017-05-24T10:30"
                                      
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                  </div>
                  {/* <TextField className="col-6" value={reqete.Heure_douverture} onChange={(e)=>{setreqete({...reqete , Heure_douverture : e.target.value});setdis(false)}}/> */}
                </div>

                <div  className="d-flex flex-row">
                <span className="mr-4 mt-5" > Type de la demande  </span>    <TextField value={reqete.Type_de_la_demande_RC}  className="col-7 mt-3" id="time" type="text" label="description" multiline={true} variant="outlined" size="small" rows={4} onChange={(e)=>{setreqete({...reqete , Type_de_la_demande_RC : e.target.value});setdis(false)}} />

                </div><br />


                <Button onClick={()=>{addrequete()}}   variant="outlined" class="btn btn-outline-success">
                Modifier
                 </Button> 
               

              </form>
              </MDBModalBody>
              </MDBModal>


              {/* update  */}

              <MDBModal isOpen={open} toggle={()=>toggle()} size="md">
              <MDBModalHeader toggle={()=>toggle()} className="text-center"></MDBModalHeader>
              <MDBModalBody>
              <form className="col-12 " >
                <div className="d-flex flex-row col-12 justify-content-center mb-3">
                  <Avatar src={selectedrow.User ? selectedrow.User.user_img : ""}/>
                  <span className="mt-2 ml-3">
                  {selectedrow.User ? selectedrow.User.full_name :""}
                  </span>
                </div><br/>


                <div  className="d-flex flex-row">
                <span className="mr-4" > Status  </span>   <TextField value={selectedrow.Statut} onChange={(e)=>{setselectedrow({...selectedrow , Statut : e.target.value});setdis(false)}} />
                </div><br />

                <div  className="d-flex flex-row">
                <span className="mr-4" > Origine de la requete  </span>   <TextField value={selectedrow.Origine_de_la_requete}   onChange={(e)=>{setselectedrow({...selectedrow , Origine_de_la_requete : e.target.value});setdis(false)}}/>
                </div><br />

                <div  className="d-flex flex-row">
                <span className="mr-4" > Famille de demande  </span>   <TextField value={selectedrow.Famille_de_demande_RC} onChange={(e)=>{setselectedrow({...selectedrow , Famille_de_demande_RC : e.target.value});setdis(false)}}/>
                </div><br />

                <div  className="d-flex flex-row">
                <span className="mr-4" > Motifs de resiliation  </span>   <TextField value={selectedrow.Motifs_de_resiliation} onChange={(e)=>{setselectedrow({...selectedrow , Motifs_de_resiliation : e.target.value});setdis(false)}}/>
                </div><br />

                {/* <div  className="d-flex flex-row">
                <span className="mr-4" > Raison sociale du compte  </span>   <TextField value={selectedrow.Raison_sociale_du_compte} />
                </div><br /> */}

                <div  className="d-flex flex-row">
                <span className="mr-4 mt-5" > Type de la demande  </span>    <TextField value={selectedrow.Type_de_la_demande_RC}  className="col-7 mt-3" id="time" type="text" label="description" multiline={true} variant="outlined" size="small" rows={4} onChange={(e)=>{setselectedrow({...selectedrow , Type_de_la_demande_RC : e.target.value});setdis(false)}} />

                </div><br />


                <Button onClick={()=>{update(selectedrow);}} disabled={dis}  variant="outlined" class="btn btn-outline-success">
                Modifier
                 </Button> 
               

              </form>
              </MDBModalBody>
              </MDBModal>
    </div>

    
  )
}

export default Requete