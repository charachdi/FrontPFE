import React , { useState , useEffect} from 'react'
import Api_url from './../../component/Api_url'
import axios from 'axios'
import $ from 'jquery'  
import ReactDatatable from '@ashvin27/react-datatable';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import Avatar from '@material-ui/core/Avatar';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function Historique(props) {

    const [Historique, setHistorique] = useState([])
    const token = localStorage.getItem('token')
    const [open, setopen] = useState(false)
    const [selectedrow, setselectedrow] = useState({
      User : null,
      Requete : {
        Modirequete : {}
      }
    })

    const toggle = () =>{
      setopen(!open)
    }
    useEffect(() => {
        const gethis = async()=>{
            const res = await axios({
                headers: {'Authorization': `Bearer ${token}`},
                method: 'get',
                url : `${Api_url}clients/Historique/${props.clientID}`,  
                })
                console.log(res)   
                setHistorique(res.data.Historique)
                if(res.data.Historique.length !== 0 ){
                  setselectedrow(res.data.Historique[0])
                }
              
        }

        gethis()
    }, [])


    const [column, setcolumn] = useState([
        {
            key: "Collaborateur",
            text: "Collaborateur",
            cell: (his, index) => {
                return (
                  <>
                        <div className="d-flex flex-row"> <Avatar src={his.User.user_img ? his.User.user_img : ""} alt={his.User.full_name} style={{width: 40, height : 40}} /> 
                        <p className="mt-1 ml-4 mr-3">{his.User.full_name}</p>
                        <p className="mr-3 mt-1 ">{his.Text} </p>
                        <p className="mr-3 mt-1 ">Requete N°</p>
                        <p className="mr-3 mt-1 ">{his.Requete.Numero_de_la_requete}</p>
                        
                         </div>     
                   </>
                );
            }

        },
        {
          key: "createdAt",
          text: "Date",
        },
        {
          key: "Action",
          text: "Action",
          cell: (his, index) => {
            return (
              <>
                          <IconButton onClick={()=>{setselectedrow(his);setopen(!open)}} size="small" className="float-right mr-3" aria-label="eye"  style={{color :"#388e3c"}} >
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
        show_filter: false,
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
        <div className="col-12 mt-3">
             <ReactDatatable
              config={config}
              records={Historique}
              columns={column}/>
          

          
           <MDBModal isOpen={open} toggle={()=>toggle()} size="lg" centered   >
           <MDBModalBody>
              <form className="row col-12 justify-content-center ml-1" >

                <div className="col-6 " style={{ borderRadius:15}}>

                <div className="d-flex flex-row col-12 justify-content-center mb-3">
                  <Avatar src={selectedrow.User ? selectedrow.User.user_img : ""}/>
                  <span className="mt-2 ml-3">
                  {selectedrow.User ? selectedrow.User.full_name :""}
                  </span>
                </div><br/>


                <div  className="d-flex flex-row text-center" style={{fontSize :12}}>
                <span className="mr-4" > Status :  </span><p style={{color : selectedrow.Requete.Statut !== selectedrow.Requete.Modirequete.Statut ? 'green' : ""}}>{selectedrow.Requete ? selectedrow.Requete.Statut :""}</p>   
                </div><br />

                <div  className="d-flex flex-row" style={{fontSize :12}}>
                <span className="mr-4" > Origine de la requete : </span> <p style={{color : selectedrow.Requete.Origine_de_la_requete !== selectedrow.Requete.Modirequete.Origine_de_la_requete ? 'green' : ""}}>{selectedrow.Requete ? selectedrow.Requete.Origine_de_la_requete : ""}</p> 
                </div><br />

                <div  className="d-flex flex-row" style={{fontSize :12}}>
                <span className="mr-4" > Famille de demande  :</span> <p style={{color : selectedrow.Requete.Famille_de_demande_RC !== selectedrow.Requete.Modirequete.Famille_de_demande_RC ? 'green' : ""}}>{selectedrow.Requete ? selectedrow.Requete.Famille_de_demande_RC : "" }</p> 
                </div><br />

                <div  className="d-flex flex-row" style={{fontSize :12}}>
                <span className="mr-4" > Motifs de resiliation : </span>   <p style={{color : selectedrow.Requete.Motifs_de_resiliation !== selectedrow.Requete.Modirequete.Motifs_de_resiliation ? 'green' : ""}}>{selectedrow.Requete ? selectedrow.Requete.Motifs_de_resiliation : ""}</p>
                </div><br />

                <div  className="d-flex flex-row" style={{fontSize :12}}>
                <span className="mr-2" > Type de la demande : </span> <p style={{color : selectedrow.Requete.Type_de_la_demande_RC !== selectedrow.Requete.Modirequete.Type_de_la_demande_RC ? 'green' : ""}}>{selectedrow.Requete ? selectedrow.Requete.Type_de_la_demande_RC :""}</p>   

                </div><br />
                </div>

                <div className="col-6 border-left " style={{  borderRadius:15}}>
                <div className="d-flex flex-row  style={{fontSize :12}}col-12 justify-content-center mb-3">
                  <Avatar src={selectedrow.User ? selectedrow.User.user_img : ""}/>
                  <span className="mt-2 ml-3">
                  {selectedrow.User ? selectedrow.User.full_name :""}
                  </span>
                </div><br/>

                
                <div  className="d-flex flex-row" style={{fontSize :12}}>
                <span className="mr-4" > Status :</span><p style={{color : selectedrow.Requete.Statut !== selectedrow.Requete.Modirequete.Statut ? 'red' : ""}}>{selectedrow.Requete.Modirequete ? selectedrow.Requete.Modirequete.Statut :""}</p>   
                </div><br />

                <div  className="d-flex flex-row" style={{fontSize :12}}>
                <span className="mr-4" > Origine de la requete :  </span> <p style={{color : selectedrow.Requete.Origine_de_la_requete !== selectedrow.Requete.Modirequete.Origine_de_la_requete ? 'red' : ""}}>{selectedrow.Requete.Modirequete ? selectedrow.Requete.Modirequete.Origine_de_la_requete : ""}</p> 
                </div><br />

                <div  className="d-flex flex-row" style={{fontSize :12}}>
                <span className="mr-4" > Famille de demande :  </span> <p style={{color : selectedrow.Requete.Famille_de_demande_RC !== selectedrow.Requete.Modirequete.Famille_de_demande_RC ? 'red' : ""}}>{selectedrow.Requete.Modirequete ? selectedrow.Requete.Modirequete.Famille_de_demande_RC : ""}</p> 
                </div><br />

                <div  className="d-flex flex-row" style={{fontSize :12}}>
                <span className="mr-4" > Motifs de resiliation :  </span >   <p style={{color : selectedrow.Requete.Motifs_de_resiliation !== selectedrow.Requete.Modirequete.Motifs_de_resiliation ? 'red' : ""}}>{selectedrow.Requete.Modirequete ? selectedrow.Requete.Modirequete.Motifs_de_resiliation :""}</p>
                </div><br />

                <div  className="d-flex flex-row" style={{fontSize :12}}>
                <span className="mr-2" > Type de la demande :  </span> <p style={{color : selectedrow.Requete.Type_de_la_demande_RC !== selectedrow.Requete.Modirequete.Type_de_la_demande_RC ? 'red' : ""}}>{selectedrow.Requete.Modirequete ?selectedrow.Requete.Modirequete.Type_de_la_demande_RC : ""}</p>   

                </div><br />
                </div>
                

               

              </form>
              </MDBModalBody>
              </MDBModal>

              
        </div>
    )
}

export default Historique
