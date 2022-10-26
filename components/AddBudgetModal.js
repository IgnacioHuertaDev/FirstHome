import { useState } from "react";
import { Modal, Box, TextInput, NumberInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useBudgets } from '../context/BudgetContext';
import useTranslation from 'next-translate/useTranslation'
import ColorPicker from  '../components/ColorPicker'

const AddBudgetModal = ({ show, handleClose }) => {

    const { addBudget } = useBudgets()
    const { t } = useTranslation('common')

    const [primaryColor, setPrimaryColor] = useState('blue');

    const handleSubmit = (values) => {
        addBudget(
        {
            name: values.name,
            max: parseFloat(values.maxSpending),
            budgetColor: values.budgetColor
        })
        handleClose()
    }

    const form = useForm({
      initialValues: { name: '', maxSpending: 0, budgetColor: '#25262b' },
      validate: (values) => ({
        name: values.name.length < 3 ? t("NAME_ERROR") : null,
        maxSpending:
          values.maxSpending === undefined
            ? t("MAXIMUN_SPENDING_REQUIRED")
            : values.maxSpending <= 0
            ? t("MAXIMUN_SPENDING_ERROR")
            : null,
      }),
    });
    
    return ( 
      <Modal
        title={`${t("NEW_M")} ${t("BUDGET")}`}
        opened={show}
        onClose={handleClose}
        centered
        closeButtonLabel="Close add budget modal"
        size="sm"
      >
        <Box sx={{ maxWidth: 340 }} mx="auto">
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput label={t("NAME_LABEL")} placeholder={t("NAME_LABEL")} {...form.getInputProps('name')} />
                <NumberInput mt="sm" min={0} label={t("MAXIMUN_SPENDING_LABEL")} placeholder={t("MAXIMUN_SPENDING_LABEL")} {...form.getInputProps('maxSpending')} />
                <ColorPicker mt="sm" mb="sm" defaultValue="#25262b" label={t("BUDGET_COLOR_LABEL")} placeholder={t("BUDGET_COLOR_PLACEHOLDER")} {...form.getInputProps('budgetColor')}/>
                <Group position="right" mt="md">
                  <Button color="red" onClick={handleClose}>
                    {t("CLOSE")}
                  </Button>
                  <Button type="submit">
                    {t("ADD")}
                  </Button>
                </Group>
              </form>
            </Box>
      </Modal>
     );
}
 
export default AddBudgetModal;

{/* <Input
            clearable
            bordered
            required
            ref={maxRef}
            min={0}
            step={0.01}
            size="lg"
            labelPlaceholder={t("MAXIMUN_SPENDING_LABEL")}
            helperText="Please enter a maximun value greater than 0"
            // helperColor={nameHelper.color}
            type="number"
            // contentLeft={<Password />}
          /> */}

 //const nameHelper = useMemo(() => {
    //     if (!nameValue)
    //       return {
    //         text: "",
    //         color: "",
    //       };
    //     const isValid = false;

    //     return {
    //       text: isValid ? "correcto" : "Please enter a name",
    //       color: isValid ? "success" : "error",
    //     };
    //   }, [nameValue]);
    // const { value, reset, bindings } = useInput("");
    // const helper = useMemo(() => {
    //     if (!value)
    //     return {
    //         text: "",
    //         color: "",
    //     };
    //     const isValid = value.length === 0;
    //     return {
    //     text: isValid ? "Correct email" : "Enter a valid email",
    //     color: isValid ? "success" : "error",
    //     };
    // }, [value]);        