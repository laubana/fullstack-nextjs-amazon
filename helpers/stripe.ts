import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET as string);

export const createCustomer = async (props: {
  email: string;
  name: string;
}) => {
  const { email, name } = props;

  const stripeCustomer = await stripe.customers.create({ email, name });

  return stripeCustomer;
};

export const createPrice = async (props: {
  price: number;
  productId: string;
}) => {
  const { price, productId } = props;

  const stripePrice = await stripe.prices.create({
    unit_amount: price,
    currency: "cad",
    product: productId,
  });

  return stripePrice;
};

export const createProduct = async (props: {
  description: string;
  name: string;
}) => {
  const { description, name } = props;

  const stripeProduct = await stripe.products.create({
    name,
    description,
  });

  return stripeProduct;
};

export const createSetupIntent = async (props: { customerId: string }) => {
  const { customerId } = props;

  const stripSetupIntent = await stripe.setupIntents.create({
    customer: customerId,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return stripSetupIntent;
};

export const listPaymentMethods = async (props: { customerId: string }) => {
  const { customerId } = props;

  const paymentMethods = await stripe.customers.listPaymentMethods(customerId);

  return paymentMethods.data;
};
