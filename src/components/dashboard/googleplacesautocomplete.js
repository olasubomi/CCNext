import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const GooglePlacesAutocomplete = ({ handleValueChange }) => {
    const handleSelect = async (value) => {
        console.log(value, 'value')
        try {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            const { lat, lng } = latLng
            const zip_code = results[0]?.address_components?.find((ele) => ele.types?.includes("postal_code"))?.long_name || "";
            const country = results[0]?.address_components?.find((ele) => ele.types?.includes("country"))?.long_name || "";
            const state = results[0]?.address_components?.find((ele) => ele.types?.includes("administrative_area_level_1"))?.long_name || "";
            const city = results[0]?.address_components?.find((ele) => ele.types?.includes("administrative_area_level_2"))?.long_name || "";

            handleValueChange(
                value,
                results[0]?.place_id,
                lat,
                lng,
                zip_code,
                country,
                state,
                city
            )
        } catch (error) {
            console.error('Error selecting place', error);
        }
    };

    return (
        <div>
            <PlacesAutocomplete
                apiKey='AIzaSyDJ2OXLQoX_83t-DYmg-zIs3keZmNAZHzk'
                onSelect={handleSelect}
                debounce={300}
                selectProps={{
                    onChange: (value) => handleSelect(value.label),
                }}
                searchOptions={{ types: ['(cities)'] }}
            />
        </div>
    );
};

export default GooglePlacesAutocomplete;