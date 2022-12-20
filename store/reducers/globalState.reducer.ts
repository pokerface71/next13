import { createAction, createSlice } from '@reduxjs/toolkit'

const globalStateLocalStorageTitle =
	process.env.globalStateLocalStorageTitle || 'globalState'

let storeGlobalState: IGlobalState = {
	lang: 'fa',
	currencySymbol: 'ریال',
	darkMode: false,
	userInfo: null
}
const updateGlobalStateLocalStorage = (state: IGlobalState | null) => {
	localStorage.removeItem(globalStateLocalStorageTitle)
	localStorage.setItem(globalStateLocalStorageTitle, JSON.stringify(state))
}
if (typeof window !== 'undefined') {
	const temp = localStorage.getItem(globalStateLocalStorageTitle)
	if (temp) {
		try {
			storeGlobalState = JSON.parse(temp)
		} catch (error) {
			console.log({ error })
		}
	} else {
		localStorage.setItem(
			globalStateLocalStorageTitle,
			JSON.stringify(storeGlobalState)
		)
	}
}

export const clearShopList = createAction('clearGlobalState')
const initialState: IGlobalState = storeGlobalState
const globalState = createSlice({
	name: 'globalState',
	initialState,
	reducers: {
		setLang: (state: IGlobalState, { payload }: { payload: 'fa' | 'en' }) => {
			state.lang = payload
			updateGlobalStateLocalStorage(state)
		},
		setCurrencySymbol: (
			state: IGlobalState,
			{ payload }: { payload: string }
		) => {
			state.currencySymbol = payload
			updateGlobalStateLocalStorage(state)
		},
		setDarkMode: (state: IGlobalState, { payload }: { payload: boolean }) => {
			state.darkMode = payload
			updateGlobalStateLocalStorage(state)
		},
		setUserInfo: (state: IGlobalState, { payload }: { payload: any }) => {
			state.userInfo = payload
			updateGlobalStateLocalStorage(state)
		}
	},

	extraReducers: (builder) => {
		builder.addCase(clearShopList, (state) => {
			localStorage.removeItem(globalStateLocalStorageTitle)
			return state
		})
	}
})
export const { setLang, setCurrencySymbol, setDarkMode, setUserInfo } =
	globalState.actions

export default globalState
