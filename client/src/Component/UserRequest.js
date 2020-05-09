import React, {Component} from 'react';
import Axios              from "axios";
import {backendApiUrl}    from "../config/constant";
import {DataTable}        from "primereact/datatable";
import {Column}           from "primereact/column";

class UserRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approvedUserData      : [],
            approvedUserTableData : []
        };
    }
    
    componentDidMount() {
        this.getData();
    }
    
    getData = async () => {
        try {
            const res = await Axios.get(backendApiUrl + 'api/user/approve/all');
            this.setState({
                              approvedUserData      : [],
                              approvedUserTableData : []
                          }, () => {
                const approvedUserTableData = res.data.length > 0 && res.data.map(item => {
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
                this.setState({approvedUserData : res.data, approvedUserTableData});
            });
        } catch (err) {
            console.log(err.response);
        }
    };
    
    render() {
        const {approvedUserTableData} = this.state;
        
        return <>
            <div className="new-customer-request-list">
                <div className="table-header">
                    <p>Approved Customer List</p>
                </div>
                <DataTable value={approvedUserTableData} paginator={true} rows={10} first={this.state.first}
                           onPage={e => this.setState({first : e.first})} footer={`There are ${approvedUserTableData.length} rows`}>
                    <Column field={'first_name'} header={'First Name'} sortable={true} filter={true}
                            filterPlaceholder={'First Name'}/>
                    <Column field={'last_name'} header={'Last Name'} sortable={true} filter={true} filterPlaceholder={'Last Name'}/>
                    <Column field={'email'} header={'Email'} sortable={true} filter={true} filterPlaceholder={'Email'}/>
                    <Column field={'phone'} header={'Phone'} sortable={true} filter={true} filterPlaceholder={'Phone'}/>
                    <Column field={'status'} header={'Status'} sortable={true} filter={true} filterPlaceholder={'Status'}/>
                </DataTable>
            </div>
        </>;
    }
}

export default UserRequest;