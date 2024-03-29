import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "lib/mongodb";
import Budget from 'models/budget'

export default async (req: NextApiRequest, res: NextApiResponse<Budget>) => {
   try {
       const client = await clientPromise;
       const db = client.db("first_home");

       const budgets = await db
           .collection("budgets")
           .find({})
           .toArray();

       res.json(budgets);
   } catch (e) {
       console.error(e);
   }
};