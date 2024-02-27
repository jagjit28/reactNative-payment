//AfterLogin.js
import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet ,Button } from 'react-native';
import { useFavoriteContext } from './FavoriteContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import ArtDetails from './ArtDetails';

const AfterLogin = ({ navigation }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavoriteContext();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const artItems = [
   
    { id: 'Cow', image: require('../assets/image2.jpg'),description: 'Beautiful cow painting...', isFavorite: false, price: 39.99 },
    { id: 'Skull', image: require('../assets/image1.webp'),description: 'Paper crafted skull ..', isFavorite: false, price: 12.99 },
    { id: 'lion', image: require('../assets/lion.jpg'),description: 'Beautiful lion painting...', isFavorite: false, price: 10.99 },
    { id: 'Abstract art', image: require('../assets/image3.jpg'), description: 'Beautiful abstract painting...',isFavorite: false, price: 49.99 },
    { id: 'Cycle art', image: require('../assets/image4.jpeg'),description: 'Beautiful cycle art painting...', isFavorite: false, price: 15.99 },
    { id: 'Monalisa', image: require('../assets/mona.png'), description: 'Beautiful monalisa painting...',isFavorite: false, price: 29.99 },
   
  ];

  const toggleFavorite = (itemId) => {
    if (favorites.some((item) => item.id === itemId)) {
      removeFromFavorites(itemId);
    } else {
      addToFavorites(artItems.find((item) => item.id === itemId));
    }
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setCartTotal((prevTotal) => prevTotal + item.price);
  };

  const renderArtItem = ({ item }) => (
    <TouchableOpacity
      style={styles.artItemContainer}
      onPress={() => navigation.navigate('ArtDetails', { item, description: item.description })}
    >
      <View style={styles.artItemContainer}>
        <Image source={item.image} style={styles.artImage} />
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity onPress={() => addToCart(item)} style={styles.cartButton}>
            <Icon name="cart-plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteButton}>
          <Icon name={favorites.some((fav) => fav.id === item.id) ? 'heart' : 'heart-o'} size={24} color="#FF0000" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore Curated Art Collection</Text>
      <FlatList
        data={artItems}
        keyExtractor={(item) => item.id}
        renderItem={renderArtItem}
        numColumns={2}
      />
      <TouchableOpacity
        style={styles.viewCartButton}
        onPress={() => navigation.navigate('Cart', { cartItems, cartTotal })}
      >
        <Text style={styles.viewCartButtonText}>View Cart</Text>
        
      </TouchableOpacity>
        
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  artItemContainer: {
    flex: 1,
    margin: 8,
    position: 'relative',
  },
  artImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  viewCartButton: {
    backgroundColor: '#262E36',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  viewCartButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AfterLogin;
