import React from 'react';

export default class MyPostPage extends React.Component {
    constructor(props){
        super(props);

        //define state variables
        this.state = {
            postModal: <PostWindow title="TEST title" price="TEST price" address="TEST address" description="TEST description" />,
            displayedPosts: null,
            authorizedUser: true,
        };
    }

    render(){
        return (
            <div className="app-content row center">

            </div>
        )
    }
}