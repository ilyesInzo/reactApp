import React, { Component } from 'react';
import AddAppointments from './AddAppointments.js'
import ListAppointments from './ListAppointments.js'
import SearchAppointments from './SearchAppointments.js'
import '../css/App.css';
import Lodash from 'lodash';

class App extends Component {

  constructor() {
    super()

    this.state = {

      mylocation: "Lepzig",
      appointments: [],
      indexID:0

    }
    // on fait le binding dés le depart
    this.onDeleteAppointment = this.onDeleteAppointment.bind(this);

  }

  onDeleteAppointment(apt){

    let tempListApt = this.state.appointments;
    tempListApt = Lodash.without(tempListApt,apt);
    this.setState({appointments:tempListApt});

  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          
          item.indexID = this.state.indexID;

          this.setState({indexID:item.indexID+1});

          return item; });
        this.setState({appointments : apts});
      })
  }


  render() {
/* this will be added in the listComponent
const listAppointment = this.state.appointments.map(item => 

   (<div>
  <div> {item.petName} </div>
  <div> {item.ownerName} </div>
  </div>
  )
)*/



    return (

      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments />
                <SearchAppointments />
                <ListAppointments appointments = {this.state.appointments} deleteAppointment = {this.onDeleteAppointment} />
              </div>
            </div>
          </div>
        </div>
      </main>

    );
  }
}

export default App;
