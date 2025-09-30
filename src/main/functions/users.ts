import { ListUsersController } from "../../application/controllers/ListUsersController";
import { UpdateUserController } from "../../application/controllers/UpateUserController";
import { makeHandler } from "../middy/makeHandler";
import { makeRoutesHandler } from "../middy/makeRoutesHandler";

export const handler = makeRoutesHandler([
  {
    path: "/users",
    method: "GET",
    handler: makeHandler(new ListUsersController()),
  },
  {
    path: "/users/{userId}",
    method: "PUT",
    handler: makeHandler(new UpdateUserController()),
  },
]);
