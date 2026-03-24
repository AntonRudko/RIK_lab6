import React from 'react'
import ContentLoader from 'react-content-loader'
import styles from './Card.module.scss'
import AppContext from '../../context'

function Card({
	title,
	price,
	imageUrl,
	onFavorite,
	onPlus,
	id,
	favorited = false,
	loading = false,
}) {
	const { isItemAdded, isItemFavorite } = React.useContext(AppContext)
	const obj = { title, price, imageUrl, parentId: id, id }

	return (
		<div className={styles.card}>
			{loading ? (
				<ContentLoader
					speed={2}
					width={170}
					height={226}
					viewBox='0 0 155 187'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='1' y='0' rx='10' ry='10' width='155' height='90' />
					<rect x='0' y='104' rx='5' ry='5' width='155' height='15' />
					<rect x='0' y='125' rx='5' ry='5' width='100' height='15' />
					<rect x='1' y='150' rx='5' ry='5' width='80' height='25' />
					<rect x='124' y='150' rx='10' ry='10' width='32' height='32' />
				</ContentLoader>
			) : (
				<>
					{onFavorite && (
						<div
							className='absolute cursor-pointer'
							onClick={() => onFavorite(obj)}
						>
							<img
								src={
									isItemFavorite(id) || favorited
										? './img/heart-like.svg'
										: './img/heart-unlike.svg'
								}
								alt='unlike'
								className='size-8'
							/>
						</div>
					)}
					<div className='text-center'>
						<img className='size-28 mb-3' src={imageUrl} alt='sneakers' />
					</div>

					<h5 className='text-sm font-normal min-h-16'>{title}</h5>
					<div className='flex justify-between items-center gap-x-10'>
						<div className='flex flex-col gap-y-1 text-xs'>
							<span className='uppercase opacity-50'>Ціна :</span>
							<b>{price}</b>
						</div>
						{onPlus && (
							<img
								className={styles.plus}
								onClick={() => onPlus(obj)}
								src={
									isItemAdded(id)
										? './img/btn-cheked.svg'
										: './img/btn-plus.svg'
								}
								alt='plus'
							/>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default Card
