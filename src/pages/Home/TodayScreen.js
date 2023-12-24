import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styles from "@css/home.module.css";
import Icon from "react-native-vector-icons/FontAwesome";
import { ProgressChart } from "react-native-chart-kit";
import { FloatButton } from "@components/FloatButton";
import Collapsible from "react-native-collapsible";
import { useState } from "react";
import {completeTodoData, getTodayTodoData} from '@redux/reducer/todoSlice';
import {useAuth} from '@context/auth';
export const TodayScreen = ({ navigation }) => {
  const state = useSelector((state) => state.todo);
    const { auth, setAuth } = useAuth();
  const { todayProgress, loading, todayData } = state;
  const total = todayData.length;
  const completed = todayData.filter((item) => item.completed == 1).length;
  // get the first incomplete task
  const Incomplete = todayData.find((item) => item.completed == 0);
  const Coming = todayData.find((item) => {
    if (item.completed == 0 && item.id != Incomplete.id) {
      return item;
    }
  });
  const [collapsed, setCollapsed] = useState(true);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  const [collapsed2, setCollapsed2] = useState(true);
    const toggleExpanded2 = () => {
        setCollapsed2(!collapsed2);
    };
    const dispatch = useDispatch();
    const completeTodo = async (id) => {
        await dispatch(completeTodoData(id));
        await dispatch(getTodayTodoData(auth.id));
    }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("TodayList")}>
        <View style={styles.listtask}>
          <View>
            <Text style={styles.titleText}>Today's task</Text>
            <View style={styles.status}>
              <Icon name="check-circle" size={25} color="#ffffff" />
              {completed == total ? (
                <Text>Đã hoàn thành toàn bộ công việc hôm nay</Text>
              ) : (
                <Text>{total - completed} task remaining</Text>
              )}
            </View>
          </View>
          <View style={styles.taskList}>
            <Icon name="chevron-right" size={40} color="#ffffff" />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleExpanded}>
      <View style={styles.inprogress}>
        <View>
          <Text style={styles.titleText}>Inprogress</Text>
          <View style={styles.status}>
            <Icon name="clock-o" size={25} color="#ffffff" />
            <Text>{Incomplete ? Incomplete.title : "No task inprogress"}</Text>
          </View>
        </View>
        <View style={styles.taskList}>
          <Icon name="clock-o" size={40} color="#ffffff" />
        </View>
      </View>
      <Collapsible collapsed={collapsed} align="center">
        <View style={styles.collapsible}>
        <Icon name="info-circle" size={20} color="#ffffff"/>
          <Text style={styles.detailText}>{Incomplete ? Incomplete.description : ""}</Text>
          {
                Incomplete ? (
                    <TouchableOpacity onPress={() => completeTodo(Incomplete.id)}>
                        <Icon name="check-circle" size={20} color="green" />
                    </TouchableOpacity>
                ) : (
                    <Text></Text>
                )
          }
        </View>
        </Collapsible>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleExpanded2}>
      <View style={styles.incoming}>
        <View>
          <Text style={styles.titleText}>Coming</Text>
          <View style={styles.status}>
            <Icon name="calendar-o" size={25} color="#ffffff" />
            <Text>{Coming ? Coming.title : "No task coming"}</Text>
          </View>
        </View>
        <View style={styles.taskList}>
          <Icon name="chevron-right" size={40} color="#ffffff" />
        </View>
      </View>
        <Collapsible collapsed={collapsed2} align="center">
        <View style={styles.collapsible}>
        <Icon name="info-circle" size={20} color="#ffffff"/>
          <Text style={styles.detailText}>{Coming ? Coming.description : ""}</Text>
        </View>
        </Collapsible>
        </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TodaySchedule")}
      >
        <View style={styles.chartView}>
          {todayProgress && (
            <ProgressChart
              data={todayProgress}
              width={300}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 105, 180, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              hideLegend={false}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
