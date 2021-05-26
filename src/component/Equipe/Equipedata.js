import React , { useState , useEffect} from 'react'
import Api_url from './../../component/Api_url'
import Avatar from '@material-ui/core/Avatar';
import {Pie} from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import Equipeheader from './../../component/Equipe/Equipeheader'
import axios from 'axios'
import $ from 'jquery'
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import domtoimage from 'dom-to-image';
import Button from '@material-ui/core/Button';
import Lottie from 'react-lottie';
import Chartsloding from './../../images/chartsloding.json'
import IconButton from '@material-ui/core/IconButton';

function Equipedata(props) {

  const token = localStorage.getItem('token')
  const [equipe_id, setequipe_id] = useState(props.equipeid)
  const [apidata, setapidata] = useState([])


  //bar charts
  const [usersname, setusersname] = useState([])
  const [reqnum, setreqnum] = useState([])
  
  //piecharts
  const [cliname, setcliname] = useState([])
  const [clilength, setclilength] = useState([])

  //line chaarts
  const [date_req, setdate_req] = useState([])
  const [date_value, setdate_value] = useState([])

  //bar origin chaarts
  const [origin_req, setorigin_req] = useState([])
  const [origin_value, setorigin_value] = useState([])
  
  const loding = {
    loop: true,
    autoplay: true,
    animationData: Chartsloding,
  };

  useEffect(() => {
   const getequipedata = async() =>{
    const res = await axios({
      headers: {'Authorization': `Bearer ${token}`},
      method: 'get',
      url : `${Api_url}stat/requets/${equipe_id}`,
      });
      setapidata(res.data)
     
   }


   const getclidatastat =async()=>{
    const res = await axios({
      headers: {'Authorization': `Bearer ${token}`},
      method: 'get',
      url : `${Api_url}stat/stat/pie/${equipe_id}`,
      });

      const bar = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}stat/bar/${equipe_id}`,
        });
       

      const Line = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}stat/line/${equipe_id}`,
        });
   
       const Oridata = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}stat/equipe/origin/bar/${equipe_id}`,
        });
    
      setcliname(res.data.cliname)
      setclilength(res.data.clilength)


      setreqnum(bar.data.requetes)
      setusersname(bar.data.users)


      setdate_req(Line.data.Trim_date)
      setdate_value(Line.data.date_value)

      setorigin_req(Oridata.data.origin)
      setorigin_value(Oridata.data.Origine_value)

    
    
   }
   getequipedata()
   getclidatastat()
  }, [])


  const piedata = {
    labels: cliname,
    datasets: [{
      label: 'My First Dataset',
      data: clilength,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(218, 92, 250)',
        'rgb(43, 200, 145)'
      ],
      hoverOffset: 4
    }]
  };


     const  bardata = {
      labels: usersname,
      datasets: [
        {
          label: "Requetes",
          data: reqnum,
          backgroundColor: [
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)'
        ],
        borderColor: [
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)',
            'rgb(121, 106, 238)'
        ],
          borderWidth: 1,
        },
      ]
    }

    const bardataorigin = {
      labels: origin_req,
      datasets: [{
        
        data: origin_value,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(218, 92, 250)',
          'rgb(43, 200, 145)'
        ],
        hoverOffset: 4
      }]
    };

    const baroptionorigin={
      legend: {
        display: false,
        position : 'top',
    }
    }

const linedata = {
  labels: date_req,
  datasets: [{
    spanGaps: true,
    lineTension: 0,
      backgroundColor: "transparent",
      borderColor: '#FAFAFA',
      pointBorderColor: '#da4c59',
      pointHoverBackgroundColor: '#da4c59',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      borderWidth: 1,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHoverBorderColor: "#fff",
     pointHoverBorderWidth: 2,
     pointRadius: 1,
     pointHitRadius: 0,
    label: 'Requetes',
    data: date_value,
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0
  }]
};


const option2 = {
  legend: {
    display: true,
    position : 'bottom',
}
}

const option = {
  legend: {labels:{fontColor:"#777", fontSize: 12}},
  scales: {
      xAxes: [{
          display: true,
          gridLines: {
              color: '#eee'
          }
      }],
      yAxes: [{
          display: true,
          gridLines: {
              color: '#eee'
          }
      }],
      
  },
  legend: {
    display: false
}
}


const exportPNG = ()=>{
  console.log("png")
  // Equipedata
setTimeout(() => {
  domtoimage.toJpeg(document.getElementById('Equipedata'), { quality: 1 })
  .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'Data.jpeg';
      link.href = dataUrl;
      link.click();
  });
}, 2000);
 
}

      
    return (
<>

       
        {
          cliname.length === 0 ? <Lottie options={loding}
            height={"65%"}
            width={"65%"}
            isClickToPauseDisabled={true}
          /> : (
            <>
             <div  className="row col-12 justify-content-end nopad mb-4">
             <Button variant="contained" color="light" onClick={(e)=>{exportPNG()}} style={{color:'#f8f9fe'}}>Exporter sous format png  <i class="fas fa-file-export ml-1" style={{color:"#2DCD94"}}></i></Button> 
            </div>
            {
              apidata.colture !== undefined ? <Equipeheader data={apidata} />: null
            }
             
             <div  className="row col-12 justify-content-around nopad">
           
                 <div className="card col-4 mt-3 cardstat " style={{width:"30%"}} >
                    <h5 className="card-title mt-3">Requête par employé</h5>
                    <Divider />
                      <div className="card-body">
                        <Bar options={option} data={bardata}  width={50} height={45}/>
                      </div>
                      <Divider />
                      dfsfsf
                      </div>
                
    
                      <div className="card col-4 mt-3 cardstat "  style={{width:"30%"}}>
                    <h5 className="card-title mt-3">top 5 client</h5>
                    <Divider />
                      <div className="card-body">
                        <Pie data={piedata} options={option2} width={50} height={45}/>
                      </div>
                      </div>

             
               <div className="card col-4 mt-3 cardstat"  style={{width:"30%"}}>
                    <h5 className="card-title mt-3">Requête par origin</h5>
                    <Divider />
                      <div className="card-body">
                      <Bar options={baroptionorigin} data={bardataorigin}  width={50} height={45}/>
                      </div>
                      </div>


             
                    <div className="card col-12 mt-3 cardstat" >
                    <h5 className="card-title mt-3">Requête par date</h5>
                    <Divider />
                      <div className="card-body">
                      <Line options={option}  data={linedata} width={50} height={13}/>
                      </div>
                      </div>
               
            
                      </div>
            </>
          )
        }
       
</>
        
    )
}

export default Equipedata
