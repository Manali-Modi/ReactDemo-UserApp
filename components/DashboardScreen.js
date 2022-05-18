import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList
} from 'react-native';

const DashboardScreen = () => {

  const [products, setProducts] = useState(null);
  const [isFetching, setFetching] = useState(false);

  const getProducts = async () => {
    const allData = await fetch('https://dummyjson.com/products?limit=10');
    const jsonData = await allData.json();
    const productList = jsonData.products;
    setProducts(productList);
    setFetching(false);
  }

  useEffect(() => {
    getProducts();
  }, [])

  const rowItem = ({item}) => {
    return (
      <View style={ownStyle.card}>
        <Image style={ownStyle.thumbnail} source={{ uri: item.thumbnail }} />

        <View style={ownStyle.content}>
          <Text style={ownStyle.title}>{item.title}</Text>

          <View style={ownStyle.horizontalView}>
            <Image style={ownStyle.icon} source={require('../assets/star.png')} />
            <Text style={ownStyle.smallText}>{item.rating}</Text>
          </View>

          <View style={ownStyle.horizontalView}>
            <Text style={ownStyle.priceText}>Rs.</Text>
            <Text style={ownStyle.priceText}>{item.price}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View>
      <FlatList
      data={products}
      renderItem={rowItem}
      style={{marginVertical:4}}
      refreshing={isFetching}
      onRefresh={() => {
        setProducts(null);
        setFetching(true);
        getProducts();
      }}
    />
    </View>
  )
}

const ownStyle = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    elevation: 5,
    marginHorizontal: 8,
    marginVertical: 4,
    flexDirection: 'row'
  },
  thumbnail: {
    width: 80,
    height: 80
  },
  content: {
    flexDirection: 'column',
    marginStart: 16
  },
  title: {
    fontSize: 20,
    color: 'blue'
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 12,
    height: 12
  },
  smallText: {
    fontSize: 12
  },
  priceText: {
    fontSize: 18,
    color: 'black',
    marginTop: 8
  }
})
export default DashboardScreen;