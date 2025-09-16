import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.starsContainer}>
        <Image 
          source={require('../app/assets/stars (1).png')} 
          style={styles.starsImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.headerContent}>
        <View style={styles.logo}>
          <Image 
            source={require('../app/assets/okiny.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerIcons}>
          <Icon name="bell" size={24} color="white" style={styles.headerIcon} />
          <Icon name="user" size={24} color="white" />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 96,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  logo: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: -25,
  },
  logoImage: {
    width: 140,
    height: 48,
  },
  starsContainer: {
    position: 'absolute',
    top: 0,
    left: -23,
    zIndex: 0,
  },
  starsImage: {
    width: 436.22,
    height: 264.3,
    opacity: 0.7,
    transform: [{ rotate: '0deg' }],
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  headerIcon: {
    marginRight: 16,
  },
});
