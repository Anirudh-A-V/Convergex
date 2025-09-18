import React, { useState } from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface Props {
  date: Date;
  onDateChange: (newDate: Date) => void;
}

export default function CustomDateTimePicker({ date, onDateChange }: Props) {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    onDateChange(currentDate);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => showMode('date')} style={{ marginBottom: 12 }}>
        <Text>Date: {date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => showMode('time')}>
        <Text>Time: {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}