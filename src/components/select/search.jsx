import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import styles from './select.module.css'

export const Search = () => {
    const items = [
        {
            id: 0,
            name: 'Cobol'
        },
        {
            id: 1,
            name: 'JavaScript'
        },
        {
            id: 2,
            name: 'Basic'
        },
        {
            id: 3,
            name: 'PHP'
        },
        {
            id: 4,
            name: 'Java'
        }
    ]

    const handleOnSearch = (string, results) => {
        console.log(string, results)
    }

    const handleOnHover = (result) => {
        console.log(result)
    }

    const handleOnSelect = (item) => {
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item) => {
        return (
         <div>
            <h4>Stores</h4>
            <div className='bord' />
            <div>
                {
                    items.map((elem) => {
                        <p>{elem.name}</p>
                    })
                }
            </div>
         </div>
        )
    }


    return (
        <ReactSearchAutocomplete
        placeholder='Search'
        className='searchbar'
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            
        />
    );
}
