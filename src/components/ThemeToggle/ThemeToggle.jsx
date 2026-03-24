import React from 'react'
import { BsSun, BsMoon } from 'react-icons/bs'
import ThemeContext from '../../ThemeContext'

function ThemeToggle() {
	const { theme, toggleTheme } = React.useContext(ThemeContext)
	const isDark = theme === 'dark'

	return (
		<button
			className='theme-toggle'
			onClick={toggleTheme}
			title={isDark ? 'Світла тема' : 'Темна тема'}
		>
			{isDark ? <BsSun /> : <BsMoon />}
		</button>
	)
}

export default ThemeToggle
