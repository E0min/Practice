import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import Viewer from "../components/Viewer";
import usePageTitle from "../hooks/usePageTitle";

const Diary = () => {
    const nav = useNavigate();
    const params = useParams();
    const data = useContext(DiaryStateContext);
    const {onUpdate} = useContext(DiaryDispatchContext);
    const currentDiaryItem = data.find((item) => {
        return Number(item.id) === Number(params.id);
    });
    
    usePageTitle(`${params.id}번 일기`)

    if (!currentDiaryItem) { // 데이터 없는 경우 처리
        return (
            <div>
                <Header title={"존재하지 않는 일기"}
                    leftChildren={<Button text={"< 뒤로가기"} onClick={() => { nav(-1) }} />}
                />
                <p>일기를 찾을 수 없습니다.</p>
            </div>
        );
    }
    
    
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <Header title={`${formatDate(currentDiaryItem.createdDate)}`}
                leftChildren={<Button text={"< 뒤로가기"} onClick={() => { nav(-1) }} />}
                rightChildren={<Button text={"수정하기"} onClick={() => { nav(`/edit/${params.id}`) } }/>}
            />
            <Viewer currentDiaryItem={currentDiaryItem}/>

        </div>
    )
}

export default Diary;