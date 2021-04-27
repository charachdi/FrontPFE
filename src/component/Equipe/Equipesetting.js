import React ,{useState , useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArchiveIcon from '@material-ui/icons/Archive';

import Archive from './../../component/Settings/Archive'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));



function Equipesetting(props) {

const classes = useStyles();
const [selectedIndex, setSelectedIndex] = React.useState(0);
const [archive, setarchive] = useState(props.archive)

const updatear = (prog , req)=>{
    props.update(prog,req)
 }
    return (
        <div className="row col-12 justify-content-start" style={{minHeight:500}}>
            <div className="col-3 setting" style={{backgroundColor:"white"}}>
            <List component="nav" className={classes.root} aria-label="contacts">
                <ListItem  button 
                selected={selectedIndex === 0}
                onClick={(event) => setSelectedIndex(0)}
                className=''
                >
                    <ListItemIcon>
                    <ArchiveIcon />
                    </ListItemIcon>
                    <ListItemText primary="Archive" />
                </ListItem>


            
            
            </List>
            </div>


            <div className="col-7 mx-auto card">
                <Archive prog={archive.Prog} req={archive.requete} update={updatear}/>
            </div>
        </div>
    )
}

export default Equipesetting
