import Expense from './expense'

type Budget = {
    _id: string,
    name: string,
    max: number,
    budgetColor: string,
    expenses: Array<Expense>
}

export default Budget