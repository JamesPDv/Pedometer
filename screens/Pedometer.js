import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, ImageBackground } from 'react-native';
import CircularProgress from "react-native-circular-progress-indicator";
import { Pedometer } from 'expo-sensors';


class PedometerScreen extends Component {
  constructor() {
    super();
    this.state = {
      stepCount: 0,
    };
  }

  componentDidMount() {
    Pedometer.isAvailableAsync()
      .then((result) => {
        if (result) {
          const today = new Date();
          const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
          
          Pedometer.getStepCountAsync(startDate, endDate)
            .then((result) => {
              this.setState({ stepCount: result.steps });
            })
            .catch((error) => {
              console.error('Error: Cannot fetch Step Number', error);
            });
        } else {
          console.error('Please give Health app permission to use Pedometer');
        }
      })
      .catch((error) => {
        console.error('404 Cannot find Pedometer', error);
      });
  }


  render() {
    return (
      <ImageBackground
        source={require('../assets/Capture.png')}
        style={styles.backgroundImage}>
		<View style={styles.PhoneSize}>
  <Text style={styles.Title}>PEDOMETER</Text>
  <View style={styles.caloriesRectangle}>
    <Text style={styles.calories}>Calories Burnt</Text>
    <Text style={styles.CaloriesValue}>
      {((this.state.stepCount) / 1300 * 60).toFixed(1)}
    </Text>
  </View>
  <View style={styles.distanceRectangle}>
    <Text style={styles.distance}>Distance walked</Text>
    <Text style={styles.distanceValue}>
      {(this.state.stepCount * 0.762).toFixed(2)}
    </Text>
    <Text style={styles.distanceUnit}>meters</Text>
  </View>
  <View style={[styles.circlePosition, { flex: 1 }]}>
    <CircularProgress
      value={this.state.stepCount}
      maxValue={10000}
      radius={190}
      valueColor={"#a3c4bf"}
      activeStrokeColor={"#a3c4bf"}
      inActiveStrokeColor={"#567f8f"}
      inActiveStrokeOpacity={5}
      inActiveStrokeWidth={40}
      activeStrokeWidth={30}
      titleColor={"#a3c4bf"}
      titleStyle={{ fontWeight: "bold" }}
    />
  </View>
</View>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
	PhoneSize: {
		height: Dimensions.get("window").height,
		width: Dimensions.get("window").width,
	},
	  Title: {
		width: 220,
		height: 220,
		flexShrink: 0,
		color: '#000',
		fontSize: 36,
		fontStyle: 'normal',
		fontWeight: '500',
		top:105,
		left:95,
	  },
	  distanceRectangle: {
		width: 170,
		height: 170,
		backgroundColor: 'rgba(217, 217, 217, 0.56)',
		borderRadius: 45,
		top:200,
		left:205,
	  },
	  distance: {
		width: 180,
		height: 180,
		flexShrink: 0,
		color: '#000',
		fontSize: 20,
		fontStyle: 'normal',
		fontWeight: '500',
		lineHeight: 'normal',
		top:20,
		left:11,
	  },
	  caloriesRectangle: {
		width: 170,
		height: 170,
		backgroundColor: 'rgba(217, 217, 217, 0.56)',
		borderRadius: 45,
		top:371,
		left:20,
	  },
	  calories: {
		width: 180,
		height: 180,
		flexShrink: 0,
		color: '#000',
		fontSize: 20,
		fontStyle: 'normal',
		fontWeight: '500',
		lineHeight: 'normal',
		top:15,
		left:20,
	  },
	  CaloriesValue:{
		width: 180,
		height: 180,
		flexShrink: 0,
		color: '#000',
		fontSize: 80,
		fontStyle: 'normal',
		fontWeight: '500',
		bottom:138,
		left:30,
		},
	  distanceValue:{
		width: 180,
		height: 180,
		flexShrink: 0,
		color: '#000',
		fontSize: 50,
		fontStyle: 'normal',
		fontWeight: '500',
		bottom:135,
		left:17,
		},
		distanceUnit:{
			width: 190,
			height: 190,
			flexShrink: 0,
			color: '#000',
			fontSize: 40,
			fontStyle: 'normal',
			fontWeight: '500',
			lineHeight: 'normal',
			bottom:275,
			left:25,
		},
	  circlePosition: {
		position: 'absolute',
		 alignSelf: 'center',
		 top:180,
	 },
	  });	  



export default PedometerScreen;