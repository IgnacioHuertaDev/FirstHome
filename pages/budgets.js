import { useState, useEffect } from 'react'
import { Container, Title, Button, Group } from '@mantine/core';
import BudgetCard from 'components/BudgetCard'
import AddBudgetModal from 'components/AddBudgetModal';
import AddExpenseModal from 'components/AddExpenseModal';
import ViewExpensesModal from 'components/ViewExpensesModal'
import UncategorizedBudgetCard from 'components/UncategorizedBudgetCard'
import TotalBudgetCard from 'components/TotalBudgetCard'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from 'context/BudgetContext'
import useTranslation from 'next-translate/useTranslation'

export default function Budgets({ budgetsFromDb }) {

  const {t} = useTranslation('common')

  const [ showAddBudget, handleShowAddBudget ] = useState(false)
  const [ showAddExpense, handleShowAddExpense ] = useState(false)
  const [ addExpenseModalBudgetId, handleAddExpenseModalBudgetId ] = useState()
  const [ viewExpensesModalBudgetId, handleViewExpensesModalBudgetId ] = useState()

  const { budgets, expenses, setBudget, setExpense, getBudgetExpenses } = useBudgets()

  const openAddExpenseModal = (budgetId) => {
    handleShowAddExpense(true)
    handleAddExpenseModalBudgetId(budgetId)
  } 
  useEffect(() => {
    setBudget(budgetsFromDb)
    budgetsFromDb.map(budget => (
      setExpense(prevExpenses => {
        return [...prevExpenses, budget.expenses]
      })
    ))
  },[budgets]);

  return (
    <>
      <Container fluid mb={20}>
        <Group direction='column' position='left'>
          <Title order={1}>
              {t("BUDGET")} 
          </Title>
        <Group position="left">
          <Button style={{ marginRight: "1rem" }} color="primary" onClick={() => handleShowAddBudget(true)}>{t("ADD_BUDGET")}</Button>
          <Button color="grape" onClick={openAddExpenseModal}>{t("ADD_EXPENSE")}</Button>             
        </Group>                  

        </Group>
      
      </Container>
      <Container fluid>
      <div 
        style={{ 
          display:"grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start"
          }}
      >        
        {
          //List of Budgets
          budgets.map(budget => {
            const amount = getBudgetExpenses(budget._id).reduce((total, expense) => total + expense.amount, 0)

            return (
              <BudgetCard
                key={budget._id}
                name={budget.name} 
                amount={amount} 
                max={budget.max} 
                budgetColor={budget.budgetColor}
                onAddExpenseClick={() => openAddExpenseModal(budget._id)}
                onViewExpenseClick={() => handleViewExpensesModalBudgetId(budget._id)}
              />
            )
          })
        }
        <UncategorizedBudgetCard 
          onAddExpenseClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)} 
          onViewExpenseClick={() => handleViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
        />
        <TotalBudgetCard />
      </div>
    </Container>
      <AddBudgetModal 
        show={showAddBudget} 
        handleClose={() => handleShowAddBudget(false)}         
      />
      <AddExpenseModal 
        show={showAddExpense} 
        handleClose={() => handleShowAddExpense(false)} 
        defaultBudgetId={addExpenseModalBudgetId}
      />
      <ViewExpensesModal 
        budgetId={viewExpensesModalBudgetId} 
        handleClose={() => handleViewExpensesModalBudgetId()}         
      />
    </>
  )
}

//This gets called on every request
export async function getServerSideProps() {
  // Get all budgets
  const budgetsRes = await fetch(`/api/budgets`)
  const budgetsFromDb = await budgetsRes.json()

  // Pass data to the page via props
  return { props: { budgetsFromDb } }
}
