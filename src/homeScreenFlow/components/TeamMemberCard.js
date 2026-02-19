import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TeamMemberCard = ({ member }) => {
    return (
        <View key={member.id} className="bg-white rounded-xl p-4 mt-6 shadow-sm shadow-[#8A2B9122]" >
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <Image
                        source={{ uri: member.image }}
                        className="w-14 h-14 rounded-full mr-4 bg-[#8A2B9111]"
                    />
                    <View>
                        <Text className="text-xl font-aleo-bold text-[#8A2B91CC]">{member.name}</Text>
                        <Text className="text-l font-aleo-semibold text-[#18053799]">{member.email}</Text>
                    </View>
                </View>
                <View className="self-start">
                    <Icon name="dots-horizontal" size={24} color="#18053733" />
                </View>
            </View>
            <View className="mt-4 b border-[#00000005] pt-3">
                <Text className="text-sm font-aleo-medium text-[#18053799]">
                    {member.role}
                </Text>
            </View>
        </View>
    );
};

export default TeamMemberCard;
