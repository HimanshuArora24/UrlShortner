import { UrlsContext } from '../context/UrlContext'
import { useContext } from 'react'

export const useUrlsContext = () => {
    const context = useContext(UrlsContext)

    if(!context){
        throw Error('useUrlsContext must be used inside a UrlContextProvider')
    }

    return context
}