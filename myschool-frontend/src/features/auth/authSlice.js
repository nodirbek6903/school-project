import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user:null,
    token:localStorage.getItem("token") || null,
    isLoading:false,
    error:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setCredentials: (state,action) => {
            const {user, token} = action.payload
            state.user = user
            state.token = token
            localStorage.setItem("token", token)
            localStorage.setItem("role", user.role)
        },
        logout: (state) => {
            state.user = null,
            state.token = null
            localStorage.removeItem("token")
            localStorage.removeItem("role")
        }
    },
})

export const {setCredentials,logout} = authSlice.actions

export default authSlice.reducer