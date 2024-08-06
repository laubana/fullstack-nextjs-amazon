import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import Image from "next/image";

export default async () => {
  const session = await getServerSession(authOptions);

  return (
    <header>
      {session && session.user ? (
        <div>
          <div>
            <Image
              src={session.user.image}
              width={50}
              height={50}
              alt="profile"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <div>{session.user.email}</div>
        </div>
      ) : (
        <div></div>
      )}
    </header>
  );
};
