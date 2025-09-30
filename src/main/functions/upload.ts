import { UploadController } from "../../application/controllers/UploadController";
import { makeHandler } from "../middy/makeHandler";

export const handler = makeHandler(new UploadController());
