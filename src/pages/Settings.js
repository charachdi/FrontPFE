import React , {useState , useEffect} from 'react'
import axios from 'axios'
import $ from 'jquery'
import Api_url from './../component/Api_url';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import StorageIcon from '@material-ui/icons/Storage';
import PaymentIcon from '@material-ui/icons/Payment';
import Storage from './../component/AdminSettings/Storage'
import Prime from './../component/AdminSettings/Prime'



function Settings() {

    const token = localStorage.getItem('token')
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
      };

    return (
      <>
      <header class="page-header">
          <div class="container-fluid">
            <h2 class="no-margin-bottom">parameters</h2>
          </div>
        </header>
       
        <div class="breadcrumb-holder container-fluid">
          <ul class="breadcrumb">
          <li class="breadcrumb-item" ><a href="home" >Home </a></li>
            <li class="breadcrumb-item active">parameters</li>
          </ul>
        </div>
        <div className="row mt-5">
        <div className="col-3 justify-content-center mt-3 border z-depth-3" style={{height : "60vh"}}>
        <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText primary="Storage" />
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Prime" />
        </ListItem>
      </List>
        </div>
          <div className="col-9 justify-content-center">
         {
             selectedIndex === 0 ? (
                 <Storage />
             ) : null
         }

        {
             selectedIndex === 1 ? (
                 <Prime />
             ) : null
         }
        </div>
        </div>
        </>
    )
}

export default Settings
