import {createSlice} from '@reduxjs/toolkit'
import Gemini from '../Chatbot'

const initialState = {
    chatCounter : 0,
    chatId:'',
    gemini: [],
    openrouter: [],

}

let chatCounterSlice = createSlice({
    name:'chatCounter',
    initialState,
    reducers:{
        increment: (state) => {
            state.chatCounter++
            console.log(state.chatCounter)
        },
        reNewChatID:(state,action)=>{
            console.log("befor : ",state.chatId)
            state.chatId = action.payload
            console.log("after : ",state.chatId)
        },
        addMessage: (state, action) => {
            const { bot, message } = action.payload;
            state[bot].push(message);
        },
        replaceLastMessage: (state, action) => {
            const { bot, message } = action.payload;
            state[bot][state[bot].length - 1] = message;
        },
        clearChat: (state, action) => {
            const { bot } = action.payload;
            state[bot] = [];
        },   
        putGemini:(state,action)=>{
            state.gemini = action.payload
        }
    }
})

export const {increment,reNewChatID,addMessage, replaceLastMessage, clearChat,putGemini} = chatCounterSlice.actions
export default chatCounterSlice.reducer