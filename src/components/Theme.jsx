import React from 'react';
import { ChakraProvider, extendTheme, useColorMode, Button, Box } from '@chakra-ui/react';
const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f7ff',100: '#bae7ff',900: '#003a8c',
    },
  },
  fonts: {
    body: 'Helvetica, sans-serif',heading: 'Arial, sans-serif',
  },
  space: {
    sm: '8px',md: '16px',lg: '24px',xl: '32px',
  },
});
const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <ChakraProvider theme={theme}>
      <Box p="4">
        <Button colorScheme="brand">Primary Button</Button>
        <Button colorScheme="brand" variant="outline" ml="2">
          Secondary Button
        </Button>
        <Button onClick={toggleColorMode} ml="2">
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </Box>
    </ChakraProvider>
  );
};
export default App;
