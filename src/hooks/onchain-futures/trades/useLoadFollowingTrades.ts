import { getFollowingTrades, getTrendingTrades } from "@/services/trade/api";
import { TradeData2 } from "@/services/trade/types";
import { ApiRespCode, AsyncRequestStatus } from "@/services/types";
import { uniqBy } from "lodash";
import { useRef, useState } from "react";

const PAGE_SIZE = 10;

export default function useLoadFollowingTrades(props?: {
  tokenAddress?: string;
}) {
  const [items, setItems] = useState<TradeData2[]>([]);
  const [status, setStatus] = useState(AsyncRequestStatus.IDLE);
  const pageInfoRef = useRef({
    hasNextPage: true,
    nextPageNumber: 1,
  });

  const loading = status === AsyncRequestStatus.PENDING;

  const loadItems = async () => {
    const { hasNextPage, nextPageNumber } = pageInfoRef.current;
    const tokenAddress = props?.tokenAddress;

    if (hasNextPage === false) {
      return;
    }
    setStatus(AsyncRequestStatus.PENDING);
    try {
      const params = {
        pageSize: PAGE_SIZE,
        pageNumber: nextPageNumber,
        ...(tokenAddress ? { tokenAddress } : {}),
      };
      const resp = await getFollowingTrades(params);
      const { code, data, msg } = resp.data || {};
      if (code !== ApiRespCode.SUCCESS) {
        throw new Error(msg);
      }
      setItems((pre) => uniqBy([...pre, ...data], "txHash"));
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