import React, { useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';

export default function DurationExercise({ route, navigation }) {
  const { exercise, exercises } = route.params || {};
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const suggestedExercise = exercises?.find(
    (ex) => ex.id === exercise?.suggested
  );

  const startTimer = () => {
    if (running) return;

    setRunning(true);

    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalRef.current);
      setRunning(false);
    }, 10000);
  };

  return (
    <View>
      <Text>{exercise?.name}</Text>
      <Text>Time: {time}s</Text>

      <Button title="Start Timer" onPress={startTimer} />
      <Button title="Reset" onPress={() => setTime(0)} />

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