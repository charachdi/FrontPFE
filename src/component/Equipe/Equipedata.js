import React , { useState , useEffect} from 'react'
import Api_url from './../../component/Api_url'
import Avatar from '@material-ui/core/Avatar';
import {Pie} from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import Equipeheader from './../../component/Equipe/Equipeheader'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close';
import $ from 'jquery'
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import domtoimage from 'dom-to-image';
import Button from '@material-ui/core/Button';
import Lottie from 'react-lottie';
import Chartsloding from './../../images/chartsloding.json'
import IconButton from '@material-ui/core/IconButton';
import { DateRange } from 'react-date-range';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import * as locales from 'react-date-range/dist/locale';
import AddIcon from '@material-ui/icons/Add';

function Equipedata(props) {

  const token = localStorage.getItem('token')
  const [equipe_id, setequipe_id] = useState(props.equipeid)
  const [apidata, setapidata] = useState([])
  const [filteron, setfilteron] = useState(false);
  const [open, setopen] = useState();

  const toggle = ()=>{
    setopen(!open)
  }
  const [Request, setRequest] = useState([
    {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}
])
const [locale, setLocale] = React.useState('fr');
const [colors, setcolors] = useState(['#32B66A'])
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
      hoverOffset: 4,
      plugins: {
        datalabels: {
           display: false,
           color: 'white'
        }
     }
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
    },
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
  plugins: {
    datalabels: {
        formatter: (value, ctx) => {

            let datasets = ctx.chart.data.datasets;
            let sum = 0;
            let percentage = 0
            if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                
                datasets.map(dataset => {
                    sum += dataset.data[ctx.dataIndex];
                });
                 percentage  = Math.round((value / sum) * 100) + '%';
                return percentage;
            } else {
                return percentage;
            }
        },
        color: '#fff',
             }
},
  legend: {
    display: true,
    position : 'bottom',
},
tooltips: {
  callbacks: {
    label: function(tooltipItem, data) {
      var dataset = data.datasets[tooltipItem.datasetIndex];
      var meta = dataset._meta[Object.keys(dataset._meta)[0]];
      var total = meta.total;
      var currentValue = dataset.data[tooltipItem.index];
      var percentage = parseFloat((currentValue/total*100).toFixed(1));
      return currentValue + ' (' + percentage + '%)';
    },
    title: function(tooltipItem, data) {
      return data.labels[tooltipItem[0].index];
    }
  }
},

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

const filter = async ()=>{
   setfilteron(true)
   var start = Request[0].startDate.toLocaleDateString('en-US').split("/")
  var  end = Request[0].endDate.toLocaleDateString('en-US').split("/")
  const data = {
    startdate : `${start[1]}/${start[0]}/${start[2]}`,
    enddate : `${end[1]}/${end[0]}/${end[2]}`
  }
console.log(data)
    const getclidatastat =async()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'post',
        url : `${Api_url}stat/stat/pie/date/${equipe_id}`,
        data
        });
  
        const bar = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'post',
          url : `${Api_url}stat/bar/date/${equipe_id}`,
          data
          });
         
  
        const Line = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'post',
          url : `${Api_url}stat/line/date/${equipe_id}`,
          data
          });
     
         const Oridata = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'post',
          url : `${Api_url}stat/equipe/origin/bar/date/${equipe_id}`,
          data
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
     const getequipedata = async() =>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'post',
        url : `${Api_url}stat/requets/date/${equipe_id}`,
        data
        });
        setapidata(res.data)
       
     }

     getclidatastat()
     getequipedata()
}


const exportPNG = ()=>{
  console.log("png")
  // Equipedata
setTimeout(() => {
  domtoimage.toJpeg(document.getElementById('Equipedata'), { quality: 1 })
  .then(function (dataUrl) {
      
      var link = document.createElement('a');
      link.download =  `${props.eqname}/${new Date().toLocaleDateString("en-US")}`;
      link.href = dataUrl;
      link.click();
  });
}, 2000);
 
}
const Resetfilter = async ()=>{
  setcliname([])
  setfilteron(false)
  const getclidatastat = async()=>{
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

        const res2 = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'get',
          url : `${Api_url}stat/requets/${equipe_id}`,
          });
          
      setapidata(res2.data)

      setcliname(res.data.cliname)
      setclilength(res.data.clilength)


      setreqnum(bar.data.requetes)
      setusersname(bar.data.users)


      setdate_req(Line.data.Trim_date)
      setdate_value(Line.data.date_value)

      setorigin_req(Oridata.data.origin)
      setorigin_value(Oridata.data.Origine_value)

    
    
   }
   getclidatastat()
}


const plugins = [{
  beforeDraw: function(chart) {
   var width = chart.width,
       height = chart.height,
       ctx = chart.ctx;
       ctx.restore();
       var fontSize = (height / 160).toFixed(2);
       ctx.font = fontSize + "em sans-serif";
       ctx.textBaseline = "top";
       var text = "Foo-bar",
       textX = Math.round((width - ctx.measureText(text).width) / 2),
       textY = height / 2;
       ctx.fillText(text, textX, textY);
       ctx.save();
  } 
}]
      
    return (
<>

       
        {
          cliname.length === 0 ? <Lottie options={loding}
            height={"65%"}
            width={"65%"}
            isClickToPauseDisabled={true}
          /> : (
             <>
             <div  className="row col-12 justify-content-end  mb-4">
             <button className="btn-Filter cardstat mr-1"  style={{width:50 , height : 50}}> <div onClick={()=>{toggle()}}><i class="fas fa-filter "></i><small  className="text-capitalize">filter</small></div></button>
             {filteron ? (  <button className="btn-Filter cardstat mr-2"  style={{width:50 , height : 50}}><Tooltip title="supprimer le filtre"><IconButton aria-label="delete" onClick={()=>{Resetfilter()}}><CloseIcon style={{color : "white"}}/></IconButton></Tooltip></button>): null }
             <button className="btn-export cardstat text-capitalize" onClick={(e)=>{exportPNG()}} style={{width:"5%"}} ><i class="fas fa-file-export fa-2x ml-1" style={{color:"#2DCD94"}}></i></button> 
            </div>
            {
              apidata.colture !== undefined ? <Equipeheader data={apidata} />: null
            }
             
             <div  className="row col-12 justify-content-around nopad">
           
                 <div className="card col-lg-4 col-12 mt-3 cardstat " style={{width:"30%"}} >
                    <p className="card-title mt-3">Requête par employé</p>
                    <Divider />
                      <div className="card-body">
                        <Bar options={option} data={bardata}  width={50} height={45}/>
                      </div>
                      {/* <Divider /> */}
                     
                      </div>
                
    
                      <div className="card col-lg-4 col-12 mt-3 cardstat "  style={{width:"30%"}}>
                    <p className="card-title mt-3">top 5 client</p>
                    <Divider />
                      <div className="card-body">
                        <Pie data={piedata} options={option2} width={50} plugins={plugins} height={45}/>
                      </div>
                      </div>

             
               <div className="card col-lg-4 col-12 mt-3 cardstat"  style={{width:"30%"}}>
                    <p className="card-title mt-3">Requête par origine</p>
                    <Divider />
                      <div className="card-body">
                      <Bar options={baroptionorigin} data={bardataorigin}  width={50} height={45}/>
                      </div>
                      </div>


             
                    <div className="card col-12 mt-3 cardstat" >
                    <p className="card-title mt-3">Requête par date</p>
                    <Divider />
                      <div className="card-body">
                      <Line options={option}  data={linedata} width={50} height={13}/>
                      </div>
                      </div>
               
            
                      </div>
            </>
          )
        }
        <MDBModal isOpen={open} toggle={()=>toggle()} size="md" disableBackdrop={false}>
              <MDBModalHeader toggle={()=>toggle()} className="text-center"></MDBModalHeader>
              <MDBModalBody>
              <div className="text-center ">
              <DateRange
                    className="mt-5"
                    editableDateInputs={true}
                    onChange={item => setRequest([item.selection]) }
                    moveRangeOnFirstSelection={false}
                    ranges={Request}
                    rangeColors={colors}
                    locale={locales[locale]}
                /><br />

                    <IconButton style={{backgroundColor : "#32B66A"}} className="mt-5" onClick={()=>{filter() ; toggle() ; setcliname([])}}>
                    <i class="fas fa-filter" style={{color : "white"}}></i>
                    </IconButton>
              </div>
              </MDBModalBody>
              </MDBModal>

</>
        
    )
}

export default Equipedata
