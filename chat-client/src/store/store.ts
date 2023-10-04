import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import thunk from "redux-thunk"
import userReducer from "store/slices/userSlice"
import { CURRENT_ENVIRONMENT } from "configs"

const persistConfig = {
  key: "user",
  storage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)

const rootReducer = combineReducers({
  user: persistedUserReducer,
})

const store = configureStore({
  reducer: rootReducer,
  devTools: CURRENT_ENVIRONMENT === "development",
  middleware: [thunk],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
export default store
