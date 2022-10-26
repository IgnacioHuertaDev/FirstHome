import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "lib/mongodb";
import ShoppingList from 'models/shoppingList'
import { ObjectId } from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse<ShoppingList>) => {
   try {
        const client = await clientPromise;
        const db = client.db("first_home");
        
        const { method, body, query: { id } } = req

        switch(method) {
            case 'GET':
                const shoppingList = await db
                .collection("shoppingLists")
                .findOne({_id : new ObjectId(id)});

                if(!shoppingList) 
                    return res.status(404)

                return res.status(200).json(shoppingList)
            case 'PUT':
            case 'PUT':
            default:
                return res.status(400)   
        }
   } catch (e) {
       console.error(e);
   }
};