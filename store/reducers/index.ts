import { combineReducers } from 'redux'
import shoppingListState from './shoppingList.reducer'
import globalState from './globalState.reducer'

const rootReducer = combineReducers({
	shoppingList: shoppingListState.reducer,
	globalState: globalState.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
