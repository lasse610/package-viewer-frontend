import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Packages from './components/packages';
import PackagePage from './components/packagePage'
import NavBar from './components/navBar';
import NotFound from './components/notFound'
function App() {
  return (
    <React.Fragment>
      <NavBar/>
      <Switch>
         <Route path='/packages/:title' render={(props) => <PackagePage {...props} key={Math.random()}/>} />
         <Route path='/packages' component={Packages}/>
         <Route path='/not-found' component={NotFound} />
         <Redirect exact from='/' to='/packages' />
         <Redirect to='/not-found' />
      </Switch>
    </React.Fragment>
   
  
  );
}

export default App;
