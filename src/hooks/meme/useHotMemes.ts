import { getMemes } from "@/services/meme/api";
import { ChainType, MemeData, SortBy } from "@/services/meme/types";
import { ApiRespCode, AsyncRequestStatus } from "@/services/types";
import { useRef, useState } from "react";

const PAGE_SIZE = 50;

export default function useHotMemes(props?: {
  query?: string;
  chain?: ChainType;
}) {
  const [items, setItems] = useState<MemeData[]>([]);
  const [status, setStatus] = useState(AsyncRequestStatus.IDLE);
  const queryRef = useRef(props?.query);
  const chainRef = useRef(props?.chain);

  const loading = status === AsyncRequestStatus.PENDING;

  const loadItems = async (isQueryChange?: boolean) => {
    const chain = chainRef.current;
    const sortBy = SortBy.marketCap;
    const query = queryRef.current;
    if (isQueryChange) {
      setItems([]);
    }
    setStatus(AsyncRequestStatus.PENDING);
    try {
      const params = {
        pageSize: PAGE_SIZE,
        ...(chain ? { chain } : {}),
        ...(sortBy ? { sortBy } : {}),
        query: query || "",
      };
      const resp = await getMemes(params);
      const { code, data, msg } = resp.data || {};
      if (code !== ApiRespCode.SUCCESS) {
        throw new Error(msg);
      }
      setItems(data);
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
