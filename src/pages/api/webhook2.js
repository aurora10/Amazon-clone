import { buffer } from "micro";
//import * as admin from "firebase-admin";
var admin = require("firebase-admin");

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("../../../credentials.json");

!admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const db = getFirestore();
//connect to stripe

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.SIGNING_SECRET;

const fulfillOrder = async (session) => {
  //console.log(session); //see what names are used in the session

  const docRef = db
    .collection("users")
    .doc(session.customer_details.email)
    .collection("orders")
    .doc(session.id);

  return await docRef
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.shipping_cost.amount_total / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Success: Order ${session.id} added to db `);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;
    //verify that event came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log("Error", error.message);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    //handle checkout session
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((error) =>
          res.status(400).send(`Webhook error: ${error.message}`)
        );
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
