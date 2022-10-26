import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Navbar, Tooltip, UnstyledButton, createStyles, Group, useMantineColorScheme } from '@mantine/core';
import {
  Home2,
  Gauge,
  DeviceDesktopAnalytics,
  ListDetails,
  CalendarStats,
  User,
  Settings,
  Logout,
  SwitchHorizontal,
  Sun,
  MoonStars,
  Language
} from 'tabler-icons-react'

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
    },
  },
}));

const mockdata = [
  { Icon: Home2, label: 'Home', page: '' },
  { Icon: DeviceDesktopAnalytics, label: 'Budgets', page: 'budgets' },
  { Icon: ListDetails, label: 'Shopping list', page: 'shoppinglist' },
  // { Icon: Gauge, label: 'Dashboard', page: '' },
  // { Icon: CalendarStats, label: 'Releases', page: '' },
  // { Icon: User, label: 'Account', page: '' },
  // { Icon: Settings, label: 'Settings', page: '' },
];

function NavbarLink({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles();
  return (
      <Tooltip label={label} position="right" withArrow transitionDuration={0}>
        <UnstyledButton component="a" onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
          <Icon />
        </UnstyledButton>
      </Tooltip>
  );
}

function NavbarButton({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles();
  return (
      <Tooltip label={label} position="right" withArrow transitionDuration={0}>
        <UnstyledButton component="a" onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
          <Icon />
        </UnstyledButton>
      </Tooltip>
  );
}


const NavbarMinimal = ({opened}) => {
  const [active, setActive] = useState(1);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  const router = useRouter()

  const changeLanguage = () => {
    router.locale == 'es' ?
      router.push(`${router.pathname}`, `${router.pathname}`, { locale: 'en' })
      : router.push(`${router.pathname}`, `${router.pathname}`, { locale: 'es' })
  }

  const links = mockdata.map((link, index) => {

    const {Icon, label, page} = link;

    return (
        <Link href={`/${page}`} key={index} passHref>
          <NavbarLink
            icon={Icon}
            label={label}
            key={label}
            active={index === active}
            onClick={() => setActive(index)}
          >
          </NavbarLink>
        </Link>
    )
});

  return (
    <Navbar hiddenBreakpoint="sm" hidden={!opened} height="100vh" width={{ base: 80 }} p="md">
      
      <Navbar.Section grow mt={0}>
        <Group direction="column" align="center" spacing={0}>
          {links}
        </Group>
      </Navbar.Section>
      <Navbar.Section mb={120}>
        <Group direction="column" align="center" spacing={0}>          
          <NavbarButton icon={colorScheme === 'dark' ? Sun : MoonStars} label="Change theme" onClick={() => toggleColorScheme()}/>
          <NavbarLink icon={SwitchHorizontal} label="Change account" page=""/>
          <NavbarButton icon={Language} label="Change language" onClick={() => changeLanguage()}/>
          <NavbarLink icon={Logout} label="Logout" page=""/>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}

export default NavbarMinimal;