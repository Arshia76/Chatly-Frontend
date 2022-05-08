import React from 'react';
import styles from './index.module.css'
import PropTypes from 'prop-types';

const Radio = props => {

    const classes = [];
    if (props.className) classes.push(styles[props.className])
    return (
        <div className={styles.Radio}>
            <label className={classes.join(' ')}>
                <input onChange={props.onChange} type="radio" checked={props.checked} name={props.name}/>
                <span>{props.title}</span>
                <span className={styles.checkmark}/>
            </label>
        </div>
    );
};

Radio.defaultProps = {
    className: '',
    checked: false,
    name: '',
    title: '',
    onChange: _ => null
}

Radio.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    name: PropTypes.string,
    title: PropTypes.string,
    onChange: PropTypes.func
};

export default Radio;
