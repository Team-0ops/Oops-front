import { useEffect, useState } from "react";
import { getCurrentWikis } from "../../apis/wiki";
import type { ResponseCurrentWiki } from "../../types/wkik";

function useGetFailWiki() {
  const [wiki, setWikis] = useState<ResponseCurrentWiki | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrentWikis(); // data.data 반환
        setWikis(data);
      } catch (err) {
        setError("위키 불러오기 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { wiki, loading, error };
}

export default useGetFailWiki;
