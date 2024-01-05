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
import { createTodoData,  updateTodoData, ClearError, ClearMessage} from "@redux/reducer/todoSlice";
import { useAuth } from "@context/auth";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FormatDateTime } from "@config/format.js";
import SelectDropdown from "react-native-select-dropdown";
import { getRepeatTypeData } from "@redux/reducer/todoSlice";
import {useRoute} from '@react-navigation/native';
import ToastManager, {Toast} from "toastify-react-native";

export const AddTodo = ({ navigation }) => {
  const route = useRoute();
  const remindValue =[
    {
      name: "Không nhắc nhở",
      value: 0,
    },
    {
      name: "Trước 5 phút",
      value: 5,
    },
    {
      name: "Trước 10 phút",
      value: 10,
    },
    {
      name: "Trước 15 phút",
      value: 15,
    },
    {
      name: "Trước 30 phút",
      value: 30,
    },
    {
      name: "Trước 1 giờ",
      value: 60,
    }
  ]
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
    remind_time: 0,
  });
  const state = useSelector((state) => state.todo);
  const { todoData } = state;

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
    Toast.error('Vui long nhap title va chi tiet', 'bottom');
    if(data.title == '' && data.details == ''){
      Toast.error('Vui long nhap title va chi tiet', 'bottom');
    }
    else{
      console.log("submit success");
      dispatch(createTodoData(data));
      // navigation.navigate("Home");
      navigation.goBack();
    }
    // Alert.alert("Thông báo", message);
    // navigation.navigate("Home");
  };

  const fetchData = async () => {
    dispatch(getRepeatTypeData());
  };
  console.log(route)
  useEffect(() => {
    if(error){
      Toast.error(error.message, 'top');
      dispatch(ClearError());
    }
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
      <ToastManager />
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
          placeholder="Nhập chi tiết"
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
            {data.start_time ? FormatDateTime(currentDate).split(" ")[1] : "Chua co gio bat dau"}
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
        <Icon name="bell" size={30} color="#900" />
        <SelectDropdown
          data={remindValue}
          onSelect={(selectedItem, index) => {
            setData({ ...data, remind_time: selectedItem.value });
          }}
          defaultButtonText="Không nhắc nhở"
          rowTextForSelection={(item, index) => {
            return item.name;
          }
          }
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.name;
          }}
          buttonStyle={styles.dropdown}
        />
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
        <Text>Lặp lại</Text>
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
              value={data.repeat_every ? data.repeat_every.toString() : ""}
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
