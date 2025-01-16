import axios, { AxiosResponse } from "axios";
import request, { RequestPromise } from "../request";
import { ApiResp, ApiRespCode } from "../types";
import { Web3BioUser } from "./types";
import { mockRecommendedUsers, mockFollowingUsers } from "./mock";

const MOCK = true; // 控制是否使用mock数据

const mockAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: { headers: {} } as any
});

export function getRecommendedUsers({
  address,
}: {
  address: string;
}): RequestPromise<ApiResp<Web3BioUser[]>> {
  if (MOCK) {
    // 返回mock数据
    const mockResponse = {
      code: ApiRespCode.SUCCESS,
      msg: "success",
      data: mockRecommendedUsers
    };
    return Promise.resolve(mockAxiosResponse(mockResponse));
  }

  return request({
    url: `/users/recommended`,
    method: "get",
  });
}

export function getFollowingUsers({
  address,
}: {
  address: string;
}): RequestPromise<ApiResp<Web3BioUser[]>> {
  if (MOCK) {
    // 返回mock数据
    const mockResponse = {
      code: ApiRespCode.SUCCESS,
      msg: "success",
      data: mockFollowingUsers
    };
    return Promise.resolve(mockAxiosResponse(mockResponse));
  }

  return request({
    url: `/users/following`,
    method: "get",
  });
}

export function followUser({
  address,
}: {
  address: string;
}): RequestPromise<ApiResp<Web3BioUser[]>> {
  if (MOCK) {
    // 模拟关注/取消关注操作
    const mockResponse = {
      code: ApiRespCode.SUCCESS,
      msg: "success",
      data: mockFollowingUsers
    };
    return Promise.resolve(mockAxiosResponse(mockResponse));
  }

  return request({
    url: `/users/follow`,
    method: "post",
    data: { address }
  });
}
