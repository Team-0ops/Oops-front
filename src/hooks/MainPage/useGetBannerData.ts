import { useEffect, useState } from "react";
import type { BannerResponse } from "../../types/banner";
import { getBannerData, getBannerDataGuest } from "../../apis/banner";
import { useAuth } from "../../context/AuthContext";

function useGetBannerData() {
  const [bannerList, setBannerList] = useState<BannerResponse | null>(null);
  const [bannerLoading, setLoading] = useState(true);
  const [bannerError, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();
  const isAuthed = !!accessToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = isAuthed
          ? await getBannerData()
          : await getBannerDataGuest();
        console.log("배너 데이터:", data);
        setBannerList(data);
      } catch (err) {
        setError("게시글 불러오기 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { bannerList, bannerLoading, bannerError };
}

export default useGetBannerData;
