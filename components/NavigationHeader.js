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
                                    <li><a className="dropdown-button" href="#!" data-activates="dropdown1">Category</a></li>                          
                                    {/* <li><i className="large material-icons">list</i></li> */}
                                    <li><Link to="/">All posts</Link></li>
                                    {/* <li><i className="large material-icons">list</i></li> */}
                                    <li><Link to="/my-posts">My posts</Link></li>
                                    {/* <li><i className="large material-icons">account_circle</i></li> */}
                                    <li><Link to="/my-account">My account</Link></li>
                                    {/* <li><i className="large material-icons">create</i></li> */}
                                    <li><Link to="/create-post">Create post</Link></li>
                                    {/* <li><i className="large material-icons">exit_to_app</i></li> */}
                                    <li><a href="/logout">Logout</a></li>
                                    <li><a onClick={this.handleOnClick}><i className="material-icons">search</i></a></li>
                                </ul>
                                <ul className="side-nav" id="mobile-demo">
                                    <li><img src="/static/img/logo_small.png"/></li>
                                    <ul className="collapsible collapsible-accordion">
                                        <li>
                                            <a className="collapsible-header waves-effect">Category 
                                                {/* <i className="material-icons light-blue-text">expand_more</i>                                                 */}
                                            </a>
                                            <div className="collapsible-body">
                                                <ul>
                                                    <li><Link to="/posts/Phone">Phones</Link></li>
                                                    <li><Link to="/posts/Laptop">Laptop</Link></li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                    {/* <li><i className="large material-icons">list</i></li> */}
                                    <li><Link to="/">All posts</Link></li>
                                    {/* <li><i className="large material-icons">list</i></li> */}
                                    <li><Link to="/my-posts">My posts</Link></li>
                                    {/* <li><i className="large material-icons">account_circle</i></li> */}
                                    <li><Link to="/my-account">My account</Link></li>
                                    {/* <li><i className="large material-icons">create</i></li> */}
                                    <li><Link to="/create-post">Create post</Link></li>
                                    {/* <li><i className="large material-icons">exit_to_app</i></li> */}
                                    <li><a href="/logout">Logout</a></li>
                                    <li><a onClick={this.handleOnClick}><i className="material-icons">search</i></a></li>
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
                                    <li><a className="dropdown-button" href="#!" data-activates="dropdown1">Category</a></li>
                                    {/* <li><i className="small material-icons">arrow_drop_down</i></li> */}
                                    {/* <li><i className="large material-icons">assignment</i></li> */}
                                    <li><a href="#userRegistrationModal">Sign up</a></li>
                                    {/* <li><i className="large material-icons">exit_to_app</i></li> */}
                                    <li><a href="#userLoginModal">Sign in</a></li>
                                    <li><a onClick={this.handleOnClick}><i className="material-icons">search</i></a></li>                                    
                                </ul>
                                <ul className="side-nav" id="mobile-demo">                                    
                                    <li><img src="/static/img/logo_small.png"/></li>
                                    <ul className="collapsible collapsible-accordion">
                                        <li>
                                            <a className="collapsible-header waves-effect">Category 
                                                {/* <i className="material-icons light-blue-text">expand_more</i>                                                 */}
                                            </a>
                                            <div className="collapsible-body">
                                                <ul>
                                                    <li><Link to="/posts/Phone">Phones</Link></li>
                                                    <li><Link to="/posts/Laptop">Laptop</Link></li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                    {/* <li><i className="large material-icons">assignment</i></li> */}
                                    <li><a href="#userRegistrationModal">Sign up</a></li>
                                    {/* <li><i className="large material-icons">exit_to_app</i></li> */}
                                    <li><a href="#userLoginModal">Sign in</a></li>
                                    <li><a onClick={this.handleOnClick}><i className="material-icons">search</i></a></li>                                    
                                </ul>                                                                                                    
                            </div>;


        //determine whether navigation menu should display a logged in menu, or not
        var navMenu = (this.props.authorizedUser == true) ? loggedInMenu : defaultMenu;

        return(
            <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper">                    
                    <Link to="/" className="brand-logo">Tolist</Link>
                    <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                    {navMenu}  
                </div>
                <div className={this.state.customSearchBar}>
                    <form onSubmit={(e) => (this.handleSubmit(e))}>
                        <input id="search" type="search" ref="search" className="search_bar" placeholder=" " />
                    </form>
                </div>                            
          </nav>          
          </div>            
        );
    }
}

export default withRouter(NavigationHeader);