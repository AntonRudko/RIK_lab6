import { Link } from 'react-router-dom'

export const Empty = ({ smile, description, text }) => {
	return (
		<div className='my-28 text-center'>
			<img src={smile} alt='smile' className='size-[70px] mb-9' />
			<h2 className='mb-3 text-2xl'>{description}</h2>
			<p className='mb-10 text-base' style={{ color: 'var(--color-text-secondary)' }}>{text}</p>

			<button className='button green__btn--empty mx-auto'>
				<Link className='no-underline text-inherit' to='/'>
					Повернутися назад
				</Link>
			</button>
		</div>
	)
}
