"use client";
import styles from "./LocationAuto.module.css";
import { useDebouncedCallback } from "use-debounce";
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Context API
import { AppContext } from '@/context/AppContext';
import { AppContextTypes } from '@/types/Context';

type LocationRecommandType = { 
    display_name: string,
    place_id: string, 
    lat: string, 
    lon: string 
};

const LocationAuto = () => {

    const { hospitalRegister, setHospitalRegister } = useContext(AppContext) as AppContextTypes;

    const [locationRecommandations, setLocationRecommandations] = useState<LocationRecommandType[]>([]);

    const handleLocationRecommandations = useDebouncedCallback(async (inputLocation: string) => {
        setLocationRecommandations([]);

        const locationRecommendation = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${inputLocation}`, {
            method: 'GET'
        });

        if (!locationRecommendation.ok) {
            throw new Error('Some Issue loding locations');
        }

        const allLocations: LocationRecommandType[] = await locationRecommendation.json();

        allLocations.forEach((location) => {
            setLocationRecommandations((prev) => [...prev, {
                display_name: location.display_name,
                place_id: location.place_id,
                lat: location.lat,
                lon: location.lon,
            }]);
        })

    }, 1000);

    const [addressInput, setAddressInput] = useState('');

    const updateRecommandedLocation = (location: LocationRecommandType) => {
        console.log(location)
        
        setHospitalRegister({
            ...hospitalRegister,
            hospitalLat: location.lat,
            hospitalLong: location.lon,
            hospitalLocation: location.display_name
        })
        
        setAddressInput(location.display_name);
        setLocationRecommandations([]);
    }

    useEffect(() => {
        handleLocationRecommandations(addressInput)
        // eslint-disable-next-line
    }, [addressInput]);

  return (
    <div className={styles.auto__location}>
        <input value={addressInput} onChange={(e) => {setAddressInput(e.target.value)}} name="address" type="text" placeholder='Address*' required aria-label='Address'/>
        {
            locationRecommandations.length !== 0 && (
                <ul className={styles.recommandLocations}>
                    {
                        locationRecommandations.map((location) => {
                            return (
                                <li key={location.place_id} role='button' tabIndex={0} onClick={() => {
                                    updateRecommandedLocation(location)
                                }}>{location.display_name.slice(0,64) + '...'}</li>
                            )
                        })
                    }
                </ul>
            )
        }
    </div>
  )
}

export default LocationAuto