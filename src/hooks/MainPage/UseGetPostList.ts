import { useEffect, useState } from "react";
import { getPostListInMainPage } from "../../apis/post";
import type { ResponsePostListDTO } from "../../types/post";

function useGetPostListIn() {
  const [posts, setPosts] = useState<ResponsePostListDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return { posts, loading, error };
}

export default useGetPostListIn;
