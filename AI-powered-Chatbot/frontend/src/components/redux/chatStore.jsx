import { configureStore } from "@reduxjs/toolkit";
import chatCounterReducer from './newChatSlice'

let chatStore = configureStore({
    reducer:{
        counter:chatCounterReducer
    }
})

export default chatStore