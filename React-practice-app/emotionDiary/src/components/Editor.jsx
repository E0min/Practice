/* eslint-disable react/prop-types */
import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { emotionList } from '../util/constants';


const getStringedDate = (targetDate) => {
    //날짜 -> StringDate
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();

    if (month < 10) {
        month = `0${month}`;
    }
    if (date < 10) {
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
}

const Editor = ({initData, onSubmit}) => {
    const [input, setInput] = useState({
        createdDate:new Date(),
        emotionId:3,
        content:""
    });

    useEffect(()=>{
        if(initData){
            setInput({
                ...initData, 
                //createdDate : getStringedDate(initData.createdDate)})
            createdDate:new Date(Number(initData.createdDate))
        })
        }
    },[initData])
    const nav = useNavigate();
    
    const onChangeInput = (e) => {
        console.log(e.target.name); //사용자 입력 객체에서 변경되고 있는 부분의 이름을 알려줌
        const name = e.target.name;
        console.log(e.target.value); // 변경된 값을 알려줌
        let value = e.target.value;

        if (name === "createdDate") {
            value = new Date(value);
        }

        setInput({ ...input, [name]: value })


    }

    const onClickSubmitButton = () => {
        onSubmit(input);
    }
    console.log(input.content);

    return (
        <div className='Editor'>
            <section className='date_section'>
                <h4>오늘의 날짜</h4>
                <input
                    name="createdDate"
                    value={getStringedDate(input.createdDate)}
                    type="date"
                    onChange={onChangeInput}
                />  {/*value={new Date()} 와 같은 객체 타입은 인식을 못한다. 그래서 String type으로 바꿔줘야함*/}
            </section>
            <section className='emotion_section'>
                <h4>오늘의 감정</h4>
                <div className='emotion_list_wrapper' >
                    {emotionList.map((item) => <EmotionItem key={item.emotionId} {...item}
                        onClick={() => onChangeInput({
                            target: {
                                name: "emotionId",
                                value: item.emotionId
                            }
                        })}
                        isSelected={item.emotionId === input.emotionId} />
                    )}
                </div>

            </section>
            <section className='content_section'>
                <h4>오늘의 일기</h4>
                <textarea 
                name = 'content'
                value= {input.content}
                onChange={onChangeInput}
                placeholder='오늘은 어땠나요' 
                cols="30" rows="10">

                </textarea>
            </section>
            <section className='button_section'>
                <Button text={"취소하기"} onClick={()=>nav(-1)} />
                <Button text={"작성완료"} type={"POSITIVE"} onClick={onClickSubmitButton} />
            </section>
        </div>

    )
};

export default Editor;