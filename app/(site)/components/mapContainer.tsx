"use client"
// import MapLayer from '@/components/Map/MapLayer'
import React, { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic';
import MapSearchBar from '@/components/Map/MapSearchBar'
import { useMapsController } from '../hooks/useMapsController';
import { NominatimResult, NominatimResults } from "@/types/map/NominatimResults"

// window:defined　エラーを防ぐため MapLayerを動的にインポート
const MapLayer = dynamic(() => import('@/components/Map/MapLayer'), {
  ssr: false,
});

const MapContainer = () => {
  // useMapController api, 動的処理はこちらまとめる
  const {
    location,
    apiSearchResults, 
    onSearchLocation
  } = useMapsController()
  
  // 初期位置
  // TODO：現在の位置情報がない場合初期情報は？おそらく、会員の情報？
  const [myLocation, setMyLocation] = useState<[number, number]>([35.682839, 139.759455]);
  const [ isSettedMyLocation, setIsSettedMyLocation ] = useState(false);

  // 選択した位置情報
  const [ selectedLocation, setSelectedLocation ] = useState<[number, number] | null>(null)
  // 検索された場所
  const [searchedPlaces, setSearchedPlaces] = useState<NominatimResult[]>([]);

  // 場所検索(forList)
  const handleOnSearchForList = useCallback(async (query: string) => {
    await onSearchLocation(query);
  }, [onSearchLocation]);
  // 場所検索(forMap)
  const handleOnSearchForMap = useCallback(async (query: string) => {
    await onSearchLocation(query);
    setSearchedPlaces(apiSearchResults)
    console.log(apiSearchResults)
  }, [onSearchLocation, apiSearchResults]);

  const handleSelectLocation = ( locationInformation: NominatimResult ) => {
    console.log( 'locationInformation', locationInformation)
    setSelectedLocation([Number(locationInformation.lat), Number(locationInformation.lon)])
  }

  // 初期値設定
  useEffect( () => {
    if (!isSettedMyLocation && location) {
      setMyLocation(location)
      setIsSettedMyLocation(true)
    }
  }, [location, isSettedMyLocation])

  return (
    <div className='w-screen h-screen flex'>
      <section className='w-[30%] flex-none'>
        {/* 検索バー */}
        <MapSearchBar
          onSearchForList={handleOnSearchForList}
          onSearchForMap={handleOnSearchForMap}
          apiSearchResults={apiSearchResults}
          onClickSelectLocation={handleSelectLocation}
        />
      </section>
      <section className='w-full h-full'>
        {/* 地図 */}
        <MapLayer 
          myCenter={myLocation}
          searchedPlaces={searchedPlaces}
          selectedLocation={selectedLocation}
          zoom={16}
          />
      </section>
    </div>
  )
}

export default MapContainer