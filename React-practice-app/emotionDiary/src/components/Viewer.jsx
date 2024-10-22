/* eslint-disable react/prop-types */
import './Viewer.css';
import { useContext } from 'react';
import { getEmotionImage } from '../util/get-image-emotion';
import { emotionList } from '../util/constants';

const Viewer = ({ currentDiaryItem }) => {

    const emotionItem = emotionList.find((item) => { return String(item.emotionId) === String(currentDiaryItem.emotionId) })
    return (
        <div className='Viewer'>
            <section className='img_section'>
                <h4>오늘의 감정</h4>
                <div className={`emotion_img_wrapper emotion_img_wrapper_${currentDiaryItem.emotionId}`}>
                    <img src={getEmotionImage(currentDiaryItem.emotionId)} />
                    <div>{emotionItem.emotionName}</div>
                </div>
            </section>
            <section className='content_section'>
                <h4>오늘의 일기</h4>
                <div className='content_wrapper'>
                    <p>
                        {currentDiaryItem.content}
                    </p>
                </div>
            </section>
        </div>

    )
}
export default Viewer;