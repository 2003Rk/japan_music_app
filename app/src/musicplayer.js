import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigation from "../../components/BottomNavigation";
import Header from "../../components/Header";

const MusicPlayerScreen = ({ onNavigate }) => {
  const [focusedTrack, setFocusedTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollViewRef = useRef(null);
  const [sound, setSound] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Audio setup
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Configure audio mode
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  const musicTracks = [
    { id: 1, style: "smallRectangle", title: "Midnight Bloom", subtitle: "白石 結菜" },
    { id: 2, style: "rectangle2", title: "遠い約束", subtitle: "Amber Tide" },
    { id: 3, style: "rectangle3", title: "Silent Echo", subtitle: "高橋 颯" },
    { id: 4, style: "rectangle4", title: "花びらの記憶", subtitle: "山本 遥" },
    { id: 5, style: "rectangle5", title: "Neon Steps", subtitle: "佐藤 蓮" },
    { id: 6, style: "rectangle6", title: "夢の続きまで", subtitle: "虹色シネマ" },
  ];

  const playAudio = async () => {
    try {
      setIsLoading(true);
      
      // If audio is already playing, pause it
      if (sound && isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
        setIsLoading(false);
        return;
      }

      // If audio exists but is paused, resume it
      if (sound && !isPlaying) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          await sound.playAsync();
          setIsPlaying(true);
        }
        setIsLoading(false);
        return;
      }

      // Load new audio
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../assets/namah_parvati.mp3"),
        { shouldPlay: false }
      );
      
      // Wait for the sound to be fully loaded before playing
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max wait time
      
      while (attempts < maxAttempts) {
        const status = await newSound.getStatusAsync();
        if (status.isLoaded) {
          // Sound is loaded, now we can play it
          await newSound.playAsync();
          setSound(newSound);
          setIsPlaying(true);
          
          // Set up playback status update
          newSound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              setIsPlaying(false);
            }
          });
          break;
        }
        
        // Wait 100ms before checking again
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }
      
      if (attempts >= maxAttempts) {
        throw new Error('Sound took too long to load');
      }
      
    } catch (error) {
      console.error('Error playing audio:', error);
      alert('Error playing audio. Please check if the file exists.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackChange = async (newTrackIndex) => {
    setFocusedTrack(newTrackIndex);
    
    // Stop current audio when changing tracks via CD
    if (sound && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
    
    // Scroll to the focused track with better calculation
    if (scrollViewRef.current) {
      const trackHeight = 65; // Height of each rectangle
      const marginBottom = 2; // Space between tracks  
      const totalTrackHeight = trackHeight + marginBottom;
      const scrollPosition = newTrackIndex * totalTrackHeight - 50; // Offset to center better
      
      scrollViewRef.current.scrollTo({
        y: Math.max(0, scrollPosition),
        animated: true,
      });
    }
  };

  const handleScroll = async (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const containerHeight = event.nativeEvent.layoutMeasurement.height;
    
    // Since all rectangles are now the same size, we can use a simple calculation
    const trackHeight = 65; // Height of each rectangle
    const marginBottom = 3; // Space between tracks
    const totalTrackHeight = trackHeight + marginBottom;
    
    // Find which track the viewport center is currently over
    const viewportCenter = scrollY + containerHeight / 3;
    const newFocusedTrack = Math.floor(viewportCenter / totalTrackHeight);
    
    // Ensure we stay within bounds
    const clampedTrack = Math.max(0, Math.min(newFocusedTrack, musicTracks.length - 1));

    if (clampedTrack !== focusedTrack) {
      setFocusedTrack(clampedTrack);
      // Stop playing when focus changes via scrolling
      if (sound && isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    }
  };

  const handlePlayPress = async (trackIndex) => {
    if (trackIndex === focusedTrack) {
      // If clicking on the focused track, toggle play/pause
      await playAudio();
    } else {
      // If clicking on a different track, focus it and start playing
      setFocusedTrack(trackIndex);
      // Stop current audio if playing
      if (sound && isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
      // Start playing the new track
      await playAudio();
    }
  };

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <LinearGradient colors={["#23386C", "#2A79B1"]} style={styles.gradient}>
          <View style={styles.content}>
            {/* Header */}
            <Header />

            {/* Title */}
            <View style={styles.titleContainer}>
              <View style={styles.playlistContainer}>
                <Text style={styles.playlistText}>Playlist</Text>
              </View>
              <Text style={styles.title}>星空キャンバス</Text>
            </View>

            {/* Scrollable Music Containers */}
            <View style={styles.musicContainer}>
              <ScrollView
                ref={scrollViewRef}
                style={styles.scrollContent}
                contentContainerStyle={styles.contentContainer}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                bounces={true}
                decelerationRate="normal"
              >
                {musicTracks.map((track, index) => {
                  const isFocused = index === focusedTrack;
                  return (
                    <View key={track.id} style={styles.rightRectangleContainer}>
                      <TouchableOpacity
                        style={[
                          styles[track.style],
                          isFocused ? styles.focusedRectangle : styles.unfocusedRectangle,
                        ]}
                        onPress={() => handlePlayPress(index)}
                      >
                        <Image
                          source={require("../assets/gabriel-silverio-K_b41GaWC5Y-unsplash.png")}
                          style={styles.rectangleImage}
                          resizeMode="cover"
                        />
                        
                        {/* Play/Pause Button - Only show when focused */}
                        {isFocused && (
                          <TouchableOpacity 
                            style={styles.playPauseButton}
                            onPress={(e) => {
                              e.stopPropagation();
                              handlePlayPress(index);
                            }}
                            disabled={isLoading}
                          >
                            <Text style={styles.playPauseIcon}>
                              {isLoading ? "⏳" : (isPlaying ? "⏸" : "▶")}
                            </Text>
                          </TouchableOpacity>
                        )}
                        
                        {/* Track Title and Subtitle */}
                        <View style={styles.rectangleTitleContainer}>
                          <Text style={styles.rectangleTitle}>{track.title}</Text>
                          <Text style={styles.rectangleSubtitle}>{track.subtitle}</Text>
                        </View>
                        
                        {/* Playing Gradient Overlay */}
                        {isFocused && isPlaying && (
                          <LinearGradient
                            colors={[
                              "rgba(170, 55, 160, 0.6)",
                              "rgba(199, 107, 109, 0.6)",
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.clickGradientOverlay}
                          />
                        )}
                      </TouchableOpacity>

                      {/* Track Info */}
                      <View style={styles.trackInfo}>
                        <Text style={styles.trackName}>{track.name}</Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
              <View style={styles.overlayContainer}>
                <View style={styles.overlayContent}>
                  <Text style={styles.overlayText}>Artist's Messages</Text>
                  <Text style={styles.artistMessage}>
                    花びらが散るように過ぎ去った日々も、記憶の中ではやさしく舞い続けています。この曲を通して、そんな儚い美しさを一緒に感じてもらえたら嬉しいです。
                  </Text>
                  <TouchableOpacity style={styles.insideRoundButtonContainer}>
                    <LinearGradient
                      colors={['#AA37A0', '#C76B6D']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.insideRoundButton}
                    >
                      <Text style={styles.insideRoundButtonText}>
                        アーティストの詳細
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          
            {/* Bottom Navigation */}
            <View style={styles.bottomNavWrapper}>
              <BottomNavigation onNavigate={onNavigate} />
            </View>
            {/* Draggable CD Component */}
            <DraggableCD 
              focusedTrack={focusedTrack}
              totalTracks={musicTracks.length}
              onTrackChange={handleTrackChange}
            />

          </View>
        </LinearGradient>
      </View>
    </>
  );
};

// DraggableCD Component
const DraggableCD = ({ focusedTrack, totalTracks, onTrackChange }) => {
  const { width } = Dimensions.get('window');
  const rotation = useRef(new Animated.Value(0)).current;
  const [isDragging, setIsDragging] = useState(false);
  const lastTrackChange = useRef(0);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsDragging(true);
      lastTrackChange.current = 0;
    },
    onPanResponderMove: (evt, gestureState) => {
      const deltaX = gestureState.dx;
      
      // Smooth rotation that follows finger movement
      rotation.setValue(deltaX * 0.8);
      
      // Track change logic with threshold
      const trackChangeDistance = 70; // Distance needed to change one track
      const trackChanges = Math.floor(deltaX / trackChangeDistance);
      
      // Only change track if we've moved significantly since last change
      if (trackChanges !== lastTrackChange.current) {
        const difference = trackChanges - lastTrackChange.current;
        let newTrackIndex = focusedTrack;
        
        if (difference > 0) {
          // Moving right - go to previous tracks
          newTrackIndex = Math.max(focusedTrack - difference, 0);
        } else if (difference < 0) {
          // Moving left - go to next tracks
          newTrackIndex = Math.min(focusedTrack - difference, totalTracks - 1);
        }
        
        if (newTrackIndex !== focusedTrack) {
          onTrackChange(newTrackIndex);
          lastTrackChange.current = trackChanges;
        }
      }
    },
    onPanResponderRelease: () => {
      setIsDragging(false);
      lastTrackChange.current = 0;
      
      // Smooth spring back to center
      Animated.spring(rotation, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 6,
      }).start();
    },
  });

  // Create concentric circles for CD effect
  const renderConcentricCircles = (count, startSize, increment, opacity) => {
    return Array.from({ length: count }, (_, i) => (
      <View
        key={i}
        style={[
          styles.concentricCircle,
          {
            width: startSize + i * increment,
            height: startSize + i * increment,
            opacity: opacity,
            borderRadius: (startSize + i * increment) / 2,
          },
        ]}
      />
    ));
  };

  return (
    <View style={styles.cdContainer}>
      <Animated.View
        style={[
          styles.cdWrapper,
          {
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [-1000, 1000],
                  outputRange: ['-1000deg', '1000deg'],
                  extrapolate: 'extend',
                }),
              },
            ],
            opacity: isDragging ? 0.9 : 1,
          },
        ]}
        {...panResponder.panHandlers}
      >
        {/* CD Container */}
        <View style={styles.cdDisc}>
          {/* Outer ring */}
          <View style={styles.cdOuterRing}>
            {/* More concentric circles - representing CD tracks */}
            {renderConcentricCircles(25, 20, 8, 0.4)}
            
            {/* Inner reflective area */}
            <View style={styles.cdInnerArea}>
              {/* Even more concentric circles for inner area */}
              {renderConcentricCircles(22, 60, 10, 0.9)}
              
              {/* Center hole */}
              <View style={styles.cdCenterHole}>
                {/* Inner hole highlight */}
                <View style={styles.cdHoleHighlight} />
                {/* Track indicator */}
                <Text style={styles.trackIndicator}>{focusedTrack + 1}</Text>
              </View>
            </View>
          </View>
          
          {/* Holographic effect overlays */}
          <View style={styles.holographicOverlay1} />
          <View style={styles.holographicOverlay2} />
          
          {/* Light reflection */}
          <View style={styles.lightReflection} />
        </View>
      </Animated.View>
      
      {/* Instructions */}
      
    </View>
  );
};

export default MusicPlayerScreen;

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
  titleContainer: {
    paddingVertical: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  playlistContainer: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginRight: 15,
  },
  playlistText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
  },
  musicContainer: {
    flex: 1,
    position: "relative",
    paddingTop: 20,
    paddingBottom: 300, // Space for bottom navigation and CD
  },
  scrollContent: {
    flex: 0.87,
  },
  overlayContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  overlayContent: {
    backgroundColor: "#23386CE5",
    opacity: 0.8,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    width: 350,
    height: 250,
    maxWidth: 350,
    maxHeight: 250,
  },
  overlayText: {
    color: "#ffffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 20,
  },
  artistMessage: {
    color: "#ffffffff",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
    paddingBottom: 20,
    marginTop: 10,
    fontWeight: "400",
    letterSpacing: 0.3,
    flexWrap: "wrap",
  },
  buttonContainer: {
    position: "absolute",
    bottom: -40,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 11,
  },
  wideCircularButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#2A79B1",
    fontSize: 16,
    fontWeight: "bold",
  },
  roundButtonContainer: {
    position: "absolute",
    bottom: -80,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 12,
  },
  roundButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  roundButtonText: {
    color: "#2A79B1",
    fontSize: 20,
    fontWeight: "bold",
  },
  insideRoundButtonContainer: {
    alignSelf: "center",
    marginTop: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 0,
    borderRadius: 25,
  },
  insideRoundButton: {
    width: 180,
    height: 35,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  insideRoundButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 300, // Increased bottom padding so last rectangles can scroll into focus
  },
  horizontalContentContainer: {
    paddingHorizontal: 40,
    alignItems: "center",
  },
  horizontalTrackContainer: {
    width: 280,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  slideRectangle: {
    width: 200,
    height: 120,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
    transform: [{ scale: 0.8 }],
    transition: "all 0.3s ease",
  },
  focusedSlideRectangle: {
    width: 250,
    height: 150,
    transform: [{ scale: 1.0 }],
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15,
  },
  focusedContainer: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  focusedRectangle: {
    width: 320, // Increased width when focused
    transform: [{ scale: 1.05 }], // Slightly reduced scale since we're changing width
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 20,
    backgroundColor: "rgba(255, 255, 255, 0.35)", // Brighter background when focused
  },
  unfocusedRectangle: {
    width: 220, // Decreased width when unfocused
    transform: [{ scale: 0.95 }], // Slightly reduced scale adjustment
    opacity: 0.6,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Dimmer background when unfocused
  },
  focusIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 215, 0, 0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  focusText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "bold",
  },
  focusedTrackName: {
    color: "#FFD700",
    fontSize: 20,
  },
  placeholderText: {
    color: "white",
    fontSize: 18,
    opacity: 0.7,
  },
  stageContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 1,
  },
  rightRectangleContainer: {
    alignItems: "flex-end",
    width: "100%",
    marginBottom: 0,
    paddingHorizontal: 10, // Add some padding to accommodate wider focused rectangles
  },
  smallRectangle: {
    width: 200,
    height: 65,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
  },
  rectangleImage: {
    width: "20%",
    height: "70%",
    borderRadius: 5,
    position: "absolute",
    top: 10,
    left: 15,
    opacity: 0.6,
  },
  playPauseButton: {
    position: "absolute",
    top: 19,
    right: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  playPauseIcon: {
    fontSize: 12,
    color: "#2A79B1",
    fontWeight: "bold",
    textAlign: "center",
  },
  rectangleTitleContainer: {
    position: "absolute",
    left: 80,
    right: 0,
    top: "50%",
    transform: [{ translateY: -15 }],
    alignItems: "center",
    zIndex: 2,
  },
  rectangleTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 2,
  },
  rectangleSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 11,
    fontWeight: "400",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  rectangle2: {
    width: 200,
    height: 65,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
   
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
  },
  rectangle3: {
    width: 200,
    height: 65,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
  },
  rectangle4: {
    width: 200,
    height: 65,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
  },
  rectangle5: {
    width: 200,
    height: 65,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
  },
  rectangle6: {
    width: 200,
    height: 65,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  stageDisplay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  clickGradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  playText: {
    fontSize: 24,
    color: "white",
  },
  trackInfo: {
    marginTop: 5,
    alignItems: "center",
  },
  trackName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  trackStatus: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
  },
  stageControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
  },
  controlButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  disabledButton: {
    opacity: 0.5,
  },
  controlText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  stageIndicator: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  stageText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  bottomNavWrapper: {
    zIndex: 10, // In front of CD component
    position: 'relative',
  },
  // DraggableCD Styles
  cdContainer: {
    position: 'absolute',
    bottom: -50, // Moved further down from 0 to -100
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1, // Behind bottom navigation
    height: 180, // Increased height for larger CD
  },
  cdWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cdDisc: {
    width: 300, // Increased from 100 to 200
    height: 300, // Increased from 100 to 200
    borderRadius: 300, // Half of width/height
    backgroundColor: 'rgba(29, 59, 119, 1)', // Your specified RGB color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  cdOuterRing: {
    position: 'absolute',
    top: 6, // Increased proportionally
    left: 6,
    right: 6,
    bottom: 6,
    borderRadius: 80, // Adjusted for new size
    backgroundColor: 'rgba(29, 59, 119, 1)', // Slightly lighter shade of your color
    alignItems: 'center',
    justifyContent: 'center',
  },
  concentricCircle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cdInnerArea: {
    width: 90, // Increased from 60 to 90
    height: 90, // Increased from 60 to 90
    borderRadius: 45, // Half of width/height
    backgroundColor: 'rgba(138, 40, 84, 1)', // Even lighter shade for inner area
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cdCenterHole: {
    width: 30, // Increased from 20 to 30
    height: 30, // Increased from 20 to 30
    borderRadius: 15, // Half of width/height
    backgroundColor: '#AA37A0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  cdHoleHighlight: {
    width: 9, // Increased from 6 to 9
    height: 9, // Increased from 6 to 9
    borderRadius: 4.5, // Half of width/height
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    position: 'absolute',
    top: 3, // Adjusted proportionally
    left: 3, // Adjusted proportionally
  },
  trackIndicator: {
    position: 'absolute',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  holographicOverlay1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 75, // Updated to match new CD size
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ rotate: '45deg' }],
  },
  holographicOverlay2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 75, // Updated to match new CD size
    backgroundColor: 'rgba(135, 206, 250, 0.05)',
    transform: [{ rotate: '-45deg' }],
  },
  lightReflection: {
    position: 'absolute',
    top: 12, // Adjusted proportionally
    left: 24, // Adjusted proportionally
    width: 48, // Increased from 32 to 48
    height: 96, // Increased from 64 to 96
    borderRadius: 24, // Half of width
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ rotate: '12deg' }],
  },
  cdInstructions: {
    position: 'absolute',
    bottom: -25,
    alignItems: 'center',
  },
  instructionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 2,
  },
  instructionSubText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    textAlign: 'center',
  },
});
