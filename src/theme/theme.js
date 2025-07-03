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
		fontFamily: 'Montserrat, sans-serif',
		fontSize: 14,
		h1: { fontWeight: 700 },
		h2: { fontWeight: 600 },
		h6: { fontWeight: 600 },
		button: { fontWeight: 600 },
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: 8,
					fontWeight: 600,
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 12,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					fontSize: '0.75rem',
					backgroundColor: '#1e1e1e',
					color: '#ffffff',
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#ffffff',
					color: '#1e1e1e',
					boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
				},
			},
		},
	}

})

export default theme
