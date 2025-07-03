import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'
import { DealerProvider } from './context/DealerContext'


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<DealerProvider>
				<AuthProvider>
					<ThemeProvider theme={theme}>
						<App />
					</ThemeProvider>
				</AuthProvider>
			</DealerProvider>
		</BrowserRouter>
	</React.StrictMode>
)
