import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetContext";
import BudgetCard from "./BudgetCard";
import useTranslation from 'next-translate/useTranslation'

const UncategorizedBudgetCard = (props) => {

    const { getBudgetExpenses } = useBudgets();
    const {t} = useTranslation('common')

    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0)

    if (amount === 0) return null

    return ( 
        <BudgetCard amount={amount} name={t("UNCATEGORIZED")} budgetColor="gray" {...props} />
     );
}
 
export default UncategorizedBudgetCard;