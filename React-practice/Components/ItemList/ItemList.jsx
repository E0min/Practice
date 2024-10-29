import React from 'react';
import styles from './ItemList.module.css';

const ItemList = ({ items, handleDeleteItem }) => {
    return (
        <div className={styles.listContainer}>
            {items.map((item, index) => (
                <div key={index} className={styles.listItem}>
                    {item.content} - {item.date}
                    <button className={styles.deleteButton} onClick={() => handleDeleteItem(index)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ItemList;
