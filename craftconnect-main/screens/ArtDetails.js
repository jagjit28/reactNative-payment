// ArtDetails.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, FlatList, ScrollView , KeyboardAvoidingView} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ArtDetails = ({ route }) => {
  const { item, description } = route.params;
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState('');
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [highestBidder, setHighestBidder] = useState('');
  const [highestBidAmount, setHighestBidAmount] = useState(0);
  const [requests, setRequests] = useState([]);
  const [material, setMaterial] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const submitBid = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (!storedUsername) {
        console.error('Username not found');
        return;
      }

      await axios.post('http://10.51.223.182:3000/add-bid', {
        productId: item.id,
        username: storedUsername,
        price: bidAmount,
      });

      setBidAmount('');
      fetchBids();
    } catch (error) {
      console.error('Error submitting bid:', error);
    }
  };

  const fetchBids = async () => {
    try {
      const response = await axios.get(`http://10.51.223.182:3000/bids/${item.id}`);
      setBids(response.data);

      let maxBid = 0;
      let winningBidder = '';
      response.data.forEach((bid) => {
        if (bid.price > maxBid) {
          maxBid = bid.price;
          winningBidder = bid.username;
        }
      });

      setHighestBidAmount(maxBid);
      setHighestBidder(winningBidder);
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };

  const submitReview = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (!storedUsername) {
        console.error('Username not found');
        return;
      }

      await axios.post('http://10.51.223.182:3000/add-review', {
        username: storedUsername,
        productId: item.id,
        rating: parseInt(rating),
        comment,
      });

      setRating('');
      setComment('');
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://10.51.223.182:3000/reviews/${item.id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`http://10.51.223.182:3000/requests/${item.id}`);
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const submitRequest = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (!storedUsername) {
        console.error('Username not found');
        return;
      }

      await axios.post('http://10.51.223.182:3000/add-request', {
        productId: item.id,
        username: storedUsername,
        material,
        size,
        color,
        style,
        additionalDetails,
      });

      setMaterial('');
      setSize('');
      setColor('');
      setStyle('');
      setAdditionalDetails('');

      fetchRequests();
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  useEffect(() => {
    fetchBids();
    fetchReviews();
    fetchRequests();
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };

    fetchUsername();
  }, []);

  const renderBidItem = ({ item: bid }) => (
    <View style={styles.bidItem}>
      <Text>{`User: ${bid.username}`}</Text>
      <Text>{`Bid: $${bid.price.toFixed(2)}`}</Text>
    </View>
  );

  const renderReviewItem = ({ item: review }) => (
    <View style={styles.reviewItem}>
      <Text>{`Rating: ${review.rating}`}</Text>
      <Text>{`Comment: ${review.comment}`}</Text>
      <Text>{`By: ${review.createdBy}`}</Text>
    </View>
  );

  const renderRequestItem = ({ item: request }) => (
    <View style={styles.requestItem}>
      <Text>{`User: ${request.username}`}</Text>
      <Text>{`Material: ${request.material}`}</Text>
      <Text>{`Size: ${request.size}`}</Text>
      <Text>{`Color: ${request.color}`}</Text>
      <Text>{`Style: ${request.style}`}</Text>
      <Text>{`Additional Details: ${request.additionalDetails}`}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior="padding"
    enabled
  >
    <ScrollView>
      <View style={styles.container}>
        <Image source={item.image} style={styles.artImage} />
        <Text style={styles.title}>{item.id}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
        <Text>{item.id}</Text>
        <View style={styles.bidSection}>
          <Text style={styles.bidHeading}>Bidding</Text>
          <Text>{`Highest Bid: $${highestBidAmount.toFixed(2)} by ${highestBidder}`}</Text>
          <FlatList
            data={bids}
            keyExtractor={(bid) => bid._id}
            renderItem={renderBidItem}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter bid amount"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={bidAmount}
            onChangeText={(text) => setBidAmount(text)}
          />
          <Button title="Submit Bid" onPress={submitBid} />
        </View>
        <View style={styles.reviewSection}>
          <Text style={styles.reviewHeading}>Reviews</Text>
          <FlatList
            data={reviews}
            keyExtractor={(review) => review._id}
            renderItem={renderReviewItem}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter rating"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={rating}
            onChangeText={(text) => setRating(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter review comment"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
          <Button title="Submit Review" onPress={submitReview} />
        </View>
        <View style={styles.requestSection}>
          <Text style={styles.requestHeading}>Custom Requests</Text>
          <FlatList
            data={requests}
            keyExtractor={(request) => request._id}
            renderItem={renderRequestItem}
          />
          <View style={styles.requestInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Material"
              placeholderTextColor="#999"
              value={material}
              onChangeText={(text) => setMaterial(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Size"
              placeholderTextColor="#999"
              value={size}
              onChangeText={(text) => setSize(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Color"
              placeholderTextColor="#999"
              value={color}
              onChangeText={(text) => setColor(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Style"
              placeholderTextColor="#999"
              value={style}
              onChangeText={(text) => setStyle(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Additional Details"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              value={additionalDetails}
              onChangeText={(text) => setAdditionalDetails(text)}
            />
            <Button title="Submit Custom Request" onPress={submitRequest} />
          </View>
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  artImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bidSection: {
    marginBottom: 16,
  },
  bidHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bidItem: {
    marginBottom: 8,
  },
  reviewSection: {
    marginBottom: 16,
  },
  reviewHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reviewItem: {
    marginBottom: 8,
  },
  requestSection: {
    marginBottom: 16,
  },
  requestHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  requestItem: {
    marginBottom: 8,
  },
  requestInputContainer: {
    marginTop: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    padding: 8,
    
  },
});

export default ArtDetails;
