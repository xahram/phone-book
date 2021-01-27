import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let inputField = null;



    switch (props.element) {
        case "input":
            inputField = (<input
                className={!props.valid ? classes.InputElement + " " + classes.ErrorMessage : classes.InputElement}
                value={props.value}
                onChange={props.onChangeHandler}
                type={props.type}
                minLength={props.minLength}
                maxLength={props.maxLength}
                required={props.required}
                placeholder={props.placeholder} />
            );
            break;
        case "select":
            inputField = (
                <select
                    className={classes.SelectInput}
                    value={props.value}
                    onChange={props.onChangeHandler}>
                    {props.elementConfig.map((option) => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
            )
            break;
        default:
            return;
    }

    return (<div className={classes.Input}>
        <label className={classes.Label}>{props.label} </label>
        {inputField}
        <p className={classes.ErrorParagraph}>{!props.valid ? props.errorMessage : ""}</p>
    </div>)
}

export default Input