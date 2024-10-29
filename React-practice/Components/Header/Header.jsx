import React from 'react';
import styles from './Header.module.css';
import { memo } from 'react';

 function Header() {
    const currentDate = new Date(); //날짜를 불러오는 객체
    const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
      return (
        <div className={styles.headerContainer}>
            <h4 className={styles.title}>오늘은</h4>
            <h1 className={styles.date}>{dateString} 입니다</h1>
        </div>
    );
}
const memoHeader = memo(Header);
export default memoHeader;
