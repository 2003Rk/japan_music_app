import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const BottomNavItem = ({ iconName, label, onPress, onPressIn, isActive }) => (
  <TouchableOpacity 
    style={styles.bottomNavItem} 
    onPress={onPress}
    onPressIn={onPressIn}
    activeOpacity={0.7}
  >
    <View style={isActive ? styles.activeNavIcon : styles.inactiveNavIcon}>
      <Icon name={iconName} size={24} color="white" />
    </View>
    <Text style={styles.bottomNavLabel}>{label}</Text>
  </TouchableOpacity>
);

const BottomNavigation = ({ onNavigate, currentScreen }) => {
  const [activeTab, setActiveTab] = useState(currentScreen || 'notice'); // Use currentScreen prop

  // Update local state when currentScreen prop changes
  useEffect(() => {
    if (currentScreen) {
      // Map 'notics' to 'notice' for the active state
      const mappedScreen = currentScreen === 'notics' ? 'notice' : currentScreen;
      setActiveTab(mappedScreen);
    }
  }, [currentScreen]);

  // Immediate state updates for instant visual feedback
  const handleMusicPressIn = () => {
    setActiveTab('music');
  };

  const handleMusicPress = () => {
    if (onNavigate) {
      onNavigate('music');
    }
  };

  const handleNoticePressIn = () => {
    setActiveTab('notice');
  };

  const handleNoticePress = () => {
    if (onNavigate) {
      onNavigate('notice');
    }
  };

  const handleSearchPressIn = () => {
    setActiveTab('search');
  };

  const handleSearchPress = () => {
    if (onNavigate) {
      onNavigate('search');
    }
  };

  return (
    <View style={styles.bottomNav}>
      <View style={styles.bottomNavContent}>
        <BottomNavItem 
          iconName="message-square" 
          label="各制さと" 
          onPress={handleNoticePress}
          onPressIn={handleNoticePressIn}
          isActive={activeTab === 'notice'}
        />
        <BottomNavItem 
          iconName="music" 
          label="音楽" 
          onPress={handleMusicPress}
          onPressIn={handleMusicPressIn}
          isActive={activeTab === 'music'}
        />
        <BottomNavItem 
          iconName="search" 
          label="検索" 
          onPress={handleSearchPress}
          onPressIn={handleSearchPressIn}
          isActive={activeTab === 'search'}
        />
      </View>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  bottomNav: {
    height: 96,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bottomNavContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  bottomNavItem: {
    alignItems: 'center',
  },
  bottomNavIcon: {
    padding: 8,
    borderRadius: 20,
    marginBottom: 4,
  },
  activeNavIcon: {
    backgroundColor: '#AA37A0', // Pink color when active/tapped
    padding: 8,
    borderRadius: 20,
    marginBottom: 4,
  },
  inactiveNavIcon: {
    backgroundColor: 'transparent', // Transparent when not active
    padding: 8,
    borderRadius: 20,
    marginBottom: 4,
  },
  bottomNavLabel: {
    color: 'white',
    fontSize: 12,
  },
});
