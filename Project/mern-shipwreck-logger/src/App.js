import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ShipwreckList from "./components/shipwreck-list.component";
import EditShipwreck from "./components/edit-shipwreck.component";
import CreateShipwreck from "./components/create-shipwreck.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <Router>

    <div className="container">
   
    <Navbar />
      <br/>
      <Route path="/" exact component={ShipwreckList} />
      <Route path="/edit/:id" component={EditShipwreck} />
      <Route path="/create" component={CreateShipwreck} />
      <Route path="/user" component={CreateUser} />

    </div>
    </Router>
  );
}

export default App;
