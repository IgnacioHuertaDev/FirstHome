import { ColorInput, useMantineTheme } from '@mantine/core';

const ColorPicker = (props) => {
    
    const theme = useMantineTheme();
    const swatches = Object.keys(theme.colors).map((color) => (
        theme.colors[color][6]        
    ));

    return (  
        <ColorInput            
            disallowInput
            withPicker={false}
            swatches={swatches}
            swatchesPerRow={7}
            format="hex"
            {...props}
        />
    );
}
 
export default ColorPicker;