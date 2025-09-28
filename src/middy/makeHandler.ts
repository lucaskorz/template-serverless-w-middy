import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpMultipartBodyParser from "@middy/http-multipart-body-parser";
import httpResponseSerializer from "@middy/http-response-serializer";
import { IHttpRequest, IHttpResponse } from "../types/IHttp";
import { errorHandler } from "./middlewares/errorHandler";

type Handler<TBody extends Record<string, any> | undefined> = (
  request: IHttpRequest<TBody>
) => Promise<IHttpResponse>;

export function makeHandler<
  TBody extends Record<string, any> | undefined = undefined
>(handler: Handler<TBody>) {
  return middy(handler)
    .use(httpJsonBodyParser({ disableContentTypeError: true }))
    .use(
      httpMultipartBodyParser({
        disableContentTypeError: true,
      })
    )
    .use(errorHandler())
    .use(
      httpResponseSerializer({
        defaultContentType: "application/json",
        serializers: [
          {
            regex: /^application\/json$/,
            serializer: ({ body }) => JSON.stringify(body),
          },
        ],
      })
    );
}
