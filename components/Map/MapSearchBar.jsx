import React, {useCallback, useState, useRef} from 'react'
import { IoSearchOutline } from "react-icons/io5";

const MapSearchBar = ( { onSearchForList, onSearchForMap, apiSearchResults, onClickSelectLocation }) => {
  // 検査入力値
  const [query, setQuery] = useState('');
  // 選択した位置情報
  const [ selectedLocation, setSelectedLocation ] = useState({})
  const timeoutRef = useRef(null);

  // 入力による、検索
  const handleSearchInputChange = useCallback((e) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    // 이전 타이머가 있으면 클리어
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 새로운 타이머 설정
    timeoutRef.current = setTimeout(() => {
      onSearchForList(newQuery);
    }, 500); // 500ms 후에 검색 함수 호출
  }, [onSearchForList])

  // 入力による、検索
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchButtonClick()
    } 
  }

  // ボタン, enterキー押下による、検索
  const handleSearchButtonClick = () => {
    console.log(query)
    onSearchForMap(query)
  }

  return (
    <div>
      {/* 検索バー */}
      <div className='search-results flex flex-row'>
        <input
          type="text"
          value={query}
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchKeyDown}
          placeholder="asd"
          className='font-[15px]  flex-1'
          />
        <div onClick={handleSearchButtonClick}
          className=' flex-2'>
            <IoSearchOutline />
        </div>
      </div>
      {/* 検索結果表示 */}
      {apiSearchResults && apiSearchResults.length > 0 && (
        <div className="search-results">
          <ul>
            {apiSearchResults.map((result, index) => (
              <li
                key={index}
                onClick={() => onClickSelectLocation(result)}
                value={result}
                className='cursor-pointer'  
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MapSearchBar