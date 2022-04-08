import { Modal, Text, Button, Grid, Card, Spacer } from "@nextui-org/react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import { Delete } from 'react-iconly'

const ViewExpensesModal = ({ budgetId, handleClose }) => {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId 
                            ? { id: UNCATEGORIZED_BUDGET_ID, name: "Uncategorized" } 
                            : budgets.find(b => b.id === budgetId)

    const expenses = getBudgetExpenses(budgetId)

    const deleteBudgetConfirmModal = () => {
        alert("hola")
    }

    return ( 
        <Modal
        closeButton
        aria-labelledby="modal-title"
        open={budgetId != null}
        onClose={handleClose}
        css={{height: "475px"}} 
        autoMargin
      >
        <Modal.Header>
          <Text id="modal-title" size={24}>
            Expenses&nbsp;-&nbsp;
            <Text b size={24} css={{textTransform: "capitalize"}}>
              {budget?.name}
            </Text>
          </Text>          
        </Modal.Header>
        <Modal.Body>
        <Grid.Container gap={1}>
                {expenses.map(expense => (
                    <Grid key={expense.id} xs={12}>
                        <Card                              
                            hoverable 
                            bordered              
                        >
                            <Card.Body css={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text b size={16} css={{textTransform: "capitalize"}}>{expense.description}</Text>
                                <div  style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text b size={16}>{currencyFormatter.format(expense.amount)}</Text>   
                                    <Spacer />     
                                    <Button
                                        auto
                                        color="error"
                                        size="sm"
                                        icon={<Delete size={22} />}
                                    />                                                        
                                </div>
                            </Card.Body>
                        </Card>
                    </Grid>
                ))}
            </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                <Button auto bordered flat color="error" onClick={deleteBudgetConfirmModal}>
                    Delete Budget
                </Button>
            )}
        </Modal.Footer>
      </Modal>
     );
}
 
export default ViewExpensesModal;