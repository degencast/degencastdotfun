import {
  getTokenInfoWithGeckoterminal,
  getTrendingTrades,
} from "@/services/trade/api";
import { TradeData2 } from "@/services/trade/types";
import { ApiRespCode, AsyncRequestStatus } from "@/services/types";
import { getWeb3BioProfileWithBatch } from "@/services/user/api";
import { uniqBy } from "lodash";
import { useRef, useState } from "react";

const PAGE_SIZE = 10;

export default function useLoadTrendingTrades(props?: {
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
      const resp = await getTrendingTrades(params);
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

      // update user profile
      const web3bioParams = data.map((item) => ({
        platform: item.token.chainName === "solana" ? "solana" : "ethereum",
        address: item.user.address,
      }));
      const profileResp = await getWeb3BioProfileWithBatch(web3bioParams);
      const profiles = profileResp?.data || [];
      setItems((pre) => {
        return pre.map((item) => {
          const profile = profiles.find(
            (p) => p.address.toLowerCase() === item.user.address.toLowerCase()
          );
          return {
            ...item,
            user: {
              ...item.user,
              avatar: profile?.avatar || "",
              displayName: profile?.displayName || "",
            },
          };
        });
      });

      // update token image
      const tokenInfos = await Promise.all(
        data.map((item) =>
          getTokenInfoWithGeckoterminal(
            item.token.chainName,
            item.token.tokenAddress
          ).then((resp) => resp.data)
        )
      );
      const swapTokenInfos = await Promise.all(
        data.map((item) =>
          getTokenInfoWithGeckoterminal(
            item.swapToken.chainName,
            item.swapToken.tokenAddress
          ).then((resp) => resp.data)
        )
      );

      setItems((pre) => {
        return pre.map((item, index) => {
          const tokenInfo = tokenInfos.find(
            (info) =>
              info.data.attributes.address.toLowerCase() ===
              item.token.tokenAddress.toLowerCase()
          );
          const swapTokenInfo = swapTokenInfos.find(
            (info) =>
              info.data.attributes.address.toLowerCase() ===
              item.swapToken.tokenAddress.toLowerCase()
          );
          return {
            ...item,
            token: {
              ...item.token,
              image:
                item.token?.image || tokenInfo?.data.attributes.image_url || "",
            },
            swapToken: {
              ...item.swapToken,
              image:
                item.swapToken.image ||
                swapTokenInfo?.data.attributes.image_url ||
                "",
            },
          };
        });
      });
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
