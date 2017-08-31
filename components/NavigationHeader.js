import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class NavigationHeader extends React.Component{
    constructor(props){
        super(props);

        this.state={
            searchedPosts: [],
        }
    }

    handleSubmit(e){
        e.preventDefault();

        //redirect to MainPage, if necessary
        if (window.location.pathname != '/')
            this.props.history.push('/');

        //check if the search query is undefined
        var query = (this.refs.search.value == '') ? undefined : this.refs.search.value;
        this.props.searchPost(query);
    }

    render(){
        var loggedInMenu =  <ul className="right hide-on-med-and-down">
                                <li><i className="large material-icons">list</i></li>
                                <li><Link to="/">ALL POST</Link></li>
                                <li><i className="large material-icons">list</i></li>
                                <li><Link to="/my-posts">MY POST</Link></li>
                                <li><i className="large material-icons">account_circle</i></li>
                                <li><Link to="/my-account">MY ACCOUNT</Link></li>
                                <li><i className="large material-icons">create</i></li>
                                <li><Link to="/create-post">CREATE POST</Link></li>
                                <li><i className="large material-icons">exit_to_app</i></li>
                                <li><a href="/logout">LOGOUT</a></li>
                            </ul>;
        var defaultMenu =   <ul className="right hide-on-med-and-down">
                                <li><i className="large material-icons">assignment</i></li>
                                <li><a href="#userRegistrationModal">SIGN UP</a></li>
                                <li><i className="large material-icons">exit_to_app</i></li>
                                <li><a href="#userLoginModal">LOGIN</a></li>
                                <li><a href="#" id="searchtoggl"><i className="material-icons">search</i></a></li>
                                
                            </ul>;

        //determine whether navigation menu should display a logged in menu, or not
        var navMenu = (this.props.authorizedUser == true) ? loggedInMenu : defaultMenu;

        return(            
            <nav className="left-align">
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left"><img src="./assets/img/logo_small.png" /></Link>
                    <form onSubmit={(e) => (this.handleSubmit(e))} >                         
                         <div className="input-field">
                            <input id="search" type="search" ref="search" />
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                        </div> 
                    </form>
                    {navMenu}
                </div>
            </nav>            
        );
    }
}

export default withRouter(NavigationHeader);