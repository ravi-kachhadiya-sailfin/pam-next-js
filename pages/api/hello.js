// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetServerSideProps } from "next";

export default function handler(req, res) {
  console.log("req", req.headers.get("host"))
  res.status(200).json({ name: 'John Doe' })
}

export const GetServerSideProps = async context => ({ props: { host: context.req.headers.host || null } });

