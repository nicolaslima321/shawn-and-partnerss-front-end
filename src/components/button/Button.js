import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export const Button = ({ disabled, variant = 'primary', size, label, ...props }) => {
  const buttonVariantClass =
    variant === 'primary' ? 'button--primary' : 'button--secondary';

  return (
    <button
      type="button"
      disabled={disabled}
      className={['button', buttonVariantClass].join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * If button is disabled
   */
  disabled: PropTypes.bool,
  /**
   * What variant to use, primary or secondary
   */
  variant: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * Button label content
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  variant: 'primary',
  label: 'Lorem ipsum',
  onClick: undefined,
};
