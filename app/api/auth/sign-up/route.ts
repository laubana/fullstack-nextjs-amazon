import bcryptjs from "bcryptjs";
import connect from "@/configs/db";
import User from "@/models/User";

export const POST = async (req: Request) => {
  try {
    const { email, name, password } = await req.json();

    if (!email || !name || !password) {
      return Response.json({ message: "Invalid Input" }, { status: 400 });
    }

    await connect();

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return Response.json(
        {
          message: "The email already exists.",
        },
        { status: 409 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    return Response.json(
      {
        message: "User created successfully.",
        data: newUser,
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
};
