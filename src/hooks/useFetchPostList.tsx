import { useState, useCallback } from "react";
import axios from "axios";
import type { PostResponse } from "../types/OopsList";

export const useFetchPostLists = () => {
  const [oopsList, setOopsList] = useState<PostResponse[]>([]);
  const [overcomeList, setOvercomeList] = useState<PostResponse[]>([]);

  const token = import.meta.env.VITE_API_KEY;

  const fetchOopsList = useCallback(async () => {
    try {
      const res = await axios.get("/api/posts?situation=OOPS", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOopsList(res.data.postGroup);
    } catch (error) {
      console.error("OOPS 목록 가져오기 실패:", error);
    }
  }, [token]);

  const fetchOvercomeList = useCallback(async () => {
    try {
      const res = await axios.get("/api/posts?situation=OVERCOMING", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOvercomeList(res.data.postGroup);
    } catch (error) {
      console.error("OVERCOMING 목록 가져오기 실패:", error);
    }
  }, [token]);

  return { oopsList, overcomeList, fetchOopsList, fetchOvercomeList };
};
