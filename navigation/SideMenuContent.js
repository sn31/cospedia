import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        paddingTop: 35,
        flex: 1,
    },
    button: {
        backgroundColor: '#F38C9F',
    }
});

class DrawerContent extends Component {
    navigateToScreen = (route) => () => {
        const navigate = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigate);
    }
    render () {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Button
                        raised
                        title='Login'
                        buttonStyle={styles.button}
                        onPress={this.navigateToScreen('Login')}/>
                </ScrollView>
            </View>
        );
    }
}
DrawerContent.propTypes = {
  navigation: PropTypes.object
};
export default DrawerContent;