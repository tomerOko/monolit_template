import {configureStore} from '@reduxjs/toolkit'
import {usersSlice} from './usersSlice'
import {useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux'

const store = configureStore(
    {
        reducer:{
            user: usersSlice.reducer
        },
        devTools:true
    }
)

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
