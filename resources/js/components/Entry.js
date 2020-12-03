import React, { createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import App from './AppComponents/App';
export const AppContext = createContext()
const Entry = () => {
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ submitting, setSubmitting ] = useState(false)
    return (
    <>
        <AppContext.Provider value = {{ loggedIn, setLoggedIn, submitting, setSubmitting }}>
            <BrowserRouter>
                    <App/>
            </BrowserRouter>
        </AppContext.Provider>
    </>
    );
}
export default Entry;