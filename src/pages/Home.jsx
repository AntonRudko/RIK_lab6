import Card from '../components/Card'

function Home({
	items,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	onAddToFavorite,
	onAddToCard,
	isLoading,
	searchRef,
}) {
	const filteredItems = items.filter(item =>
		item.title.toLowerCase().includes(searchValue.toLowerCase())
	)

	const renderItems = () => {
		return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
			<Card
				key={index}
				{...item}
				onPlus={onAddToCard}
				onFavorite={onAddToFavorite}
				loading={isLoading}
			/>
		))
	}

	return (
		<div className='content p-10'>
			<div className='flex justify-between items-center mb-10'>
				<h1 className='text-3xl'>
					{searchValue ? `Пошук по запиту: ${searchValue}` : 'Всі кросівки'}
				</h1>
				<div className='search__block flex items-center'>
					<img src='./img/loupe.svg' alt='loupe' />
					<input
						ref={searchRef}
						onChange={onChangeSearchInput}
						type='text'
						value={searchValue}
						placeholder='Пошук...'
						className='input'
					/>
					{searchValue && (
						<img
							onClick={() => setSearchValue('')}
							src='./img/btn-remove.svg'
							alt='Clear'
							className='btn__remove--opacity mr-[-10px]'
						/>
					)}
				</div>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
				{renderItems()}
			</div>
		</div>
	)
}
export default Home
