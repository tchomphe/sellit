import React from 'react';
import InputField from './InputField';
import Request from 'superagent';

class PostCreationContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            err:"",
            title:"",
            address:"",
            price:"",
            description:""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        // Initialize the Materialize select
        $('select').material_select();
    }
    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event){
        event.preventDefault();

    }
    render(){
        return(
            <div className="contatiner">
                <h6 className="profilePageHeader">Create-Post</h6>
                <form onSubmit={this.handleSubmit} >
                <div className="row">
                    <InputField fieldClass="col s6" labelText="Title" id="title" />
                    <div className="input-field col s6">
                        <select name="type">
                            <option value="Phone" defaultValue>Phone</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Case">Case</option>
                            <option value="Other">Other</option>
                        </select>
                        <label>* Type</label>
                    </div>
                    <InputField fieldClass="col s6" labelText="Address" id="address" />
                    <InputField fieldClass="col s6" labelText="Price" id="price" />
                    <InputField labelText="Description" id="description" />
                    <div className="col s12 file-field input-field">
                        <div className="btn">
                            <span>Browse</span>
                            <input type="file" name="postImages" multiple/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="Upload multiple files" />
                        </div>
                    </div>
                </div>
                <div className="row center">
                    <div className="s12">
                        <button className="btn waves-effect waves-light" type="submit" name="action">Create</button>
                    </div>
                </div>
                </form>
            </div>
        )
    }

}
export default PostCreationContainer;