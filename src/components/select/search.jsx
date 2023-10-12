import { ReactSearchAutocomplete } from 'react-search-autocomplete'

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
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
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
