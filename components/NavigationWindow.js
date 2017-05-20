import React from 'react';
import { Link } from 'react-router-dom';


class NavigationWindow extends React.Component{
    render(){
        return(
            <div>
                <h1>Helloworld from NavigationWindow</h1>
                <Link to="/post">Go to Single Item Page</Link>
            </div>
        );
    }
}

export default NavigationWindow;