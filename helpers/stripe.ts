import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET as string);

export const confirmPaymentIntent = async (props: {
  paymentIntentId: string;
}) => {
  const { paymentIntentId } = props;

  const stripPaymentIntent = await stripe.paymentIntents.confirm(
    paymentIntentId
  );

  return stripPaymentIntent;
};

export const createCustomer = async (props: {
  email: string;
  name: string;
}) => {
  const { email, name } = props;

  const stripeCustomer = await stripe.customers.create({ email, name });

  return stripeCustomer;
};

export const createPaymentIntent = async (props: {
  amount: number;
  customerId: string;
  paymentMethodId: string;
}) => {
  const { amount, customerId, paymentMethodId } = props;

  const stripPaymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "cad",
    customer: customerId,
    payment_method: paymentMethodId,
    automatic_payment_methods: { allow_redirects: "never", enabled: true },
  });

  return stripPaymentIntent;
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

export const createRefund = async (props: {
  amount: number;
  paymentIntentId: string;
}) => {
  const { amount, paymentIntentId } = props;

  const stripeRefund = await stripe.refunds.create({
    amount,
    payment_intent: paymentIntentId,
  });

  return stripeRefund;
};

export const createSetupIntent = async (props: { customerId: string }) => {
  const { customerId } = props;

  const stripSetupIntent = await stripe.setupIntents.create({
    customer: customerId,
    automatic_payment_methods: {
      allow_redirects: "never",
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
