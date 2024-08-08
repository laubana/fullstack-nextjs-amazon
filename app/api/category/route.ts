import connect from "@/configs/db";
import { CustomRequest } from "@/interfaces/CustomRequest";
import session from "@/middlewares/session";
import Category from "@/models/Category";

export const POST = async (req: Request) => {
  return session(req, async (req: CustomRequest) => {
    try {
      const { name } = await req.json();
      const role = req.role;

      if (role !== "admin") {
        return Response.json(
          {
            message: "Forbidden.",
          },
          {
            status: 403,
          }
        );
      }

      await connect();

      const category = await Category.findOne({
        name,
      });

      if (category) {
        return Response.json(
          {
            message: "The name already exists.",
          },
          {
            status: 409,
          }
        );
      }

      await Category.create({ name });

      return Response.json(
        {
          message: "Category created successfully.",
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
