import React from 'react';
import styles from './SearchInput.module.css';

const SearchInput = ({ value, handleSearchChange }) => {
    return (
        <input
            className={styles.searchInput}
            type="text"
            value={value}
            onChange={handleSearchChange}
            placeholder="Search items"
        />
    );
};

export default SearchInput;
