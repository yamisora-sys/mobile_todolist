import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  Switch,
} from "react-native";
import styles from "@css/addtodo.module.css";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import { Loading } from "@components/Loading";
import { createTodoData } from "@redux/reducer/todoSlice";
import { useAuth } from "@context/auth";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FormatDateTime } from "@config/format.js";
import SelectDropdown from "react-native-select-dropdown";
import { getRepeatTypeData } from "@redux/reducer/todoSlice";
export const AddTodo = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { auth, setAuth } = useAuth();
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [data, setData] = useState({
    user_id: auth.id,
    title: "",
    details: "",
    imageURL: "hello",
    repeat: 0,
    repeat_type_id: null,
    repeat_every: null,
    start_time: FormatDateTime(currentDate),
    category_id: null,
  });

  //   const [repeat, setRepeat] = useState(false);
  //   const [repeatId, setRepeatId] = useState(null);
  //   const [repeatEvery, setRepeatEvery] = useState(null);
  //   const [categoryId, setCategoryId] = useState(null);
  //   const [title, setTitle] = useState("");
  //   const [details, setDetails] = useState("");
  const { loading, error, message, repeatType, category } = useSelector(
    (state) => state.todo
  );
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    console.log(54, data);
    dispatch(createTodoData(data));
    Alert.alert("Thông báo", message);
    navigation.navigate("Home");
  };
  const fetchData = async () => {
    dispatch(getRepeatTypeData());
  };
  useEffect(() => {
    fetchData();
  }, []);
  const switchRepeat = (text) => {
    if (text == true) {
      setData({
        ...data,
        repeat_type_id: repeatType[0].id,
        repeat_every: repeatType[0].repeat_every,
      });
      //   setRepeatId(repeatType[0].id);
      //   setRepeatEvery(repeatType[0].repeat_every);
    } else {
      setData({ ...data, repeat_type_id: null, repeat_every: null });
      //   setRepeatId(null);
      //   setRepeatEvery(null);
    }
    setData({ ...data, repeat: text });
  };
  return (
    <View style={styles.container}>
      <View style={styles.twoCol}>
        <Icon name="file" size={30} color="#900" />
        <TextInput
          style={styles.input}
          placeholder="Nhập tiêu đề"
          onChangeText={(text) => setData({ ...data, title: text })}
        />
      </View>
      <View style={styles.twoCol}>
        <Icon name="file" size={30} color="#900" />
        <TextInput
          style={styles.input}
          placeholder="Nhập mo ta"
          onChangeText={(text) => setData({ ...data, details: text })}
        />
      </View>
      <View style={styles.twoCol}>
        <Icon name="calendar" size={30} color="#900" />
        <TouchableOpacity onPress={() => setShowDate(true)}>
          <Text style={styles.input}>
            {" "}
            {data.start_time
              ? FormatDateTime(currentDate).split(" ")[0]
              : "Chua co ngay bat dau"}
          </Text>
        </TouchableOpacity>
        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={currentDate}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              setShowDate(false);
              setCurrentDate(date);
              let res = FormatDateTime(date);
              setData({ ...data, start_time: res });
            }}
          />
        )}
      </View>
      <View style={styles.twoCol}>
        <Icon name="clock-o" size={30} color="#900" />
        <TouchableOpacity onPress={() => setShowTime(true)}>
          <Text style={styles.input}>
            {" "}
            {data.start_time ? data.start_time : "Chua co gio bat dau"}
          </Text>
        </TouchableOpacity>
        {showTime && (
          <DateTimePicker
            testID="dateTimePicker"
            value={currentDate}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              setShowTime(false);
              setCurrentDate(date);
              let res = FormatDateTime(date);
              setData({ ...data, start_time: res });
            }}
          />
        )}
      </View>
      <View style={styles.twoCol}>
        <Icon name="list-ul" size={30} color="#900" />
        <SelectDropdown
          data={category}
          onSelect={(selectedItem, index) => {
            // setData({...data, category_id: selectedItem.id})
            setData({ ...data, category_id: selectedItem.id });
          }}
          defaultButtonText="Chọn danh mục"
          rowTextForSelection={(item, index) => {
            return item.name;
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.name;
          }}
          buttonStyle={styles.dropdown}
        />
      </View>
      <View style={styles.switch}>
        <Text>Lap lai</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={data.repeat ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(text) => switchRepeat(text)}
          value={data.repeat}
        />
      </View>
      {data.repeat ? (
        <View>
          <View style={styles.twoCol}>
            <Icon name="repeat" size={30} color="#900" />
            <SelectDropdown
              data={repeatType}
              onSelect={(selectedItem, index) => {
                setData({
                  ...data,
                  repeat_type_id: selectedItem.id,
                  repeat_every: selectedItem.repeat_every,
                });
                // setRepeatId(selectedItem.id);
                // setRepeatEvery(selectedItem.repeat_every);
              }}
              defaultButtonText="chọn thời gian lặp lại"
              rowTextForSelection={(item, index) => {
                return item.description;
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.description;
              }}
              buttonStyle={styles.dropdown}
            />
          </View>
          <View style={styles.twoCol}>
            <Icon name="repeat" size={30} color="#900" />
            <TextInput
              style={styles.input}
              inputMode="numeric"
              placeholder="Nhập khoảng thời gian lặp lại, mặc định là 1"
              onChangeText={(text) => setData({ ...data, repeat_every: text })}
            />
          </View>
        </View>
      ) : (
        <View></View>
      )}
      <TouchableOpacity style={styles.button} onPress={() => handleAddTodo()}>
        <Icon name="plus-circle" size={50} color="#900" />
      </TouchableOpacity>
    </View>
  );
};
