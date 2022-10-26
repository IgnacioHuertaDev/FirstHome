import { useBudgets } from "../context/BudgetContext";
import BudgetCard from "./BudgetCard";

const TotalBudgetCard = (props) => {

    const { budgets } = useBudgets();

    const amount = budgets?.map((budget) => (budget.expenses?.reduce((total, expense) => total + expense.amount, 0)))
    const max = budgets?.reduce((total, budget) => total + budget.max, 0)

    return ( 
        <BudgetCard amount={amount} name="Total" borderColor={"$cyan900"} max={max} hideButtons/>
     );
}
 
export default TotalBudgetCard;