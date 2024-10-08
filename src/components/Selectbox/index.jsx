import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SelectBox.scss';

const SelectBox2 = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setSearchTerm(value.label || '');
  }, [value]);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    onChange(inputValue, inputValue);
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option.label);
    onChange(option.value, option.label);
    setIsOpen(false);
  };

  return (
    <div className="select-box2" ref={wrapperRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="select-input"
      />
      {isOpen && (
        <ul className="options-list">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="option-item"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SelectBox2.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SelectBox2;