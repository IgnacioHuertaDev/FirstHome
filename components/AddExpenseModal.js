import { useRef } from "react";
import { Modal, Text, Button, Input, Spacer, useInput } from "@nextui-org/react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetContext";

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()

    const { addExpense, budgets } = useBudgets()

    const handleSubmit = (e) => {
        e.preventDefault()
        addExpense(
        {
          description: descriptionRef.current.value,
          amount: parseFloat(amountRef.current.value),
          budgetId: budgetIdRef.current.value
        })
        handleClose()
    }
    
    const selectStyle = {
      height: "2.5rem", 
      borderRadius: "10px", 
      backgroundColor: "transparent",
      paddingLeft: "0.5rem",
      cursor: "pointer",
      border: '2px solid #444444',  
      color: '#fff',
    };
    

    return ( 
        <Modal
        closeButton
        aria-labelledby="modal-title"
        open={show}
        onClose={handleClose}
        css={{height: "475px"}} //Cuando exista el dropdown dejar en 450px
        autoMargin
      >
      <form onSubmit={handleSubmit}>

      </form>
        <Modal.Header>
          <Text id="modal-title" size={24}>
            New&nbsp;
            <Text b size={24}>
              Expense
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Spacer y={0} />
          <Input
            clearable
            bordered
            required
            ref={descriptionRef}
            size="lg"
            labelPlaceholder="Description"
            // helperColor={nameHelper.color}
            helperText="Please enter a description"
            type="text"
            // contentLeft={<Mail />}
          />
          <Spacer y={1} />
          <Input
            clearable
            bordered
            required
            ref={amountRef}
            min={0}
            step={0.01}
            size="lg"
            labelPlaceholder="Amount"
            helperText="Please enter a maximun value greater than 0"
            // helperColor={nameHelper.color}
            type="number"
            // contentLeft={<Password />}
          />
          <Spacer y={1} />
          <label>Budget</label>
          <select
            // required
            ref={budgetIdRef}
            style={selectStyle}
            defaultValue={defaultBudgetId}
          >
            <option 
              id={UNCATEGORIZED_BUDGET_ID} 
              style={{
                  color: "#FFF", 
                  backgroundColor: "#111111",
                  borderRadius: "50%",
                }}
              >
              Uncategorized
            </option>
            {budgets.map(budget => (
              <option 
                key={budget.id}
                value={budget.id}
                style={{
                  color: "#FFF", 
                  backgroundColor: "#111111",
                  borderRadius: "50%",
                  }} 
                >
                  {budget.name}
              </option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={handleClose}>
            Close
          </Button>
          <Button auto onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
     );
}
 
export default AddExpenseModal;