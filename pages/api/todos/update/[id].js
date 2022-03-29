import update_todo from "../../../../utils/todos/update_todo";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  await update_todo(req, res);
});
