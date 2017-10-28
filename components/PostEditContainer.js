import React from 'react';
import InputField from './InputField';
import Request from 'superagent';

class PostEditContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            err:"",
            id: this.props.match.params.postId,
            title:"",
            type:"",
            address:"",
            price:"",
            description:"",
            pictures: "",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        // Initialize the Materialize select
        $('select').material_select();

        //TODO: move request into function
        Request.get('/post/' + this.state.id).then((res) => {
            console.log('Response Body: ' + JSON.stringify(res.body, null, 4));
            this.setState({
                id: res.body._id,
                title: res.body.title,
                type: res.body.type,
                address: res.body.address,
                price: res.body.price,
                description: res.body.description,
                pictures: res.body.images,
            });
        });
    }

    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event){
        event.preventDefault();

        //TODO: write submit logic
    }

    render(){
        console.log("PostEditContainer rendering..");

        //map all post images into HTML elements
        var postImagesHTML = "";
        if (this.state.pictures)
            postImagesHTML = this.state.pictures.map((pictureURL, index) => <img className="form-items-gallery-picture" src={pictureURL} alt="Post Picture" />);

        return(
            <div className="container">
                <div className="red-text">{this.state.err}HELLO WORLD!</div>
                <form id="postEditForm" onSubmit={this.handleSubmit}>
                <div className="card-panel">
                    <div className="row">
                        <div className="form-items-info col s6">
                            <h5>Post Info</h5>
                            <InputField labelText="Title"
                                id="title" value={this.state.title} required="required" onChange={this.handleInputChange} />
                            <InputField fieldClass="col s6" labelText="Price"
                                id="price" value={this.state.price} onChange={this.handleInputChange} />
                            <div className="input-field col s6">
                                <select id="type" name="type" required="required" >
                                    <option value="Phone" defaultValue>Phone</option>
                                    <option value="Laptop">Laptop</option>
                                    <option value="Case">Case</option>
                                    <option value="Other">Other</option>
                                </select>
                                <label>* Type</label>
                            </div>
                            <InputField labelText="Address"
                                id="address" value={this.state.address} onChange={this.handleInputChange} />
                            <InputField labelText="Description"
                                id="description" value={this.state.description} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-items-gallery col s6">
                            <h5>Pictures</h5>
                            <div className="col s12 file-field input-field">
                                <div className="btn">
                                    <span>Browse</span>
                                    <input id="postImages" type="file" name="postImages" multiple/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" placeholder="Upload new pictures" />
                                </div>
                            </div>
                            {postImagesHTML}
                        </div>
                    </div>
                    <div className="row">
                        <div className="s12">
                            <button className="btn waves-effect blue white-text darken-text-2" type="submit" value="Submit">Update</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        );
    }
}
export default PostEditContainer;