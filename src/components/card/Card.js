import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ slot, ...props }) => {
  return (
    <div
      className={'card'}
      {...props}
    >
      { slot }
    </div>
  );
};

Card.propTypes = {
  /**
   * Required slot (HTML/JSX) to render inside the card
   */
  slot: PropTypes.object,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Card.defaultProps = {
  slot: 'foo bar',
  onClick: undefined,
};
