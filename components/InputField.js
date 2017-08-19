import React from 'react';
import PropTypes from 'prop-types';

export default class InputField extends React.Component{
    render(){
        var myFieldClass = (this.props.fieldClass == undefined) ? " col s12" : (" " + this.props.fieldClass),
            myLabelClass = (this.props.placeholder == undefined) ? "" : "active",
            myPlaceholder = (this.props.placeholder == undefined) ? "" : this.props.placeholder,
            myType = (this.props.type == undefined) ? "text" : this.props.type;

        return(
            <div className={"input-field" + myFieldClass}>
                <label htmlFor={this.props.id} className={myLabelClass}>{this.props.labelText}</label>
                <input
                    id={this.props.id}
                    name={this.props.id}
                    type={myType}
                    placeholder={myPlaceholder}
                    className="validate"
                    onChange={this.props.onChange} />
            </div>
        )
    }
}

InputField.propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}