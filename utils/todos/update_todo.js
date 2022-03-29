import { PrismaClient } from "@prisma/client";
import { getSession } from "@auth0/nextjs-auth0";

const prisma = new PrismaClient();

// this method will create a new todo and save it to the DB
const handler = async (req, res) => {
  const { id } = req.query;

  console.log(parseInt(id));

  // get the user id from session
  const session = getSession(req, res);
  const uid = session.user.sub;

  const update = await prisma.user.update({
    where: {
      id: uid,
    },
    data: {
      todos: {
        update: {
          where: {
            id: parseInt(id),
          },
          data: {
            ...req.body,
          },
        },
      },
    },
  });

  res.status(201).json({ ...update });
};

export default handler;
