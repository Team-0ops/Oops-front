import { useEffect, useState } from "react";
import { getPostListInMainPagetoGuest } from "../../apis/post";
import type { ResponseMainPostListDTO } from "../../types/post";
import { useAuth } from "../../context/AuthContext";

function useGetGuestPostListInMain() {
  const [posts, setPosts] = useState<ResponseMainPostListDTO | null>(null);
  const [mainLoading, setLoading] = useState(true);
  const [mainError, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    // [MOD] 토큰이 있으면 게스트 호출하지 않음
    if (accessToken) {
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
        const data = await getPostListInMainPagetoGuest();
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

export default useGetGuestPostListInMain;
