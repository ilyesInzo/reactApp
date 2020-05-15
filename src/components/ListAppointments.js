import React, { Component } from 'react';
import {FaTimes} from 'react-icons/fa';
import Moment from 'react-moment'

class ListAppointment extends Component {



    render() {
        // props. the name of the attribute in the dev
        // so it will recover the value to pass it here
        /*const listAppointment = this.props.appointments.map(item =>

            (<div key={item.petName}>
                <div> {item.petName} </div>
                <div> {item.ownerName} </div>
            </div>
            ));*/


        return (


            <div className="appointment-list item-list mb-3">

                {this.props.appointments.map(item => ( 
                <div className="pet-item col media py-3" key={item.indexID}>
                    <div className="mr-3">
                        <button className="pet-delete btn btn-sm btn-danger" onClick = {()=> this.props.deleteAppointment(item)}><FaTimes /></button>
                    </div>

                    <div className="pet-info media-body">
                        <div className="pet-head d-flex">
                            <span className="pet-name">{item.petName}</span>
                            <span className="apt-date ml-auto">
 
                                <Moment
                                date={item.aptDate}
                                parse="YYYY-MM-dd hh:mm"
                                format="DD.MM.YYYY hh:mm"
                                >
                                </Moment>
                                
                                </span>
                        </div>

                        <div className="owner-name">
                            <span className="label-item">Besitzer: </span>
                            <span>{item.ownerName}</span>
                        </div>
                        <div className="apt-notes">{item.aptNotes}</div>
                    </div>
                </div>
                 ))}
            </div>

        )

    }
}

export default ListAppointment