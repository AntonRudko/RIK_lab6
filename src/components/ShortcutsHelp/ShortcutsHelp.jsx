import React from 'react'
import styles from './ShortcutsHelp.module.scss'

const SHORTCUTS = [
	{ key: 'C', description: 'Відкрити / закрити кошик' },
	{ key: 'T', description: 'Змінити тему (світла / темна)' },
	{ key: '⌘F / Ctrl+F', description: 'Сфокусуватись на пошуку' },
	{ key: '1', description: 'Перейти на головну' },
	{ key: '2', description: 'Перейти до вибраного' },
	{ key: '3', description: 'Перейти до замовлень' },
	{ key: 'Esc', description: 'Закрити кошик / вікно / пошук' },
]

function ShortcutsHelp({ onClose }) {
	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={e => e.stopPropagation()}>
				<h3 className={styles.title}>Клавіатурні скорочення</h3>
				<ul className={styles.list}>
					{SHORTCUTS.map(({ key, description }) => (
						<li key={key} className={styles.row}>
							<kbd className={styles.key}>{key}</kbd>
							<span className={styles.description}>{description}</span>
						</li>
					))}
				</ul>
				<button className={styles.closeBtn} onClick={onClose}>
					Закрити
				</button>
			</div>
		</div>
	)
}

export default ShortcutsHelp
