import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library you are using
import AntDesign from '@expo/vector-icons/AntDesign';


const data = [
  { label: 'Basketball', value: '1', icon: 'basketball-ball' },
  { label: 'Volleyball', value: '2', icon: 'volleyball-ball' },
  { label: 'Football', value: '3', icon: 'football-ball' },
  { label: 'Cycling', value: '4', icon: 'bicycle' },
  { label: 'Badminton', value: '5', icon: 'badminton' },
  { label: 'Tennis', value: '6', icon: 'tennis-ball' },
  { label: 'Table Tennis', value: '7', icon: 'table-tennis' },
  { label: 'Running', value: '8', icon: 'running' },
  { label: 'Fitness', value: '9', icon: 'gym' },
  { label: 'Other', value: '10', icon: 'ellipsis-h' },
];

const DropdownComponent = ({ selectedSport, onChange }) => {
  const [value, setValue] = useState(selectedSport);
  const [isFocus, setIsFocus] = useState(false);

  const renderSelectedItem = () => {
    const selectedItem = data.find(item => item.value === value);
    if (selectedItem) {
      return (
        <View style={styles.selectedItemContainer}>
          <Icon name={selectedItem.icon} style={styles.icon} />
          <View style={styles.selectedItemTextContainer}>
            <Text style={styles.selectedItemText}>{selectedItem.label}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  const renderLeftIcon = () => {
    if (value) {
      const selectedSportItem = data.find(item => item.value === value);
      if (selectedSportItem) {
        return (
          <Icon
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name={selectedSportItem.icon}
            size={20}
          />
        );
      }
    }
    return (
      <AntDesign
        style={styles.icon}
        color={isFocus ? 'blue' : 'black'}
        name="Safety"
        size={20}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? '  Select Sport' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onChange(item);
        }}
        // renderSelectedItem={renderSelectedItem} // Render the selected item with icon
        // renderLeftIcon={renderLeftIcon} // Render the left icon based on the selected sport
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 6,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  selectedItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedItemTextContainer: {
    flex: 1,
  },
  selectedItemText: {
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
});
