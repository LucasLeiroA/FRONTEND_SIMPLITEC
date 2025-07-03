import { Button } from '@mui/material'
import { useAuth } from '../../../context/AuthContext'

const QuoteButton = ({ onClick }) => {
	const { role } = useAuth()
	const isDisabled = role === 'dealer' || role === 'admin'

	return (
		<Button
			variant="contained"
			color="primary"
			size="large"
			onClick={onClick}
			disabled={isDisabled}
			fullWidth
			sx={{ mt: 2 }}
		>
			Cotizar
		</Button>
	)
}

export default QuoteButton
