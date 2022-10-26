import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "lib/mongodb";
import Expenses from 'models/expenses'

export default async (req: NextApiRequest, res: NextApiResponse<Expenses>) => {
   try {
       const client = await clientPromise;
       const db = client.db("first_home");

       const expenses = await db
           .collection("expenses")
           .find({})
           .toArray();

       res.json(expenses);
   } catch (e) {
       console.error(e);
   }
};