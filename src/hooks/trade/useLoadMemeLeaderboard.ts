import { getMemeLeaderboard } from "@/services/meme/api";
import { ApiRespCode, AsyncRequestStatus } from "@/services/types";
import { UserLeaderboardData } from "@/services/user/types";
import { useRef, useState } from "react";

const PAGE_SIZE = 20;

export default function useLoadMemeLeaderboard(props: { address: string }) {
  const [items, setItems] = useState<UserLeaderboardData[]>([]);
  const [status, setStatus] = useState(AsyncRequestStatus.IDLE);
  const addressRef = useRef(props.address);
  const pageInfoRef = useRef({
    hasNextPage: true,
    nextPageNumber: 1,
  });

  const loading = status === AsyncRequestStatus.PENDING;

  const loadItems = async () => {
    const address = addressRef.current;
    const { hasNextPage, nextPageNumber } = pageInfoRef.current;

    if (hasNextPage === false) {
      return;
    }
    setStatus(AsyncRequestStatus.PENDING);
    try {
      const params = {
        pageSize: PAGE_SIZE,
        pageNumber: nextPageNumber,
        address,
      };
      const resp = await getMemeLeaderboard(params);
      const { code, data, msg } = resp.data || {};
      if (code !== ApiRespCode.SUCCESS) {
        throw new Error(msg);
      }
      setItems((pre) => [...pre, ...data]);
      pageInfoRef.current = {
        hasNextPage: data.length === PAGE_SIZE,
        nextPageNumber: nextPageNumber + 1,
      };
      setStatus(AsyncRequestStatus.FULFILLED);
    } catch (err) {
      console.error(err);
      setStatus(AsyncRequestStatus.REJECTED);
    }
  };

  return {
    loading,
    items,
    loadItems,
  };
}
