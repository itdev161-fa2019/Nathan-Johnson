import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner'

const Shipwreck = props => (
  <tr>
    <td>{props.shipwreck.recrd}</td>
    <td>{props.shipwreck.feature_type}</td>
    <td>{props.shipwreck.chart}</td>
    <td>{props.shipwreck.latdec}</td>
    <td>{props.shipwreck.londec}</td>
    <td>
      <a href={"https://www.google.com/maps/place/"+props.shipwreck.latdec+','+props.shipwreck.londec} target="_blank" >&nbsp;&nbsp;Go&nbsp;to&nbsp;Map&nbsp;&nbsp;</a> 
      <p>
        <a href="#" onClick={() => { props.deleteShipwreck(props.shipwreck._id) }}>&nbsp;Delete&nbsp;</a>|
       <Link to={"/edit/"+props.shipwreck._id}>&nbsp;Edit&nbsp;</Link>
       </p>
    </td>
  </tr>
)



export default class ShipwreckList extends Component {
  constructor(props) {
    super(props);

    this.deleteShipwreck = this.deleteShipwreck.bind(this)

    this.state = {shipwrecks: []};
  }

    componentDidMount(){
      axios.get('http://localhost:5000/shipwrecks/')
        .then(response => {
          this.setState({ shipwrecks: response.data})
        })
        .catch((error) => {
          console.log(error);
        })
    }

    deleteShipwreck(id) {
      axios.delete('http://localhost:5000/shipwrecks/'+id)
      .then(res => console.log(res.data));

      this.setState ({
        shipwrecks: this.state.shipwrecks.filter(el => el._id !== id)
      })
    }

shipwreckList() {
  return this.state.shipwrecks.map(currentshipwreck => {
    return<Shipwreck shipwreck={currentshipwreck} deleteShipwreck={this.deleteShipwreck} key={currentshipwreck._id}/>;
  })
}

  
    render() {    
      return (
        <div>
          <h3>Logged Shipwrecks</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Record</th>
                <th>Chart</th>
                <th>Feature Type</th>
                <th>Lattitude</th>
                <th>Longitude</th>
                <th>   Actions   </th>
              </tr>
            </thead>
            <tbody>
              { this.shipwreckList() }
              <p>
              </p>
              <Loader
         type="Puff"
         color="#00BFFF"
         height={200}
         width={200}
         timeout={20000} //10 secs
       
      />
              Loading (lots of shipwrecks).....
            </tbody>
          </table>
        </div>

        
      )
    }
  }