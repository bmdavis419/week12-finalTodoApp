import { PrismaClient } from "@prisma/client";
import { getSession } from "@auth0/nextjs-auth0";

const prisma = new PrismaClient();

// this method will get all of the todos for the user
const handler = async (req, res) => {
  // get the user id from session
  const session = getSession(req, res);
  const uid = session.user.sub;

  // get or add user from database
  const findUser = await prisma.user.findFirst({
    where: {
      id: uid,
    },
    include: {
      todos: true,
    },
  });

  // create if not exist
  if (!findUser) {
    await prisma.user.create({
      data: {
        id: uid,
      },
    });

    res.status(200).json({});
  } else {
    res.status(200).json({ ...findUser.todos });
  }
};

export default handler;
