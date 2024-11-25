import React, { useState } from 'react';
import './RadioButton.scss';

const RadioButtonList = () => {
  const [selectedOption, setSelectedOption] = useState('normal');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='radio-add-exam'>
        <div className="radio-inputs">
            <label className="radio me-1">
                <input
                    type="radio"
                    name="radio"
                    value="normal"
                    checked={selectedOption === 'normal'}
                    onChange={handleChange}
                />
                <span className="name">Không</span>
            </label>
            <label className="radio me-1">
                <input
                    type="radio"
                    name="radio"
                    value="old"
                    checked={selectedOption === 'old'}
                    onChange={handleChange}
                />
                <span className="name">Người già</span>
            </label>

            <label className="radio me-1">
                <input
                    type="radio"
                    name="radio"
                    value="young"
                    checked={selectedOption === 'young'}
                    onChange={handleChange}
                />
                <span className="name">Trẻ em</span>
            </label>

            <label className="radio me-1">
                <input
                    type="radio"
                    name="radio"
                    value="disabled"
                    checked={selectedOption === 'disabled'}
                    onChange={handleChange}
                />
                <span className="name">Người tàn tật</span>
            </label>

            <label className="radio me-1">
                <input
                    type="radio"
                    name="radio"
                    value="pregnant"
                    checked={selectedOption === 'pregnant'}
                    onChange={handleChange}
                />
                <span className="name">Phụ nữ có thai</span>
            </label>
        </div>
    </div>
  );
};

export default RadioButtonList;
