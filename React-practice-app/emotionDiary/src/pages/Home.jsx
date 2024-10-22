import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import usePageTitle from "../hooks/usePageTitle";

const getMontlyData = (pivotDate, data) => { // 월별 필터링
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime(); // 1일 0시 0분 0초
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime(); // 해당 월의 마지막 날 23시 59분 59초
    
    return data.filter((item) => {
        return beginTime <= item.createdDate && endTime >= item.createdDate;
    });
};

const Home = () => {
    const data = useContext(DiaryStateContext); 
    const [pivotDate, setPivotDate] = useState(new Date()); 
    
    const monthlyData = getMontlyData(pivotDate, data);
    console.log("Monthly Data:", monthlyData);
    console.log("All Data:", data);
    usePageTitle("감정일기장");
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 1));
    };
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1, 1));
    };
    
    return (
        <div>
            <Header
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
                leftChildren={<Button onClick={onDecreaseMonth} text={"<"} />}
                rightChildren={<Button onClick={onIncreaseMonth} text={">"} />}
            />
            <DiaryList data={monthlyData} />
        </div>
    );
}

export default Home;
