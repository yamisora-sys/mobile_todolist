import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text} from 'react-native';
const slides = [
    {
        key: 1,
        title: 'Chào mừng bạn đến Todo App',
        text: 'Đây là ứng dụng quản lý công việc',
        image: require('@img/bg3.jpg'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 2,
        title: 'Title 2',
        text: 'Other cool stuff',
        image: require('@img/welcome.gif'),
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('@img/welcome.gif'),
        backgroundColor: '#22bcb5',
    }
]
    

export const Introduction = ({changeState}) => {
    const renderItem = ({ item }) => {
        return (
            <View style={{flex: 1, backgroundColor: item.backgroundColor, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 30, color: 'white'}}>{item.title}</Text>
                <Text style={{fontSize: 20, color: 'white'}}>{item.text}</Text>
            </View>
        );
    }
    const onDone = () => {
        changeState(false);
        AsyncStorage.setItem('firstime', 'false');
    }
    const onSkip = () => {
        changeState(false);
        AsyncStorage.setItem('firstime', 'false');
    }
    return (
        <AppIntroSlider 
            renderItem={renderItem} 
            data={slides} 
            onDone={onDone} 
            onSkip={onSkip}
            showSkipButton={true}
            showPrevButton={true}
            showNextButton={true}
            showDoneButton={true}
            />
    );
}