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
                                <li><Link to="/">All Posts</Link></li>
                                <li><Link to="/my-posts">My Posts</Link></li>
                                <li><Link to="/my-account">My Account</Link></li>
                                <li><Link to="/create-post">Create Post</Link></li>
                                <li><a href="/logout" className="waves-effect waves-light btn">Logout</a></li>
                            </ul>;
        var defaultMenu =   <ul className="right hide-on-med-and-down">
                                <li><a href="#registerModal" className="waves-effect waves-light btn">Create an Account</a></li>
                                <li><a href="#userLoginModal" className="waves-effect waves-light btn">Login to Post</a></li>
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