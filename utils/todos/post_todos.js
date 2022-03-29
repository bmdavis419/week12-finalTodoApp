import { PrismaClient } from "@prisma/client";
import { getSession } from "@auth0/nextjs-auth0";

const prisma = new PrismaClient();

// this method will create a new todo and save it to the DB
const handler = async (req, res) => {
  // get the user id from session
  const session = getSession(req, res);
  const uid = session.user.sub;

  // update the user by creating a nested todo
  const user = await prisma.user.update({
    where: {
      id: uid,
    },
    data: {
      todos: {
        createMany: {
          data: [{ ...req.body }],
        },
      },
    },
    include: {
      todos: true,
    },
  });

  res.status(201).json({ ...user.todos[user.todos.length - 1] });
};

export default handler;
