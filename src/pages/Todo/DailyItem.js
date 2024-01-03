import { View, Text, TouchableOpacity } from "react-native";
import styles from "@css/listitem.module.css";
import Icon from "react-native-vector-icons/FontAwesome";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useDispatch } from "react-redux";
import { completeTodoData, getTodayTodoData, uncompleteTodoData } from "@redux/reducer/todoSlice";
import { useAuth } from "@context/auth";
import {FormatDateTime, FormatDatetimeDMYHM} from '@config/format';
export const DailyItem = ({ item }) => {
    const dispatch = useDispatch();
    const {auth, setAuth} = useAuth();
    const checkTodo = async (id) => {
        await dispatch(completeTodoData(id));
        await dispatch(getTodayTodoData(auth.id));
    }
    const uncheckTodo = async (id) => {
        await dispatch(uncompleteTodoData(id));
        await dispatch(getTodayTodoData(auth.id));
    }
  return (
    <Swipeable
      renderRightActions={() => (
        <View style={[styles.twoCol2]}>
          <TouchableOpacity  style={styles.swiperEdit}>
            <Icon name="edit" size={30} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.swiperDelete}>
            <Icon name="trash" size={30} color="#ffffff" />
          </TouchableOpacity>
        </View>
      )}
      containerStyle={[styles.swiperContainer, item.completed && styles.completeTodo]}
    >
      <View style={styles.twoCol}>
        <Text style={styles.timeText}>{FormatDateTime(item.start_time).split(" ")[1]}</Text>
        <View style={styles.details}>
          <Text>{item.title}</Text>
          <Text>{item.details}</Text>
        </View>
      </View>
    </Swipeable>
  );
};
