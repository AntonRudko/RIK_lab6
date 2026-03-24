import axios from 'axios'
import React from 'react'

import { useCard } from '../../hooks/useCard'
import { API } from '../../api'
import Info from '../Info'
import styles from './Drawer.module.scss'

function Drawer({ onRemove, onClose, opened, items = [] }) {
	const { cardItems, setCardItems, totalPrice } = useCard()

	const [isOrderComplete, setIsOrderComplete] = React.useState(false)
	const [orderId, setOrderId] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(false)

	React.useEffect(() => {
		if (!opened && isOrderComplete) {
			setIsOrderComplete(false)
		}
	}, [opened, isOrderComplete])

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios.post(API.orders, { items: cardItems })

			await Promise.all(
				cardItems.map(item => axios.delete(`${API.cart}/${item.id}`))
			)

			setOrderId(data.id)
			setIsOrderComplete(true)
			setCardItems([])
		} catch (error) {
			alert('Виникла Помилка під час оформлення замовлення :(')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div
			className={`${styles.overlay} h-screen ${
				opened ? styles.overlay__visible : ''
			}`}
		>
			<div className={`${styles.drawer} flex flex-col`}>
				<h2 className='text-2xl flex justify-between items-center'>
					Корзина
					<img
						onClick={onClose}
						src='./img/btn-remove.svg'
						alt='remove'
						className={styles.btn__remove_opacity}
					/>
				</h2>
				{items.length > 0 ? (
					<>
						<div className={styles.items}>
							{items.map(obj => (
								<div
									key={obj.id}
									className={`${styles.card__item} flex items-center gap-x-5 mt-8`}
								>
									<img src={obj.imageUrl} alt='sneakers' className='size-20' />
									<div>
										<p className='mb-2 text-sm'>{obj.title}</p>
										<b className='text-base'>{obj.price}</b>
									</div>
									<img
										onClick={() => onRemove(obj)}
										src='./img/btn-remove.svg'
										alt='remove'
										className={styles.btn__remove_opacity}
									/>
								</div>
							))}
						</div>
						<div className='mt-auto'>
							<ul>
								<li className='flex justify-between gap-x-2 mb-5'>
									<span>Разом:</span>
									<div className='flex-1 border-b border-dashed border-[var(--color-border)]'></div>
									<b>{totalPrice} грн.</b>
								</li>
								<li className='flex justify-between gap-x-2 mb-5'>
									<span>Податок 5%:</span>
									<div className='flex-1 border-b border-dashed border-[var(--color-border)]'></div>
									<b>{(totalPrice * 5) / 100} грн.</b>
								</li>
							</ul>
						</div>
						<button
							disabled={isLoading}
							onClick={onClickOrder}
							className='button green__btn'
						>
							Оформити замовлення
						</button>
					</>
				) : (
					<Info
						title={isOrderComplete ? 'Замовлення оформлено!' : 'Корзина пуста'}
						description={
							isOrderComplete
								? `Ваше замовлення №${orderId} скоро буде предано в службу доставки`
								: 'Додайте хоча б одну пару кросівок, щоб зробити замовлення.'
						}
						image={
							isOrderComplete
								? './img/complete-order.png'
								: './img/empty-box.png'
						}
					/>
				)}
			</div>
		</div>
	)
}

export default Drawer
