import React , { useState , useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom';



function AdminRoute({ component: Component, ...rest }) {
    const user =JSON.parse(localStorage.getItem('user')) ;
    
   
    if(user){
        if(user.user_level === "admin"){
            return (
                <Route {...rest} render={(props) => (
                      <Component {...props} /> 
                  )} />
            )
        }
        else if(user.user_level === "Chef Service") {
            return (
                <Route {...rest} render={(props) => (
                      <Component {...props} /> 
                  )} />
            )
        }
        else if(user.user_level === "DG") {
            return (
                <Route {...rest} render={(props) => (
                      <Component {...props} /> 
                  )} />
            )
        }
        else {
            return (
                <Route {...rest} render={(props) => (
                    <Redirect to='/notfound' />
                  )} />
            )
        }
        
    }else if (!user){
        return (
            <Route {...rest} render={(props) => (
                   <Redirect to='' />
              )} />
        )
    }
    
    
}

export default AdminRoute
