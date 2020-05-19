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
      indexID: 0,
      formDisplay: false,
      orderBy: "petName",
      orderDir: "desc",
      searchField: ""

    }
    // on fait le binding dés le depart
    this.onDeleteAppointment = this.onDeleteAppointment.bind(this);
    this.onToggleForm = this.onToggleForm.bind(this);
    this.onAddAppointment = this.onAddAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApt = this.searchApt.bind(this);
    this.updateApts = this.updateApts.bind(this);
  }

  onToggleForm() {

    this.setState({

      formDisplay: !this.state.formDisplay

    })

  }

  onDeleteAppointment(apt) {

    let tempListApt = this.state.appointments;
    tempListApt = Lodash.without(tempListApt, apt);
    this.setState({ appointments: tempListApt });

  }

  onAddAppointment(apt) {

    let aptList = this.state.appointments;
    apt.indexID = this.state.indexID;
    aptList.unshift(apt);
    this.setState({
      indexID: apt.indexID + 1,
      appointments: aptList
    });
  }

  changeOrder(orderBy, orderDir) {

    this.setState({
      orderBy: orderBy,
      orderDir: orderDir
    });

  }

  searchApt(e) {
    let target = e.target;
    let value = target.value;

    this.setState({
      searchField: value
    });

  }

  updateApts(attribute, value, index) {

    let appointments = this.state.appointments;
    // retourne l'index de l'element qui match le prédicat
    let aptIndex = Lodash.findIndex(appointments, { indexID: index })
    appointments[aptIndex][attribute] = value;
    this.setState({appointments:appointments});

  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {

          item.indexID = this.state.indexID;

          this.setState({ indexID: item.indexID + 1 });

          return item;
        });
        this.setState({ appointments: apts });
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

    let order = 1;
    let filteredList = this.state.appointments;
    order = this.state.orderDir === "asc" ? 1 : -1;

    filteredList = filteredList.sort((a, b) => {

      if (a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()) {

        return order * -1;
      }
      else {
        return order * 1;
      }

    }).filter(element => {

      return (element[this.state.orderBy].toLowerCase().includes(this.state.searchField.toLowerCase())
      )
    })


    return (

      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments formDisplay={this.state.formDisplay} toggleForm={this.onToggleForm} addApointment={this.onAddAppointment} />
                <SearchAppointments orderBy={this.state.orderBy} orderDir={this.state.orderDir} changeOrder={this.changeOrder} searchApt={this.searchApt} />
                <ListAppointments appointments={filteredList} deleteAppointment={this.onDeleteAppointment} updateApts={this.updateApts} />
              </div>
            </div>
          </div>
        </div>
      </main>

    );
  }
}

export default App;
