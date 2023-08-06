import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

//look into reducers and context in react
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        
        case 'LOGOUT':
            return { user: null }
        
        default:
            return state


    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    console.log('AuthContext state: ', state)

    return (
        //Look into how this makes a component and ... syntax
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}