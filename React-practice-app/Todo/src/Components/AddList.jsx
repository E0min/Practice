import { useRef, useState, useEffect } from 'react';

const AddList = ({ dateString }) => {
    const inputRef = useRef();
    const [list, setList] = useState([]); // 전체 목록 상태
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const [filteredItems, setFilteredItems] = useState([]); // 필터링된 목록 상태

    const handleButtonClick = () => {
        const newList = [...list, { date: dateString, content: inputRef.current.value }];
        setList(newList);
        inputRef.current.value = ''; // 입력 필드 초기화
        filterItems(newList, searchTerm); // 추가할 때도 필터링
    };

    const onClickDelete = (index) => {
        const newList = list.filter((_, i) => i !== index);
        setList(newList);
        filterItems(newList, searchTerm); // 삭제할 때도 필터링
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterItems(list, value);
    };

    const filterItems = (items, term) => {
        if (!term) {
            setFilteredItems(items);
        } else {
            const filtered = items.filter(item =>
                item.content.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredItems(filtered);
        }
    };

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="Add new item" />
            <button onClick={handleButtonClick}>추가</button>
            <div>
            <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search items" />
            {filteredItems.map((item, index) => (
                <div key={index}>
                    {item.content} - {item.date}
                    <button onClick={() => onClickDelete(index)}> 삭제 </button>
                </div>
            ))}</div>
        </div>
    );
}

export default AddList;



// import { useRef, useState, useEffect } from 'react';
// import ShowList from './ShowList';

// const AddList = ({ dateString }) => {
//     const inputRef = useRef();
//     const [list, setList] = useState([]); // 배열로 초기화

//     const handleButtonClick = () => {
//         const newList = [...list, { date: dateString, content: inputRef.current.value }];
//         setList(newList);  // 상태 업데이트
//         inputRef.current.value = '';  // 입력 필드 초기화
//     };

//     const onClickDelete = (index) => {
//         console.log(index)

//     }
//     // 상태 업데이트 확인을 위한 useEffect 사용
//     useEffect(() => {
//         console.log(list);
//     }, [list]); // list가 변경될 때마다 로그 출력

//     return(
//         <div>
//             <input ref={inputRef} type="text" />
//             <button onClick={handleButtonClick}>추가</button>
//             {list.map((item, index) => (
//             <div key={index}>
//                 {item.content} - {item.date}
//                 <button onClick={()=>{onClickDelete(index)}}> 삭제 </button>
//             </div>
//         ))}        
//         </div>
//     );
// }

// export default AddList;

// import {useRef,useState} from 'react'

// const AddList = ({dateString}) => {
//     const inputRef = useRef();
//     const [List,setList] = useState([]);

//     const handleButtonClick = () => {
//         // input 요소의 현재 값을 읽어 콘솔에 출력
//         setList([...List,{date:dateString,content:inputRef.current.value}])
//         console.log(List)
//       };
//     return(
//     <div>
//       <input ref={inputRef} type="text" />
//       <button onClick={handleButtonClick}>추가</button>
//       <section>
//       </section>
//     </div>
//     );
// }

// export default AddList;