import React from 'react';
import InputField from './InputField';
import Request from 'superagent';

class PostCreationContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            err: "",
            title: "",
            address: "",
            price: "",
            description: "",
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

        //Materialize select can't handle onChange.. so we have to grab value directly
        var selectType = $('select').val();
        Request
            .post('/createPost')
            .type('form')
            .send({
                title: this.state.title,
                type: selectType,
                address: this.state.address,
                price: this.state.price,
                description: this.state.description,}) //TODO: add file attachments
            .end((err, res) => {
                if(err){
                    this.setState({err: res.body.error});
                } else {
                    this.setState({err: ""});
                    Materialize.toast('Post has been created!', 4000)
                }
            });
    }
    render(){
        return(
            <div className="contatiner">
                <h6 className="profilePageHeader">Create-Post</h6>
                <div className="card-content red-text">{this.state.err}</div>
                <form onSubmit={this.handleSubmit} >
                <div className="row">
                    <InputField fieldClass="col s6" labelText="* Title"
                        id="title" onChange={this.handleInputChange} required="required" />
                    <div className="input-field col s6">
                        <select id="type" name="type" required="required" >
                            <option value="Phone" defaultValue>Phone</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Case">Case</option>
                            <option value="Other">Other</option>
                        </select>
                        <label>* Type</label>
                    </div>
                    <InputField fieldClass="col s6" labelText="* Address"
                        id="address" onChange={this.handleInputChange} required="required" />
                    <InputField fieldClass="col s6" labelText="Price" id="price" onChange={this.handleInputChange} />
                    <InputField labelText="Description" id="description" onChange={this.handleInputChange} />
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