import React, { useState } from 'react';
import AddItemForm from './Components/AddItemForm/AddItemForm';
import ItemList from './Components/ItemList/ItemList';
import SearchInput from './Components/SearchInput/SearchInput';
import Header from './Components/Header/Header';
import styles from './App.module.css';


const App = () => {
    const [list, setList] = useState([]); // 할 일을 추가하는 리스트; 객체가 저장될 공간임
    const [searchTerm, setSearchTerm] = useState(''); // 검색어를 담아둘 변수
    const [filteredItems, setFilteredItems] = useState([]); //검색어로 필터링된 할 일들을 보관하는 리스트
    const currentDate = new Date(); //날짜를 불러오는 객체
    const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  

    const handleAddItem = (content) => { 
        const newList = [...list, { date: dateString, content }]; // 스프레드 연산자와 내용을 받아 추가
        setList(newList);
        filterItems(newList, searchTerm);
    };

    const handleDeleteItem = (index) => {
        const newList = list.filter((_, idx) => idx !== index); // 인자로 전달받은 인덱스와 필터 메소드로 할 일 삭제한다.
        setList(newList);
        filterItems(newList, searchTerm);
    };

    const handleSearchChange = (e) => { //이벤트 객체의 값이 변경될때마다 바로바로 검색어를 최신화하는 함수
        const value = e.target.value;
        setSearchTerm(value);
        filterItems(list, value);
    };

    const filterItems = (items, term) => { //할 일 리스트와 검색어를 입력받는다.
        setFilteredItems(term ? items.filter(item => item.content.toLowerCase().includes(term.toLowerCase())) : items);
    }; 

    return (
        <div className={styles.appContainer}>
            <Header dateString={dateString}/>
            <AddItemForm handleAddItem={handleAddItem} />
            <SearchInput value={searchTerm} handleSearchChange={handleSearchChange} />
            <ItemList items={filteredItems} handleDeleteItem={handleDeleteItem} />
        </div>
    );
};

export default App;

