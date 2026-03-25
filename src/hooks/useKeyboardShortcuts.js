import React from 'react'

export function useKeyboardShortcuts({
	cardOpened,
	setCardOpened,
	toggleTheme,
	navigate,
	searchRef,
	helpOpen,
	setHelpOpen,
}) {
	React.useEffect(() => {
		const handler = e => {
			if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return

			switch (e.key) {
				case 'c':
				case 'C':
					setCardOpened(v => !v)
					break
				case 't':
				case 'T':
					toggleTheme()
					break
				case 'f':
				case 'F':
					if (e.metaKey || e.ctrlKey) {
						e.preventDefault()
						navigate('/')
						setTimeout(() => searchRef.current?.focus(), 50)
					}
					break
				case '1':
					navigate('/')
					break
				case '2':
					navigate('/favorites')
					break
				case '3':
					navigate('/orders')
					break
				case '?':
				setHelpOpen(v => !v)
				break
			case 'Escape':
					if (cardOpened) {
						setCardOpened(false)
					} else if (helpOpen) {
						setHelpOpen(false)
					} else if (searchRef.current === document.activeElement) {
						searchRef.current.blur()
					}
					break
				default:
					break
			}
		}

		window.addEventListener('keydown', handler)
		return () => window.removeEventListener('keydown', handler)
	}, [cardOpened, helpOpen])
}
