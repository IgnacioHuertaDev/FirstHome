import Expenses from './expenses'

type Budgets = {
    _id: string,
    name: string,
    max: number,
    budgetColor: string,
    expenses: Array<Expenses>
}

export default Budgets