import React from 'react'

const ThemeContext = React.createContext({})

export function ThemeProvider({ children }) {
	const getInitialTheme = () => {
		const stored = localStorage.getItem('theme')
		if (stored) return stored
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
		return 'light'
	}

	const [theme, setTheme] = React.useState(getInitialTheme)

	React.useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeContext
