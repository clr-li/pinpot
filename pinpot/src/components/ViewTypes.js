// Filename - ViewTypes.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { postVisibility } from '../enum';
import '../styles/checkbox.css';

const ViewTypes = ({ onChange }) => {
    const [selectedTypes, setSelectedTypes] = useState({
        public: true,
        private: false,
        friendsOnly: false,
    });

    const handleCheckboxChange = visibilityType => {
        const newSelection = {
            ...selectedTypes,
            [visibilityType]: !selectedTypes[visibilityType],
        };
        setSelectedTypes(newSelection);
        onChange(newSelection);
    };

    return (
        <div className="view-types">
            <label>
                <input
                    type="checkbox"
                    checked={selectedTypes.public}
                    onChange={() => handleCheckboxChange('public')}
                />
                Public
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={selectedTypes.private}
                    onChange={() => handleCheckboxChange('private')}
                />
                Private
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={selectedTypes.friendsOnly}
                    onChange={() => handleCheckboxChange('friendsOnly')}
                />
                Friends Only
            </label>
        </div>
    );
};

ViewTypes.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default ViewTypes;
