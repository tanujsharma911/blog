import { configureStore } from '@reduxjs/toolkit'
import authService from '../appwrite/auth';

export const store = configureStore({
    reducer: {
        auth: authService
    },
})

export default store;