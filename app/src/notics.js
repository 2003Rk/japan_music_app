import { LinearGradient } from "expo-linear-gradient";
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import BottomNavigation from "../../components/BottomNavigation";
import Header from "../../components/Header";

const NoticesScreen = ({ onNavigate }) => {
  const songList = [
    { number: 1, title: "花びらの記憶", artist: "山本 遥" },
    { number: 2, title: "Silent Echo", artist: "高橋 颯" },
    { number: 3, title: "遠い約束", artist: "Amber Tide" },
    { number: 4, title: "Midnight Bloom", artist: "白石 結奈" },
    { number: 5, title: "Neon Steps", artist: "佐藤 蓮" },
    { number: 6, title: "夢の続きまで", artist: "虹色シネマ" },
    { number: 7, title: "Ripple in Time", artist: "真夜中クラブ" },
    { number: 8, title: "XXXXXX", artist: "XXXXXXXX" },
    { number: 9, title: "XXXXXXXXXX", artist: "XXXXXXXX" },
    { number: 10, title: "XXXXX", artist: "XXXXXXXX" },
    { number: 11, title: "XXXXXX", artist: "XXXXXXXX" },
    { number: 12, title: "XXXXXXXXXX", artist: "XXXXXXXX" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <LinearGradient colors={["#23386C", "#2A79B1"]} style={styles.gradient}>
        {/* Fixed Header */}
        <Header />

        {/* Scrollable Content Area */}
        <View style={styles.contentArea}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Image positioned to the right of the header */}
            <View style={styles.imageContainer}>
              <Image
                source={require("../../app/assets/Frame28.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            {/* CD image behind the white container */}
            <View style={styles.cdContainer}>
              <Image
                source={require("../../app/assets/CD.png")}
                style={styles.cdImage}
                resizeMode="contain"
              />
            </View>

            {/* Text container */}
            <View style={styles.textContainer}>
              <View style={styles.titleContainer}>
                <View style={styles.playlistContainer}>
                  <Text style={styles.playlistText}>Playlist</Text>
                </View>
                <Text style={styles.title}>星空キャンバス</Text>
              </View>
            </View>

            {/* White container with scrollable song list */}
            <View style={styles.whiteContainer}>
              <ScrollView
                style={styles.songScrollView}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
              >
                {songList.map((song, index) => (
                  <View key={index}>
                    <View style={styles.songItem}>
                      <Text style={styles.songNumber}>{song.number}</Text>
                      <View style={styles.songInfo}>
                        <Text style={styles.songTitle} numberOfLines={1}>
                          {song.title}
                        </Text>
                        <Text style={styles.songArtist} numberOfLines={1}>
                          {song.artist}
                        </Text>
                      </View>
                    </View>
                    {/* Add divider line after each song except the last one */}
                    {index < songList.length - 1 && (
                      <View style={styles.divider} />
                    )}
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Player controls - backward, pause, forward */}
            <View style={styles.playerControls}>
              <TouchableOpacity style={styles.controlButton}>
                <Icon name="skip-back" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.controlButton, styles.playButton]}
              >
                <Icon name="pause" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton}>
                <Icon name="skip-forward" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.whiteContainer2}>
              <Text style={styles.whiteContainer2Text}>15 Pt</Text>
              <View style={styles.plusIconContainer}>
                <TouchableOpacity style={styles.plusIcon}>
                  <Icon name="plus" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.plusIconText}>チャージ</Text>
              </View>
            </View>

            {/* New Button below whiteContainer2 with gradient */}
            <TouchableOpacity style={styles.centerButton}>
              <LinearGradient
                colors={['#AA37A0', '#C76B6D']}
                style={styles.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.centerButtonText}>借りる</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Search Button */}
            <View style={styles.searchButtonContainer}>
              <TouchableOpacity style={styles.searchButton}>
                <Icon name="search" size={20} color="grey" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Fixed Bottom Navigation */}
        <BottomNavigation onNavigate={onNavigate} />
      </LinearGradient>
    </View>
  );
};

export default NoticesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingTop: 20,
  },
  contentArea: {
    flex: 1, // Takes remaining space between Header and BottomNavigation
  },
  scrollView: {
    flex: 1,
  },
  songScrollView: {
    flex: 1,
    maxHeight: 260, // Ensure it doesn't exceed container height
  },
  scrollContent: {
    paddingBottom: 10, // Increased padding to accommodate new button
  },
  imageContainer: {
    position: "absolute",
    top: 1,
    right: 5,
    zIndex: 10,
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
  },
  cdContainer: {
    position: "absolute",
    top: 260, // Position behind the white container
    right: 1,
    zIndex: 5, // Lower zIndex to be behind the white container
    alignItems: "center",
    justifyContent: "center",
  },
  cdImage: {
    position: "absolute",
    top: 0,
    right: 120,
    width: 260, // Slightly larger than white container
    height: 260,
    opacity: 0.9, // Make it slightly transparent
  },
  textContainer: {
    position: "absolute",
    top: 205,
    right: 90,
    zIndex: 10,
    alignItems: "flex-end",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  playlistContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  playlistText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  whiteContainer: {
    position: "absolute",
    top: 240,
    right: 1,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    width: 260,
    height: 290,
    zIndex: 10, // Higher zIndex to be above the CD image
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  songNumber: {
    color: "#23386C",
    fontSize: 14,
    fontWeight: "bold",
    width: 30,
    marginRight: 10,
    textAlign: "right",
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: "#23386C",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  songArtist: {
    color: "#666",
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 4,
  },
  // Player controls styles
  playerControls: {
    position: "absolute",
    top: 550, // Position below the white container
    right: 70,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 260,
    zIndex: 10,
  },
  controlButton: {
    marginHorizontal: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: "#362A7980",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "white",
  },
  searchButtonContainer: {
    position: "absolute",
    top: 5,
    right: 320,
    zIndex: 10,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
  },
  whiteContainer2: {
    position: 'absolute',
    top: 620,
    right: 40,
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    width: 290,
    height: 70,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  whiteContainer2Text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  plusIconContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  plusIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4, // Space between icon and text
  },
  plusIconText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  // New center button styles with gradient
  centerButton: {
    position: 'absolute',
    top: 710, // Position below whiteContainer2
    alignSelf: 'center',
    borderRadius: 20,
    zIndex: 10,
    overflow: 'hidden', // This ensures the gradient doesn't overflow the rounded corners
    width: 190,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});