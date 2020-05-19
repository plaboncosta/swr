import React, {Component} from 'react';
import {Link}             from "react-router-dom";
import Axios           from "axios";
import {backendApiUrl} from "../config/constant";
import {DataTable}     from "primereact/datatable";
import {Column}        from "primereact/column";
import AlertMessage    from "./utility/AlertMessage";
import {Modal, Button} from "react-bootstrap";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUserData        : [],
            newUserTableData   : [],
            existUserData      : [],
            existUserTableData : [],
            success            : false,
            successMessage     : '',
            error              : false,
            errorMessage       : '',
            id                 : null,
            tags               : [],
            tag                : ''
        };
    }
    
    componentDidMount() {
        this.getData();
        this.getExistingCustomerData();
    }
    
    getData = async () => {
        try {
            const res = await Axios.get(backendApiUrl + 'api/user/not/approve/all');
            this.setState({
                              newUserData      : [],
                              newUserTableData : []
                          }, () => {
                const newUserTableData = res.data.length > 0 && res.data.map(item => {
                    return {
                        id         : item._id,
                        first_name : item.first_name,
                        last_name  : item.last_name,
                        email      : item.email,
                        phone      : item.phone,
                        status     : item.status.name,
                        user_role  : item.user_role.name
                    };
                    
                });
                this.setState({newUserData : res.data, newUserTableData});
            });
        } catch (err) {
            console.log(err.response);
        }
    };
    
    getExistingCustomerData = async () => {
        try {
            const res = await Axios.get(backendApiUrl + 'api/customer/all');
            this.setState({
                              existUserData      : [],
                              existUserTableData : []
                          }, () => {
                const existUserTableData = res.data.length > 0 && res.data.map(item => {
                    return {
                        first_name : item.first_name ? item.first_name : '',
                        last_name  : item.last_name ? item.last_name : '',
                        email      : item.email ? item.email : '',
                        phone      : item.phone ? item.phone : '',
                        address    : item.default_address.address1 ? item.default_address.address1 : '',
                        city       : item.default_address.city ? item.default_address.city : '',
                        country    : item.default_address.country_name ? item.default_address.country_name : ''
                    };
                    
                });
                this.setState({existUserData : res.data, existUserTableData});
            });
        } catch (err) {
            console.log(err.response);
        }
    };
    
    approveUser = async id => {
        try {
            const data = this.state.newUserData.find(item => item._id === id && item);
            Object.assign(data, {tags: this.state.tags});
            
            const res  = await Axios.post(backendApiUrl + 'api/customer/create', data);
            
            const {success, msg} = res.data;
            this.setState({
                              success        : success,
                              successMessage : msg,
                              error          : false,
                              approve_modal_show: false
                          }, () => {
                this.getData();
                this.getExistingCustomerData();
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
    
    deleteUser = async (id) => {
        try {
            const res = await Axios.get(backendApiUrl + 'api/user/delete/' + id);
            
            const {success, msg} = res.data;
            this.setState({
                              success        : success,
                              successMessage : msg,
                              error          : false,
                              delete_modal_show: false
                          }, () => {
                this.getData();
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
    
    getActions = (rowData) => {
        return <>
            <Link to="#" className="btn btn-info btn-sm mr-2" onClick={() => this.setState({id : rowData.id, customer_name : rowData.first_name}, () => this.setState({approve_modal_show: true}))}>Approve</Link>
            <button className="btn btn-danger btn-sm"
                    onClick={() => this.setState({id : rowData.id, customer_name : rowData.first_name}, () => this.setState({delete_modal_show : true}))}>Decline
            </button>
        </>;
    };
    
    handleDelete = (i) => {
        const {tags} = this.state;
        this.setState({
                          tags : tags.filter((tag, index) => index !== i),
                      });
    };
    
    handleAddition = (tag) => {
        const {tags} = this.state;
        if (tags.filter((item) => item === tag).length > 0) {
            this.setState({tag : ''});
            return;
        }
        this.setState(state => ({tags : [...state.tags, tag], tag : ''}));
    };
    
    render() {
        const {newUserTableData, existUserTableData, error, errorMessage, success, successMessage, id, tags, tag} = this.state;
        
        return <>
            {error && <div className="my-3">
                <AlertMessage alertType={'danger'} msg={errorMessage}/>
            </div>}
            {success && <div className="my-3">
                <AlertMessage alertType={'success'} msg={successMessage}/>
            </div>}
            <div className="new-customer-request-list">
                <div className="table-header">
                    <p>New Customer List</p>
                </div>
                <DataTable value={newUserTableData} paginator={true} rows={10} first={this.state.first}
                           onPage={e => this.setState({first : e.first})} footer={`There are ${newUserTableData.length} rows`}>
                    <Column field={'first_name'} header={'First Name'} sortable={true} filter={true}
                            filterPlaceholder={'First Name'}/>
                    <Column field={'last_name'} header={'Last Name'} sortable={true} filter={true} filterPlaceholder={'Last Name'}/>
                    <Column style={{width: '250px'}} field={'email'} header={'Email'} sortable={true} filter={true} filterPlaceholder={'Email'}/>
                    <Column field={'phone'} header={'Phone'} sortable={true} filter={true} filterPlaceholder={'Phone'}/>
                    <Column field={'status'} header={'Status'} sortable={true} filter={true} filterPlaceholder={'Status'}/>
                    <Column className="d-flex" body={this.getActions} header={'Actions'}/>
                </DataTable>
            </div>
            <div className="existing-customer-list mt-5">
                <div className="table-header bg-blue">
                    <p>Existing Customer List</p>
                </div>
                <DataTable value={existUserTableData} paginator={true} rows={10} first={this.state.first}
                           onPage={e => this.setState({first : e.first})} footer={`There are ${existUserTableData.length} rows`}>
                    <Column field={'first_name'} header={'First Name'} sortable={true} filter={true}
                            filterPlaceholder={'First Name'}/>
                    <Column field={'last_name'} header={'Last Name'} sortable={true} filter={true} filterPlaceholder={'Last Name'}/>
                    <Column style={{width: '250px'}} field={'email'} header={'Email'} sortable={true} filter={true} filterPlaceholder={'Email'}/>
                    <Column field={'phone'} header={'Phone'} sortable={true} filter={true} filterPlaceholder={'Phone'}/>
                    <Column field={'address'} header={'Address'} sortable={true} filter={true} filterPlaceholder={'Address'}/>
                    <Column field={'city'} header={'City'} sortable={true} filter={true} filterPlaceholder={'City'}/>
                    <Column field={'country'} header={'Country'} sortable={true} filter={true} filterPlaceholder={'Country'}/>
                </DataTable>
            </div>
            <Modal size="lg" show={this.state.approve_modal_show} onHide={() => this.setState({approve_modal_show: false})}>
                <Modal.Header closeButton>
                    <h4>User Approval</h4>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to approve {this.state.customer_name}?</p>
                    <div className="form-group">
                        <label htmlFor="tag">Add Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={tag}
                               onChange={e => this.setState({tag: e.target.value})}
                               onKeyPress={e => {
                                   if (e.key === 'Enter') {
                                       if (tag !== '') {
                                           this.handleAddition(tag);
                                       }
                                   }
                               }}
                        />
                        <ul className="d-flex flex-wrap list-unstyled m-0 p-0 mt-2">
                            {tags.length > 0 && tags.map((item, index) => {
                                return <li className="badge badge-info mr-2 mt-2" key={index}>{item}
                                    <i className="icofont-close ml-1 cursor-pointer"
                                       onClick={() => this.handleDelete(index)}
                                    />
                                </li>;
                            })}
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.setState({approve_modal_show: false})}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.approveUser(id)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal size="lg" show={this.state.delete_modal_show} onHide={() => this.setState({delete_modal_show : false})}>
                <Modal.Header closeButton>
                    <h4>User Delete</h4>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete {this.state.customer_name}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.setState({delete_modal_show : false})}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => this.deleteUser(id)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>;
    }
}

export default Dashboard;