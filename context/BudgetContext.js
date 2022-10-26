import { createContext, useContext, useState } from "react";
import { v4 as uuidV4 } from 'uuid'

const BudgetContext = createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
    const context = useContext(BudgetContext)
    if(context === undefined)
        throw new Error("useBudgets must be used within a BudgetProvider") 
    return context
}
 
export const BudgetProvider = ({ children }) => {

    const [ budgets, setBudget ] = useState([])
    const [ expenses, setExpense ] = useState([])

    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    const addExpense = async ({ description, amount, budgetId }) => {
        try {            
            const res = await fetch(`/api/expenses`, {
                method: 'POST',
                body: JSON.stringify({ id: uuidV4(), description, amount, budgetId}),
                headers: { 'Content-Type': 'application/json' },
            });
            const newExpense = await res.json();
            setExpense(prevExpenses => {
                return [...prevExpenses, newExpense]
            })
        } catch (err) {
            console.error(err);
        }        
    }

    const addBudget = async ({ name, max, budgetColor }) => {
        try {
            const res = await fetch(`/api/budgets`, {
                method: 'POST',
                body: JSON.stringify({ _id: uuidV4(), name, max, budgetColor}),
                headers: { 'Content-Type': 'application/json' },
            });
            const newBudget = await res.json();
            setBudget(prevBudgets => {
                if(prevBudgets.find(budget => budget.name === name)){
                    return prevBudgets
                }
                return [...prevBudgets, newBudget]
            })
        } catch (err) {
            console.error(err);
        }
    };

    function deleteExpense({ id }){
        setExpense(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    function deleteAllExpensesByBudgetId({ budgetId }){
        setExpense(prevExpenses => {
            return prevExpenses.filter(expense => expense.budgetId !== budgetId)
        })
    }

    function deleteBudget({ _id }){
        setBudget(prevBudgets => {
            return prevBudgets.filter(budget => budget._id !== _id)
        })
    }


    return <BudgetContext.Provider value={{
        budgets,
        expenses,
        setBudget,
        setExpense,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteExpense,
        deleteBudget
    }}>
    {children}</BudgetContext.Provider>
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

// const updateTodo = async (updatedTodo) => {
//     try {
//         await fetch('/api/updateTodo', {
//             method: 'PUT',
//             body: JSON.stringify(updatedTodo),
//             headers: {
//                 'content-type': 'application/json',
//             },
//         });

//         setTodos((prevTodos) => {
//             const existingTodos = [...prevTodos];
//             const existingTodo = existingTodos.find(
//                 (todo) => todo.id === updatedTodo.id
//             );
//             existingTodo.fields = updatedTodo.fields;
//             return existingTodos;
//         });
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