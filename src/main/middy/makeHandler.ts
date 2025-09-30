import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpMultipartBodyParser from "@middy/http-multipart-body-parser";
import httpResponseSerializer from "@middy/http-response-serializer";
import { IController } from "../../application/types/IController";
import { errorHandler } from "./middlewares/errorHandler";

export function makeHandler(controller: IController<any>) {
  return middy(async (event: any) => {
    return controller.handler({
      body: event.body,
      headers: event.headers,
      params: event.pathParameters,
    });
  })
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
