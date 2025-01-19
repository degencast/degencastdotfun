import axios from "axios";
import request, { RequestPromise } from "../request";
import { ApiResp } from "../types";
import { Web3BioProfile, OwnedMemeData, UserData } from "./types";
import { MemeData } from "../meme/types";

export function signIn(params: { address: string }): RequestPromise<
  ApiResp<{
    token: string;
    user: UserData;
  }>
> {
  const { address } = params;
  return request({
    url: `signin`,
    method: "post",
    params: {
      address,
    },
  });
}

export function getOwnedMemes({
  address,
}: {
  address: string;
}): RequestPromise<ApiResp<OwnedMemeData[]>> {
  return request({
    url: `/users/${address}/owned`,
    method: "get",
  });
}

export function getCreatedMemes({
  address,
}: {
  address: string;
}): RequestPromise<ApiResp<MemeData[]>> {
  return request({
    url: `/users/${address}/created`,
    method: "get",
  });
}

export function getWeb3BioProfile({
  address,
}: {
  address: string;
}): RequestPromise<Web3BioProfile[]> {
  return axios.get(`https://api.web3.bio/profile/${address}`);
}

export function getWeb3BioProfileWithBatch(
  params: Array<{
    platform: "ethereum" | "solana" | string;
    address: string;
  }>
): RequestPromise<Web3BioProfile[]> {
  const p = params.map((item) => `${item.platform},${item.address}`);
  return axios.get(
    `https://api.web3.bio/ns/batch/${encodeURIComponent(JSON.stringify(p))}`
  );
}
