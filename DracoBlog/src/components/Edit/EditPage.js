import React, {Component} from 'react';
import EditForm from './EditForm';
import {loadPostDetails, loadTagsDetails, edit} from '../../models/post';
import $ from 'jquery';


export default class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', body: '', tags: '', submitDisabled: true, h1: 'Edit Post', btn: 'Edit'};
        this.bindEventHandlers();
    }

    componentDidMount() {
        // Populate form
        loadPostDetails(this.props.params.id, this.onLoadSuccess);
        loadTagsDetails(this.props.params.id, this.onTagsSuccess);
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onTagsSuccess = this.onTagsSuccess.bind(this);
    }

    onLoadSuccess(response) {
        this.setState({
            title: response.title,
            body: response.body,
            submitDisabled: false
        });
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        if (this.state.title.length < 1) {
            $('.title-error').text('The title field is required.');
            return;
        }
        if (this.state.body.length < 1) {
            $('.body-error').text('The body field is required.');
            return;
        }
        this.setState({submitDisabled: true});
        edit(this.props.params.id, this.state.title, this.state.body, this.state.tags[0].body, this.onSubmitResponse);
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
            this.context.router.push('/');
        } else {
            // Something went wrong, let the user try again
            this.setState({submitDisabled: true});
        }
    }

    onTagsSuccess(response) {
        this.setState({
            tags: response
        });
    }
    
    

    render() {

        
        return (
            <div className="wrapper page-h">
                <EditForm
                    h1={this.state.h1}
                    btn={this.state.btn}
                    title={this.state.title}
                    body={this.state.body}
                    tags={this.state.tags}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />

            </div>
        );
    }
}

EditPage.contextTypes = {
    router: React.PropTypes.object
};