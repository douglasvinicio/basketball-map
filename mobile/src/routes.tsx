import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from './pages/Home'; 
import Courts from './pages/Courts'; 
import Characteristics from './pages/Detail'; 
import Detail from './pages/Detail';

const AppStack = createStackNavigator();

const Routes = () => {
    return(
        <NavigationContainer>
            <AppStack.Navigator headerMode ="none"
            screenOptions={{
                cardStyle:{
                    backgroundColor: "#f0f0f5"
                }
            }}>
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="Courts" component={Courts}/>
                <AppStack.Screen name="Detail" component={Detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;