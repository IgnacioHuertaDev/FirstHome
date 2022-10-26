import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "lib/mongodb";
import ShoppingList from 'models/shoppingList'

export default async (req: NextApiRequest, res: NextApiResponse<ShoppingList>) => {
   try {
       const client = await clientPromise;
       const db = client.db("first_home");

       const shoppingLists = await db
           .collection("shoppingLists")
           .find({})
           .toArray();

       res.json(shoppingLists);
   } catch (e) {
       console.error(e);
   }
};