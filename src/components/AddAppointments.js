import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';

class AddAppointments extends Component {

    constructor() {

        super()

        this.state = {

            petName: '',
            ownerName: '',
            aptNotes: '',
            aptDate: '',
            aptTime: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(e) {
        let target = e.target;
        let value = target.value;
        let attName = target.name;

        this.setState({

            [attName]: value

        })

    }

    onSave(e) {

        e.preventDefault();

        let valueToAdd = {
            petName: this.state.petName,
            ownerName: this.state.ownerName,
            aptNotes: this.state.aptNotes,
            aptDate: this.state.aptDate + " " + this.state.aptTime
        }

        this.props.addApointment(valueToAdd);

        this.setState({

            petName: '',
            ownerName: '',
            aptNotes: '',
            aptDate: '',
            aptTime: ''
        })
        this.props.toggleForm();

    }


    render() {

        return (
            <div className={'card textcenter mt-3 ' + (this.props.formDisplay ? '' : 'add-appointment')}>
                <div className="apt-addheading card-header bg-primary text-white" onClick={() => {
                    this.props.toggleForm()
                }} >
                    <FaPlus />   Termin hinzufügen
        </div>

                <div className="card-body">
                    <form id="aptForm" noValidate  onSubmit={this.onSave}>
                        <div className="form-group form-row">
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="petName"
                                readOnly
                            >
                                Tiername
              </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="petName"
                                    placeholder="Tiername"
                                    value={this.state.petName}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="ownerName"
                            >
                                Besitzer
              </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ownerName"
                                    placeholder="Name des Besitzers"
                                    value={this.state.ownerName}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="aptDate"
                            >
                                Datum
              </label>
                            <div className="col-md-4">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="aptDate"
                                    id="aptDate"
                                    value={this.state.aptDate}
                                    onChange={this.onChange}
                                />
                            </div>
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="aptTime"
                            >
                                Uhrzeit
              </label>
                            <div className="col-md-4">
                                <input
                                    type="time"
                                    className="form-control"
                                    name="aptTime"
                                    id="aptTime"
                                    value={this.state.aptTime}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label className="col-md-2 text-md-right" htmlFor="aptNotes">
                                Anmerkungen
              </label>
                            <div className="col-md-10">
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    cols="50"
                                    name="aptNotes"
                                    id="aptNotes"
                                    placeholder="Anmerkungen"
                                    value={this.state.aptNotes}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row mb-0">
                            <div className="offset-md-2 col-md-10">
                                <button
                                    type="submit"
                                    className="btn btn-primary d-block ml-auto"
                                >
                                    Termin hinzufügen
                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>);


    }



}

export default AddAppointments;