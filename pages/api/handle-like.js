import sanityClient from "../../sanityClient.js";

sanityClient.config({
  token: process.env.SANITY_WRITE_TOKEN,
});

export default async function handler(req, res) {
  const { _id } = JSON.parse(req.body);
  const data = await sanityClient.patch(_id).inc({ likes: 1 }).commit();
  res.status(200).json({ likes: data.likes });
}
