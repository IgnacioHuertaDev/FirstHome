import { Button, Card, Progress, Text } from "@nextui-org/react";
import { currencyFormatter } from "../utils/currencyFormatter"

const BudgetCard = ({name, amount, max, borderColor, hideButtons, onAddExpenseClick, onViewExpenseClick}) => {

    const getProgressBarStatus = (amount, max) => {
        const ratio = amount / max

        if(ratio < 0.5) return "primary"
        if(ratio < 0.75) return "warning"
        return "error"
    }

    return ( 
        <Card css={{borderColor: borderColor}} bordered hoverable>
            <Card.Header css={{display: "flex", justifyContent: "space-between"}}>
                    <Text h4 css={{textTransform: "capitalize"}}>{name}</Text>
                    <Text>{currencyFormatter.format(amount)} / <Text span size={14} css={{color: "#777"}}>{max && currencyFormatter.format(max)}</Text></Text>
            </Card.Header>
            <Card.Body>
            {max &&
                <Progress 
                    value={amount} 
                    max={max} 
                    color={getProgressBarStatus(amount, max)}
                    status={getProgressBarStatus(amount, max)}
                    />
            }
            </Card.Body>
            <Card.Footer css={{display: "flex", justifyContent: "flex-end"}}>
            {!hideButtons && 
                <>
                    <Button css={{ marginRight: "1rem" }}  bordered color="secondary" auto onClick={onAddExpenseClick}>Add Expense</Button> 
                    <Button  bordered color="warning" auto onClick={onViewExpenseClick}>View Expense</Button>
                </>
            }
            </Card.Footer>
        </Card>
     );
}
 
export default BudgetCard;