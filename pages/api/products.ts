import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "lib/mongodb";
import Products from 'models/products'

export default async (req: NextApiRequest, res: NextApiResponse<Products>) => {
   try {
       const client = await clientPromise;
       const db = client.db("first_home");

       const products = await db
           .collection("products")
           .find({})
           .toArray();

       res.json(products);
   } catch (e) {
       console.error(e);
   }
};