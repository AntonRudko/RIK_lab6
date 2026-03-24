import React from 'react'
import AppContext from '../context'

const Info = ({ title, image, description }) => {
	const { setCardOpened } = React.useContext(AppContext)

	return (
		<div className='flex flex-col items-center mt-auto mb-auto'>
			<img src={image} alt='box' className='size-32 mb-5' />
			<p className='text-2xl font-semibold mb-2'>{title}</p>
			<p className='text-center opacity-40 max-w-72 mb-10'>{description}</p>

			<button
				className='button green__btn--empty'
				onClick={() => setCardOpened(false)}
			>
				Повернутися назад
			</button>
		</div>
	)
}

export default Info
