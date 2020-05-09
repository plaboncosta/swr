import React              from "react";
import {Link, withRouter} from 'react-router-dom';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path      : '',
            crossIcon : ''
        };
    }
    
    componentDidMount() {
        this.setState({path : this.props.location.pathname});
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.path !== this.props.location.pathname) {
            this.setState({path : this.props.location.pathname}, () => {
                if (this.state.crossIcon !== '') {
                    setTimeout(() => {
                        document.querySelector('.navigation-ul').style.display = 'none';
                        document.querySelector('.aside-nav').style.height      = '50px';
                        this.setState({crossIcon: ''});
                    }, 300);
                }
            });
        }
    }
    
    toggleNavigation = () => {
        this.setState((state) => ({crossIcon : state.crossIcon ? '' : 'close-squared-alt'}), () => {
            if (this.state.crossIcon !== '') {
                document.querySelector('.navigation-ul').style.display = 'block';
                document.querySelector('.aside-nav').style.height      = '270px';
            } else {
                document.querySelector('.navigation-ul').style.display = 'none';
                document.querySelector('.aside-nav').style.height      = '50px';
            }
        });
    };
    
    render() {
        const {path, crossIcon} = this.state;
        return <>
            <div className="app-name">
                <div className="project-name">
                    <i className="icofont-business-man-alt-1 mr-2 ml-4"/>
                    <span>Shopify Wholesale Register</span>
                </div>
                <div>
                    <i className={`icofont-${crossIcon ? crossIcon : 'listing-box'} mobile-menu-bar`} onClick={this.toggleNavigation}/>
                </div>
            </div>
            <ul className="nav justify-content-end flex-column navigation-ul">
                <li className="nav-item">
                    <Link className={`nav-link ${path === '/' && 'active'}`} to={'/'}>
                        <i className="icofont-dashboard-web"/>
                        <span className="ml-2">Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${path === '/wholesale/register' && 'active'}`} to={'/wholesale/register'}>
                        <i className="icofont-page"/>
                        <span className="ml-2">Wholesale Register</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${path === '/user/request' && 'active'}`} to="/user/request">
                        <i className="icofont-people"/>
                        <span className="ml-2">User Request</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${path === '/contact' && 'active'}`} to="/contact">
                        <i className="icofont-contacts"/>
                        <span className="ml-2">Contact Form</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${path === '/embed/form' && 'active'}`} to="/embed/form">
                        <i className="icofont-code"/>
                        <span className="ml-2">Test Embed Form</span>
                    </Link>
                </li>
            </ul>
        </>;
    }
}

export default withRouter(Navigation);