import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar = () => {
    return (
        <View className='mt-5 flex-row items-center border-[1.5px] border-[#8A2B9133] rounded-xl bg-white/50 px-4 h-14'>
            <TextInput
                className='flex-1 font-aleo-regular text-[#18053799] text-lg'
                placeholder='Search for members'
                placeholderTextColor='#18053766'
            />
            <View className='w-[1px] h-8 bg-[#8A2B9133] mx-3' />
            <Icon name="magnify" size={28} color="#18053799" />
        </View>
    );
};

export default SearchBar;
