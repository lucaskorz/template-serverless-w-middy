import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import { s3Client } from "./clients/s3Client";
import { HttpError } from "./errors/HttpError";
import { makeHandler } from "./middy/makeHandler";
import { IFile } from "./types/IFile";

interface IHelloRequestBody {
  firstName: string;
  lastName: string;
  file: IFile;
}

export const handler = makeHandler<IHelloRequestBody>(async (request) => {
  const { file } = request.body;

  if (!file) {
    throw new HttpError(400, { error: "File is required!" });
  }

  const newFileName = `${randomUUID()}-${file.filename}`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: "korzteste",
    Key: newFileName,
    Body: file.content,
  });

  await s3Client.send(putObjectCommand);

  return {
    statusCode: 200,
    body: {
      filename: newFileName,
    },
  };
});
