import Products from './products'

type ShoppingLists = {
    _id: string,
    description: string,
    date: Date,
    closed: boolean,
    userGroupId: number,
    products: Array<Products>
}

export default ShoppingLists