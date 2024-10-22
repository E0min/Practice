import Home from "./pages/Home";
import { useReducer, useRef, createContext, useEffect, useState } from "react";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Notfound from "./pages/Notfound";
import { Route, Routes } from "react-router-dom";
import Edit from "./pages/Edit";

const mockData = [
  {
    id: 1,
    createdDate: new Date("2024-01-03").getTime(),
    emotionId: 1,
    content: "1번일기입니다.",
  },
  {
    id: 2,
    createdDate: new Date("2024-02-04").getTime(),
    emotionId: 2,
    content: "2번일기입니다.",
  },
  {
    id: 3,
    createdDate: new Date("2024-06-03").getTime(),
    emotionId: 3,
    content: "3번일기입니다.",
  },
  {
    id: 4,
    createdDate: new Date("2024-06-13").getTime(),
    emotionId: 3,
    content: "3번일기입니다.",
  },
  {
    id: 5,
    createdDate: new Date("2024-06-08").getTime(),
    emotionId: 3,
    content: "3번일기입니다.",
  },
  {
    id: 6,
    createdDate: new Date("2024-06-01").getTime(),
    emotionId: 3,
    content: "3번일기입니다.",
  },
];

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }

    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }

    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }

    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export default function App() {
  const [data, dispatch] = useReducer(reducer, mockData); // data를 불러온 다음에 렌더링을 해야 에러가 발생하지 않는다.
  // 그래서 로딩 기능을 만들어야 한다.
  const [isLoading, setIsLoading] = useState(true);
  const idRef = useRef(4);

  // localStorage.setItem("안녕","안녕")
  // localStorage.setItem("person",JSON.stringify({name:"이영민"}))

  // console.log(localStorage.getItem("person")); // 그저 문자열
  // console.log(JSON.parse(localStorage.getItem("person"))); // 문자열 -> 객체 변환
  // localStorage.removeItem("안녕");

  useEffect(() => {
    const storedData = localStorage.getItem("diary");

    if (!storedData) {
      setIsLoading(false);

      return;
    }

    const parsedData = JSON.parse(storedData);

    if (!Array.isArray(parsedData)) {
      // parsedData가 배열이 아니라면 안된다.
      setIsLoading(false);

      return;
    }
    let maxId = 0;
    parsedData.forEach((item) => {
      if (maxId < Number(item.id)) {
        maxId = Number(item.Id);
      }
      setIsLoading(false);
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>데이터 로딩중</div>;
  }

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}
