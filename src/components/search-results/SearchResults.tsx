import React, { useEffect, useRef } from "react";
import useClickOutside from "../../utils/custom-hooks/useClickOutside";
import "./SearchResultsStyle.css";
import { Link } from "react-router-dom";

const SearchResults: React.FC<any> = ({
  results,
  searchOpen,
  searchJustOpened,
  setSearchJustOpened,
  setSearchOpen,
  loading,
  setSearch
}) => {
  const searchResultsRef = useRef<any>(null);

  useClickOutside(searchResultsRef, () => {
    // CHECK IF THE MODAL JUST OPENED
    if (searchJustOpened) {
      setSearchJustOpened(false);
      return;
    }
    if (searchOpen) setSearchOpen(false);
  });

  useEffect(() => {
    const searchResults: any = searchResultsRef.current;
    const list: any = searchResults?.children[0]?.children[0]?.children
    const searchResultsLength: number = list?.length || 0;
    if (searchResults && searchResultsLength > 0) {
      for (let i = 0; i < searchResultsLength; i++) {
        list[i].addEventListener('click', () => {
          // console.log('wakwak a3ibad lah', searchResults.children[0].children[0].children[i])
          console.log ('contains open ::::',searchResults)
          if (searchResults.classList.contains('opened')) searchResults.classList.remove('opened')
          if (searchResults?.parentElement?.classList.contains('is-clicked')) searchResults.parentElement.classList.remove('is-clicked');
          searchResults.parentElement.querySelector('input').value = ''
        })
        
      }
    }
  }, [searchResultsRef, results])

  useEffect(() => {
    console.log('results', results);
  }, [results])
  

  console.log("opened", searchOpen);

  return (
    <div
      className={`search-results ${searchOpen ? "opened" : ""}`}
      ref={searchResultsRef}
    >
      <div className="search-results-content scrollbar">
        {loading && <div className="loading"></div>}
        {!loading && searchResultsRef?.current.parentElement.querySelector('input').value === '' && <div className="tap-on-search">Tap something on the search bar</div>}
        {!loading && (results?.users?.length === 0 && results?.groups?.length === 0) && <div className="search-results-empty">No users or groups found</div>}
        {!loading && (results?.users?.length > 0 || results?.groups?.length > 0)  && <ul>
          {results?.users &&
            results?.users.map((user: any, index: number) => {
              const key = `key-${index}`;
              return (
                <li key={key}>
                  <Link to={`/profile/${user?.id}`} onClick={() => {
                    setSearch(''); 
                    setSearchOpen(false) }} className="card-link">
                    {/* <CardItem data={user} type="user" /> */}
                    <div className="search-card">
                      <div className="search-card-body">
                        <div className="search-card-infos">
                          <div className="search-card-images">
                            {user?.images?.map((image: any, index: number) => (
                              <img key={`key-${index}`} src={process.env.PUBLIC_URL + image} alt="person avatar" />
                            ))}
                          </div>
                          <div className="search-card-description">
                            <div className="search-card-name">
                              {user?.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    <div className="card-link-type">user</div>
                    </div>
                  </Link>
                </li>
              );
            })}
          {results?.groups &&
            results?.groups.map((group: any, index: number) => {
              const key = `key-${index}`;

              return (
                <li key={key}>
                  <Link to={`/group/${group?.id}`} onClick={() => {
                    setSearch(''); 
                    setSearchOpen(false)
                    }}  className="card-link">
                    {/* <CardItem data={group} type="group" /> */}
                    <div className="search-card">
                      <div className="search-card-body">
                        <div className="search-card-infos">
                          <div className="search-card-images">
                            {group?.images?.map((image: any, index: number) => (
                              <img key={`key-${index}`} src={process.env.PUBLIC_URL + image} alt="person avatar" />
                            ))}
                          </div>
                          <div className="search-card-description">
                            <div className="search-card-name">
                              {group?.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    <div className="card-link-type">group</div>
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>}
      </div>
    </div>
  );
};

export default SearchResults;
