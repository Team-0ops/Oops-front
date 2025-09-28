import { useEffect, useState } from "react";
import type { ResponseCategoryPostListDTO } from "../../types/post";
import { getSearchedPostList } from "../../apis/post";
import type { SearchParams } from "../../types/common";

function useGetSearchedPostList(params: SearchParams) {
  const [posts, setPosts] = useState<ResponseCategoryPostListDTO | null>(null);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSearchedPostList(params); // data.data 반환
        setPosts(data);
      } catch (err) {
        setError("게시글 불러오기 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { posts, Loading, Error };
}

export default useGetSearchedPostList;
