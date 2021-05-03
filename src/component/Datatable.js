import React,{ useState , useEffect} from 'react'
import ReactDatatable from '@ashvin27/react-datatable';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function Datatable(props) {
//   {
//     "id": 1,
//     "Proprietaire_de_la_requete": "Amira KHEZAMI",
//     "Statut": "En attente retour client",
//     "Origine_de_la_requete": "Courrier postal",
//     "Heure_douverture": "05/06/2020 15:20",
//     "heure_de_derniere_modification_de_la_requete": null,
//     "Heure_de_fermeture": null,
//     "Objet": "Envoi d’un message : GARAGE ROMERO R1A18541244098 SAM 05 06 2020",
//     "Numero_de_la_requete": 297557,
//     "Type_de_la_demande": "",
//     "Famille_de_demande": "",
//     "Motifs_de_resiliation": "Arrêt d’activité",
//     "Sous_motif_de_resiliation": "Vente-Cession",
//     "Autre_motif_de_resiliation": "",
//     "date_ouverture": "2020-05-05T23:00:00.000Z",
//     "date_de_fermeture": null,
//     "Famille_de_demande_RC": "Réclamation",
//     "Type_de_la_demande_RC": "Demande de résiliation écrite",
//     "Raison_sociale_du_compte": "ROMERO AUTOMOBILES",
//     "Anciennete": "48",
//     "createdAt": "2021-04-20T23:05:32.000Z",
//     "updatedAt": "2021-04-20T23:05:32.000Z",
//     "CompteClientId": 1,
//     "FileId": 1,
//     "UserId": 8
// }

const [open, setopen] = useState(false)

const update=()=>{
  props.update()
}

const toggle = () =>{
  setopen(!open)
}

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
           <IconButton className="float-right mr-3" size="small" aria-label="delete" color="primary" onClick={()=>{setselectedrow(req);toggle()}}>
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
  }
}

  return (
    <div id='requetetable' className="row col-12 justify-content-center">
     <ReactDatatable
                config={config}
                records={props.Requetes}
                columns={column}/>



                  {/* MODAL ADD */}
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
                <span className="mr-4" > Status  </span>   <TextField value={selectedrow.Statut} />
                </div><br />

                <div  className="d-flex flex-row">
                <span className="mr-4" > Origine de la requete  </span>   <TextField value={selectedrow.Origine_de_la_requete} />
                </div><br />

                <div  className="d-flex flex-row">
                <span className="mr-4" > Famille de demande  </span>   <TextField value={selectedrow.Famille_de_demande_RC} />
                </div><br />

                <div  className="d-flex flex-row">
                <span className="mr-4" > Motifs de resiliation  </span>   <TextField value={selectedrow.Motifs_de_resiliation} />
                </div><br />

                {/* <div  className="d-flex flex-row">
                <span className="mr-4" > Raison sociale du compte  </span>   <TextField value={selectedrow.Raison_sociale_du_compte} />
                </div><br /> */}

                <div  className="d-flex flex-row">
                <span className="mr-4 mt-5" > Type de la demande  </span>    <TextField value={selectedrow.Type_de_la_demande_RC}  className="col-7 mt-3" id="time" type="text" label="description" multiline={true} variant="outlined" size="small" rows={4} />

                </div><br />


                <Button  variant="outlined" class="btn btn-outline-success">
                Modifier
                 </Button> 
               

              </form>
              </MDBModalBody>
              </MDBModal>
    </div>
  )
}

export default Datatable
