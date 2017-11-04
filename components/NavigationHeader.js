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
    }

    componentDidMount(){
        $(".button-collapse").sideNav();
        $(".dropdown-button").dropdown();
        $('.collapsible').collapsible();
    }

    handleOnClick(){
        if (this.state.customSearchBar === "custom_search_invisible"){
            this.setState({customSearchBar: "custom_search"});
            $("#search").addClass("active");

        } else {
            this.setState({customSearchBar: "custom_search_invisible"});
        }
        $('.button-collapse').sideNav('hide');
    }

    handleSubmit(e){
        e.preventDefault();
        //TODO: pass more variables, ex: /?query=121&type=Bob
        //redirect to SearchResults and pass the query
        this.props.history.push('/search/' + this.refs.search.value);
        this.setState({customSearchBar: "custom_search_invisible"});
    }

    render(){
        var loggedInMenu =  <div>
                                {/* <!-- Dropdown Structure --> */}
                                <ul id="dropdown1" className="dropdown-content">
                                    <li><Link to="/posts/Phone">Phones</Link></li>
                                    <li><Link to="/posts/Laptop">Laptops</Link></li>
                                </ul>
                                <ul className="right hide-on-med-and-down">
                                    {/* <!-- Dropdown Trigger --> */}
                                    <li>
                                        <a className="dropdown-button" href="#!" data-activates="dropdown1" data-beloworigin="true" data-constrainwidth="false" data-hover="true">
                                            <i className="left large material-icons">format_list_bulleted</i>Category<i className="material-icons right">arrow_drop_down</i>
                                        </a>
                                    </li>
                                    <li><Link to="/"><i className="left large material-icons">list</i>All posts</Link></li>
                                    <li><Link to="/my-posts"><i className="left large material-icons">list</i>My posts</Link></li>
                                    <li><Link to="/create-post"><i className="left large material-icons">create</i>Create post</Link></li>
                                    <li><Link to="/my-account"><i className="left large material-icons">account_circle</i>My account</Link></li>
                                    <li><a href="/logout"><i className="left large material-icons">exit_to_app</i>Logout</a></li>
                                    <li><a onClick={this.handleOnClick}><i className="material-icons">search</i></a></li>
                                </ul>
                                <ul className="side-nav" id="mobile-demo">
                                    <li><img src="/static/img/logo_small.png"/></li>
                                    <ul className="collapsible collapsible-accordion">
                                        <li>
                                            <a className="collapsible-header waves-effect"><i className="material-icons left">format_list_bulleted</i>Category<i className="material-icons right">arrow_drop_down</i></a>
                                            <div className="collapsible-body">
                                                <ul>
                                                    <li><Link to="/posts/Phone">Phones</Link></li>
                                                    <li><Link to="/posts/Laptop">Laptop</Link></li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                    <li><Link to="/"><i className="material-icons left">list</i>All posts</Link></li>
                                    <li><Link to="/my-posts"><i className="material-icons left">list</i>My posts</Link></li>
                                    <li><Link to="/create-post"><i className="material-icons left">create</i>Create post</Link></li>
                                    <li><Link to="/my-account"><i className="material-icons left">account_circle</i>My account</Link></li>
                                    <li><a href="/logout"><i className="material-icons left">exit_to_app</i>Logout</a></li>
                                    <li><a onClick={this.handleOnClick}><i className="material-icons">search</i>Search</a></li>
                                </ul>
                            </div>;
        var defaultMenu =   <div>
                                {/* <!-- Dropdown Structure --> */}
                                <ul id="dropdown1" className="dropdown-content">
                                    <li><Link to="/posts/Phone">Phones</Link></li>
                                    <li><Link to="/posts/Laptop">Laptops</Link></li>
                                </ul>
                                <ul className="right hide-on-med-and-down">
                                    {/* <!-- Dropdown Trigger --> */}
                                    <li>
                                        <a className="dropdown-button" href="#!" data-activates="dropdown1" data-beloworigin="true" data-constrainwidth="false" data-hover="true">
                                            <i className="material-icons left">format_list_bulleted</i>Category<i className="material-icons right">arrow_drop_down</i>
                                        </a>
                                    </li>
                                    <li><a href="#userRegistrationModal"><i className="material-icons left">assignment</i>Sign up</a></li>
                                    <li><a href="#userLoginModal"><i className="material-icons left">exit_to_app</i>Sign in</a></li>
                                    <li><a onClick={this.handleOnClick}><i className="material-icons">search</i></a></li>
                                </ul>
                                <ul className="side-nav" id="mobile-demo">
                                    <li><img src="/static/img/logo_small.png"/></li>
                                    <ul className="collapsible collapsible-accordion">
                                        <li>
                                            <a className="collapsible-header waves-effect"><i className="material-icons left">format_list_bulleted</i>Category<i className="material-icons right">arrow_drop_down</i></a>
                                            <div className="collapsible-body">
                                                <ul>
                                                    <li><Link to="/posts/Phone">Phones</Link></li>
                                                    <li><Link to="/posts/Laptop">Laptop</Link></li>
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
                    <Link to="/" className="brand-logo">to<span style={{color: '#18ffff'}}>list</span></Link>
                    <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                    {navMenu}
                </div>
                <div className={this.state.customSearchBar}>
                    <form onSubmit={(e) => (this.handleSubmit(e))}>
                        <input id="search" type="search" ref="search" className="search_bar" style={{'border-bottom': 'none', 'box-shadow': 'none'}} placeholder="" />
                    </form>
                </div>
          </nav>
          </div>
        );
    }
}
export default withRouter(NavigationHeader);