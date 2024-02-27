import React, { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  // const addToFavorites = (item) => {
  //   setFavorites((prevFavorites) => [...prevFavorites, item]);
  // };
  ///
  const removeFromFavorites = (itemId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== itemId));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => useContext(FavoriteContext);
