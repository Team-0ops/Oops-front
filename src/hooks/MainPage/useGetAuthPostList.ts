import { useEffect, useState } from "react";
import { getPostListInMainPage } from "../../apis/post";
import type { ResponseMainPostListDTO } from "../../types/post";

function useGetAuthPostListInMain() {
  const [posts, setPosts] = useState<ResponseMainPostListDTO | null>(null);
  const [mainLoading, setLoading] = useState(true);
  const [mainError, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostListInMainPage(); // data.data 반환
        setPosts(data);
      } catch (err) {
        setError("게시글 불러오기 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { posts, mainLoading, mainError };
}

export default useGetAuthPostListInMain;
