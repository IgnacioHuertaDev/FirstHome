import { Button, Container, Group, Paper, Title, ThemeIcon, } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useShoppingList } from 'context/ShoppingListContext'
import ProductList from 'components/shoppingList/ProductList'
import { useEffect } from 'react'

const ShoppingListDetail = ({id}) => {

    const { t } = useTranslation('shopping')
    const router = useRouter()

    const { getShoppingListProducts } = useShoppingList()
    const products = getShoppingListProducts(id)

    return (
        <>
             <Container fluid mb={20}>
                <Group direction='column' position='left'>
                <Title order={1}>
                    {t("SHOPPING_LIST")} 
                </Title>
                <Group position="left">
                    <Button onClick={() => router.back()}>Volver</Button>
                    <Button style={{ marginRight: "1rem" }} color="primary" onClick={() => handleShowAddBudget(true)}>{t("ADD_SHOPPING_LIST")}</Button>          
                </Group>                  

                </Group>
            </Container>
            <Container fluid>
                <div 
                style={{ 
                    display:"grid", 
                    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
                    gap: "1rem",
                    alignItems: "flex-start"
                    }}
                >        
                {                        
                    <ProductList products={products} />
                }
                </div>
            </Container>
    </>      
     );
};

export const getServerSideProps = async (context) => {
    const { id } = context.query

    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?shoppingListId=${id}`);
    // const productsBD = await res.json()

    return { props: { id }}
}

export default ShoppingListDetail;
