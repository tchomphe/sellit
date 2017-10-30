import React from 'react';
import InputField from './InputField';
import Request from 'superagent';
import { withRouter } from 'react-router-dom';

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

        //Create formData object and populate it with values in state
        var formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('address', this.state.address);
        formData.append('price', this.state.price);
        formData.append('description', this.state.description);

        //Materialize select can't handle onChange.. so we have to grab value directly
        formData.append('type', $('select').val());

        //Finally, attach all files for uploading
        var images = document.getElementById('postImages').files;
        for (var key in images) {
            //if item is a File object, append to formData
            if (images.hasOwnProperty(key) && images[key] instanceof File)
                formData.append(key, images[key]);
        }

        Request
            .post('/createPost')
            .send(formData)
            .end((err, res) => {
                if(err){
                    this.setState({err: res.body.error});
                } else {
                    Materialize.toast('Post has been created!', 4000)
                    this.props.history.push('/my-posts');
                }
            });
    }

    render(){
        console.log('PostCreationContainer rendering... ');

        return(
            <div className="container">
                <div className="card-panel">
                    <form onSubmit={this.handleSubmit} >
                    <h5 className="title">Create post</h5>
                    <div className="card-content red-text">{this.state.err}</div>
                    <div className="row">
                        <InputField fieldClass="col s6" labelText="* Title"
                            id="title" onChange={this.handleInputChange} required="required" />
                        <div className="input-field col s6">
                            <select id="type" name="type" required="required" >
                                <option value = "" disabled selected></option>
                                <option value="Phone">Phone</option>
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
                            <div className="btn waves-effect blue white-text darken-text-2">
                                <span>Browse</span>
                                <input id="postImages" type="file" name="postImages" accept=".jpg,.jpeg,.png" multiple/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" placeholder="Upload multiple files" />
                            </div>
                        </div>
                    </div>
                    <div className="row right-align">
                        <div className="s12">
                            <button className="btn waves-effect blue white-text darken-text-2" type="submit" name="action">Create</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(PostCreationContainer);