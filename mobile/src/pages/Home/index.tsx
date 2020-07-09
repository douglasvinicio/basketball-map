import React, { useState } from 'react';
import { Feather as Icon } from "@expo/vector-icons";
import { View, ImageBackground, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform, Picker } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
    const [country,setCountry] = useState('');
    const [city,setCity] = useState('');
    
    const navigation = useNavigation();

    

    function handleNavigateToCourts() {
        navigation.navigate('Courts', {
          country,
          city
        });
    }

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior ={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ImageBackground source={require('../../assets/home-background.jpg')}style ={styles.container}
    resizeMode="cover">
        <View style={styles.main}>
        <Image  style = {styles.img}source={require('../../assets/logo.png')} />
        <View>
        <Text style={styles.title}>Go have some fun!</Text>
        <Text style={styles.description}>We help you to find a court near you.</Text>
        </View>
        </View>

        <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
          />
          <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
          />
        <RectButton style={styles.button} onPress={handleNavigateToCourts}>
            <View style={styles.buttonIcon}>
            <Text>
                <Icon name="arrow-right" color="#f5f7fa" size={24} />
            </Text>
             </View>
             <Text style={styles.buttonText}>
            Search
        </Text>
        </RectButton>
        </View>
    </ImageBackground>
    </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },

    img:{
        width: 100,
        height: 80,
    },
  
    title: {
      color: '#100000',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#100000',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#ed9005',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 0,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home;