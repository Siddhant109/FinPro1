import { Text, View, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
//import { LinearGradient } from 'expo-linear-gradient';
//import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (

        <View className='flex-1 flex justify-end'>
      

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../../assets/logo.png')}
                />
            </View>

            <View className='p-5 pb-10 space-y-8'>
                {/* <LinearGradient
                    colors={['transparent', 'rgba(3, 84, 24,0.8)']}
                    style={{ width: wp(100), height: hp(60) }}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    className="absolute bottom-0"
                /> */}
                <View className='space-y-3' style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text className="text-white font-bold text-5xl" style={{ fontSize: 20 }}>Water Supply Management!</Text>
                    <Text className="text-neutral-200 font-medium" style={{ fontSize: 10 }}>
                        Empowering Water Management: IoT Solutions for a Sustainable Future
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Form")} style={{ backgroundColor: theme.bg(1) }} className="mx-auto p-3 px-12 rounded-full">
                    <Text className="text-white font-bold" style={{ fontSize: 7 }}>Let's go!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
