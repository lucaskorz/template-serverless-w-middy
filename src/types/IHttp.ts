export interface IHttpRequest<TBody extends Record<string, any> | undefined> {
  body: TBody;
  headers?: Record<string, any>;
}

export interface IHttpResponse {
  statusCode: number;
  body?: Record<string, any>;
  headers?: Record<string, any>;
}
