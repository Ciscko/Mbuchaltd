import React, { useContext, useEffect, useState} from 'react';
import { Switch, Route } from 'react-router-dom'
import authService from '../../authService';
import { AppContext } from '../Entry';
import About from '../ProjectComponents/About/About';
import Client from '../ProjectComponents/Client';
import Company from '../ProjectComponents/Company';
import Contact from '../ProjectComponents/Contact';
import Dashboard from '../ProjectComponents/Dashboard';
import Gallery from '../ProjectComponents/Gallery';
import Login from '../ProjectComponents/Login';
import Projects from '../ProjectComponents/Projects';
import Register from '../ProjectComponents/Register';
import Services from '../ProjectComponents/Services';
import Slider from '../ProjectComponents/Slider';
import NavigationWrapper from './NavigationWrapper';
import Preloader from './Preloader';
import PrivateRoute from './PrivateRoute'
const App = () => {
    const { loggedIn, setLoggedIn} = useContext(AppContext)
    const [ view, setView ] = useState(false)
    authService.authenticate((arg) => {
        setLoggedIn(arg)
    })
    setTimeout(() => {
        setView(true)
    }, 1000)
   
    return (
        view ? 
    <div>
        <Switch>
            <Route path="/admin/login" component = { Login } />
            {/* <Route path="/admin/register" component = { Register } /> */}
            <PrivateRoute  path="/admin/register">
                <NavigationWrapper>
                    <Register/>
                </NavigationWrapper>
            </PrivateRoute>
            <PrivateRoute path="/admin/about">
                <NavigationWrapper>
                    <About/>
                </NavigationWrapper>
            </PrivateRoute>
            <PrivateRoute path="/admin/gallery">
                <NavigationWrapper>
                   <Gallery/> 
                </NavigationWrapper>
            </PrivateRoute>
            <PrivateRoute path="/admin/projects">
                <NavigationWrapper>
                   <Projects/> 
                </NavigationWrapper>
            </PrivateRoute>
            <PrivateRoute path="/admin/services">
                <NavigationWrapper>
                   <Services/> 
                </NavigationWrapper>
            </PrivateRoute>
            <PrivateRoute path="/admin/slider">
                <NavigationWrapper>
                   <Slider/> 
                </NavigationWrapper>
            </PrivateRoute>
            <PrivateRoute path="/admin/contact">
                <NavigationWrapper>
                   <Contact/>
                </NavigationWrapper>
            </PrivateRoute>
            <PrivateRoute path="/admin/client">
                <NavigationWrapper>
                   <Client/>
                </NavigationWrapper>
            </PrivateRoute>
            <PrivateRoute path="/admin/settings">
                <NavigationWrapper>
                   <Company/>
                </NavigationWrapper>
            </PrivateRoute>
            <PrivateRoute path="/admin">
                <NavigationWrapper>
                    <Dashboard/>
                </NavigationWrapper>
            </PrivateRoute>
        </Switch>
    </div>
    :
    <Preloader/>
    );
}
export default App;