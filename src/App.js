import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Packages from './components/packages';


function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path='/packages' component={Packages}/>
        <Packages/> 
      </Switch>
    </React.Fragment>
   
  
  );
}

export default App;
