import { useEffect, useState } from "react";
import { getPostListCategory } from "../../apis/post";
import type { ResponseCategoryPostListDTO } from "../../types/post";

function useGetPostLIstCategory() {
  const [categoryPosts, setPosts] =
    useState<ResponseCategoryPostListDTO | null>(null);
  const [categoryLoading, setLoading] = useState(true);
  const [categoryError, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostListCategory(); // data.data 반환
        setPosts(data);
      } catch (err) {
        setError("게시글 불러오기 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { categoryPosts, categoryLoading, categoryError };
}

export default useGetPostLIstCategory;
