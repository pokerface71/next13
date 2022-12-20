import { createAction, createSlice } from '@reduxjs/toolkit'

const shopList = 'cart' || ''

let storedShopList = null

if (process.browser) {
	const temp = localStorage.getItem(shopList)
	if (temp) {
		storedShopList = JSON.parse(temp)
	}
}

const isExistInShopeList = (
	state: any[],
	id: number | string,
	type: string
) => {
	const result: {
		newItem: any | null
		index: number | null
	} = {
		newItem: null,
		index: null
	}

	state.forEach((item, index) => {
		if (item.Product.prices[0].productPriceHistoryId === id) {
			if (type === 'add') {
				item.quantity++
			} else if (type === 'dec') {
				item.quantity--
			}
			result.newItem = item
			result.index = index
			return false
		}
	})

	return result
}

const updateShoppingListInCookie = (state: any[]) => {
	localStorage.removeItem(shopList)
	localStorage.setItem(shopList, JSON.stringify(state))
}

export const clearShopList = createAction('clearShopList')
const initialState: any[] = storedShopList || []
const shoppingListState = createSlice({
	name: 'shoppingList',
	initialState,
	reducers: {
		addProduct: (state: any[], { payload }: any) => {
			const isExist = isExistInShopeList(
				state,
				payload.prices[0].productPriceHistoryId,
				'add'
			)
			if (!isExist.newItem) {
				state.push({ Product: payload, quantity: 1 })
			} else {
				state.splice(isExist.index!, 1, isExist.newItem)
			}

			localStorage.setItem(shopList, JSON.stringify(state))
		},

		removeProduct: (state: any[], { payload }) => {
			const index = state.findIndex((item: any) => {
				return item.Product.prices[0].productPriceHistoryId === payload
			})

			if (index >= 0) {
				state.splice(index, 1)
				updateShoppingListInCookie(state)
			}
		},

		increaseProductQuantity: (state: any[], { payload }) => {
			const isExist = isExistInShopeList(state, payload, 'add')

			if (isExist.newItem) {
				state.splice(isExist.index!, 1, isExist.newItem)

				updateShoppingListInCookie(state)
			}
		},

		decreaseProductQuantity: (state: any[], { payload }) => {
			const isExist = isExistInShopeList(state, payload, 'dec')

			if (isExist.newItem?.quantity === 0) {
				const index = state.findIndex((item: any) => {
					return item.quantity === 0
				})

				state.splice(index, 1)
			} else if (isExist.newItem) {
				state.splice(isExist.index!, 1, isExist.newItem)
			}

			updateShoppingListInCookie(state)
		}
	},

	extraReducers: (builder) => {
		builder.addCase(clearShopList, (state) => {
			state = []

			updateShoppingListInCookie(state)

			return state
		})
	}
})

export const {
	addProduct,
	removeProduct,
	increaseProductQuantity,
	decreaseProductQuantity
} = shoppingListState.actions

export default shoppingListState
