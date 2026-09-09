import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [menu, setMenu] = useState([]);
  const [screen, setScreen] = useState('add'); // add, view, stats

  const addItem = () => {
    const numericPrice = parseFloat(price);
    if (!dishName.trim() || isNaN(numericPrice)) {
      alert('Dish name and price are required!');
      return;
    }
    const newItem = { id: Date.now().toString(), dishName, description, course, price: numericPrice };
    setMenu([...menu, newItem]);
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    alert('Menu item added successfully!');
  };

  // Statistics
  const totalDishes = menu.length;
  const averagePrice = totalDishes > 0 ? (menu.reduce((sum, item) => sum + item.price, 0) / totalDishes).toFixed(2) : 0;
  const courseCounts = menu.reduce((counts, item) => {
    const c = item.course || 'Unspecified';
    counts[c] = (counts[c] || 0) + 1;
    return counts;
  }, {});

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 40, backgroundColor: '#f9f9f9' }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' }}>
        Chef's Menu Manager
      </Text>

      {screen === 'add' && (
        <>
          <TextInput
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 12, borderRadius: 8, backgroundColor: '#fff' }}
            placeholder="Dish Name"
            value={dishName}
            onChangeText={setDishName}
          />
          <TextInput
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 12, borderRadius: 8, backgroundColor: '#fff' }}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 12, borderRadius: 8, backgroundColor: '#fff' }}
            placeholder="Course (Starter/Main/Dessert)"
            value={course}
            onChangeText={setCourse}
          />
          <TextInput
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 12, borderRadius: 8, backgroundColor: '#fff' }}
            placeholder="Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <Button title="Save Item" onPress={addItem} />
          <Button title="View Menu" onPress={() => setScreen('view')} />
          <Button title="View Statistics" onPress={() => setScreen('stats')} />
        </>
      )}

      {screen === 'view' && (
        <>
          <FlatList
            data={menu}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={{ fontSize: 18, marginBottom: 8, padding: 10, backgroundColor: '#e6f7ff', borderRadius: 6 }}>
                {item.dishName} - R{item.price}
              </Text>
            )}
          />
          {menu.length === 0 && <Text>No menu items yet.</Text>}
          <Button title="Add Another Item" onPress={() => setScreen('add')} />
          <Button title="View Statistics" onPress={() => setScreen('stats')} />
        </>
      )}

      {screen === 'stats' && (
        <>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Statistics</Text>
          <Text>Total Dishes: {totalDishes}</Text>
          <Text>Average Price: R{averagePrice}</Text>
          {Object.entries(courseCounts).map(([c, count]) => (
            <Text key={c}>{c}: {count}</Text>
          ))}
          <Button title="Add Item" onPress={() => setScreen('add')} />
          <Button title="View Menu" onPress={() => setScreen('view')} />
        </>
      )}
    </View>
  );
}
