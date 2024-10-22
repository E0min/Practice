import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";


const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
    const data = useContext(DiaryStateContext);
    const [currentDairyItem, setCurrentDairyItem] = useState();
    usePageTitle("수정 페이지")

    useEffect(() => {
        const currentDairyItem = data.find((item) => {
            return String(item.id) === String(params.id);
        })
        if (!currentDairyItem) {
            window.alert("존재하지 않는 일기입니다");
            nav("/", { replace: true });

        }

        setCurrentDairyItem(currentDairyItem);
    }, [params.id, data])

    const onClickDelete = () => {
        if (window.confirm("일기를 정말 삭제할까요?")) {
            onDelete(params.id)
            nav("/", { replace: true });
        }
    }

    const onSubmit = (input) =>{
        if(window.confirm("일기를 정말 수정하시겠습니까?")){
            onUpdate(params.id,input.createdDate.getTime(), input.emotionId, input.content); // 타임 스탬프로 날짜 저장
            nav(-1,{replace:true});
        }
        
    }

    // const getCurrentDiaryItem = () => { // DiaryStateContext에 저장된 데이터를 불러와서 현재 페이지의 id와 같은 데이터를 불러옴
    //     const currentDairyItem = data.find((item)=>{
    //         String(item.id) === String(params.id);
    //     })
    //     if(!currentDairyItem){
    //         window.alert("존재하지 않는 일기입니다");
    //         //nav("/",{replace: true});
    //         //You should call navigate() in a React.useEffect(), not when your component is first rendered. 
    //         // 컴포넌트가 렌더링 되기전에 getCurrentDiaryItem함수가 실행된다. 컴포넌트가 마운트 되기 전에는 useNav함수가 실행될 수 없다.
    //         // useNavigate 함수는 컴포넌트가 마운트 되어야 실행된다. <BrowserRouter> 컴포넌트가 공급하는 기능으로 
    //     }

    //     return currentDairyItem;
    // }

    // const currentDiaryItem = getCurrentDiaryItem();
    return (
        <div>
            <Header
                title={"일기 수정하기"}
                leftChildren={<Button text={"< 뒤로가기"} onClick={() => { nav(-1) }} />}
                rightChildren={<Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete} />}
            />
            <Editor initData = {currentDairyItem} onSubmit={onSubmit} />
        </div>
    )
}
export default Edit;