import React, { useRef } from 'react';
import styles from './AddItemForm.module.css'

const AddItemForm = ({ handleAddItem, }) => {
    const inputRef = useRef();

    const handleButtonClick = () => {
        handleAddItem(inputRef.current.value);
        inputRef.current.value = ''; // 입력 필드 초기화
    };

    return (
        <div className={styles.formContainer}>
            <input ref={inputRef} className={styles.inputField} type="text" placeholder="Add new item" />
            <button className={styles.addButton} onClick={handleButtonClick}>Add</button>
        </div>
    );
};

export default AddItemForm;
