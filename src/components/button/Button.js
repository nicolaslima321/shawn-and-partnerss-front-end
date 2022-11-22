import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ variant = 'primary', size, label, ...props }) => {
  const buttonVariantClass =
    variant === 'primary' ? 'button--primary' : 'button--secondary';

  return (
    <button
      type="button"
      className={['button', buttonVariantClass].join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
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
  variant: 'primary',
  label: 'Lorem ipsum',
  onClick: undefined,
};
