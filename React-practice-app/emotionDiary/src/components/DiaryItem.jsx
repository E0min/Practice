/* eslint-disable react/prop-types */
import { getEmotionImage } from "../util/get-image-emotion";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./DiaryItem.css";

const DiaryItem = ({id,emotionId,createdDate,content}) => {
    const nav = useNavigate();
        return(
        <div className="DiaryItem">
            <div onClick={()=>{nav(`/diary/${id}`)}} className={`img_section img_section${emotionId}`}>
                <img src={getEmotionImage(emotionId)} alt="" />
            </div>
            <div className="info_section" onClick={()=>{nav(`/diary/${id}`)}}>
                <div className="created_date">{new Date(createdDate).toLocaleDateString()}</div>
                <div className="content">{content}</div>
            </div>
            <div className="button_section" onClick={()=>{nav(`/edit/${id}`)}}>
                <Button text={"수정하기"}></Button>
            </div>
        </div>
    )
}

export default DiaryItem;