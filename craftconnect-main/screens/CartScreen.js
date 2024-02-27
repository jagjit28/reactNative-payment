import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

const CartScreen = ({ route }) => {
  const { cartItems = [], cartTotal = 0 } = route.params || {};
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.cartItemText}>{item.id}</Text>
        <Text style={styles.cartItemText}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch('http://10.51.223.182:3000/payment-sheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch payment sheet params: ${response.statusText}`);
      }

      const { paymentIntent, ephemeralKey, customer } = await response.json();

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.error('Error fetching payment sheet params:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    const initializePaymentSheet = async () => {
      try {
        const {
          paymentIntent,
          ephemeralKey,
          customer,
        } = await fetchPaymentSheetParams();

        console.log('Fetched payment sheet params:', {
          paymentIntent,
          ephemeralKey,
          customer,
        });

        const { error } = await initPaymentSheet({
          merchantDisplayName: 'Example, Inc.',
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: paymentIntent,
          allowsDelayedPaymentMethods: true,
          defaultBillingDetails: {
            name: 'Jane Doe',
          },
          returnURL: 'http://10.51.223.182:3000/login',
        });

        if (!error) {
          setLoading(true);
          console.log('Payment sheet initialized successfully');
        } else {
          console.error(`Error code: ${error.code}`, error.message);
          throw new Error(`Error initializing payment sheet: ${error.message}`);
        }
      } catch (error) {
        console.error('Error initializing payment sheet:', error.message);
      }
    };

    initializePaymentSheet();
  }, [initPaymentSheet]);

  const openPaymentSheet = async () => {
    try {
      const { error, paymentOption } = await presentPaymentSheet();
  
      if (error) {
        console.error(`Error code: ${error.code}`, error.message);
        throw new Error(`Error presenting payment sheet: ${error.message}`);
      } else if (paymentOption === 'cancel') {
        console.log('Payment has been canceled');
        // You can choose to display a message to the user here if needed.
         Alert.alert('Payment Canceled', 'Your payment has been canceled.');
      } else {
        Alert.alert('Success', 'Your order is confirmed!');
      }
    } catch (error) {
      console.error('Error presenting payment sheet:', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>${cartTotal.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.payNowButton} onPress={openPaymentSheet}>
        <Text style={styles.payNowButtonText}>Pay Now</Text>
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
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  cartItemText: {
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
  },
  payNowButton: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  payNowButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
