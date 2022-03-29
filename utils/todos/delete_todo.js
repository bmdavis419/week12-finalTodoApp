import { PrismaClient } from "@prisma/client";
import { getSession } from "@auth0/nextjs-auth0";

const prisma = new PrismaClient();

// this method will create a new todo and save it to the DB
const handler = async (req, res) => {
  // get the user id from session
  const session = getSession(req, res);
  const uid = session.user.sub;

  const { id } = req.query;

  const update = await prisma.user.update({
    where: {
      id: uid,
    },
    data: {
      todos: {
        deleteMany: [{ id: parseInt(id) }],
      },
    },
  });

  res.status(202).json({ ...update });
};

export default handler;
