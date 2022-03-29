import delete_todo from "../../../../utils/todos/delete_todo";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  await delete_todo(req, res);
});
