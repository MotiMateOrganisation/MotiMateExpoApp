export interface RequestStatus {
  message?: string;
}
export class RequestSuccess implements RequestStatus {}
export class RequestLoading implements RequestStatus {}
export class RequestError implements RequestStatus {
  constructor(public message: string) {}
}
export class NetworkError implements RequestStatus {
  constructor(public message: string) {}
}
