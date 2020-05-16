import React, {Component} from 'react';
import Axios              from "axios";
import {backendApiUrl}    from "../config/constant";
import ReactHtmlParser    from 'react-html-parser';
import AlertMessage       from "./utility/AlertMessage";

class EmbedForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tokenList          : [],
            wholesale_register : {},
            token              : '',
            success            : false,
            successMessage     : '',
            error              : false,
            errorMessage       : '',
        };
    }
    
    componentDidMount() {
        this.getToken();
    }
    
    getToken = async () => {
        try {
            const res = await Axios.get(backendApiUrl + 'api/wholesale/register/all/token');
            this.setState({
                              tokenList : res.data
                          });
        } catch (err) {
            console.log(err.response);
        }
    };
    
    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const {token} = this.state;
            if (!token) {
                alert('Please select your token!');
                return false;
            }
            
            const res = await Axios.post(backendApiUrl + 'api/wholesale/register/by/token', {token});
            this.setState({
                              wholesale_register : {}
                          }, () => {
                if (res.data === null) {
                    alert('Please enter a valid token!');
                    this.setState({token : ''});
                    return false;
                }
                this.setState({wholesale_register : res.data});
            });
        } catch (err) {
            console.log(err.response);
        }
    };
    
    customerFormSubmit = async (e) => {
        try {
            e.preventDefault();
            
            const {wholesale_register} = this.state;
            const viewField            = Object.keys(wholesale_register).length > 0 &&
                                         Object.keys(wholesale_register.show_hide)
                                               .filter(item => wholesale_register.show_hide[item]);
            
            let data = {};
            viewField.map(item => {
                Object.assign(data, {[item] : document.getElementById(`${item}`).value});
            });
            
            const res = await Axios.post(backendApiUrl + 'api/user/create', data);
            
            const {success, msg} = res.data;
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
    
    render() {
        const {error, errorMessage, success, successMessage, wholesale_register, tokenList} = this.state;
        const viewField                                                                            = Object.keys(
            wholesale_register).length > 0 &&
                                                                                                     Object.keys(
                                                                                                         wholesale_register.show_hide)
                                                                                                           .filter(
                                                                                                               item => wholesale_register.show_hide[item]);
        
        const input_field = Object.keys(wholesale_register).length > 0 &&
                            viewField.map((item, index) => {
                                if (item === 'description') {
                                    return `
                            <div class="form-group">
                                 <label for="${item}">Description (Why you need Wholesale)</label>
                                 <textarea name="${item}" class="form-control"
                                      id="${item}" placeholder="Description"
                                      ${wholesale_register.required_optional[item] ? 'required' : ''}/>
                            </div>`;
                                } else {
                                    return `
                            <div class="form-group">
                                  <label for="${item}" class="text-capitalize">
                                    ${item.replace('_', ' ')}</label>
                                  <input type="${item === 'email' ? 'email' : 'text'}" name="${item}"
                                      class="form-control" placeholder="${item.replace('_', ' ')}"
                                      id="${item}" ${wholesale_register.required_optional[item] ? 'required' : ''}/>
                            </div>`;
                                }
                            });
        
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
                        <p className="mt-2">Select your token and submit</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <select className="form-control" name="token" id="token"
                                                onChange={e => this.setState({token : e.target.value})}>
                                            <option value="">Select Token</option>
                                            {tokenList.length > 0 && tokenList.map((item, index) => (
                                                <option value={item.token} key={index}>{item.token}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <button type="submit" className="btn btn-dark px-3 py-1">Submit</button>
                                </div>
                            </div>
                        </form>
                        <form onSubmit={this.customerFormSubmit} id="customerFormSubmit">
                            <div className="row mt-3">
                                {input_field && input_field.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <div className="col-md-6">
                                            {ReactHtmlParser(item)}
                                        </div>
                                    </React.Fragment>
                                ))}
                                {input_field &&
                                 <div className="col-md-12">
                                     <button type="submit" className="btn btn-info px-3 py-1">Save</button>
                                 </div>
                                }
                            </div>
                        </form>
                    </div>
                </div>
                {input_field.length > 0 &&
                 <div className="card mb-4">
                     <div className="card-header">
                         <h6 className="m-0">Customer Form HTML Code</h6>
                     </div>
                     <div className="card-body" id="custom-form-show-area">
                         &lt;form&gt;
                         {input_field && input_field.map(item => {
                             return item.trim();
                         })}
                         &lt;/form&gt;
                     </div>
                 </div>
                }
            </div>
        </>;
    }
}

export default EmbedForm;