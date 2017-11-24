import React from 'react';
import InputField from './InputField';
import Request from 'superagent';
import { withRouter } from 'react-router-dom';

class PostCreationContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title: "",
            postalCode: "",
            price: "",
            description: "",
            phone: ""
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
        formData.append('postalCode', this.state.postalCode);
        formData.append('price', this.state.price);
        formData.append('description', this.state.description);
        formData.append('phone', this.state.phone);

        //Materialize select can't handle onChange.. so we have to grab value directly
        formData.append('type', $('#type').val());
        formData.append('city', $('#city').val());

        //Finally, attach all files for uploading
        var images = document.getElementById('postImages').files;
        for (var key in images) {
            //if item is a File object, append to formData
            if (images.hasOwnProperty(key) && images[key] instanceof File)
                formData.append('images', images[key]);
        }

        //show page loading wrapper
        $("#dim-page-loader").fadeIn(100);

        Request
            .post('/createPost')
            .send(formData)
            .end((err, res) => {
                //hide page loading wrapper
                $("#dim-page-loader").fadeOut(100);

                if(err){
                    Materialize.toast(err.response.text, 4000);
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
                    <h5 className="title">List an item</h5>
                    <div className="card-content red-text">{this.state.err}</div>
                    <div className="row">
                        <InputField fieldClass="col s12 m6 l6" labelText="* Title"
                            id="title" onChange={this.handleInputChange} required="required" />
                        <div className="input-field col s12 m6 l6">
                            <select id="type" name="type" required="required" >
                                <option value = "" disabled selected></option>
                                <option value="Phone">Phone</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Desktop">Desktop</option>
                                <option value="Camera">Camera</option>
                                <option value="Videogames">Video-game</option>
                                <option value="Electronic">Electronic</option>
                                <option value="Other">Other</option>
                            </select>
                            <label>* Type</label>
                        </div>
                        <InputField fieldClass="col s12 m6 l6" labelText="* Postal code"
                            id="postalCode" onChange={this.handleInputChange} required="required" />
                        <InputField fieldClass="col s12 m6 l6" labelText="Price" id="price" onChange={this.handleInputChange} />
                        <div className="input-field col s12 m6 l6">
                            <select id="city" name="city" required="required" >
                                <option value = "" disabled selected></option>
                                <option value="City of Toronto">City of Toronto</option>
                                <option value="Markham / York Region">Markham / York Region</option>
                                <option value="Oshawa / Durham Region">Oshawa / Durham Region</option>
                                <option value="Missisauga / Peel Region">Missisauga / Peel Region</option>
                                <option value="Oakville / Halton Region">Oakville / Halton Region</option>
                            </select>
                            <label>* City</label>
                        </div>
                        <InputField fieldClass="col s12 m6 l6" labelText="Phone" id="phone" onChange={this.handleInputChange} />
                        <InputField labelText="Description" id="description" onChange={this.handleInputChange} />
                        <div className="col s12 file-field input-field">
                            <div className="btn black waves-effect white-text darken-text-2">
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
                            <button className="btn black waves-effect white-text darken-text-2" type="submit" name="action">Create</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(PostCreationContainer);