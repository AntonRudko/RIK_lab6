import React from 'react'
import Card from '../components/Card'
import { Empty } from '../components/Empty'
import AppContext from '../context'

function Favorites() {
	const { favorites, onAddToFavorite } = React.useContext(AppContext)

	return (
		<div className='content p-10'>
			<div className='mb-10'>
				<h1 className='text-3xl'>Мої закладки</h1>
			</div>

			{favorites.length > 0 ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
					{favorites.map(item => (
						<Card
							key={item.id}
							favorited={item.id}
							onFavorite={() => onAddToFavorite(item)}
							{...item}
						/>
					))}
				</div>
			) : (
				<Empty
					smile='./img/smile2.png'
					description='У вас немає збережених'
					text='Тут будуть відображені всі ваші збережені товари'
				/>
			)}
		</div>
	)
}
export default Favorites
