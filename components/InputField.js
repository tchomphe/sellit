import React from 'react';
import PropTypes from 'prop-types';

export default class InputField extends React.Component{
    render(){
        var myFieldClass = (this.props.fieldClass == undefined) ? " col s12" : (" " + this.props.fieldClass),
            myLabelClass = (this.props.value == undefined) ? "" : "active", //prevent placeholder & label overlap
            myLabelSuccess = (this.props.labelSuccess == undefined) ? "" : this.props.labelSuccess,
            myLabelError = (this.props.labelError == undefined) ? "" : this.props.labelError,
            myInputType = (this.props.type == undefined) ? "text" : this.props.type,
            myInputRequired = (this.props.required == undefined) ? "" : this.props.required;

        return(
            <div className={"input-field" + myFieldClass}>
                <input
                    id={this.props.id}
                    name={this.props.id}
                    type={myInputType}
                    onChange={this.props.onChange}
                    required={myInputRequired}
                    value={this.props.value /* will only be included on truthy value */ }
                    className="validate" />
                <label
                    htmlFor={this.props.id}
                    data-success={myLabelSuccess}
                    data-error={myLabelError}
                    className={myLabelClass}>{this.props.labelText}</label>
            </div>
        )
    }
}

InputField.propTypes = {
    id: PropTypes.string.isRequired,
    // onChange: PropTypes.func.isRequired,
}