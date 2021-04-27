import React , {useState , useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ArchiveIcon from '@material-ui/icons/Archive';
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
            <h3>Archive</h3>
            <div className="row col-12 justify-content-center">
            <span className="mt-5 ml-2 mr-3">pourcentage minimum de progression à archiver</span>
           <TextField
           className="mt-4 float-left"
          
          select
          label="progress"
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


        <div className="row col-12 justify-content-center mt-3">
            <span className="mt-5 mr-3">nombre minimum de requêtes à archiver</span>
           <TextField
           size="small"
           style={{maxWidth:50}}
           className="mt-4 mr-5 float-left"
          label="requêtes"
          value={requetes}
          onChange={(e)=>{setrequetes(e.target.value)}}
        />
    

        </div>
           <div style={{position:'absolute', bottom:50 , left:'47%'}}>
           <button type="submit" className="btn text-lowercase mr-5" style={{width:80 , fontSize:12 }} onClick={(e)=>{props.update(progress,requetes)}} >modifier</button>

               </div> 

        </div>
    )
}

export default Archive
