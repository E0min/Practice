import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
    const nav = useNavigate();
    const {onCreate} = useContext(DiaryDispatchContext); // DiaryDispatcherContext에서 구조분해할당으로 onCreate함수만 따로 받음

    const onSubmit = (input) =>{
        onCreate(input.createdDate.getTime(), input.emotionId, input.content); // 타임 스탬프로 날짜 저장
        nav(-1,{replace:true});
    }
    usePageTitle("새 페이지");
    
    return (
        <div>
            <Header title={"새 일기 쓰기"}
                leftChildren={<Button
                    onClick={() => nav(-1)} // 페이지 뒤로 이동
                    text={"뒤로가기"} />} />
            <Editor onSubmit={onSubmit} />
        </div>
    )
}

export default New;