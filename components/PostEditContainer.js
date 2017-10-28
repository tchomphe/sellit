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
            console.log('got this: ' + res);
            //TODO: save response to state
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

        return(
            <div className="container">
                <div className="red-text">{this.state.err}HELLO WORLD!</div>
            </div>
        );
    }
}
export default PostEditContainer;