import { View, Text, TouchableOpacity } from "react-native";
import styles from "@css/todoitem.module.css";
import Icon from "react-native-vector-icons/FontAwesome";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useDispatch } from "react-redux";
import { completeTodoData, getTodayTodoData, uncompleteTodoData } from "@redux/reducer/todoSlice";
import { useAuth } from "@context/auth";
import {FormatDateTime, FormatDatetimeDMYHM} from '@config/format';
export const TodoItem = ({ item, navigation }) => {
    const dispatch = useDispatch();
    const {auth, setAuth} = useAuth();
    const checkTodo = async (id) => {
        await dispatch(completeTodoData(id));
        // await dispatch(getTodayTodoData(auth.id));
    }
    const uncheckTodo = async (id) => {
        await dispatch(uncompleteTodoData(id));
        // await dispatch(getTodayTodoData(auth.id));
    }
  return (
    <Swipeable
      renderRightActions={() => (
        <View style={[styles.twoCol2]}>
          {
            item.completed == 0 ? (
                <TouchableOpacity style={styles.swiperComplete} >
            <Icon name="check-circle" size={30} color="#ffffff" onPress={() => checkTodo(item.id)}/>
          </TouchableOpacity>
            ) :(
                <TouchableOpacity style={styles.swiperComplete} onPress={() => uncheckTodo(item.id)}>
            <Icon name="times-circle-o" size={30} color="#ffffff" />
          </TouchableOpacity>
            )
          }
          <TouchableOpacity  style={styles.swiperEdit} onPress={()=>{
              navigation.navigate('EditTodo', {id: item.id});
          }}>
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
        <View style={styles.details}>
          <Text>{item.title}</Text>
          <Text>{item.details}</Text>
        </View>
        <Text style={styles.timeText}>{FormatDatetimeDMYHM(item.start_time)}</Text>
      </View>
    </Swipeable>
  );
};
