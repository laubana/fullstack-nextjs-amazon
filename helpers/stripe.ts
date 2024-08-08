import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET as string);

export const createProduct = async ({
  description,
  name,
  price,
}: {
  description: string;
  name: string;
  price: number;
}) => {
  const stripProduct = await stripe.products.create({
    name,
    description,
  });

  await stripe.prices.create({
    unit_amount: price,
    currency: "cad",
    product: stripProduct.id,
  });

  return stripProduct.id;
};
