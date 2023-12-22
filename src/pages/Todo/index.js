import { createStackNavigator } from '@react-navigation/stack';
import { Todo } from './ToDo';
import { AddTodo } from './AddTodo';


const Stack = createStackNavigator();

export const TodoStack = ({navigation}) => {
    return (
        <Stack.Navigator
            intialRouteName="TodoList"
            screenListeners={({navigation, route}) => ({
                state: (e) => {
                    if (e.data.state.index != 0) {
                        navigation.setOptions({
                            headtessterShown:true
                        })
                    }
                },
            })}
        >
            <Stack.Screen name="TodoList" component={Todo} options={{headerShown: false}}/>
            <Stack.Screen name="AddTodo" component={AddTodo} options={{headerShown: true}}/>
        </Stack.Navigator>
    )
}

export default TodoStack;