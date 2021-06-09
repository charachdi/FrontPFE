import React,{ useState , useEffect , forwardRef} from 'react'
import $ from 'jquery'
import TextField from '@material-ui/core/TextField';
import Api_url from './../../component/Api_url';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import Divider from '@material-ui/core/Divider';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
function Prime() {

    const token = localStorage.getItem('token')
    const [equipes, setequipes] = useState([])
    const [open, setopen] = useState(false);
    const [selectedrow, setselectedrow] = useState({
        "id": 1,
            "Nom_equipe": "Dream team",
            "Roomid": "51c99c7d-3b4b-46d0-8462-2cfde730d412",
            "Prime": 0,
            "bonus": 120,
            "requete": 20,
    });

    useEffect(() => {
        const getdata = async () =>{
          const res = await axios({
              headers: {'Authorization': `Bearer ${token}`},
              method: 'get',
              url : `${Api_url}admin/equipe`,  
              });
              
                  setequipes(res.data.equipe)
        }
        getdata()
      }, [])


      const toggle = ()=>{
          setopen(!open)
      }
      const changeparams = async()=>{
           const data = {
            Prime: selectedrow.Prime,
            bonus: selectedrow.bonus,
            requete: selectedrow.requete,
           }
           const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'put',
            url : `${Api_url}admin/equipe/${selectedrow.id}`, 
            data 
            });
            if(res.status === 200){
                setequipes(
                    equipes.map(item => 
                        item.id === res.data.equipe.id 
                        ? res.data.equipe 
                        : item 
                ))
                toggle()
                toast.success(`Equipe Modifier`, {
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
        
        <div className=" mt-3 ">
            <h4>Parametrage des primes</h4>
            <p>Les primes et les bonus doivent être paramétré à l'avance</p>
            <Divider />
  <table className="table table-bordered ">
            <thead style={{backgroundColor: "#767192" , color : "white"}} >
                <tr className="text-center">
                    <th>Equipe</th>
                    <th>Prime</th>
                    <th>Bonus</th>
                    <th>Requete</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className="text-center">

                {
                    equipes.map((eq,index)=>(
                        <tr key={index}>
                        <td>{eq.Nom_equipe}</td>
                        <td>{eq.Prime}</td>
                        <td>{eq.bonus}</td>
                        <td>{eq.requete}</td>
                        <td>
                        <IconButton size="small" onClick={()=>{setselectedrow(eq);toggle()}}>
                        <EditIcon className="cursor"  style={{color : "#303f9f"}} />
                        </IconButton>
                        </td>
                    </tr>
                    ))
                }
           
            </tbody>
            </table>
            <MDBModal isOpen={open} toggle={()=>toggle()} size="md" disableBackdrop={false}>
              <MDBModalHeader toggle={()=>toggle()} className="text-center"><p ></p></MDBModalHeader>
              <MDBModalBody>
                    <h4 className="text-center mb-5">{selectedrow.Nom_equipe}</h4>
                    <div className="row col-12 justify-content-center" style={{height : '50vh'}}>

                    <TextField
                    id="prime"
                    label="Prime"
                    type="Number"
                    className="col-8 float-center text-center"
                    value={selectedrow.Prime}
                    onChange={(e)=>{setselectedrow({...selectedrow , Prime : e.target.value})}}
                    />

                    <TextField
                    id="Bonus"
                    label="Bonus"
                    type="Number"
                    className="col-8 float-center"
                    value={selectedrow.bonus}
                  onChange={(e)=>{setselectedrow({...selectedrow , bonus : e.target.value})}}
                    />

                    <TextField
                    id="requete"
                    type="Number"
                    label="requete"
                    className="col-8 float-center"
                    value={selectedrow.requete}
                    onChange={(e)=>{setselectedrow({...selectedrow , requete : e.target.value})}}
                    />
                   
                  </div>
                  <div className="row col-12 row justify-content-center">
                  <div id="addbtn" className="col-3 mb-2 " >  
                        <button className="btn-add cardstat text-capitalize" style={{width:"100%"}} onClick={(e)=>{changeparams()}}>Modifier</button>
                    </div>
                  </div>
                   
              </MDBModalBody>
              </MDBModal>
        </div>
      
    )
}

export default Prime
