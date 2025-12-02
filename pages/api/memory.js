import { getIdentity } from "../../lib/memory";

export default async function handler(req, res) {
  const { wallet } = req.query;

  if (!wallet) {
    return res.status(400).json({ error: "wallet query required" });
  }

  const data = await getIdentity(wallet);

  return res.status(200).json({ data });
}
