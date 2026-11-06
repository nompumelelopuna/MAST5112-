import React, { useState } from "react";
import {
  View, Text, TextInput, FlatList, ScrollView, Alert,
  TouchableOpacity, StyleSheet,
} from "react-native";

// REUSABLE COMPONENT - for Enhancement marks
const CustomButton = ({ title, onPress, style, textStyle }) => (
  <TouchableOpacity style={[styles.primaryBtn, style]} onPress={onPress}>
    <Text style={[styles.primaryBtnText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const StatCard = ({ emoji, value, label }) => (
  <View style={styles.statBox}>
    <Text style={styles.statEmoji}>{emoji}</Text>
    <View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

export default function App() {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("Starter");
  const [price, setPrice] = useState("");
  const [menu, setMenu] = useState([]);
  const [screen, setScreen] = useState("add");
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showCourseOptions, setShowCourseOptions] = useState(false);

  const clearForm = () => {
    setDishName(""); setDescription(""); setCourse("Starter"); setPrice("");
  };

  const validateForm = () => {
    const numericPrice = parseFloat(price);
    if (!dishName.trim() || dishName.trim().length < 3) {
      Alert.alert("Validation Error", "Dish name must be at least 3 characters.");
      return false;
    }
    if (!description.trim()) {
      Alert.alert("Validation Error", "Please enter a description.");
      return false;
    }
    if (!price || isNaN(numericPrice) || numericPrice <= 0) {
      Alert.alert("Validation Error", "Please enter a valid price greater than 0.");
      return false;
    }
    return true;
  };

  const addItem = () => {
    if (!validateForm()) return;
    const newItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: parseFloat(price),
    };
    setMenu([...menu, newItem]);
    clearForm();
    Alert.alert("Success", "Menu item added successfully.");
  };

  const editItem = (item) => {
    setEditingId(item.id);
    setDishName(item.dishName);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price.toString());
    setScreen("add");
  };

  const updateItem = () => {
    if (!validateForm()) return;
    setMenu(menu.map((item) =>
      item.id === editingId
        ? { ...item, dishName, description, course, price: parseFloat(price) }
        : item
    ));
    setEditingId(null);
    clearForm();
    Alert.alert("Updated", "Menu item updated successfully.");
    setScreen("view");
  };

  const deleteItem = (id) => {
    Alert.alert("Delete Menu Item", "Are you sure you want to delete this item?", [
      { text: "Cancel" },
      { text: "Delete", onPress: () => setMenu(menu.filter((item) => item.id !== id)) },
    ]);
  };

  const clearFilters = () => { setSearchText(""); setSelectedFilter("All"); };

  const filteredMenu = menu.filter((item) => {
    const matchesSearch = item.dishName.toLowerCase().includes(searchText.toLowerCase());
    const matchesCourse = selectedFilter === "All" || item.course === selectedFilter;
    return matchesSearch && matchesCourse;
  });

  const totalItems = menu.length;
  const averagePrice = totalItems > 0
    ? (menu.reduce((sum, item) => sum + item.price, 0) / totalItems).toFixed(2)
    : "0.00";
  const starters = menu.filter((i) => i.course === "Starter").length;
  const mains = menu.filter((i) => i.course === "Main Course").length;
  const desserts = menu.filter((i) => i.course === "Dessert").length;
  const filters = ["All", "Starter", "Main Course", "Dessert"];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👨‍🍳 Chef's Menu Manager</Text>
        <Text style={styles.headerSubtitle}>Create, manage and analyse restaurant menu items</Text>
        <View style={styles.navRow}>
          {["add", "view", "stats"].map((s) => (
            <TouchableOpacity key={s} style={[styles.navBtn, screen === s && styles.navBtnActive]} onPress={() => setScreen(s)}>
              <Text style={[styles.navBtnText, screen === s && styles.navBtnTextActive]}>
                {s === "add" ? "➕ Add" : s === "view" ? "📋 View Menu" : "📊 Statistics"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {screen === "add" && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{editingId ? "Edit Menu Item" : "Add New Dish"}</Text>
          <Text style={styles.label}>Dish Name</Text>
          <TextInput placeholder="e.g. Grilled Chicken" value={dishName} onChangeText={setDishName} style={styles.input} />
          <Text style={styles.label}>Description</Text>
          <TextInput placeholder="e.g. Served with peri-peri sauce" value={description} onChangeText={setDescription} style={[styles.input, { height: 80, textAlignVertical: "top" }]} multiline />

          <Text style={styles.label}>Select Course</Text>
          <TouchableOpacity onPress={() => setShowCourseOptions(!showCourseOptions)} style={styles.pickerBox}>
            <Text style={{ padding: 14, fontWeight: "700", color: "#1E3A5F" }}>{course} ▼</Text>
          </TouchableOpacity>

          {showCourseOptions && (
            <View style={[styles.pickerBox, { marginTop: 5 }]}>
              {["Starter", "Main Course", "Dessert"].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => { setCourse(item); setShowCourseOptions(false); }}
                  style={{ padding: 14, backgroundColor: course === item ? "#EFF6FF" : "#fff" }}
                >
                  <Text style={{ fontWeight: course === item ? "800" : "600", color: "#1E3A5F" }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Text style={styles.selectedText}>Selected: {course}</Text>

          <Text style={styles.label}>Price (R)</Text>
          <TextInput placeholder="e.g. 129.99" keyboardType="numeric" value={price} onChangeText={setPrice} style={styles.input} />
          <CustomButton title={editingId ? "✅ Update Item" : "💾 Save Item"} onPress={editingId ? updateItem : addItem} />
          <View style={styles.rowBtns}>
            <CustomButton title="View Menu" onPress={() => setScreen("view")} style={styles.secondaryBtn} textStyle={styles.secondaryBtnText} />
            <CustomButton title="Statistics" onPress={() => setScreen("stats")} style={styles.secondaryBtn} textStyle={styles.secondaryBtnText} />
          </View>
        </View>
      )}

      {screen === "view" && (
        <View>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Menu Items</Text>
            <TextInput placeholder="🔍 Search Menu Item" value={searchText} onChangeText={setSearchText} style={styles.input} />
            <View style={styles.pillRow}>
              {filters.map((f) => (
                <TouchableOpacity key={f} onPress={() => setSelectedFilter(f)} style={[styles.pill, selectedFilter === f && styles.pillActive]}>
                  <Text style={[styles.pillText, selectedFilter === f && styles.pillTextActive]}>{f}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <CustomButton title="Clear Filters" onPress={clearFilters} style={{ backgroundColor: "#FF9800" }} />
          </View>
          {filteredMenu.length === 0 ? (
            <View style={styles.emptyBox}><Text style={{ fontSize: 40 }}>🍽️</Text><Text style={styles.emptyTitle}>No dishes found</Text></View>
          ) : (
            <FlatList data={filteredMenu} keyExtractor={(i) => i.id} scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.itemCard}>
                  <Text style={styles.itemName}>{item.dishName}</Text>
                  <Text style={styles.itemDesc}>{item.description}</Text>
                  <Text>Course: {item.course}</Text>
                  <Text style={styles.itemPrice}>R{item.price}</Text>
                  <View style={styles.itemBtnRow}>
                    <CustomButton title="✏️ Edit" onPress={() => editItem(item)} style={{ flex: 1 }} />
                    <CustomButton title="🗑️ Delete" onPress={() => deleteItem(item.id)} style={{ flex: 1, backgroundColor: "#FEF2F2", borderWidth: 1, borderColor: "#FECACA" }} textStyle={{ color: "#DC2626" }} />
                  </View>
                </View>
              )}
            />
          )}
          <CustomButton title="➕ Add New Item" onPress={() => setScreen("add")} />
        </View>
      )}

      {screen === "stats" && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Menu Statistics</Text>
          <StatCard emoji="📋" value={totalItems} label="Total Menu Items" />
          <StatCard emoji="💰" value={`R${averagePrice}`} label="Average Price" />
          <StatCard emoji="🥗" value={starters} label="Starters" />
          <StatCard emoji="🍽️" value={mains} label="Main Courses" />
          <StatCard emoji="🍰" value={desserts} label="Desserts" />
          <CustomButton title="Back to Menu" onPress={() => setScreen("view")} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F1F5F9", padding: 16, paddingTop: 50 },
  header: { backgroundColor: "#1E3A5F", borderRadius: 20, padding: 20, marginBottom: 16 },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#fff", textAlign: "center" },
  headerSubtitle: { color: "#CBD5E1", textAlign: "center", marginTop: 6, fontSize: 13 },
  navRow: { flexDirection: "row", gap: 8, marginTop: 16 },
  navBtn: { flex: 1, backgroundColor: "rgba(255,255,255,0.15)", paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  navBtnActive: { backgroundColor: "#fff" },
  navBtnText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  navBtnTextActive: { color: "#1E3A5F" },
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 18, marginBottom: 16, elevation: 3 },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: "#1E3A5F" },
  label: { fontWeight: "700", color: "#334155", marginBottom: 8, marginTop: 10 },
  input: { backgroundColor: "#F8FAFC", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, padding: 14, marginBottom: 10 },
  pickerBox: { backgroundColor: "#F8FAFC", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, marginBottom: 8, overflow: "hidden" },
  selectedText: { fontWeight: "700", color: "#1E3A5F", marginBottom: 10 },
  pillRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  pill: { backgroundColor: "#F1F5F9", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: "#E2E8F0" },
  pillActive: { backgroundColor: "#1E3A5F" },
  pillText: { color: "#334155", fontWeight: "700", fontSize: 13 },
  pillTextActive: { color: "#fff" },
  primaryBtn: { backgroundColor: "#1E3A5F", paddingVertical: 15, borderRadius: 14, alignItems: "center", marginTop: 4 },
  primaryBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  secondaryBtn: { flex: 1, backgroundColor: "#EFF6FF", borderWidth: 1, borderColor: "#DBEAFE" },
  secondaryBtnText: { color: "#1E3A5F" },
  rowBtns: { flexDirection: "row", gap: 10, marginTop: 10 },
  emptyBox: { backgroundColor: "#fff", borderRadius: 20, padding: 30, alignItems: "center", marginBottom: 16 },
  emptyTitle: { fontSize: 17, fontWeight: "800", color: "#1E3A5F" },
  itemCard: { backgroundColor: "#fff", padding: 16, borderRadius: 18, marginBottom: 12 },
  itemName: { fontSize: 18, fontWeight: "800", color: "#1E3A5F" },
  itemDesc: { color: "#64748B", marginTop: 6 },
  itemPrice: { fontWeight: "800", fontSize: 17, marginTop: 10 },
  itemBtnRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  statBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#F8FAFC", borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "#E2E8F0" },
  statEmoji: { fontSize: 28, marginRight: 14 },
  statValue: { fontSize: 22, fontWeight: "800", color: "#1E3A5F" },
  statLabel: { color: "#64748B", fontSize: 13 },
});
