import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';

export default function RepetitionExercise({ route, navigation }) {
  const { exercise, exercises } = route.params || {};
  const [count, setCount] = useState(0);

  const suggestedExercise = exercises?.find(
    (ex) => ex.id === exercise?.suggested
  );

  return (
    <View>
      <Text>{exercise?.name}</Text>
      <Text>Count: {count}</Text>

      <Button title="Increase" onPress={() => setCount(count + 1)} />
      <Button title="Reset" onPress={() => setCount(0)} />

      <Button
        title="Suggested Exercise"
        onPress={() => {
          if (!suggestedExercise) return;

          navigation.push(
            suggestedExercise.type === 'reps'
              ? 'RepetitionExercise'
              : 'DurationExercise',
            { exercise: suggestedExercise, exercises }
          );
        }}
      />

      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}