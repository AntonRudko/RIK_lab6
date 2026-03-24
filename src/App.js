import { Route, Routes } from 'react-router-dom'
import Drawer from './components/Drawer'
import Header from './components/Header'
import AppContext from './context'
import { API } from './api'

import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Orders from './pages/Orders'

import axios from 'axios'
import React from 'react'

function App() {
	const [items, setItems] = React.useState([])
	const [cardItems, setCardItems] = React.useState([])
	const [searchValue, setSearchValue] = React.useState('')
	const [cardOpened, setCardOpened] = React.useState(false)
	const [favorites, setFavorites] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		document.body.style.overflow = cardOpened ? 'hidden' : ''
	}, [cardOpened])

	React.useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true)
				const [cartResponse, favoriteResponse, itemsResponse] =
					await Promise.all([
						axios.get(API.cart),
						axios.get(API.favorites),
						axios.get(API.items),
					])
				setItems(itemsResponse.data)
				setCardItems(cartResponse.data)
				setFavorites(favoriteResponse.data)
			} catch (error) {
				alert('Виникла помилка під час завантаження данних!')
				console.error(error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])

	const onAddToCard = async obj => {
		try {
			const findItem = cardItems.find(
				cardObj =>
					Number(cardObj.parentId) === Number(obj.id) ||
					Number(cardObj.parentId) === Number(obj.parentId)
			)
			if (findItem) {
				await axios.delete(`${API.cart}/${findItem.id}`)
				setCardItems(prev =>
					prev.filter(item => Number(item.parentId) !== Number(obj.id))
				)
			} else {
				const { data } = await axios.post(API.cart, obj)
				setCardItems(prev => [...prev, data])
			}
		} catch (error) {
			alert('Не вдалося додати до Корзини')
			console.error(error)
		}
	}

	const onRemoveItem = async obj => {
		try {
			await axios.delete(`${API.cart}/${obj.id}`)
			setCardItems(prev =>
				prev.filter(item => Number(item.id) !== Number(obj.id))
			)
		} catch (error) {
			alert('Не вдалося видалити з Корзини')
			console.error(error)
		}
	}

	const onAddToFavorite = async obj => {
		try {
			const findItem = favorites.find(
				favObj =>
					Number(favObj.parentId) === Number(obj.id) ||
					Number(favObj.parentId) === Number(obj.parentId)
			)
			if (findItem) {
				await axios.delete(`${API.favorites}/${findItem.id}`)
				setFavorites(prev =>
					prev.filter(
						item =>
							Number(item.parentId) !== Number(obj.id) &&
							Number(item.id) !== Number(obj.id)
					)
				)
			} else {
				const { data } = await axios.post(API.favorites, obj)
				setFavorites(prev => [...prev, data])
			}
		} catch (error) {
			alert('Не вдалося додати до обраного')
			console.error(error)
		}
	}

	const onChangeSearchInput = event => {
		setSearchValue(event.target.value)
	}

	const isItemAdded = id => {
		return cardItems.some(obj => Number(obj.parentId) === Number(id))
	}

	const isItemFavorite = id => {
		return favorites.some(obj => Number(obj.parentId) === Number(id))
	}

	return (
		<AppContext.Provider
			value={{
				cardItems,
				favorites,
				items,
				isItemAdded,
				isItemFavorite,
				onAddToFavorite,
				setCardOpened,
				setCardItems,
				onAddToCard,
			}}
		>
			<div className='wrapper'>
				<Drawer
					onRemove={onRemoveItem}
					items={cardItems}
					onClose={() => setCardOpened(false)}
					opened={cardOpened}
				/>

				<Header onClickCard={() => setCardOpened(true)} />

				<Routes>
					<Route
						path='favorites'
						element={<Favorites onAddToCard={onAddToCard} />}
					/>
					<Route
						index
						element={
							<Home
								items={items}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								onChangeSearchInput={onChangeSearchInput}
								onAddToFavorite={onAddToFavorite}
								onAddToCard={onAddToCard}
								isLoading={isLoading}
							/>
						}
					/>
					<Route path='orders' element={<Orders />} />
				</Routes>
			</div>
		</AppContext.Provider>
	)
}
export default App
