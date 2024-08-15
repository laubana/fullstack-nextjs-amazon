import { getServerSession } from "next-auth";

import { authOptions } from "@/configs/authOptions";

import { CustomRequest } from "@/interfaces/CustomRequest";

export default async (
  req: CustomRequest,
  next: (req: CustomRequest) => void
) => {
  const session = await getServerSession(authOptions);

  req.id = session?.user?.id;
  req.role = session?.user?.role;

  return next(req);
};
