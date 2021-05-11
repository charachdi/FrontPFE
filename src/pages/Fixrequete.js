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
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';


import Lottie from 'react-lottie';
import Loading from './../images/loading.json'

function Fixrequete() {

    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    const [loding, setloding] = useState(true)
    const [Requetes, setRequetes] = useState([])
    const [open, setopen] = useState(false)
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


    const toggle = ()=>{
      setopen(!open)
    }

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

          const getWarnning = async() =>{
            const res = await axios({
              headers: {'Authorization': `Bearer ${token}`},
              method: 'get',
              url : `${Api_url}user/Requete/false/${user.id}`,  
              });
              console.log(res)
              setRequetes(res.data.listreq)
             
          }
          getWarnning()
          loding()
        
          
          }, [])


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
              className:"datatabel Anciennete ",
              cell: (req, index) => {
                return (
                  <IconButton onClick={(e)=>{setselectedrow(req);setopen(true)}} className="float-center mr-3" size="small" aria-label="delete" color="primary" >
                  <EditIcon />
                  </IconButton>
                )}
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


          const updaterequete = async () =>{
 
 

            const data = {
              id: selectedrow.id,
              Statut : selectedrow.Statut,
              Origine_de_la_requete : selectedrow.Origine_de_la_requete,
              Motifs_de_resiliation : selectedrow.Motifs_de_resiliation,
              Heure_de_fermeture : selectedrow.Heure_de_fermeture,
              Famille_de_demande_RC : selectedrow.Famille_de_demande_RC,
              Comptecli : selectedrow.Raison_sociale_du_compte,
              comptecliid: selectedrow.CompteClientId,
              Type_de_la_demande_RC : selectedrow.Type_de_la_demande_RC
            }

          
             const res = await axios({
              headers: {'Authorization': `Bearer ${token}`},
              method: 'put',
              url : `${Api_url}clients/Requete/update/false`,  
              data
              });
              console.log(res)
              
          
              if(res.status === 200){

                toggle()
                toast.success(`Requete Modifier`, {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  });
          
                  setRequetes(
                    Requetes.filter(item => item.id !== res.data.updatedreq.id)
                   )
          }else if (res.status === 201){
            toast.error(`${res.data.message}`, {
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
        <div className=" col-12 ">
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
        <div className="row col-12 justify-content-end">
       

        </div>
        {
            loding ? (
              <Lottie 
      options={defaultOptions}
      height={"40%"}
      width={"40%"}
    />
            ) :(
              
              <ReactDatatable
              config={config}
              records={Requetes}
              columns={column}
              />
            )
        }
             
  
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
                <span className="mr-4" > Status  </span>   <TextField value={selectedrow.Statut }  error={selectedrow.Statut === "" ? true : false} onChange={(e)=>{setselectedrow({...selectedrow , Statut : e.target.value})}} />
                </div><br />

                <div  className="d-flex flex-row">
                <span className="mr-4" > Origine de la requete  </span>   <TextField value={selectedrow.Origine_de_la_requete} error={selectedrow.Origine_de_la_requete === "" ? true : false}   onChange={(e)=>{setselectedrow({...selectedrow , Origine_de_la_requete : e.target.value})}}/>
                </div><br />

                <div  className="d-flex flex-row">
                <span className="mr-4" > Heure de fermeture  </span>  
                            <TextField
                            error={selectedrow.Heure_de_fermeture === null ? true : false}
                                        id="datetime-local"
                                        label="Next appointment"
                                        type="datetime-local"
                                        defaultValue={new Date()}
                                      onChange={(e)=>{setselectedrow({...selectedrow , Heure_de_fermeture : e.target.value})}}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      /> 
                </div><br />
                                     
                <div  className="d-flex flex-row">
                <span className="mr-4" > Famille de demande  </span>   <TextField value={selectedrow.Famille_de_demande_RC} error={selectedrow.Famille_de_demande_RC === "" ? true : false} onChange={(e)=>{setselectedrow({...selectedrow , Famille_de_demande_RC : e.target.value})}}/>
                </div><br />

                <div  className="d-flex flex-row">
                <span className="mr-4" > Motifs de resiliation  </span>   <TextField value={selectedrow.Motifs_de_resiliation}  error={selectedrow.Motifs_de_resiliation === "" ? true : false} onChange={(e)=>{setselectedrow({...selectedrow , Motifs_de_resiliation : e.target.value})}}/>
                </div><br />

                <div  className="d-flex flex-row">
                <span className="mr-4" > Raison sociale du compte  </span>   <TextField value={selectedrow.Raison_sociale_du_compte} error={selectedrow.Raison_sociale_du_compte === "" ? true : false} onChange={(e)=>{setselectedrow({...selectedrow , Raison_sociale_du_compte : e.target.value})}} />
                </div><br />

                <div  className="d-flex flex-row">
                <span className="mr-4 mt-5" > Type de la demande  </span>    <TextField value={selectedrow.Type_de_la_demande_RC} error={selectedrow.Type_de_la_demande_RC === "" ? true : false}  className="col-7 mt-3" id="time" type="text" label="description" multiline={true} variant="outlined" size="small" rows={4} onChange={(e)=>{setselectedrow({...selectedrow , Type_de_la_demande_RC : e.target.value})}} />

                </div><br />


                <Button onClick={(e)=>{updaterequete()}}    variant="outlined" class="btn btn-outline-success">
                Modifier
                 </Button> 
               

              </form>
              </MDBModalBody>
              </MDBModal>
      </div>
    )
}

export default Fixrequete
