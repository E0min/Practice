//[]를 사용하면 동적 경로를 가지는 페이지를 이용할 수 있다.
import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();
    console.log(router);
    return(
        <>
        <h1>booksPage</h1>
        </>
    )
}