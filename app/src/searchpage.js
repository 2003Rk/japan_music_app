import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import BottomNavigation from "../../components/BottomNavigation";
import Header from "../../components/Header";

const SearchPage = ({ onNavigate }) => {
  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <LinearGradient colors={["#23386C", "#2A79B1"]} style={styles.gradient}>
          <View style={styles.content}>
            {/* Header */}
            <Header />

            {/* Main Content Area */}
            <View style={styles.mainContent}>
              {/* Search Container */}
              <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="rgba(86, 81, 81, 1)" style={styles.searchIcon} />
                <Text style={styles.searchText}>タグで検索</Text>
              </View>

              {/* Content Below Search */}
              <View style={styles.contentContainer}>
                <LinearGradient 
                  colors={["#AA37A0", "#C76B6D"]} 
                  start={{x: 0, y: 0}} 
                  end={{x: 1, y: 0}} 
                  style={styles.contentGradient}
                >
                  <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Tab Section */}
                    {/* Tab Section */}
                    <View style={styles.tabContainer}>
                      <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                        <Text style={styles.activeTabText}>借りる</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.tab, styles.inactiveTab]}>
                        <LinearGradient 
                          colors={["#23386C", "#2A79B1"]} 
                          start={{x: 0, y: 0}} 
                          end={{x: 1, y: 1}} 
                          style={styles.inactiveTabGradient}
                        >
                          <Text style={styles.inactiveTabText}>作る</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                    
                    {/* Official Playlist Section */}
                    <View style={styles.sectionContainer}>
                      <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>公式プレイリスト</Text>
                      </View>
                      <View style={styles.sectionLineContainer}>
                        <View style={styles.diamond} />
                        <View style={styles.sectionLine} />
                        <View style={styles.diamond} />
                      </View>
                      
                      <View style={styles.playlistCard}>
                        <View style={styles.playlistInfo}>
                          <Text style={styles.playlistTitle}>花びらの行方</Text>
                          <Text style={styles.artistName}>Luna</Text>
                        </View>
                        <View style={styles.songCount}>
                          <Icon name="music" size={16} color="#666" />
                          <Text style={styles.songCountText}>12曲</Text>
                        </View>
                      </View>

                      <View style={styles.playlistCard}>
                        <View style={styles.playlistInfo}>
                          <Text style={styles.playlistTitle}>Gentle Afterglow</Text>
                          <Text style={styles.artistName}>はる</Text>
                        </View>
                        <View style={styles.songCount}>
                          <Icon name="music" size={16} color="#666" />
                          <Text style={styles.songCountText}>8曲</Text>
                        </View>
                      </View>

                      <View style={styles.playlistCard}>
                        <View style={styles.playlistInfo}>
                          <Text style={styles.playlistTitle}>記憶の花片</Text>
                          <Text style={styles.artistName}>Ren</Text>
                        </View>
                        <View style={styles.songCount}>
                          <Icon name="music" size={16} color="#666" />
                          <Text style={styles.songCountText}>15曲</Text>
                        </View>
                      </View>

                      <TouchableOpacity style={styles.moreButton}>
                        <Text style={styles.moreButtonText}>もっと見る</Text>
                        <Icon name="chevron-right" size={16} color="white" />
                      </TouchableOpacity>
                    </View>

                    {/* User Playlist Section */}
                    <View style={styles.sectionContainer}>
                      <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>ユーザープレイリスト</Text>
                      </View>
                      <View style={styles.sectionLineContainer}>
                        <View style={styles.diamond} />
                        <View style={styles.sectionLine} />
                        <View style={styles.diamond} />
                      </View>
                      
                      <View style={styles.playlistCard}>
                        <View style={styles.playlistInfo}>
                          <Text style={styles.playlistTitle}>青空キャンパス</Text>
                          <Text style={styles.artistName}>Sara</Text>
                        </View>
                        <View style={styles.songCount}>
                          <Icon name="music" size={16} color="#666" />
                          <Text style={styles.songCountText}>12曲</Text>
                        </View>
                      </View>

                      <View style={styles.playlistCard}>
                        <View style={styles.playlistInfo}>
                          <Text style={styles.playlistTitle}>Flowers</Text>
                          <Text style={styles.artistName}>さくら</Text>
                        </View>
                        <View style={styles.songCount}>
                          <Icon name="music" size={16} color="#666" />
                          <Text style={styles.songCountText}>8曲</Text>
                        </View>
                      </View>

                      <View style={styles.playlistCard}>
                        <View style={styles.playlistInfo}>
                          <Text style={styles.playlistTitle}>夜</Text>
                          <Text style={styles.artistName}>あきほ</Text>
                        </View>
                        <View style={styles.songCount}>
                          <Icon name="music" size={16} color="#666" />
                          <Text style={styles.songCountText}>15曲</Text>
                        </View>
                      </View>

                      <TouchableOpacity style={styles.moreButton}>
                        <Text style={styles.moreButtonText}>もっと見る</Text>
                        <Icon name="chevron-right" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </LinearGradient>
              </View>
            </View>

            {/* Bottom Navigation */}
            <BottomNavigation onNavigate={onNavigate} />
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchText: {
    color: "rgba(86, 81, 81, 1)",
    fontSize: 16,
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 7,
  },
  contentContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  contentGradient: {
    flex: 1,
    paddingBottom: 20,
  },
    tabContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
  
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveTab: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 3,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    position: 'relative',
    bottom: 9,
    left: 21,
    width: 190,
    height: 60,
    flex: 0,
    overflow: 'hidden',
  },
  inactiveTabGradient: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '220%',
  },
  inactiveTabOverlay: {
    position: 'absolute',
    top: 10,
    
    left: 350,
    backgroundColor: '#2A5F8C',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    zIndex: 10,
  },
  activeTabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  inactiveTabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  sectionContainer: {
    marginBottom: 40,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginHorizontal: 1,
  },
  diamond: {
    width: 8,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transform: [{ rotate: '45deg' }],
  },
  playlistCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    color: '#2D3748',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artistName: {
    color: '#4A5568',
    fontSize: 14,
  },
  songCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  songCountText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  moreButtonText: {
    color: 'white',
    fontSize: 14,
    marginRight: 5,
  },
});
