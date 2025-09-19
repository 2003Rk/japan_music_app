import { useEffect, useState } from 'react';
import { Animated, Image, StatusBar, StyleSheet, Text } from 'react-native';
import MusicPlayerScreen from './musicplayer';
import NotificationScreen from './noticescreen';
import NoticesScreen from './notics';
import SearchPage from './searchpage';

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // 500ms fade out animation
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 2000); // Wait 2 seconds before starting fade out

    return () => clearTimeout(timer);
  }, [fadeAnim, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.textAboveOkiny}>推しを推す。オシガクを聴く。</Text>
      <Image
        source={require('../assets/okiny.png')}
        style={styles.okinyImage}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/アセット 1@4x-fotor-2025082602527@2x 1.png')}
        style={styles.centerImage}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/AdobeStock_981087814-[更新済み] 1.png')}
        style={styles.bottomImage}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('notice');

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <>
      <StatusBar hidden={true} />
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : currentScreen === 'notice' ? (
        <NotificationScreen onNavigate={handleNavigate} currentScreen={currentScreen} />
      ) : currentScreen === 'notics' ? (
        <NoticesScreen onNavigate={handleNavigate} currentScreen={currentScreen} />
      ) : currentScreen === 'search' ? (
        <SearchPage onNavigate={handleNavigate} currentScreen={currentScreen} />
      ) : (
        <MusicPlayerScreen onNavigate={handleNavigate} currentScreen={currentScreen} />
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#170D3F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAboveOkiny: {
    position: 'absolute',
    top: 150,
    left: 10,
    right: 0,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 2,
  },
  okinyImage: {
    width: 330,
    height: 330,
    position: 'absolute',
    top: 50,
    zIndex: 1,
  },
  centerImage: {
    width: 180,
    height: 180,
    position: 'absolute',
    top: 290,
    zIndex: 1,
  },
  bottomImage: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    height: 300,
  },
});
