import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Packages from './components/packages';
import PackagePage from './components/packagePage'

function App() {
  return (
    <React.Fragment>
      <Switch>
         <Route path='/packages/:title' render={(props) => <PackagePage {...props} key={Math.random()}/>} />
         <Route path='/packages' component={Packages}/>
       
      </Switch>
    </React.Fragment>
   
  
  );
}

export default App;
