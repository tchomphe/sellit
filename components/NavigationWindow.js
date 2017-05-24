import React from 'react';
import { Link } from 'react-router-dom';


class NavigationWindow extends React.Component{
    render(){
        return(
            <div>
                {/*<!-- Button trigger modal -->*/}
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#navModal">
                Launch demo modal
                </button>

                {/*<!-- Modal -->*/}
                <div className="modal fade" id="navModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    
                    <div className="modal-header">                        
                    </div>
                        
                    <div className="modal-body">            
                        <div class="row">
                            <input id="1" class="form-control" type="text" name="search" placeholder="Search..." required/>
                                <span class="input-group-btn">
                                    <button class="btn btn-success" type="submit">
                                        <i class="glyphicon glyphicon-search" aria-hidden="true"></i> Search
                                    </button>
                                </span>
                        </div>
                        <div class="row">                                    
                            <span>
                                <button class="btn btn-success" type="submit"> Post an ad </button>
                            </span>
                        </div>                        
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default NavigationWindow;