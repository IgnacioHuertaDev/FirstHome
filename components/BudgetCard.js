
import { createStyles, ThemeIcon, Progress, Text, Group, Badge, Paper, Button } from '@mantine/core';
import { currencyFormatter } from "utils/currencyFormatter"
import useTranslation from 'next-translate/useTranslation'
import { Affiliate } from 'tabler-icons-react';

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
    card: {
        position: 'relative',
        overflow: 'visible',
        padding: theme.spacing.xl,
        paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
    },

    icon: {
        position: 'absolute',
        top: -ICON_SIZE / 3,
        left: `calc(50% - ${ICON_SIZE / 2}px)`,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
    },
}));

const BudgetCard = ({name, amount, max, hideButtons, budgetColor, onAddExpenseClick, onViewExpenseClick}) => {

    const {t} = useTranslation('common')

    const getProgressBarColor = (amount, max) => {
        const ratio = amount / max

        if(ratio < 0.5) return "teal"
        if(ratio < 0.75) return "yellow"
        return "red"
    }

    const getProgressBarValue = (amount, max) => ((amount / max) * 100).toFixed(0)

    const { classes } = useStyles();

    return ( 
        <Paper radius="md" withBorder className={classes.card} mt={ICON_SIZE / 3}>
        <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE} style={{ backgroundColor: budgetColor }}>
            <Affiliate size={34} />
        </ThemeIcon>

        <Text transform="uppercase" align="center" weight={700} className={classes.title}>
            {name}
        </Text>
        <Text color="dimmed" align="center" size="md">
            {currencyFormatter.format(amount)} / {max && currencyFormatter.format(max)}
        </Text>
        {max &&
            <>
                <Group position="apart" mt="xs">
                    <Text size="sm" color="dimmed">
                        {t("PROGRESS")}
                    </Text>
                    <Text size="sm" color="dimmed">
                        {getProgressBarValue(amount, max)}%
                    </Text>
                </Group>
                
                <Progress color={getProgressBarColor(amount, max)} value={getProgressBarValue(amount, max)} mt={5} />
            </>
        }
        <Group position="apart" mt="md">
            {!hideButtons &&
                <>
                    <Button color="teal" onClick={onAddExpenseClick}>{t("ADD_EXPENSE")}</Button> 
                    <Button color="indigo" onClick={onViewExpenseClick}>{t("VIEW_EXPENSE")}</Button>
                </>
            }
        </Group>
        </Paper>
     );
}
 
export default BudgetCard;