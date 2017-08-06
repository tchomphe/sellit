import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom';

class NavigationHeader extends React.Component{
    constructor(props){
        super(props);

        this.state={
            searchedPosts: [],
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.searchPost(this.refs.search.value);
    }

    render(){
        var loggedInMenu =  <ul className="right hide-on-med-and-down">
                                <li><a href="/">All Posts</a></li>
                                <li><a href="#">My Posts</a></li>
                                <li><a href="#">My Account</a></li>
                                <li><a href="/logout" className="waves-effect waves-light btn">Logout</a></li>
                            </ul>;
        var defaultMenu =   <ul className="right hide-on-med-and-down">
                                <li><a href="#registerModal" className="waves-effect waves-light btn">Create an Account</a></li>
                                <li><a href="#loginModal" className="waves-effect waves-light btn">login to post</a></li>
                            </ul>;

        //determine whether navigation menu should display a logged in menu, or not
        var navMenu = (this.props.authorizedUser == true) ? loggedInMenu : defaultMenu;

        return(
            <div>
                <nav className="left-align">
                    <div className="nav-wrapper">
                        <a href="#!" onClick={this.props.resetPosts} className="brand-logo left"><img src="./assets/img/logo.png" width="7%"/></a>
                        <form onSubmit={(e) => (this.handleSubmit(e))} >
                            <div className="input-field">
                                <input id="search" type="search" ref="search" required />
                                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            </div>
                        </form>
                        {navMenu}
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavigationHeader;