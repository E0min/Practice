import { useEffect } from "react";

const usePageTitle = (title) => {
    useEffect(()=>{
        const $title = document.getElementsByTagName("title")[0]; //관례상 $을 사용하면 DOM 요소를 저장하는 변수이다.
        $title.innerText = `${title}`;
    },[])


}
export default usePageTitle;