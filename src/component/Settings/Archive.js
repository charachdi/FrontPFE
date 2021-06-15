import React , {useState , useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ArchiveIcon from '@material-ui/icons/Archive';
import Alert from '@material-ui/lab/Alert';
function Archive(props) {

    const [progress, setprogress] = useState(props.prog)
    const [requetes, setrequetes] = useState(props.req)
    const prog = [
        {
          value: 10,
          label: '10%',
        },
        {
            value: 20,
            label: '20%',
        },
        {
            value: 30,
            label: '30%',
        },
        {
            value: 40,
            label: '40%',
        },
        {
            value: 50,
            label: '50%',
        },
        {
            value: 60,
            label: '60%',
        },
        {
            value: 70,
            label: '70%',
        },
        {
            value: 80,
            label: '80%',
        },

        {
            value: 90,
            label: '90%',
        },

        {
            value: 100,
            label: '100%',
        },
      ];


     
    return (
        <div>
           <div className="container-fluid  mt-3 mb-3">
                    <h2 class="no-margin-bottom text-capitalize">paramétrage de l'archivage</h2>
                    <Alert severity="info" className="mb-3">L'archivage doit être paramétré à l'avance .</Alert>
           </div>
            <div className="row col-12 justify-content-start">
            <span className="mt-5 mr-3">pourcentage minimum de progression à atteindre pour pouvoir archiver</span>
           <TextField
           className="mt-4 float-left"
          
          select
          label="Progrès"
          value={progress}
          onChange={(e)=>{setprogress(e.target.value)}}
        >

            {
                prog.map((pro,index)=>(
                    <MenuItem key={index} value={pro.value}>
                   {pro.label}
                   </MenuItem>
                ))
            }
         
        </TextField>

        </div>


        <div className="row col-12 justify-content-start mt-3">
            <span className="mt-5 mr-3">Nombre minimum des requêtes achevées pour pouvoir archiver</span>
           <TextField
           size="small"
           style={{maxWidth:50}}
           className="mt-4 mr-5 float-left"
          label="Requêtes"
          value={requetes}
          onChange={(e)=>{setrequetes(e.target.value)}}
        />
    

        </div>
           <div style={{position:'absolute', bottom:50 , left:'47%'}}>
           <button type="submit" className="btn-add cardstat text-capitalize" style={{width:80 , fontSize:12 }} onClick={(e)=>{props.update(progress,requetes)}} >Modifier</button>

               </div> 

        </div>
    )
}

export default Archive
