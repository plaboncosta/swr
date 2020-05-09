import React                            from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

// Component
import WholesaleRegister from "./Component/WholesaleRegister";
import Dashboard         from "./Component/Dashboard";
import Navigation        from "./Component/layouts/Navigation";
import UserRequest       from "./Component/UserRequest";
import EmbedForm         from "./Component/EmbedForm";

// Css
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
    return (
        <Router>
            <div className={'dashboard-layout'}>
                <div className="container-fluid pl-0">
                    <div className="row">
                        <div className="col-md-2 aside-nav p-0">
                            <Navigation/>
                        </div>
                        <div className="col-md-10 component-content">
                            <Route exact path={'/'} component={Dashboard}/>
                            <Route exact path={'/wholesale/register'} component={WholesaleRegister}/>
                            <Route exact path={'/user/request'} component={UserRequest}/>
                            <Route exact path={'/embed/form'} component={EmbedForm}/>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;