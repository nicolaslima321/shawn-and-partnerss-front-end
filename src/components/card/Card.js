import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

export const Card = ({ children, ...props }) => {
  return (
    <div
      className='card'
      {...props}
    >
      { children }
    </div>
  );
};

Card.propTypes = {
  /**
   * Required children (HTML/JSX) to render inside the card
   */
  children: PropTypes.any,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Card.defaultProps = {
  slot: 'foo bar',
  onClick: undefined,
};
