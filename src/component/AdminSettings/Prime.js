import React,{ useState , useEffect , forwardRef} from 'react'
import $ from 'jquery'
import TextField from '@material-ui/core/TextField';
import Api_url from './../../component/Api_url';
import axios from 'axios'
import Divider from '@material-ui/core/Divider';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
function Prime() {

    const token = localStorage.getItem('token')
    const [equipes, setequipes] = useState([])

    useEffect(() => {
        const getdata = async () =>{
          const res = await axios({
              headers: {'Authorization': `Bearer ${token}`},
              method: 'get',
              url : `${Api_url}admin/equipe`,  
              });
              if(res.status === 200){
                  setequipes(res.data.equipe)
              }
        }
        getdata()
      }, [])


      const changeprime = async (value , index , type)=>{

        const data = {
            Prime : "",
            bonus : ""
        }
        if(type === "Prime"){
            setequipes(
                equipes.map(item => 
                    item.id === index 
                    ? {...item, Prime : value} 
                    : item 
            ))
           data.Prime = value
        }
       
        if(type === "bonus"){
            setequipes(
                equipes.map(item => 
                    item.id === index 
                    ? {...item, bonus : value} 
                    : item 
            ))
           data.bonus = value
        }
       
     
               
        const res = await axios({
            headers: {'Authorization': `Bearer ${token}`},
            method: 'put',
            url : `${Api_url}admin/equipe/prime/${index}`,  
            data
            });

            console.log(res)
      }
    return (
        
        <div className=" mt-3 ">
            <h4>Parametrage des primes</h4>
            <p>Les primes et les bonus doivent être paramétré à l'avance</p>
            <Divider />
           {/* <TreeView 
           className="mt-2"
        style={{color : "black"}}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="100" label="Equipe" className="mt-2 mb-2"> 
      
        {
            equipes.map((eq,index)=>(
                <TreeItem nodeId={index} label={eq.Nom_equipe} key={index} >
                    <TreeItem nodeId={eq.id+100} label="prime">
                    <TextField 
                        value={eq.Prime}
                        className="mt-2 mb-3"
                        type="Number"
                        onChange={(e)=>{changeprime(e.target.value , eq.id , "Prime" )}}
                    />
                    </TreeItem>
                    <TreeItem nodeId={eq.id+200} label="bonus">
                    <TextField 
                        value={eq.bonus}
                        className="mt-2 mb-3"
                        type="Number"
                        onChange={(e)=>{changeprime(e.target.value , eq.id , "bonus")}}
                    />
                    </TreeItem>
                    <TreeItem nodeId={eq.id+300} label="parameters">
                        <span>a</span><br />
                        <span>b</span><br />
                        <span>c</span>
                    </TreeItem>
                   
                  
                </TreeItem >
            ))
        }
      </TreeItem>
    </TreeView> */}
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
                equipes.map((eq, index)=>{
                    <tr>
                        <td>e</td>
                        <td>e</td>
                        <td>e</td>
                        <td>e</td>
                        <td>e</td>
                    </tr>
                })
            }
            </tbody>
            </table>
    
        </div>
      
    )
}

export default Prime
