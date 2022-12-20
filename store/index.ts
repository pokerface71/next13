import { AnyAction, configureStore, Store } from '@reduxjs/toolkit'

import { createWrapper, MakeStore, Context } from 'next-redux-wrapper'

import reducer from './reducers'
const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}),
	devTools: process.env.NODE_ENV === 'development'
})

export type RootState = ReturnType<typeof store.getState>

// export store singleton instance

const makeStore: MakeStore<Store<any, AnyAction>> = (context: Context) => store

const wrapper = createWrapper(makeStore)

// const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper
