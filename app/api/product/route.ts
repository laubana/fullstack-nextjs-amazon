import connect from "@/configs/db";
import { CustomRequest } from "@/interfaces/CustomRequest";
import session from "@/middlewares/session";

export const POST = async (req: Request) => {
  return session(req, async (req: CustomRequest) => {
    try {
      const { email } = await req.json();
      const id = req.id;

      console.log(id);

      await connect();

      return Response.json(
        {
          message: "anything",
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      console.error(error);

      return Response.json(
        {
          message: "Server Error!",
        },
        {
          status: 500,
        }
      );
    }
  });
};
