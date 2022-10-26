import { Modal, Text, Button, TextInput, NumberInput, Select, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../context/BudgetContext';
import useTranslation from 'next-translate/useTranslation'

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {

    const { addExpense, budgets } = useBudgets()
    const { t } = useTranslation('common')

    const handleSubmit = (values) => {
        addExpense(
        {
          description: values.description,
          amount: parseFloat(values.amount),
          budgetId: values.budgetId
        })
        handleClose()
    }

    const form = useForm({
      initialValues: { description: '', amount: 0, budgetId: '' },
      validate: (values) => ({
        description: values.description.length < 3 ? t("DESCRIPTION_ERROR") : null,
        amount:
          values.amount === undefined
            ? t("AMOUNT_REQUIRED")
            : values.amount <= 0
            ? t("AMOUNT_ERROR")
            : null,
      }),
    });
    
    const dataSelect = budgets.map(budget => (
      {
        label: budget.name,
        value: budget.id,
      }
    ))
    dataSelect.push({label: t("UNCATEGORIZED"), value: UNCATEGORIZED_BUDGET_ID})
    

    return ( 
      <Modal
        //css={{height: "475px"}} Cuando exista el dropdown dejar en 450px
        title={`${t("NEW_M")} ${t("EXPENSE")}`}
        opened={show}
        onClose={handleClose}
        centered
        closeButtonLabel="Close add expense modal"
        size="sm"
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput label={t("DESCRIPTION_LABEL")} placeholder={t("DESCRIPTION_LABEL")} {...form.getInputProps('description')} />
            <NumberInput min={0} mt="sm" label={t("AMOUNT_LABEL")} placeholder={t("AMOUNT_LABEL")} {...form.getInputProps('amount')} />
            <Select
              label={t("BUDGET")}
              required
              placeholder={t("BUDGET")}
              searchable
              data={dataSelect}
              {...form.getInputProps('budgetId')}
            />
            <Group position="right" mt="md">
              <Button color="red" onClick={handleClose}>{t("CLOSE")}</Button>
              <Button type="submit">{t("ADD")} </Button>
            </Group>
        </form>          
      </Modal>
     );
}
 
export default AddExpenseModal;