import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

export const Input = ({ placeholder, primary, backgroundColor, size, label, ...props }) => {
  return (
    <input
      className="input"
      type={props.type ?? 'text'}
      placeholder={placeholder}
      {...props}
    />
  );
};

Input.propTypes = {
  /**
   * Optional change handler
   */
  placeholder: PropTypes.string,
  /**
   * Optional change handler
   */
  onChange: PropTypes.func,
  /**
   * Optional Blur handler
   */
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  placeholder: 'Your place holder',
  onChange: undefined,
  onBlur: undefined,
};
