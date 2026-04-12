import React from 'react';
import { View, FlatList } from 'react-native';
import { Button } from '@rneui/themed';

export default function Home({ navigation }) {
  const exercises = [
    { id: '1', name: 'Push Ups', type: 'reps', suggested: '2' },
    { id: '2', name: 'Plank', type: 'duration', suggested: '1' }
  ];

  const renderItem = ({ item }) => (
    <Button
      title={item.name}
      onPress={() => {
        if (item.type === 'reps') {
          navigation.push('RepetitionExercise', {
            exercise: item,
            exercises
          });
        } else {
          navigation.push('DurationExercise', {
            exercise: item,
            exercises
          });
        }
      }}
    />
  );

  return (
    <View>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}