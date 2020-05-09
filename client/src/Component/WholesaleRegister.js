import React, {Component} from 'react';
import Axios              from "axios";
import {backendApiUrl}    from "../config/constant";
import AlertMessage       from "./utility/AlertMessage";

class WholesaleRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success           : false,
            successMessage    : '',
            error             : false,
            errorMessage      : '',
            required_optional : {
                first_name  : true,
                last_name   : true,
                email       : true,
                phone       : true,
                company     : true,
                address1    : true,
                address2    : true,
                city        : true,
                province    : true,
                country     : true,
                zip         : true,
                description : true
            },
            show_hide         : {
                first_name  : true,
                last_name   : true,
                email       : true,
                phone       : true,
                company     : true,
                address1    : true,
                address2    : true,
                city        : true,
                province    : true,
                country     : true,
                zip         : true,
                description : true
            }
        };
    }
    
    handleSave = async () => {
        try {
            const {required_optional, show_hide} = this.state;
            const saveCustomerData               = await Axios.post(backendApiUrl + 'api/wholesale/register/create',
                                                                    {required_optional, show_hide});
            
            const {success, msg} = saveCustomerData.data;
            this.setState({
                              success        : success,
                              successMessage : msg,
                              error          : false
                          });
        } catch (err) {
            console.log(err.response);
            const {error, msg} = err.response.data;
            this.setState({
                              error        : error,
                              errorMessage : msg,
                              success      : false
                          });
        }
    };
    
    setRequiredOptional = e => {
        const {name, value}       = e.target;
        const {required_optional} = this.state;
        
        this.setState({required_optional : {...required_optional, [name] : value === 'true'}});
        return required_optional;
    };
    
    setShowHide = e => {
        const {name, value} = e.target;
        const {show_hide}   = this.state;
        
        this.setState({show_hide : {...show_hide, [name] : value === 'true'}});
    };
    
    render() {
        const {error, errorMessage, success, successMessage, show_hide} = this.state;
        
        return <>
            <div className="container">
                {error && <div className="my-3">
                    <AlertMessage alertType={'danger'} msg={errorMessage}/>
                </div>}
                {success && <div className="my-3">
                    <AlertMessage alertType={'success'} msg={successMessage}/>
                </div>}
                <div className="card my-4">
                    <div className="card-body">
                        <h3 className="text-center">Customer Input Form</h3>
                        <div className="row">
                            <div className="col-md-8 offset-md-1">
                                <div className="form-group">
                                    <label htmlFor="first_name">First Name</label>
                                    <input type="text" name="first_name"
                                           className={`form-control`}
                                           id="first_name"
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="d-flex mt-md-4 pt-md-2 pb-2">
                                    <select className="mr-2 br-5 focus-none" name="first_name" disabled={true}
                                            onChange={this.setRequiredOptional}>
                                        <option value={true}>Required</option>
                                        <option value={false}>Optional</option>
                                    </select>
                                    <select className="br-5 focus-none" name="first_name" disabled={true}
                                            onChange={this.setShowHide}>
                                        <option value={true}>Show</option>
                                        <option value={false}>Hide</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 offset-md-1">
                                <div className="form-group">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input type="text" name="last_name"
                                           className={`form-control`}
                                           id="last_name"
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="d-flex mt-md-4 pt-md-2 pb-2">
                                    <select className="mr-2 br-5 focus-none" name="last_name" disabled={true}
                                            onChange={this.setRequiredOptional}>
                                        <option value={true}>Required</option>
                                        <option value={false}>Optional</option>
                                    </select>
                                    <select className="br-5 focus-none" name="last_name" disabled={true}
                                            onChange={this.setShowHide}>
                                        <option value={true}>Show</option>
                                        <option value={false}>Hide</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 offset-md-1">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name="email"
                                           className={`form-control`}
                                           id="email"
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="d-flex mt-md-4 pt-md-2 pb-2">
                                    <select className="mr-2 br-5 focus-none" name="email" disabled={true}
                                            onChange={this.setRequiredOptional}>
                                        <option value={true}>Required</option>
                                        <option value={false}>Optional</option>
                                    </select>
                                    <select className="br-5 focus-none" name="email" disabled={true}
                                            onChange={this.setShowHide}>
                                        <option value={true}>Show</option>
                                        <option value={false}>Hide</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 offset-md-1">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" name="phone"
                                           className={`form-control`}
                                           id="phone"
                                           disabled={show_hide && typeof show_hide.phone !== 'undefined' && !show_hide.phone && true}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="d-flex mt-md-4 pt-md-2 pb-2">
                                    <select className="mr-2 br-5 focus-none" name="phone"
                                            onChange={this.setRequiredOptional}>
                                        <option value={true}>Required</option>
                                        <option value={false}>Optional</option>
                                    </select>
                                    <select className="br-5 focus-none" name="phone"
                                            onChange={this.setShowHide}>
                                        <option value={true}>Show</option>
                                        <option value={false}>Hide</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 offset-md-1">
                                <div className="form-group">
                                    <label htmlFor="company">Company</label>
                                    <input type="text" name="company"
                                           className={`form-control`}
                                           id="company"
                                           disabled={show_hide && typeof show_hide.company !== 'undefined' && !show_hide.company && true}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="d-flex mt-md-4 pt-md-2 pb-2">
                                    <select className="mr-2 br-5 focus-none" name="company"
                                            onChange={this.setRequiredOptional}>
                                        <option value={true}>Required</option>
                                        <option value={false}>Optional</option>
                                    </select>
                                    <select className="br-5 focus-none" name="company" disabled={false}
                                            onChange={this.setShowHide}>
                                        <option value={true}>Show</option>
                                        <option value={false}>Hide</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 offset-md-1">
                                <div className="form-group">
                                    <label htmlFor="address1">Address</label>
                                    <input type="text" name="address1"
                                           className={`form-control`}
                                           id="address1"
                                           disabled={show_hide && typeof show_hide.address1 !== 'undefined' && !show_hide.address1 && true}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="d-flex mt-md-4 pt-md-2 pb-2">
                                    <select className="mr-2 br-5 focus-none" name="address1"
                                            onChange={this.setRequiredOptional}>
                                        <option value={true}>Required</option>
                                        <option value={false}>Optional</option>
                                    </select>
                                    <select className="br-5 focus-none" name="address1" disabled={false}
                                            onChange={this.setShowHide}>
                                        <option value={true}>Show</option>
                                        <option value={false}>Hide</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 offset-md-1">
                                <div className="form-group">
                                    <label htmlFor="address2">Apartment, suite, etc.</label>
                                    <input type="text" name="address2"
                                           className={`form-control`}
                                           id="address2"
                                           disabled={show_hide && typeof show_hide.address2 !== 'undefined' && !show_hide.address2 && true}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="d-flex mt-md-4 pt-md-2 pb-2">
                                    <select className="mr-2 br-5 focus-none" name="address2"
                                            onChange={this.setRequiredOptional}>
                                        <option value={true}>Required</option>
                                        <option value={false}>Optional</option>
                                    </select>
                                    <select className="br-5 focus-none" name="address2" disabled={false}
                                            onChange={this.setShowHide}>
                                        <option value={true}>Show</option>
                                        <option value={false}>Hide</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 offset-md-1">
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city"
                                           className={`form-control`}
                                           id="city"
                                           disabled={show_hide && typeof show_hide.city !== 'undefined' && !show_hide.city && true}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="d-flex mt-md-4 pt-md-2 pb-2">
                                    <select className="mr-2 br-5 focus-none" name="city"
                                            onChange={this.setRequiredOptional}>
                                        <option value={true}>Required</option>
                                        <option value={false}>Optional</option>
                                    </select>
                                    <select className="br-5 focus-none" name="city" disabled={false}
                                            onChange={this.setShowHide}>
                                        <option value={true}>Show</option>
                                        <option value={false}>Hide</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 offset-md-1">
                                <div className="form-group">
                                    <label htmlFor="province">Province</label>
                                    <input type="text" name="province"
                                           className={`form-control`}
                                           id="province"
                                           disabled={show_hide && typeof show_hide.province !== 'undefined' && !show_hide.province && true}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="d-flex mt-md-4 pt-md-2 pb-2">
                                    <select className="mr-2 br-5 focus-none" name="province"
                                            onChange={this.setRequiredOptional}>
                                        <option value={true}>Required</option>
                                        <option value={false}>Optional</option>
                                    </select>
                                    <select className="br-5 focus-none" name="province" disabled={false}
                                            onChange={this.setShowHide}>
                                        <option value={true}>Show</option>
                                        <option value={false}>Hide</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 offset-md-1">
                                <div className="form-group">
                                    <label htmlFor="country">Country</label>
                                    <input type="text" name="country"
                                           className={`form-control`}
                                           id="country"
                                           disabled={show_hide && typeof show_hide.country !== 'undefined' && !show_hide.country && true}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="d-flex mt-md-4 pt-md-2 pb-2">
                                    <select className="mr-2 br-5 focus-none" name="country"
                                            onChange={this.setRequiredOptional}>
                                        <option value={true}>Required</option>
                                        <option value={false}>Optional</option>
                                    </select>
                                    <select className="br-5 focus-none" name="country" disabled={false}
                                            onChange={this.setShowHide}>
                                        <option value={true}>Show</option>
                                        <option value={false}>Hide</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 offset-md-1">
                                <div className="form-group">
                                    <label htmlFor="zip">Zip Code</label>
                                    <input type="text" name="zip"
                                           className={`form-control`}
                                           id="zip"
                                           disabled={show_hide && typeof show_hide.zip !== 'undefined' && !show_hide.zip && true}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="d-flex mt-md-4 pt-md-2 pb-2">
                                    <select className="mr-2 br-5 focus-none" name="zip"
                                            onChange={this.setRequiredOptional}>
                                        <option value={true}>Required</option>
                                        <option value={false}>Optional</option>
                                    </select>
                                    <select className="br-5 focus-none" name="zip" disabled={false}
                                            onChange={this.setShowHide}>
                                        <option value={true}>Show</option>
                                        <option value={false}>Hide</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 offset-md-1">
                                <div className="form-group">
                                    <label htmlFor="description">Description (Why you need Wholesale)</label>
                                    <textarea name="description"
                                              className={`form-control`}
                                              id="description"
                                              disabled={show_hide && typeof show_hide.description !== 'undefined' && !show_hide.description && true}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="d-flex mt-md-4 pt-md-2 pb-2">
                                    <select className="mr-2 br-5 focus-none" name="description"
                                            onChange={this.setRequiredOptional}>
                                        <option value={true}>Required</option>
                                        <option value={false}>Optional</option>
                                    </select>
                                    <select className="br-5 focus-none" name="description" disabled={false}
                                            onChange={this.setShowHide}>
                                        <option value={true}>Show</option>
                                        <option value={false}>Hide</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 offset-md-1">
                                <button className="btn btn-info mt-4 px-4 py-2" onClick={this.handleSave}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>;
    }
}

export default WholesaleRegister;