import { createContext, useContext, useState } from "react";
import { v4 as uuidV4 } from 'uuid'

const ShoppingListContext = createContext();

export function useShoppingList() {
    const context = useContext(ShoppingListContext)
    if(context === undefined)
        throw new Error("useTranslation must be used within a ShoppingListProvider") 
    return context
}
 
export const ShoppingListProvider = ({ children }) => {

    const [ shoppingLists, setShoppingList ] = useState([])
    const [ products, setProduct ] = useState([])


    function getShoppingListProducts(shoppingListId){
        return products.filter(product => product.shoppingListId === shoppingListId)
    }

    const getShoppingListProductsByBD = async ({ shoppingListId }) => {
        try {            
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/shoppingListId=${shoppingListId}`);
            const products = await res.json()

            return products;

        } catch (err) {
            console.error(err);
        } 
    }

    const getShoppingListById = async ({ _id }) => {
        try {            
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shoppingLists/${_id}`);
            const shoppingList = await res.json()
            
            return shoppingList;

        } catch (err) {
            console.error(err);
        }        
    }

    const addShoppingList = async ({ description, date }) => {
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

    const addProduct = async ({ description, amount, price, shoppingListId }) => {
        try {            
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
                method: 'POST',
                body: JSON.stringify({ _id: uuidV4(), description, amount, price, shoppingListId}),
                headers: { 'Content-Type': 'application/json' },
            });
            const newProduct = await res.json();
            setProduct(prevProducts => {
                return [...prevProducts, newProduct]
            })
        } catch (err) {
            console.error(err);
        }        
    }

    const updateShoppingList = async (updatedShoppingList) => {
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

                existingShoppingList.description = updatedShoppingList.description
                existingShoppingList.date = updatedShoppingList.date
                existingShoppingList.closed = updatedShoppingList.closed

                return existingShoppingLists;
            });
        } catch (err) {
            console.error(err);
        }
    };

    function deleteShoppingList({ _id }){
        setShoppingList(prevShoppingLists => {
            return prevShoppingLists.filter(shoppingList => shoppingList._id !== _id)
        })
    }

    function deleteProduct({ _id }){
        setProduct(prevProducts => {
            return prevProducts.filter(product => product._id !== _id)
        })
    }

    return <ShoppingListContext.Provider value={{
        shoppingLists,
        products,
        getShoppingListProducts,
        getShoppingListProductsByBD,
        getShoppingListById,
        setShoppingList,
        setProduct,
        addShoppingList,
        addProduct,
        updateShoppingList,
        deleteShoppingList,
        deleteProduct
    }}>
    {children}</ShoppingListContext.Provider>
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