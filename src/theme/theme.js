import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3056d3',   
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f4b400',     
      contrastText: '#1e1e1e',
    },
    error: {
      main: '#d32f2f',    
    },
    background: {
      default: '#f3f3f3',  
      paper: '#ffffff',  
    },
    text: {
      primary: '#1e1e1e',  
      secondary: '#6c757d', 
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
        },
      },
    },
  },
})

export default theme
