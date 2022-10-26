import { Modal, Text, Button, SimpleGrid , Card, Box, ActionIcon, Tooltip } from '@mantine/core';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../context/BudgetContext';
import useTranslation from 'next-translate/useTranslation'
import { currencyFormatter } from "../utils/currencyFormatter";
// import { Delete } from '@radix-ui/react-icons'
import { Trash } from 'tabler-icons-react';

const ViewExpensesModal = ({ budgetId, handleClose }) => {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()
    const {t} = useTranslation('common')

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId 
                            ? { _id: UNCATEGORIZED_BUDGET_ID, name: "Uncategorized" } 
                            : budgets.find(b => b._id === budgetId)

    const expenses = getBudgetExpenses(budgetId)

    const deleteBudgetConfirmModal = () => {
        alert("Delete Budget in coming")
    }

    return (
        <Modal
        title={`${t("EXPENSES")} ${budget?.name}`}
        opened={budgetId != null}
        onClose={handleClose}
        centered
        closeButtonLabel="Close add budget modal"
        size="sm"
        overflow="inside"
      >
        <SimpleGrid cols={1}>
            {expenses.map(expense => (
                <Box key={expense._id} xs={12}>
                    <Card>
                        <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text FontWeight={700} size={16} transform="capitalize">{expense.description}</Text>
                            <div  style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text FontWeight={700} size={16}>{currencyFormatter.format(expense.amount)}</Text>
                                <Tooltip label={`${t("DELETE")} ${t("EXPENSE")}`} withArrow placement="end">
                                    <ActionIcon ml="lg" color="red" variant="filled"><Trash size={16}/></ActionIcon>
                                </Tooltip>     
                            </div>
                        </Box>
                    </Card>
                </Box>
            ))}            
        </SimpleGrid>
        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
            <Button mt="lg" color="red" onClick={deleteBudgetConfirmModal}>
                {t("DELETE")}&nbsp;{t("BUDGET")}
            </Button>
        )}
      </Modal>
     );
}
 
export default ViewExpensesModal;