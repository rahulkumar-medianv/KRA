/*
main.tsx -- root entry
app.tsx -- main UI container


*/

/*
Props & Component Design
props -> Data Passed from one component to another

- Parent sends Data 
- Child receives and displays it

ex: InputField.tsx component
- Parent controls the value
- Parent receives changes
- input can be reused everywhere

step 1: Create Props Interface
interface InputFieldProps{
value: string;
onChange: (value: string) => void;
placeholder?: string
label?: string;
}

step 2: Create component

*/

/*

State -- Data that chnages over time and causes the UI to re-render.


useEffect -- LiftCycle 
- useEffect lets you run code when something happens in component lifecycle

cleanup function -- return () => {
    console.log("Cleanup")
    }


*/

/*

setup Tailwind css in ReactJS project
-------------------------------------------
1. npm install tailwindcss @tailwindcss/vite

2. add vite.config.ts
import tailwindcss from '@tailwindcss/vite'
plugins: [tailwindcss()]

3. import Tailwind css
@import "tailwindcss";

*/

/*

MUI ThemeProvider
- CreateTheme -- Defines your custom theme values.
- Themeprovier: Wraps your app so the theme applies globally.
- palette.primary.main: Sets the main primary color.
- typography: Changes font family and heading styles.
- specing: Controls the spacing scale (eg. theme,.specing(2) = 16px)


eg: light/dark mode toggle
- Global theme with light/dark mode toggle in MUI
### How it works: 
- Mode state: Tracks whether the theme is "light" or "dark".
- UseMemo: Recreates the theme only when mode changes (better performance).
- IconButton: Toggles between light and dark mode with icons.
- CssBaseLine: Ensures background and tet colors adapt automataclly.

*/

import React, { useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  CssBaseline,
  Typography,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function App() {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // light or dark
          primary: {
            main: "#1976d2",
          },
        },
        typography: {
          fontFamily: "'Poppins', sans-serif",
          h4: {
            fontWeight: 700,
          },
        },
        spacing: 8,
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ mt: 4 }}>
        <IconButton
          sx={{ mb: 2 }}
          color="inherit"
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>

        <Typography variant="h4" color="primary">
          Welcome to My Themed App
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Click Me
        </Button>
      </Container>
    </ThemeProvider>
  );
}
