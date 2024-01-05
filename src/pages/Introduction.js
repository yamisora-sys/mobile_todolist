import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, Image} from 'react-native';
const slides = [
    {
        key: 1,
        title: 'Chào mừng bạn đến Todo App',
        text: 'Đây là ứng dụng quản lý công việc',
        image: "https://static.vecteezy.com/system/resources/previews/010/925/820/non_2x/colorful-welcome-design-template-free-vector.jpg",
        backgroundColor: '#59b2ab',
    },
    {
        key: 2,
        title: 'Những tính năng nổi bật',
        text: 'Nhắc nhở bạn hằng ngày các công việc cần làm',
        image: "https://miro.medium.com/v2/resize:fit:880/0*SQy-aKEXu_WSoRd-.png",
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        title: 'Đồng bộ hóa dữ liệu',
        text: 'Giúp bạn dễ dàng truy cập bất kì đâu',
        image: "https://inet.vn/public/img/service/cloudserver_bg_illus.webp",
        backgroundColor: '#22bcb5',
    }
]
    

export const Introduction = ({changeState}) => {
    const renderItem = ({ item }) => {
        return (
            <View style={{flex: 1, backgroundColor: item.backgroundColor, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={{
                    uri: item.image,
                }} style={{width: 500, height: 200}}/>
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