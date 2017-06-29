import React from 'react';


class NavigationHeader extends React.Component{
    constructor(props){
        super(props);

        this.state={
            searchedPosts: [],
        }
    }

    render(){
        return(
            <div>
                <nav className="left-align">
                    <div className="nav-wrapper">
                        <a href="#!" className="brand-logo left">Toronto list</a>
                        <form method="get" action="/searchByTitle">
                            <div className="input-field">
                                <input id="search" type="search" required />
                                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            </div>
                        </form>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="#registerModal">Create an Account</a></li>
                            <li><a href="#loginModal" className="waves-effect waves-light btn">login to post</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavigationHeader;