import {
    Header,
    Title,
    MediaQuery,
    Burger,
    useMantineTheme,
    Center,
    Group
  } from '@mantine/core';
import FirstHomeLogo from '../svg/FirstHomeLogo';



const HeaderMinimal = ({opened, setOpened}) => {

    const theme = useMantineTheme();

    return ( 
    <Header height={70} p="md">
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
                />
            </MediaQuery>
            <Group direction="row" align="center" ml={10} spacing={40}>   
                <FirstHomeLogo height="30" width="30" />
                <Title order={1}>FirstHome</Title>
            </Group>
        </div>
    </Header> 
);
}
 
export default HeaderMinimal;