
import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFavoriteContext } from './FavoriteContext';

const FavoritesScreen = ({navigation}) => {
  const { favorites } = useFavoriteContext();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
    style={styles.favoriteItemContainer}
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
    </View>
    </TouchableOpacity>
  );

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setCartTotal((prevTotal) => prevTotal + item.price);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderFavoriteItem}
        numColumns={2}
      />
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
  favoriteItemContainer: {
    flex: 1,
    margin: 8,
    position: 'relative',
  },
  favoriteImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  artItemContainer: {
    flex: 1,
    margin: 8,
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
});

export default FavoritesScreen;
