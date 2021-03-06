import React, {Component} from 'react';
import './Infobox.css';
import $ from 'jquery';
import observer from '../../models/observer';


export default class Infobox extends Component {
    constructor(props) {
        super(props);
        this.state ={
            message: '',
            style_box: 'info',
            visible: false
        };
        this.bindEventHandlers();

        // Register in the observer
        observer.showInfo = this.showInfo.bind(this);
        observer.showSuccess = this.showSuccess.bind(this);
        observer.showError = this.showError.bind(this);
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.ajaxStart = this.ajaxStart.bind(this);
        this.hide = this.hide.bind(this);
        this.handleAjaxError = this.handleAjaxError.bind(this);
    }

    componentDidMount() {
        // Attach global AJAX "loading" event handlers

        // Attach a global AJAX error handler
        $(document).ajaxError(this.handleAjaxError);
    }

    ajaxStart() {
        this.setState({ message: 'Loading...', style_box: 'info', visible: true });
    }

    hide() {
        this.setState({ visible: false });
    }

    handleAjaxError(event, response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON && response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        this.showError(errorMsg);
    }

    showInfo(message) {
        this.setState({ message: message, style_box: 'info', visible: true });
        setTimeout(this.hide, 1500);
    }

    showSuccess(message) {
        this.setState({ message: message, style_box: 'success', visible: true });
        setTimeout(this.hide, 1500);
    }

    showError(errorMsg) {
        this.setState({ message: errorMsg, style_box: 'error', visible: true });
        setTimeout(this.hide, 5000);
    }

    render() {
        if (!this.state.visible) return null;

        let className = 'infobox';
        switch (this.state.style_box) {
            case 'info':
                className += ' bg-primary info-box';
                break;
            case 'error':
                className += ' bg-danger error-box';
                break;
            case 'success':
                className += ' bg-success success-box';
                break;
            default:
                className += ' bg-primary info-box';
                break;
        }

        return (
            <div className={className} onClick={this.hide}>
                <span>
                    {this.state.message}
                </span>
            </div>
        )
    }
}
