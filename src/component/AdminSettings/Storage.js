import React,{ useState , useEffect , forwardRef} from 'react'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import $ from 'jquery'
import Api_url from './../../component/Api_url';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Switch from '@material-ui/core/Switch';
import UpdateIcon from '@material-ui/icons/Update';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ToastContainer, toast } from 'react-toastify';
import Button from "@material-ui/core/Button";

function Storage() {


    const token = localStorage.getItem('token')
    const [open, setopen] = useState(false)
    const [opendelete, setopendelete] = useState(false)
    const [editopen, seteditopen] = useState(false)
    const [deleteid, setdeleteid] = useState(0)
    const [selectedrow, setselectedrow] = useState({
        Username : "",
        Password : "",
        Host : "",
        Database : "",
        
    })
    const [databaselist, setdatabaselist] = useState([])
    const [database, setdatabase] = useState({
        id : "",
        Username : '',
        Password : '',
        Host : '',
        Database : '',
    })

    useEffect(() => {
      const getdata = async () =>{
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'get',
            url : `${Api_url}admin/database/`,  
            });
            if(res.status === 200){
                setdatabaselist(res.data.data)
            }
      }
      getdata()
    }, [])
    const toggle = ()=>{
        setopen(!open)
    }

    const toggleedit = ()=>{
        seteditopen(!editopen)
    }
    const toggledelete = ()=>{
        setopendelete(!opendelete)
    }


    const Adddatabase = async ()=>{
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'post',
            url : `${Api_url}admin/database/`,  
            data : database
            });
       if(res.status === 200){
           toggle()
           toast.success(`Database ajouter`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
           setdatabase({
            Username : '',
            Password : '',
            Host : '',
            Database : '',
        })
           setdatabaselist([res.data.data , ...databaselist])
       }
    }

    const Changestatus = async (id) =>{
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'put',
            url : `${Api_url}admin/database/status/${id}`,  
            });
            if(res.status === 200){
                setdatabaselist(res.data.all)
            }
    }


    const Deteltdatabase = async (id) =>{
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'delete',
            url : `${Api_url}admin/database/${id}`,  
            });
           
            if(res.status === 200){
                toggledelete()
                setdatabaselist( databaselist.filter(item => item.id !== id))
              
                toast.success(`Database Supprimer`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
            }
    }


    const Updatedatabase = async () =>{
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'put',
            url : `${Api_url}admin/database/${selectedrow.id}`,  
            data : selectedrow
            });
            console.log(res)
            if(res.status === 200){
                toggleedit()
                toast.success(`Database Modifier`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
                setdatabaselist(
                    databaselist.map(item =>
                        item.id === res.data.data.id
                        ? res.data.data
                        : item
                        )
                )
            }
    }




   
    return (
        <>
    
        <div className="row mb-2 mt-2 justify-content-center"> 
        <div id="addbtn" className="col-4 mb-2 " >  
            <button className="btn-add cardstat text-capitalize" onClick={()=>toggle(!open)} style={{width:"100%"}}><i class="fas fa-plus mr-2"></i>Ajouter une base de données</button>
             </div>
        </div>
        <table className="table table-bordered ">
            <thead style={{backgroundColor: "#767192" , color : "white"}} >
                <tr className="text-center">
                    <th>Username</th>
                    <th>Password</th>
                    <th>Host</th>
                    <th>Database</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className="text-center">
            {
                databaselist.map((data,index)=>(
                    <tr key={index}>
                    <td>{data.Username}</td>
                    <td>{data.Password}</td>
                    <td>{data.Host}</td>
                    <td>{data.Database}</td>
                    <td>
                    <Switch
                    checked={data.Active}
                    size="small"
                    onChange={(e)=>{Changestatus(data.id)}}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </td>
                    <td className="d-flex justify-content-around">
                        <IconButton size="small" onClick={()=>{setselectedrow(data);toggleedit()}}>
                        <EditIcon className="cursor"  style={{color : "#303f9f"}} />
                        </IconButton>

                        <IconButton onClick={()=>{setdeleteid(data.id);toggledelete()}} size="small" >
                        <DeleteIcon className="cursor"  style={{color : "#ce1126"}} />
                        </IconButton>
                        
                    </td>
                </tr>
                ))
            }
              
                
                   
            </tbody>
            
        </table>



            <MDBModal isOpen={editopen} toggle={()=>toggleedit()} size="md" disableBackdrop={false}>
              <MDBModalHeader toggle={()=>toggleedit()} className="text-center"><p >Modifier</p></MDBModalHeader>
              <MDBModalBody>
                  <div className="row col-12 justify-content-center">
                  <p className="mt-2 mr-4">Username</p>
                <TextField
                
               
                size="small"
                multiline
                rowsMax={4}
                value={selectedrow.Username}
                onChange={(e)=>{setselectedrow({...selectedrow , Username : e.target.value})}}
                variant="outlined"
                />
                  </div><br />

                  <div className="row col-12 justify-content-center">
                  <p className="mt-2 mr-4">Password</p>
                <TextField
                
                
                size="small"
                type="password"
                multiline
                rowsMax={4}
                value={selectedrow.Password}
                onChange={(e)=>{setselectedrow({...selectedrow , Password : e.target.value})}}
                variant="outlined"
                />
                  </div><br />

                  <div className="row col-12 justify-content-center">
                  <p className="mt-2 mr-4">Database</p>
                <TextField
                
                
                size="small"
                multiline
                rowsMax={4}
                value={selectedrow.Database}
                onChange={(e)=>{setselectedrow({...selectedrow , Database : e.target.value})}}
                variant="outlined"
                />
                  </div><br />


                  <div className="row col-12 justify-content-center mr-2">
                  <p className="mt-2 mr-4">HostName</p>
                <TextField
                
               
                size="small"
                className=""
                multiline
                rowsMax={4}
                value={selectedrow.Host}
                onChange={(e)=>{setselectedrow({...selectedrow , Host : e.target.value})}}
                variant="outlined"
                />
                  </div><br />

                  
               <div className="row col-12 justify-content-center">
               <IconButton className=" mt-4" size="medium" onClick={()=>{Updatedatabase()}}   style={{backgroundColor : "#2ECD94"}} >
                    <UpdateIcon />
                </IconButton>
               </div>
                  
               
              </MDBModalBody>
              </MDBModal>



              <MDBModal isOpen={open} toggle={()=>toggle()} size="md" disableBackdrop={false}>
              <MDBModalHeader toggle={()=>toggle()} className="text-center"><p >Ajouter Base de Données </p></MDBModalHeader>
              <MDBModalBody>
                  <div className="row col-12 justify-content-center">
                  <p className="mt-2 mr-4">Username</p>
                <TextField
                
                label="Username"
                size="small"
                multiline
                error
                required
                rowsMax={4}
                value={database.Username}
                onChange={(e)=>{setdatabase({...database , Username : e.target.value})}}
                variant="outlined"
                />
                  </div><br />

                  <div className="row col-12 justify-content-center">
                  <p className="mt-2 mr-4">Password</p>
                <TextField
                required
                label="Password"
                size="small"
                type="password"
                multiline
                rowsMax={4}
                value={database.Password}
                onChange={(e)=>{setdatabase({...database , Password : e.target.value})}}
                variant="outlined"
                />
                  </div><br />

                  <div className="row col-12 justify-content-center">
                  <p className="mt-2 mr-4">Database</p>
                <TextField
                required
                label="Database"
                size="small"
                multiline
                rowsMax={4}
                value={database.Database}
                onChange={(e)=>{setdatabase({...database , Database : e.target.value})}}
                variant="outlined"
                />
                  </div><br />


                  <div className="row col-12 justify-content-center mr-2">
                  <p className="mt-2 mr-4">HostName</p>
                <TextField
                required
                label="Host"
                size="small"
                className=""
                multiline
                rowsMax={4}
                value={database.Host}
                onChange={(e)=>{setdatabase({...database , Host : e.target.value})}}
                variant="outlined"
                />
                  </div><br />

                  
               <div className="row col-12 justify-content-center">
               <IconButton className=" mt-4" size="medium" onClick={()=>{Adddatabase()}}   style={{backgroundColor : "#2ECD94"}} >
                    <AddIcon />
                </IconButton>
               </div>
                  
               
              </MDBModalBody>
              </MDBModal>


              <MDBModal isOpen={opendelete} toggle={()=>toggledelete()} size="md" disableBackdrop={false}>
              <MDBModalHeader toggle={()=>toggledelete()} className="text-center"><p ></p></MDBModalHeader>
              <MDBModalBody>
                  
                  <div className="row col-12 justify-content-around">

                    <h4 className='text-center mb-5'>êtes-vous sûr de vouloir supprimer cette base de données</h4>


                         <IconButton className="hover" size="medium" style={{backgroundColor : "#ce1126"}} onClick={()=>{Deteltdatabase(deleteid)}} >
                            <DeleteForeverIcon style={{color : "white"}} />
                        </IconButton>
                        
                        <IconButton className="hover" size="medium" style={{backgroundColor : "#303f9f"}} onClick={()=>{toggledelete()}}>
                            <CloseIcon style={{color : "white"}} />
                        </IconButton>

                     
                  </div>
               
              </MDBModalBody>
              </MDBModal>
        </>
    )
}

export default Storage
