/* eslint-disable react/prop-types */
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import "./DiaryList.css"
import { useState } from "react";


const DiaryList = ({data}) => {
    const [sortType,setsortType]  = useState("latest");

    const onChangeSorttype = (e) =>{
        setsortType(e.target.value);

    }
    const getSortedData = () =>{
         //원본 배열은 냅두고 정렬된 새로운 배열을 반환하는 메서드
        return data.toSorted((a, b) => {
            if (sortType === "latest") {
                return b.createdDate - a.createdDate; // 최신 순
            } else {
                return a.createdDate - b.createdDate; // 오래된 순
            }
        });
    }
    const sortedData = getSortedData();
    const nav = useNavigate();
    console.log(data);
    return (
        <div className="DiaryList">
            <div className="menu_bar">
                <select onChange={onChangeSorttype}>
                    <option value={"latest"}>최신 순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>
                <Button onClick={()=>{nav(`/new`)}}text={"새로운 일기 쓰기"} type={"POSITIVE"}></Button>
            </div>
            <div className="list_wrapper ">
                {sortedData.map((item) => <DiaryItem key = { item.id } {...item}/> )}
            </div>
        </div>

    )
};

export default DiaryList;