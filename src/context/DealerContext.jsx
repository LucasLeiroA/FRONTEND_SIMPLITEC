import { createContext, useContext, useEffect, useState } from 'react'

const DealerContext = createContext()

export const DealerProvider = ({ children }) => {
    const [selectedDealer, setSelectedDealer] = useState(null)

    useEffect(() => {
        const stored = localStorage.getItem('selectedDealer')
        if (stored) {
            setSelectedDealer(JSON.parse(stored))
        }
    }, [])

    const updateDealer = (dealer) => {
        setSelectedDealer(dealer)
        localStorage.setItem('selectedDealer', JSON.stringify(dealer))
    }

    return (
        <DealerContext.Provider value={{ selectedDealer, setSelectedDealer: updateDealer }}>
            {children}
        </DealerContext.Provider>
    )
}

export const useDealer = () => useContext(DealerContext)
