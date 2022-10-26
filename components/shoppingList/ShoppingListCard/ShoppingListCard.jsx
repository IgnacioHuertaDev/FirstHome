import { Button, createStyles, Group, Paper, Text, ThemeIcon, } from '@mantine/core';
import { currencyFormatter } from "utils/currencyFormatter"
import useTranslation from 'next-translate/useTranslation';
import { ArrowUpRight, ArrowDownRight } from 'tabler-icons-react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
    root: {
      padding: theme.spacing.xl * 1.5,
    },
  
    label: {
      fontFamily: `Poppins, ${theme.fontFamily}`,
    },
  }));

const ShoppingListCard = ({shoppingListId, name, amount, date, diff }) => {
    const { t } = useTranslation('shopping');

    const DiffIcon = diff > 0 ? ArrowUpRight : ArrowDownRight;

    const { classes } = useStyles();

    return (
      <Paper withBorder p="md" radius="md">
        <Group position="apart">
          <div>
            <Text
              color="dimmed"
              transform="uppercase"
              weight={700}
              size="xs"
              className={classes.label}
            >
              {name}
            </Text>
            <Text 
              color="dimmed"
              transform="uppercase"
              weight={700}
              size="xs">
              {date}
            </Text>
            <Text weight={700} size="xl">
              {currencyFormatter.format(amount)}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({ color: diff > 0 ? theme.colors.teal[6] : theme.colors.red[6] })}
            size={38}
            radius="md"
          >
            <DiffIcon size={28} />
          </ThemeIcon>
        </Group>
        <Group position="apart">
          <Link href={`/shoppinglist/${shoppingListId}`} passHref>
            <Button color="teal" component="a">Ver Lista</Button>
          </Link>
        </Group>
      </Paper>
     );
};

export default ShoppingListCard;
