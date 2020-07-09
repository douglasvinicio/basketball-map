import React, { useEffect, useState } from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text , SafeAreaView } from 'react-native';
import { Feather as Icon , FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

interface Params {
  court_id: number;
}

interface Data {
  court: {
    image: string;
    title: string;
    address: string;
    region: string;
    city: string;
  };
  characteristics: {
    title: string; 
  }[];
}

const Detail = () => {

  
  const [data, setData] = useState<Data>({}as Data);  

    const navigation = useNavigation(); 
    const route = useRoute();

    const routeParams = route.params as Params;

    useEffect(() => {
      api.get(`courts/${routeParams.court_id}`).then(response => {
        setData(response.data);
      });
    },[]);

    function handleNavigateBack(){
        navigation.goBack();
    }

    if (!data.court){
      return null; // Best having a loading screen. Returning nothing untill being loaded the function and data from database.
    }

    return(
        <SafeAreaView style={{ flex:1 }}>
        <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigateBack}>
                <Icon name="arrow-left" size={20} color="#ed9005" />
            </TouchableOpacity>

            <Image style={styles.pointImage} source={{ uri:data.court.image }} />
            <Text style={styles.pointName}>{data.court.title}</Text>
            <Text style={styles.pointItems}> 
            {data.characteristics.map(characteristic => characteristic.title).join()}</Text>

            <View style={styles.address}>
                <Text style={styles.addressTitle}>Adress</Text>
                <Text style={styles.addressContent}>{data.court.address}, {data.court.city}, {data.court.region}</Text>
            </View>
        </View>
        <View style= {styles.footer}>
            <RectButton style={styles.button} onPress={() => {}}>
                <FontAwesome name="telegram" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Group Chat</Text>
            </RectButton>

            <RectButton style={styles.button} onPress={() => {}}>
                <FontAwesome name="map" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Directions</Text>
            </RectButton>
        </View>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 20,
    },
  
    pointImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    pointName: {
      color: '#322153',
      fontSize: 28,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    pointItems: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    address: {
      marginTop: 32,
    },
    
    addressTitle: {
      color: '#322153',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
  
    addressContent: {
      fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      width: '48%',
      backgroundColor: '#ed9005',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'Roboto_500Medium',
    },
  });


export default Detail; 