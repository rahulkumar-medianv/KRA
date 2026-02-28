import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)


/*
document.getElementById("root")
- React injects app inside it.
- React replaces normal HTML rendering.

App.tsx - Root Component (main UI container)

Function -> JSX -> Screen
JSX vs TSX
- javascript + HTMl ----- <h1>Hello</h1>

TSX -- TypeScript + JSX 
const name: string = "Rahul";
<h1>{name}</h1>



*/
