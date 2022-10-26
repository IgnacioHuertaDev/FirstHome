import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react";
import useSWR from "swr"
import { v4 as uuidV4 } from 'uuid'
import { fetcher } from "lib/fetcher";
import ShoppingList from "models/shoppingList";
import Products from "models/product";

export type ShoppingListContextType = {
    shoppingLists: ShoppingList[];
    setShoppingList: Dispatch<SetStateAction<ShoppingList[]>>
    getShoppingList: (_id: string) => void
    addShoppingList: (description: string, date: Date) => void
    addProduct : (description: string, amount: number, price: number, shoppingListId: string) => void
    updateShoppingList : (updatedShoppingList : ShoppingList) => void;
    deleteShoppingList : (_id : string) => void;
    deleteProduct : (_id: string) => void;
  };

const ShoppingListContext = createContext<ShoppingListContextType | null>(null);

export function useShoppingList() {
    const context = useContext(ShoppingListContext)
    if(context === undefined)
        throw new Error("useTranslation must be used within a ShoppingListProvider") 
    return context
}
 
export const ShoppingListProvider : FC<ReactNode> = ({ children }) => {

    const [ shoppingLists, setShoppingList ] = useState<ShoppingList[]>([])



    const getShoppingList = async (_id : string) => {
        //const { data, error } = useSWR(`/api/shoppingLists/${_id}`, fetcher)
        const res = await fetch(`/api/shoppingLists/${_id}`)
        const data = await res.json()
        console.log("context data", data)
        const error = false
        return {
            data: data,
            isLoading: !error && !data,
            isError: error
        }      
    }

    const addShoppingList = async ( description: string, date: Date ) => {
        try {            
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shoppingLists`, {
                method: 'POST',
                body: JSON.stringify({ _id: uuidV4(), description, date}),
                headers: { 'Content-Type': 'application/json' },
            });
            const newShoppingList = await res.json();
            setShoppingList(prevShoppingLists => {
                return [...prevShoppingLists, newShoppingList]
            })
        } catch (err) {
            console.error(err);
        }        
    }

    const addProduct = async (description: string, amount: number, price: number, shoppingListId: string) => {
        try {            
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
                method: 'POST',
                body: JSON.stringify({ _id: uuidV4(), description, amount, price, shoppingListId}),
                headers: { 'Content-Type': 'application/json' },
            });
            const newProduct = await res.json();

            setShoppingList((prevShoppingLists) => {
                const existingShoppingLists = [...prevShoppingLists];
                const existingShoppingList = existingShoppingLists.find(
                    (shoppingList) => shoppingList._id === shoppingListId
                );
                
                if(existingShoppingList != null)
                    existingShoppingList.products.push(newProduct)

                return existingShoppingLists;
            });
        } catch (err) {
            console.error(err);
        }        
    }

    const updateShoppingList = async (updatedShoppingList : ShoppingList) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shoppingLists/${updatedShoppingList._id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedShoppingList),
                headers: {
                    'content-type': 'application/json',
                },
            });
    
            setShoppingList((prevShoppingLists) => {
                const existingShoppingLists = [...prevShoppingLists];
                const existingShoppingList = existingShoppingLists.find(
                    (shoppingList) => shoppingList._id === updatedShoppingList._id
                );

                if(existingShoppingList != null){
                    existingShoppingList.description = updatedShoppingList.description
                    existingShoppingList.date = updatedShoppingList.date
                    existingShoppingList.closed = updatedShoppingList.closed
                }

                return existingShoppingLists;
            });
        } catch (err) {
            console.error(err);
        }
    };

    function deleteShoppingList(_id : string){
        setShoppingList(prevShoppingLists => {
            return prevShoppingLists.filter(shoppingList => shoppingList._id !== _id)
        })
    }

    function deleteProduct(_id : string){
        
    }

    return <ShoppingListContext.Provider value={{
            shoppingLists,
            setShoppingList,
            getShoppingList,        
            addShoppingList,
            addProduct,
            updateShoppingList,
            deleteShoppingList,
            deleteProduct
        }}>
            {children}
        </ShoppingListContext.Provider>
}


// const refreshTodos = async () => {
//     try {
//         const res = await fetch('/api/getTodos');
//         const latestTodos = await res.json();
//         setTodos(latestTodos);
//     } catch (err) {
//         console.error(err);
//     }
// };

// const deleteTodo = async (id) => {
//     try {
//         await fetch('/api/deleteTodo', {
//             method: 'Delete',
//             body: JSON.stringify({ id }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         setTodos((prevTodos) => {
//             return prevTodos.filter((todo) => todo.id !== id);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// };