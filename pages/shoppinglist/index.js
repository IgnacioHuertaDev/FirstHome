import { useState, useEffect } from 'react'
import { Container, Title, Button, Group } from '@mantine/core';
import ShoppingListCard from 'components/shoppingList/ShoppingListCard'
import AddBudgetModal from 'components/AddBudgetModal';
import AddExpenseModal from 'components/AddExpenseModal';
import ViewExpensesModal from 'components/ViewExpensesModal'
import { useShoppingList } from 'context/ShoppingListContext'
import useTranslation from 'next-translate/useTranslation'
import clientPromise from "lib/mongodb";

export default function ShoppingLists({ shoppingListsFromDb }) {

  const {t} = useTranslation('shopping')

  // const [ showAddBudget, handleShowAddBudget ] = useState(false)
  // const [ showAddExpense, handleShowAddExpense ] = useState(false)
  // const [ addExpenseModalBudgetId, handleAddExpenseModalBudgetId ] = useState()
  // const [ viewExpensesModalBudgetId, handleViewExpensesModalBudgetId ] = useState()

  const { shoppingLists, setShoppingList } = useShoppingList()

  // const openAddExpenseModal = (budgetId) => {
  //   handleShowAddExpense(true)
  //   handleAddExpenseModalBudgetId(budgetId)
  // } 

  useEffect(() => {
    setShoppingList(shoppingListsFromDb)
  },[shoppingLists]);

  return (
    <>
      <Container fluid mb={20}>
        <Group direction='column' position='left'>
          <Title order={1}>
              {t("SHOPPING_LIST")} 
          </Title>
        <Group position="left">
          <Button style={{ marginRight: "1rem" }} color="primary" onClick={() => handleShowAddBudget(true)}>{t("ADD_SHOPPING_LIST")}</Button>          
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
            //List of Shopping Lists
            shoppingLists.map((shoppingList) => {

              const amount = shoppingList.products.reduce((total, product) => total + product.price, 0)
              
              return (
                <ShoppingListCard
                  key={shoppingList._id}
                  shoppingListId={shoppingList._id}
                  name={shoppingList.description}
                  date={shoppingList.date}
                  amount={amount}
                  diff={30}
                />
              )
            })
          }
        </div>
      </Container>
      {/* <AddBudgetModal 
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
      /> */}
    </>
  )
}

export async function getServerSideProps() {
  try {
      const client = await clientPromise;
      const db = client.db("first_home");

      const shoppingLists = await db
        .collection("shoppingLists")
        .find({})
        .toArray();

      return {
          props: { shoppingListsFromDb: JSON.parse(JSON.stringify(shoppingLists)) },
      };
  } catch (e) {
      console.error(e);
  }
}