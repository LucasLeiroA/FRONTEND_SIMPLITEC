import {
    Box,
    Typography,
    TextField,
    Slider,
    Divider,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'
import { useEffect, useState } from 'react'

const bodyTypes = ['Sedán', 'SUV', 'Hatchback', 'Pick-up', 'Furgón']
const fuelTypes = ['Nafta', 'Diesel', 'Eléctrico', 'Híbrido']
const transmissions = ['Manual', 'Automática']

const initialState = {
    fuelType: '',
    transmission: '',
    bodyType: '',
    doors: '',
    yearMin: '',
    yearMax: '',
    priceMin: 1000000,
    priceMax: 5000000,
}

const FilterSidebar = ({ onChange }) => {
    const [filters, setFilters] = useState(initialState)

    useEffect(() => {
        onChange(filters)
    }, [filters])

    const handleChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const handleClear = () => setFilters(initialState)

    return (
        <Box
            sx={{
                width: { xs: '100%', sm: 300 },
                bgcolor: 'white',
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
                flexShrink: 0,
            }}
        >
            <Typography variant="h6" fontWeight="bold" mb={2}>Filtrar por</Typography>

            {/* Carrocería */}
            <Box mb={2}>
                <Typography variant="subtitle2" fontWeight="bold">Carrocería</Typography>
                <RadioGroup
                    value={filters.bodyType}
                    onChange={(e) => handleChange('bodyType', e.target.value)}
                >
                    {bodyTypes.map((b) => (
                        <FormControlLabel key={b} value={b} control={<Radio />} label={b} />
                    ))}
                </RadioGroup>
            </Box>

            {/* Combustible */}
            <Box mb={2}>
                <Typography variant="subtitle2" fontWeight="bold">Combustible</Typography>
                <RadioGroup
                    value={filters.fuelType}
                    onChange={(e) => handleChange('fuelType', e.target.value)}
                >
                    {fuelTypes.map((f) => (
                        <FormControlLabel key={f} value={f} control={<Radio />} label={f} />
                    ))}
                </RadioGroup>
            </Box>

            {/* Transmisión */}
            <Box mb={2}>
                <Typography variant="subtitle2" fontWeight="bold">Transmisión</Typography>
                <RadioGroup
                    value={filters.transmission}
                    onChange={(e) => handleChange('transmission', e.target.value)}
                >
                    {transmissions.map((t) => (
                        <FormControlLabel key={t} value={t} control={<Radio />} label={t} />
                    ))}
                </RadioGroup>
            </Box>

            {/* Puertas */}
            <Box mb={2}>
                <Typography variant="subtitle2" fontWeight="bold">Puertas</Typography>
                <TextField
                    fullWidth
                    size="small"
                    type="number"
                    value={filters.doors}
                    onChange={(e) => handleChange('doors', e.target.value)}
                />
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Año */}
            <Box mb={2}>
                <Typography variant="subtitle2" fontWeight="bold">Año</Typography>
                <Box display="flex" gap={1}>
                    <TextField
                        fullWidth size="small" type="number" placeholder="Desde"
                        value={filters.yearMin}
                        onChange={(e) => handleChange('yearMin', e.target.value)}
                    />
                    <TextField
                        fullWidth size="small" type="number" placeholder="Hasta"
                        value={filters.yearMax}
                        onChange={(e) => handleChange('yearMax', e.target.value)}
                    />
                </Box>
            </Box>

            {/* Precio */}
            <Box mb={2}>
                <Typography variant="subtitle2" fontWeight="bold">Precio ($)</Typography>
                <Slider
                    value={[filters.priceMin, filters.priceMax]}
                    onChange={(e, newVal) =>
                        setFilters({ ...filters, priceMin: newVal[0], priceMax: newVal[1] })
                    }
                    min={0}
                    max={10000000}
                    step={50000}
                    valueLabelDisplay="auto"
                    sx={{ mt: 2 }}
                />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Button variant="outlined" fullWidth onClick={handleClear}>
                Limpiar filtros
            </Button>
        </Box>
    )
}

export default FilterSidebar
