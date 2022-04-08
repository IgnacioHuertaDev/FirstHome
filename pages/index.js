import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme, Container, Card, Row, Text, Button, Col, Spacer } from '@nextui-org/react'
import BudgetCard from '../components/BudgetCard'
import AddBudgetModal from '../components/AddBudgetModal';
import AddExpenseModal from '../components/AddExpenseModal';
import ViewExpensesModal from '../components/ViewExpensesModal'
import UncategorizedBudgetCard from '../components/UncategorizedBudgetCard'
import TotalBudgetCard from '../components/TotalBudgetCard'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../context/BudgetContext'

export default function Home({ budgetsFromDb, expensesFromDb }) {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  const [ showAddBudget, handleShowAddBudget ] = useState(false);
  const [ showAddExpense, handleShowAddExpense ] = useState(false);
  const [ addExpenseModalBudgetId, handleAddExpenseModalBudgetId ] = useState();
  const [ viewExpensesModalBudgetId, handleViewExpensesModalBudgetId ] = useState();

  const { budgets, setBudget, setExpense, getBudgetExpenses } = useBudgets();

  const openAddExpenseModal = budgetId => {
    handleShowAddExpense(true)
    handleAddExpenseModalBudgetId(budgetId)
  } 
  
  useEffect(() => {
    setBudget(budgetsFromDb);
    setExpense(expensesFromDb);
  }, []);

  return (
    <>
     <Container fluid>
     <Text size={18} css={{ m: 0 }}>The current theme is: {type}</Text>
      <Switch
        checked={isDark}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      />
     </Container>
      <Container fluid>
      <Row 
        css={{ 
              '@xsMax': {
                flexDirection: 'column',
                justifyContent: 'flex-start'
              },
            }} 
        justify="space-between" 
        align="center">
        <Col>
          <Text h1 css={{ m: 0 }}>
            Budget   
          </Text>
        </Col>
        <Col>      
          <Row
            css={{ 
                '@xsMax': {
                  justifyContent: 'flex-start',
                  marginTop: "0.5rem",
                  marginBottom: "1.5rem"
                },
              }}  
              justify="flex-end" 
          >
            <Button css={{ marginRight: "1rem" }} shadow color="primary" auto onClick={() => handleShowAddBudget(true)}>Add Budget</Button>
            <Button shadow bordered color="secondary" auto onClick={openAddExpenseModal}>Add Expense</Button>             
          </Row>                  
        </Col>
      </Row>
      <Card color="success">
      </Card>
      <Spacer/>
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
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)

            return (
              <BudgetCard
                key={budget.id}
                name={budget.name} 
                amount={amount} 
                max={budget.max} 
                borderColor={"$green600"}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() => handleViewExpensesModalBudgetId(budget.id)}
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
  const budgetsRes = await fetch(`https://first-home-app.herokuapp.com/budgets`)
  const budgetsFromDb = await budgetsRes.json()

  // Get all expenses
  const expensesRes = await fetch(`https://first-home-app.herokuapp.com/expenses`)
  const expensesFromDb = await expensesRes.json()

  // Pass data to the page via props
  return { props: { budgetsFromDb, expensesFromDb } }
}