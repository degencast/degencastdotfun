export enum AsyncRequestStatus {
  IDLE = "idle",
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}
export enum ApiRespCode {
  SUCCESS = 0,
  ERROR = 1,
}
export type ApiResp<T> = {
  code: ApiRespCode;
  msg: string;
  data: T;
};
