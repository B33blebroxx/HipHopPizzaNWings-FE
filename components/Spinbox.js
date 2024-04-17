import React from 'react';
import PropTypes from 'prop-types';

const Spinbox = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(parseInt(event.target.value, 10));
  };

  const increment = () => {
    onChange(value + 1);
  };

  return (
    <div>
      <input type="number" value={value} onChange={handleChange} />
      <button type="button" onClick={increment}>+</button>
    </div>
  );
};

Spinbox.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Spinbox;
