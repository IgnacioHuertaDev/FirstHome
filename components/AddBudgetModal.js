import { useRef } from "react";
import { Modal, Text, Button, Input, Spacer, useInput } from "@nextui-org/react";
import { useBudgets } from "../context/BudgetContext";

const AddBudgetModal = ({ show, handleClose }) => {
    const nameRef = useRef()
    const maxRef = useRef()

    const { addBudget } = useBudgets()

    const handleSubmit = (e) => {
        e.preventDefault()
        addBudget(
        {
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
        })
        handleClose()
    }

    // const { nameValue, nameReset, nameBindings } = useInput("");
    // const { maxSpendingValue, maxSpendingreset, maxSpendingBindings } = useInput("");

    // const nameHelper = useMemo(() => {
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
    
    return ( 
        <Modal
        closeButton
        aria-labelledby="modal-title"
        open={show}
        onClose={handleClose}
        css={{height: "350px"}}
        autoMargin
      >
        <Modal.Header>
          <Text id="modal-title" size={24}>
            New&nbsp;
            <Text b size={24}>
              Budget
            </Text>
          </Text>
        </Modal.Header>
        <form onSubmit={handleSubmit}>

        </form>
        <Modal.Body>
          <Spacer y={0} />
          <Input
            clearable
            bordered
            required
            ref={nameRef}
            size="lg"
            labelPlaceholder="Name"
            // helperColor={nameHelper.color}
            helperText="Please enter a name"
            type="text"
            // contentLeft={<Mail />}
          />
          <Spacer y={1} />
          <Input
            clearable
            bordered
            required
            ref={maxRef}
            min={0}
            step={0.01}
            size="lg"
            labelPlaceholder="Maximun spending"
            helperText="Please enter a maximun value greater than 0"
            // helperColor={nameHelper.color}
            type="number"
            // contentLeft={<Password />}
          />
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
 
export default AddBudgetModal;