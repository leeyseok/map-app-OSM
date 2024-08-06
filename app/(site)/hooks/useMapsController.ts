import { useState, useEffect } from 'react';
import { LatLngTuple } from 'leaflet';
import { fetchDirections } from "@/actions/map/map.actions";
import { NominatimResult } from "@/types/map/NominatimResults"

export const useMapsController = () => {
  // 検索結果の位置情報  
  const [location, setLocation] = useState<[number, number] | null>(null);
  
  // 検索結果の情報リスト
  // todo: SupaBaseのデータ型に合わせる、現状はOpen Street Nomination Apiに合わせ
  // interface NominatimResult {
  //   place_id: number;               // 位置の固有 ID
  //   licence: string;                // データライセンス情報
  //   osm_type: string;               // OSM オブジェクトタイプ 例: "node", "way", "relation")
  //   osm_id: number;                 // OSM オブジェクト ID
  //   lat: string;                    // 緯度
  //   lon: string;                    // 軽度
  //   class: string;                  // OSM オブジェクト クラス (例: "natural")
  //   type: string;                   // オブジェクト (例: "peak")
  //   place_rank: number;             // 장소의 랭크
  //   importance: number;             // 장소의 중요도
  //   addresstype: string;            // 주소 타입 (例: "peak")
  //   name: string;                   // 장소 이름
  //   display_name: string;           // 표시할 주소 문자열
  //   boundingbox: [                  // 장소의 경계 박스 좌표 (남, 북, 서, 동)
  //     string,                       // 남위 (문자열로 반환됨)
  //     string,                       // 북위 (문자열로 반환됨)
  //     string,                       // 서경 (문자열로 반환됨)
  //     string                        // 동경 (문자열로 반환됨)
  //   ];
  // }
  type NominatimResults = NominatimResult[];
  const [ apiSearchResults, setApiSearchResult ] = useState<NominatimResults>([]);
  
  /**
   * queryの文字データを使って、OpenStreet Nomination Apiから位置検索
   * TODO 後程ではSupaBaseから？
   * 
   * @param { string } query - 検索バーの入力値
   */
  const onSearchLocation = async ( query:string ) => {
    try {
      // OpenStreetMap Nominatim APIを使用し、検索結果をresponseに込める
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      
      // 検索結果があり且つ、１番目の検索結果保存する
      if (data && data.length > 0) {
        setApiSearchResult(data)
        const { lat, lon } = data[0];
        setLocation([parseFloat(lat), parseFloat(lon)]);
      } else {
        console.error('No results found');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  useEffect(() => {
    // TODO
    // デバイスの情報を読み込む
    // 成功時
    const handleGetCurrentLoactionSuccess = (position: GeolocationPosition) => {
      const currentLocationInformation = position.coords;
      setLocation([currentLocationInformation.latitude, currentLocationInformation.longitude]);
    }
    // 失敗時
    const handleGetCurrentLoactionError =  (error: GeolocationPositionError) => {
      console.warn('Error', error)
    }
    if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(handleGetCurrentLoactionSuccess, handleGetCurrentLoactionError, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      })

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      // todo 位置情報を提供しない時
      
    }
  }, []);
  return { location, apiSearchResults, onSearchLocation };
};
