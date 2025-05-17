
import { computed } from 'vue'
import { useProductsStore } from '../store/Products'

export default function useCurrency() {
  const store = useProductsStore()

  // Conversión segura USD → VES con validación
  const usdToVes = (usdAmount) => {
    try {
      const amount = parseFloat(usdAmount)
      if (isNaN(amount)) return '0.00'
      
      const rate = store.tasadecambio 
      return (amount * rate).toFixed(2)
    } catch (error) {
      console.error('Error en conversión USD→VES:', error)
      return '0.00'
    }
  }

  const formatCurrency = (amount, options = {}) => {
    const {
      currency = 'USD',
      locale = currency === 'VES' ? 'es-VE' : 'en-US',
      showSymbol = true
    } = options
    
    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount)) return 'Invalid amount'

    try {
      if (currency === 'VES') {
        const formatted = numericAmount.toLocaleString(locale, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
        return showSymbol ? `Bs. ${formatted}` : formatted
      }
      
      return numericAmount.toLocaleString(locale, {
        style: showSymbol ? 'currency' : 'decimal',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    } catch (error) {
      console.error('Error formateando moneda:', error)
      return numericAmount.toFixed(2)
    }
  }




  const formattedExchangeRate = computed(() => {
    return `1 USD = ${formatCurrency(store.tasadecambio, {
      currency: 'VES',
      showSymbol: false
    })} VES`
  })

  return {
    usdToVes,
    formatCurrency,
    exchangeRate: computed(() => store.tasadecambio || 36.5),
    formattedExchangeRate,
    isLoading: computed(() => store.loading),
    error: computed(() => store.error)
  }
}