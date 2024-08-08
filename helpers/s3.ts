import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AWS_REGION,
});

export const uploadImage = async ({ image }: { image: File }) => {
  const extension = image.name.split(".").pop();
  const filename = `${uuidv4()}.${extension}`;

  const bufferedImage = await image.arrayBuffer();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `amazon/images/${filename}`,
    Body: Buffer.from(bufferedImage),
    ContentType: image.type,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  return `${process.env.AWS_URL}/amazon/images/${filename}`;
};
