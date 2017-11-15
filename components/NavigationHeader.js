import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class NavigationHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchedPosts: [],
            customSearchBar: "custom_search_invisible",
        }
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);
    }

    componentDidMount(){
        $('.button-collapse').sideNav({
            menuWidth: 250, // Default is 300
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true, // Choose whether you can drag to open on touch screens,
          }
        );
        $(".dropdown-button").dropdown();
        $('.collapsible').collapsible();
    }

    handleOnClick(){
        if (this.state.customSearchBar === "custom_search_invisible"){
            this.setState({customSearchBar: "custom_search"});
            // $("#search").addClass("active");
            // document.search_form.search.focus();
            document.forms['search_form'].elements['search'].focus();

        } else {
            this.setState({customSearchBar: "custom_search_invisible"});
            $('.button-collapse').sideNav('hide');
        }
    }

    handleLogoutButtonClick(event){
        this.props.handleLogout(event);
        this.props.history.push('/');
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.refs.search.value !== ""){
            //TODO: pass more variables, ex: /?query=121&type=Bob
            //redirect to SearchResults and pass the query
            this.props.history.push('/search/' + this.refs.search.value);
            this.setState({customSearchBar: "custom_search_invisible"});
            $("#navbarContainer #search").val("");
        } else {
            this.setState({customSearchBar: "custom_search_invisible"});
        }
    }

    render(){
        var loggedInMenu =  <div>
                                {/* <!-- Dropdown Structure --> */}
                                <ul id="dropdown_browse" className="dropdown-content">
                                    <li><Link to="/posts/Phone"><i className="material-icons left" style={{color: "#000"}}>phone_android</i>Phones</Link></li>
                                    <li><Link to="/posts/Laptop"><i className="material-icons left" style={{color: "#000"}}>laptop</i>Laptops</Link></li>
                                </ul>

                                <ul id="dropdown_logout" className="dropdown-content">
                                    <li><Link to="/my-account"><i className="left large material-icons">account_circle</i>My account</Link></li>
                                    <li><a onClick={this.handleLogoutButtonClick}><i className="left large material-icons">exit_to_app</i>Logout</a></li>
                                </ul>
                                <ul className="right hide-on-med-and-down">
                                    {/* <!-- Dropdown Trigger --> */}
                                    <li>
                                        <a className="dropdown-button" href="#!" data-activates="dropdown_browse" data-beloworigin="true" data-constrainwidth="false" data-hover="true">
                                            <i className="left large material-icons">format_list_bulleted</i>Browse<i className="material-icons right">arrow_drop_down</i>
                                        </a>
                                    </li>
                                    <li><Link to="/"><i className="left large material-icons">list</i>All posts</Link></li>
                                    <li><Link to="/my-posts"><i className="left large material-icons">list</i>My Listings</Link></li>
                                    <li><Link to="/create-post"><i className="left large material-icons">create</i>List an item</Link></li>
                                    <li><Link to="/my-account"><i className="left large material-icons">account_circle</i>My account</Link></li>
                                    <li><a onClick={this.handleLogoutButtonClick}><i className="left large material-icons">exit_to_app</i>Logout</a></li>
                                    <li><a onClick={this.handleOnClick}><i className="material-icons">search</i></a></li>
                                </ul>
                                <ul className="side-nav" id="mobile-demo">
                                    <li><img src="/static/img/logo_small.png"/></li>
                                    <ul className="collapsible collapsible-accordion">
                                        <li>
                                            <a className="collapsible-header waves-effect"><i className="material-icons left">format_list_bulleted</i>Browse<i className="material-icons right">arrow_drop_down</i></a>
                                            <div className="collapsible-body">
                                                <ul>
                                                    <li><Link to="/posts/Phone"><i className="material-icons left">phone_android</i>Phones</Link></li>
                                                    <li><Link to="/posts/Laptop"><i className="material-icons left">laptop</i>Laptop</Link></li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                    {/* <li><Link to="/"><i className="material-icons left">list</i>All posts</Link></li> */}
                                    <li><Link to="/my-posts"><i className="material-icons left">list</i>My listings</Link></li>
                                    <li><Link to="/create-post"><i className="material-icons left">create</i>List an item</Link></li>
                                    <li><Link to="/my-account"><i className="material-icons left">account_circle</i>My account</Link></li>
                                    <li><a onClick={this.handleLogoutButtonClick}><i className="material-icons left">exit_to_app</i>Logout</a></li>
                                    <li><a onClick={this.handleOnClick}><i className="material-icons">search</i>Search</a></li>
                                </ul>
                            </div>;
        var defaultMenu =   <div>
                                {/* <!-- Dropdown Structure --> */}
                                <ul id="dropdown_browse" className="dropdown-content">
                                    <li><Link to="/posts/Phone"><i className="material-icons left" style={{color: "#000"}}>phone_android</i>Phones</Link></li>
                                    <li><Link to="/posts/Laptop"><i className="material-icons left" style={{color: "#000"}}>laptop</i>Laptops</Link></li>
                                </ul>
                                <ul id="dropdown_sign_in" className="dropdown-content">
                                    <li><a href="#userLoginModal"><i className="material-icons left" style={{color: "#000"}}>exit_to_app</i>Sign in</a></li>
                                    <li><a href="#userRegistrationModal"><i className="material-icons left" style={{color: "#000"}}>assignment</i>Sign up</a></li>
                                </ul>
                                <ul className="right hide-on-med-and-down">
                                    {/* <!-- Dropdown Trigger --> */}
                                    <li>
                                        <a className="dropdown-button" href="#!" data-activates="dropdown_browse" data-beloworigin="true" data-constrainwidth="false" data-hover="true">
                                            <i className="material-icons left">format_list_bulleted</i>Browse<i className="material-icons right">arrow_drop_down</i>
                                        </a>
                                    </li>
                                    <li><a href="#userLoginModal"><i className="material-icons left">assignment</i>List an item</a></li>
                                    <li>
                                        <a className="dropdown-button" href="#!" data-activates="dropdown_sign_in" data-beloworigin="true" data-constrainwidth="false" data-hover="true">
                                            <i className="material-icons">account_circle</i>
                                        </a>
                                    </li>
                                    <li><a onClick={this.handleOnClick}><i className="material-icons">search</i></a></li>
                                </ul>
                                <ul className="side-nav" id="mobile-demo">
                                    <li><img src="/static/img/logo_small.png"/></li>
                                    <ul className="collapsible collapsible-accordion">
                                        <li>
                                            <a className="collapsible-header waves-effect"><i className="material-icons left">format_list_bulleted</i>Browse<i className="material-icons right">arrow_drop_down</i></a>
                                            <div className="collapsible-body">
                                                <ul>
                                                    <li><Link to="/posts/Phone"><i className="material-icons left">phone_android</i>Phones</Link></li>
                                                    <li><Link to="/posts/Laptop"><i className="material-icons left">laptop</i>Laptop</Link></li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                    <li><a href="#userRegistrationModal"><i className="material-icons left">assignment</i>Sign up</a></li>
                                    <li><a href="#userLoginModal"><i className="material-icons left">exit_to_app</i>Sign in</a></li>
                                    <li><a onClick={this.handleOnClick}><i className="material-icons">search</i>Search</a></li>
                                </ul>
                            </div>;
        //determine whether navigation menu should display a logged in menu, or not
        var navMenu = (this.props.authorizedUser == true) ? loggedInMenu : defaultMenu;

        return(
            <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper">
                    {/* <Link to="/" className="brand-logo">to<span style={{color: '#18ffff'}}>list</span></Link> */}
                    <Link to="/" className="brand-logo"><img src="/assets/img/logo_full.svg" /></Link>
                    <a href="#" style={{position:'absolute', right: '10px'}} onClick={this.handleOnClick}><span className="mobile_search"><i className="material-icons">search</i></span></a>
                    <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                    {navMenu}
                </div>
                <div id="navbarContainer" className={this.state.customSearchBar}>
                    <form name="search_form" onSubmit={(e) => (this.handleSubmit(e))}>
                        <input id="search" name="search" type="search" ref="search" className="search_bar" style={{'border-bottom': 'none', 'box-shadow': 'none'}} placeholder="" />
                    </form>
                </div>
          </nav>
          </div>
        );
    }
}
export default withRouter(NavigationHeader);