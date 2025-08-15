import { useEffect, useState } from "react";
import { getPostListInMainPage } from "../../apis/post";
import type { ResponseMainPostListDTO } from "../../types/post";
import { useAuth } from "../../context/AuthContext";

function useGetAuthPostListInMain() {
  const [posts, setPosts] = useState<ResponseMainPostListDTO | null>(null);
  const [mainLoading, setLoading] = useState(true);
  const [mainError, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) {
      setPosts(null);
      setError(null);
      setLoading(false);
      return;
    }

    let aborted = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const data = await getPostListInMainPage();
        if (!aborted) setPosts(data);
      } catch {
        if (!aborted) setError("게시글 불러오기 실패");
      } finally {
        if (!aborted) setLoading(false);
      }
    })();

    return () => {
      aborted = true;
    };
  }, [accessToken]);

  return { posts, mainLoading, mainError };
}

export default useGetAuthPostListInMain;
