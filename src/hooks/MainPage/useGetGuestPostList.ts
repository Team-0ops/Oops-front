import { useEffect, useState } from "react";
import { getPostListInMainPagetoGuest } from "../../apis/post";
import type { ResponseMainPostListDTO } from "../../types/post";

function useGetGuestPostListInMain() {
  const [posts, setPosts] = useState<ResponseMainPostListDTO | null>(null);
  const [mainLoading, setLoading] = useState(true);
  const [mainError, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostListInMainPagetoGuest(); // data.data 반환
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

export default useGetGuestPostListInMain;
