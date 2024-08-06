"use client"
import { useEffect, useState } from 'react';
import MapComponent from './components/mapContainer';
import { LatLngTuple } from 'leaflet';
import { DotLoader } from 'react-spinners';

const HomePage = () => {

  const [ isHydrated, setIsHydrated ] = useState(false) 

  useEffect(() => {
    setIsHydrated(true)
  }, []);
  
  if (!isHydrated) {
    // ページのハイドレーションが終わるまでローディングページを表示
    return (
      <>
        <div className="flex justify-center items-center w-screen h-screen">
          <div>
            <DotLoader />
          </div>
        </div>
      </>
    )
  }

  return (
    <main>
      <MapComponent />
    </main>
  );
};

export default HomePage;
