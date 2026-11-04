import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ScrollView,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const [menu, setMenu] = useState([]);
  const [screen, setScreen] = useState('add');

  const [editingId, setEditingId] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const clearForm = () => {
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
  };

  const addItem = () => {
    const numericPrice = parseFloat(price);

    if (
      !dishName.trim() ||
      !description.trim() ||
      !course ||
      isNaN(numericPrice)
    ) {
      alert('Please complete all fields');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      dishName,
      description,
      course,
      price: numericPrice,
    };

    setMenu([...menu, newItem]);

    clearForm();

    alert('Menu item added successfully!');
  };

  const editItem = (item) => {
    setEditingId(item.id);

    setDishName(item.dishName);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price.toString());

    setScreen('add');
  };

  const updateItem = () => {
    const numericPrice = parseFloat(price);

    if (
      !dishName.trim() ||
      !description.trim() ||
      !course ||
      isNaN(numericPrice)
    ) {
      alert('Please complete all fields');
      return;
    }

    const updatedMenu = menu.map((item) =>
      item.id === editingId
        ? {
            ...item,
            dishName,
            description,
            course,
            price: numericPrice,
          }
        : item
    );

    setMenu(updatedMenu);

    setEditingId(null);

    clearForm();

    alert('Menu item updated successfully!');

    setScreen('view');
  };

  const deleteItem = (id) => {
    const updatedMenu = menu.filter(
      (item) => item.id !== id
    );

    setMenu(updatedMenu);

    alert('Menu item deleted successfully');
  };

  const clearFilters = () => {
    setSearchText('');
    setSelectedFilter('All');
  };

  const filteredMenu = menu.filter((item) => {
    const searchMatch =
      item.dishName
        .toLowerCase()
        .includes(searchText.toLowerCase());

    const filterMatch =
      selectedFilter === 'All' ||
      item.course === selectedFilter;

    return searchMatch && filterMatch;
  });

  const totalItems = menu.length;

  const averagePrice =
    totalItems > 0
      ? (
          menu.reduce(
            (sum, item) => sum + item.price,
            0
          ) / totalItems
        ).toFixed(2)
      : 0;

  const starters = menu.filter(
    (item) => item.course === 'Starter'
  ).length;

  const mainCourses = menu.filter(
    (item) => item.course === 'Main Course'
  ).length;

  const desserts = menu.filter(
    (item) => item.course === 'Dessert'
  ).length;

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
        marginTop: 40,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        Chef's Menu Manager
      </Text>

      {screen === 'add' && (
        <>
          <TextInput
            placeholder="Dish Name"
            value={dishName}
            onChangeText={setDishName}
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
              backgroundColor: '#fff',
            }}
          />

          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
              backgroundColor: '#fff',
            }}
          />

          <Picker
            selectedValue={course}
            onValueChange={(value) =>
              setCourse(value)
            }
          >
            <Picker.Item
              label="Select Course"
              value=""
            />
            <Picker.Item
              label="Starter"
              value="Starter"
            />
            <Picker.Item
              label="Main Course"
              value="Main Course"
            />
            <Picker.Item
              label="Dessert"
              value="Dessert"
            />
          </Picker>

          <TextInput
            placeholder="Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
              backgroundColor: '#fff',
            }}
          />

          <Button
            title={
              editingId
                ? 'Update Item'
                : 'Save Item'
            }
            onPress={
              editingId
                ? updateItem
                : addItem
            }
          />

          <View style={{ marginTop: 10 }}>
            <Button
              title="View Menu"
              onPress={() =>
                setScreen('view')
              }
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Button
              title="View Statistics"
              onPress={() =>
                setScreen('stats')
              }
            />
          </View>
        </>
      )}

      {screen === 'view' && (
        <>
          <TextInput
            placeholder="Search Menu Item"
            value={searchText}
            onChangeText={setSearchText}
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
              backgroundColor: '#fff',
            }}
          />

          <Picker
            selectedValue={selectedFilter}
            onValueChange={(value) =>
              setSelectedFilter(value)
            }
          >
            <Picker.Item
              label="All Courses"
              value="All"
            />
            <Picker.Item
              label="Starter"
              value="Starter"
            />
            <Picker.Item
              label="Main Course"
              value="Main Course"
            />
            <Picker.Item
              label="Dessert"
              value="Dessert"
            />
          </Picker>

          <Button
            title="Clear Filters"
            onPress={clearFilters}
          />

          <FlatList
            data={filteredMenu}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: '#e6f7ff',
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  {item.dishName}
                </Text>

                <Text>
                  {item.description}
                </Text>

                <Text>
                  Course: {item.course}
                </Text>

                <Text>
                  Price: R{item.price}
                </Text>

                <Button
                  title="Edit"
                  onPress={() =>
                    editItem(item)
                  }
                />

                <Button
                  title="Delete"
                  color="red"
                  onPress={() =>
                    deleteItem(item.id)
                  }
                />
              </View>
            )}
          />

          <Button
            title="Add Item"
            onPress={() =>
              setScreen('add')
            }
          />

          <Button
            title="Statistics"
            onPress={() =>
              setScreen('stats')
            }
          />
        </>
      )}

      {screen === 'stats' && (
        <>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: 15,
            }}
          >
            Menu Statistics
          </Text>

          <Text>
            Total Menu Items: {totalItems}
          </Text>

          <Text>
            Average Price: R{averagePrice}
          </Text>

          <Text>
            Starters: {starters}
          </Text>

          <Text>
            Main Courses: {mainCourses}
          </Text>

          <Text>
            Desserts: {desserts}
          </Text>

          <View style={{ marginTop: 15 }}>
            <Button
              title="Add Item"
              onPress={() =>
                setScreen('add')
              }
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Button
              title="View Menu"
              onPress={() =>
                setScreen('view')
              }
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

