import React, { Component } from 'react';
import axios from 'axios';

export default class EditShipwreck extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeRecrdname = this.onChangeRecrdname.bind(this);
        this.onChangeVesslterms = this.onChangeVesslterms.bind(this);
        this.onChangeFeature_type = this.onChangeFeature_type.bind(this);
        this.onChangeChart = this.onChangeChart.bind(this);
        this.onChangeLatdec = this.onChangeLatdec.bind(this);
        this.onChangeLondec = this.onChangeLondec.bind(this);
        this.onChangeGp_quality = this.onChangeGp_quality.bind(this);
        this.onChangeDepth = this.onChangeDepth.bind(this);
        this.onChangeSounding_type = this.onChangeSounding_type.bind(this);
        this.onChangeHistory = this.onChangeHistory.bind(this);
        this.onChangeQuasou = this.onChangeQuasou.bind(this);
        this.onChangeWatlev = this.onChangeWatlev.bind(this);


        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {

            recrd: '',
            vesslterms: '',
            feature_type:'',
            chart: '',
            latdec: '',
            londec: '',
            gp_quality: '',
            depth: '',
            sounding_type: '',
            history: '',
            quasou: '',
            watlev: '',
    
        }
      }
      componentDidMount() {
        axios.get('http://localhost:5000/shipwrecks/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              recrd: response.state.recrd,
              vesslterms: response.state.vesslterms,
              feature_type: response.state.feature_type,
              chart: response.state.chart,
              latdec: response.state.latdec,
              londec: response.state.londec,
              qp_quality: response.state.gp_quality,
              depth: response.state.depth,
              sounding_type: response.state.sounding_type,
              history: response.state.history,
              quasou: response.state.quasou,
              watlev: response.state.watlev,

            })   
          })
          .catch(function (error) {
            console.log(error);
          })}
    
        

    


      
      onChangeRecrdname(e) {
        this.setState({
          recrd: e.target.value
        })
      }
    
      onChangeVesslterms(e) {
        this.setState({
          vesslterms: e.target.value
        })
      }
    
      onChangeFeature_type(e) {
        this.setState({
          feature_type: e.target.value
        })
      }
      onChangeChart(e) {
        this.setState({
          chart: e.target.value
        })
      }

      onChangeLatdec(e) {
        this.setState({
          latdec: e.target.value
        })
      }

      onChangeLondec(e) {
        this.setState({
          londec: e.target.value
        })
      }

      onChangeGp_quality(e) {
        this.setState({
          gp_quality: e.target.value
        })
      }

      onChangeDepth(e) {
        this.setState({
          depth: e.target.value
        })
      }

      onChangeSounding_type(e) {
        this.setState({
          sounding_type: e.target.value
        })
      }

      onChangeHistory(e) {
        this.setState({
          history: e.target.value
        })
      }

      onChangeQuasou(e) {
        this.setState({
          quasou: e.target.value
        })
      }

      onChangeWatlev(e) {
        this.setState({
          watlev: e.target.value
        })
      }


    
      onSubmit(e) {
        e.preventDefault();
    
        const shipwreck = {
          recrd: this.state.recrd,
          vesslterms: this.state.vesslterms,
          feature_type: this.state.feature_type,
          chart: this.state.chart,
          latdec: this.state.latdec,
          londec: this.state.londec,
          qp_quality: this.state.gp_quality,
          depth: this.state.depth,
          sounding_type: this.state.sounding_type,
          history: this.state.history,
          quasou: this.state.quasou,
          watlev: this.state.watlev,
              }
    
        console.log(shipwreck);
    
        axios.post('http://localhost:5000/shipwrecks/update/+this.props.match.params.id', shipwreck)
          .then(res => console.log(res.data));
    
   // window.location = '/';
      }
    
      render() {
        return (
        <div>
          <h3>Edit Shipwreck Log</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Record Name: </label>
              <input  type="text"
          
                className="form-control"
                value={this.state.recrd}
                onChange={this.onChangeRecrdname}
                />
            </div>
            <div className="form-group"> 
            <label>Vessel Terms </label>
            <input  type="text"
              
              className="form-control"
              value={this.state.vesslterms}
              onChange={this.onChangeVesslterms}
              />
          </div>

          <div className="form-group"> 
            <label>Feature Type </label>
            <input  type="text"
              required
              className="form-control"
              value={this.state.feature_type}
              onChange={this.onChangeFeature_type}
              />
          </div>

          <div className="form-group"> 
            <label>Chart </label>
            <input  type="text"
              
              className="form-control"
              value={this.state.chart}
              onChange={this.onChangeChart}
              />
          </div>

          <div className="form-group"> 
          <label>Lattitude</label>
          <input  type="text"
            required
            className="form-control"
            value={this.state.latdec}
            onChange={this.onChangeLatdec}
            />
        </div>

          <div className="form-group"> 
            <label>Longitude </label>
            <input  type="text"
              required
              className="form-control"
              value={this.state.londec}
              onChange={this.onChangeLondec}
              />
          </div>

          <div className="form-group"> 
            <label>GP Quality </label>
            <input  type="text"
              
              className="form-control"
              value={this.state.gp_quality}
              onChange={this.onChangeGp_quality}
              />
          </div>

          <div className="form-group"> 
          <label>Depth </label>
          <input  type="text"
            
            className="form-control"
            value={this.state.depth}
            onChange={this.onChangeDepth}
            />
        </div>

        <div className="form-group"> 
        <label>Sounding Type </label>
        <input  type="text"
          
          className="form-control"
          value={this.state.sounding_type}
          onChange={this.onChangeSounding_type}
          />
      </div>
          
      <div className="form-group"> 
      <label>History </label>
      <input  type="text"
        
        className="form-control"
        value={this.state.history}
        onChange={this.onChangeHistory}
        />
    </div>

    <div className="form-group"> 
    <label>Quasou </label>
    <input  type="text"
      
      className="form-control"
      value={this.state.quasou}
      onChange={this.onChangeQuasou}
      />
  </div>

  <div className="form-group"> 
  <label>Water Level </label>
  <input  type="text"
    
    className="form-control"
    value={this.state.watlev}
    onChange={this.onChangeWatlev}
    />
</div>

      
    
            <div className="form-group">
              <input type="submit" value="Edit Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }
    }