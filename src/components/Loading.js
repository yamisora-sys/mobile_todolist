import {View, Image} from 'react-native';
import styles from '@css/loading.module.css';

export const Loading = () => {
    return (
        <View style={styles.container}>
            <Image source={require('@img/loading.gif')} style={styles.img}/>
        </View>
    )
}