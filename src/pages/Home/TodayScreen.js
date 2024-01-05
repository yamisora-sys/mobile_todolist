import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styles from "@css/home.module.css";
import Icon from "react-native-vector-icons/FontAwesome";
import { ProgressChart } from "react-native-chart-kit";
import { FloatButton } from "@components/FloatButton";
import Collapsible from "react-native-collapsible";
import { useState, useEffect, useRef } from "react";
import {completeTodoData, getTodayTodoData, ClearMessage} from '@redux/reducer/todoSlice';
import {useAuth} from '@context/auth';
import {DiffMinutesFromNow, DiffSecondsFromNow} from '@config/calculate';
import {BellRing} from '@animations/BellRing';
import {schedulePushNotification, nowPushNotification} from '@config/notification';
import ToastManager, {Toast} from 'toastify-react-native';

export const TodayScreen = ({ navigation }) => {
  const state = useSelector((state) => state.todo);
  const { auth, setAuth } = useAuth();
  const { todayProgress, loading, todayData, message } = state;
  const total = todayData.length;
  const completed = todayData.filter((item) => item.completed == 1).length;

  // get the first incomplete task
  const Incomplete = todayData.find((item) =>{
    let check = total - completed;
    if( check  == 0){
      return;
    }
    if(item.completed == 0){
      return item;
    }
  });
  const Coming = todayData.find((item) => {
    let check = total - completed;
    if (check == 1 ){
      return;
    }
    if (item.completed == 0 && item.id != Incomplete.id) {
      return item;
    }
  });
  const remindTask = todayData.find((item) => {
    // remind_time >0 and completed == 0
    if(item.remind_time > 0 && item.completed == 0){
      let check = DiffMinutesFromNow(item.start_time);
      if(check <= item.remind_time){
        return item;
      }
    }
  });

  useEffect(() => {
    let remindList = todayData.filter((item) => {
      return item.remind_time > 0 && item.completed == 0 && item.push_notification == 0;
    })
    if(remindList.length > 0){
      remindList.forEach((item) => {
        let check = DiffSecondsFromNow(item.start_time) + item.remind_time * 60;
          if(check <=0) {
            schedulePushNotification("Nhắc nhở công việc sắp tới", item.title, Math.abs(check));
          }
          else{
            nowPushNotification("Bạn đã hoàn thành công việc chưa", item.title);
          }
      })
    }
    if(message != ""){
      Toast.success(message, 'top');
      dispatch(ClearMessage());
    }
  }, []);

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
        dispatch(completeTodoData(id));
        await dispatch(getTodayTodoData(auth.id));
    }
  return (
    <View style={styles.container}>
      <ToastManager />
      <Collapsible collapsed={remindTask ? false : true} align="center">
        <View style={styles.remind}>
        <BellRing />
          <View>  
            <Text style={styles.remindTitle}>Nhắc nhở: Sắp đến giờ hẹn</Text>
            <View>
              <Text  style={styles.remindText}>{remindTask != null ? remindTask.title : ""}</Text>
            </View>
          </View>
        </View>
      </Collapsible>
      
      <TouchableOpacity onPress={() => navigation.navigate("TodayList")}>
        <View style={styles.listtask}>
          <View>
            <Text style={styles.titleText}>Công việc hôm nay</Text>
            <View style={styles.status}>
              <Icon name="check-circle" size={25} color="white" />
              {completed == total ? (
                <Text style={styles.detailText}>Đã hoàn thành toàn bộ công việc hôm nay</Text>
              ) : (
                <Text style={styles.detailText}>Đã hòan thành {completed}/{total}</Text>
              )}
            </View>
          </View>
          <View style={styles.taskList}>
            <Icon name="chevron-right" size={40} color="white" />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleExpanded}>
      <View style={styles.inprogress}>
        <View>
          <Text style={styles.titleText}>Đang thực hiện</Text>
          <View style={styles.status}>
            <Icon name="clock-o" size={25} color="white" />
            <Text style={styles.detailText}>{Incomplete ? Incomplete.title : "Không có công việc"}</Text>
          </View>
        </View>
        <View style={styles.taskList}>
          <Icon name="clock-o" size={40} color="white" />
        </View>
      </View>
      <Collapsible collapsed={collapsed} align="center">
        <View style={styles.collapsible}>
        <Icon name="info-circle" size={20} color="white"/>
          <Text style={styles.detailText}>{Incomplete ? Incomplete.description : ""}</Text>
          {
                Incomplete ? (
                    <TouchableOpacity onPress={() => completeTodo(Incomplete.id)}>
                        <Icon name="check-circle" size={20} color="#00DFA2" />
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
          <Text style={styles.titleText}>Sắp tới</Text>
          <View style={styles.status}>
            <Icon name="calendar-o" size={25} color="white" />
            <Text style={styles.detailText}>{Coming ? Coming.title : "Không có công việc"}</Text>
          </View>
        </View>
        <View style={styles.taskList}>
          <Icon name="chevron-right" size={40} color="white" />
        </View>
      </View>
        <Collapsible collapsed={collapsed2} align="center">
        <View style={styles.collapsible}>
        <Icon name="info-circle" size={20} color="white"/>
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
                backgroundColor: "#FFFFFF",
                backgroundGradientFrom: "#FFFFFF",
                backgroundGradientTo: "#FFFFFF",
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
