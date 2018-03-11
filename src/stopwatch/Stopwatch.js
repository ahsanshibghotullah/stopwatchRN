import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

const Header = ({title}) => {
  return (<Text style={styles.header}>
    {title}
  </Text>)
}

const Number = ({hour, minute, second}) => {
  return (<Text style={styles.number}>
    {hour}:{minute}:{second}
  </Text>)
}

const Button = ({context, style, onPress}) => {
  return(<TouchableHighlight
          style={styles.btn}
          onPress={onPress}
          underlayColor="#3498db"
	        activeOpacity={0.8}
         >
          <View><Text style={styles.btn_Text}>{context}</Text></View>
      </TouchableHighlight>)
}

export default class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = { secondElapsed: 0 };
    this.onStart = this.onStart.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onPause = this.onPause.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
      {this.renderContent()}
      </View>
    );
  }

  renderContent() {
    return (<React.Fragment>
      <Header title="Stopwatch" />
      <View style={styles.number_Container}>
        <Number hour={this.getHours()} minute={this.getMinutes()} second={this.getSeconds()} />
      </View>
      <View style={styles.btn_Container}>
        <Button context="Start" style={styles.primary} onPress={this.onStart} />
        <Button context="Pause" style={styles.primary} onPress={this.onPause} />
        <Button context="Reset" style={styles.primary} onPress={this.onReset} />
      </View>
      </React.Fragment>)
  }

  getSeconds() {
    // Menggunakan method slice agar menghilangkan nilai di sebelah kiri jika yang muncul
    // lebih dari dua digit, -2 artinya dia mulai di hitung dari kanan kekiri ke index 2
    // dari kanan. dan hanya memunculkan dari index 2 (dimulai dari seblah kanan) sampai ke 0
    // (paling kanan)
    return ( '0' + this.state.secondElapsed % 60 ).slice(-2)
  }

  getMinutes() {
    return ( '0' + Math.floor( this.state.secondElapsed / 60) ).slice(-2);
  }

  getHours() {
    return ( '0' + Math.floor( this.state.secondElapsed / 3600) ).slice(-2);
  }

  onStart() {
    this.intervalId = setInterval(() => this.timer(), 1000);
  }

  onPause() {
    clearInterval(this.intervalId);
  }

  timer() {
    this.setState({ secondElapsed: this.state.secondElapsed + 1 });
  }

  onReset() {
    this.setState({ secondElapsed: 0 });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  number_Container: {
    borderStyle: 'solid',
    borderColor: '#74b9ff',
    // hairlineWidth itu menyesuaikan width dengan pixel di device yang kita jalankan
    borderWidth: StyleSheet.hairlineWidth,
    padding: 3,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10
  },
  number: {
    fontSize: 30,
  },
  btn_Container : {
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 7,
    paddingRight: 7
  },
  btn: {
    borderStyle: 'solid',
    borderColor: '#d5d5d5',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#3498db',
    borderRadius: 3,
    padding: 10,
    paddingLeft: 8,
    paddingRight: 8,
    margin: 5,
  },
  btn_Text : {
    fontSize: 23,
    color: 'white',
  },
  primary: {
    backgroundColor: '#60b044',
    borderColor: '#355f27'
  },
  spacer: {
    marginBottom: 10
  }
});
