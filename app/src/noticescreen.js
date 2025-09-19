import { LinearGradient } from 'expo-linear-gradient';
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import BottomNavigation from '../../components/BottomNavigation';
import Header from '../../components/Header';

const NotificationScreen = ({ onNavigate, currentScreen }) => {
  const FeaturedCard = () => (
    <View style={styles.featuredCard}>
      <View style={styles.featuredContent}>
        <View style={styles.featuredImage}>
          <Image 
            source={require('../assets/AdobeStock_1637105302_Preview 1.png')} 
            style={styles.featuredImageContent}
            resizeMode="cover"
          />
        </View>
        <LinearGradient
          colors={['#AA37A0', '#C76B6D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.featuredTag}
        >
          <Text style={styles.featuredTagText}>今月のランキング</Text>
        </LinearGradient>
        <View style={styles.featuredDescriptionContainer}>
          <Text style={styles.featuredDescription}>
            憧れのあの人との{'\n'}対談を目指せ！
          </Text>
          <Text style={styles.featuredDate}>2025/8/25</Text>
        </View>
      </View>
    </View>
  );

  const ContentCard = ({ title, date, tag, tagColor }) => (
    <View style={styles.contentCard}>
      <View style={[styles.tag, { backgroundColor: tagColor }]}>
        <Text style={styles.tagText}>{tag}</Text>
      </View>
      <View style={styles.contentCardBody}>
        <Text style={styles.contentTitle}>
          {title}
        </Text>
      </View>
      <Text style={styles.contentDate}>{date}</Text>
    </View>
  );

  const contentCards = [
    {
      title: "Vtuberコラボ\n限定音声配信中",
      date: "2025/8/25",
      tag: "限定コンテンツ",
      tagColor: "#AA37A0"
    },
    {
      title: "〇〇の次来る\nプレイリスト",
      date: "2025/8/20",
      tag: "プレイリスト配信",
      tagColor: "#AA37A0"
    },
    {
      title: "公式ラジオ\n配信中",
      date: "2025/8/15",
      tag: "限定コンテンツ",
      tagColor: "#AA37A0"
    },
    {
      title: "期間限定！\n対談音声配信中",
      date: "2025/8/10",
      tag: "限定コンテンツ",
      tagColor: "#AA37A0"
    },
    {
      title: "XXXXX\nXXXXXXXX",
      date: "2025/8/8",
      tag: "プレイリスト配信",
      tagColor: "#AA37A0"
    },
    {
      title: "XXXXXXXXX\nXXXXXXXX",
      date: "2025/8/2",
      tag: "限定コンテンツ",
      tagColor: "#AA37A0"
    }
  ];

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <LinearGradient
          colors={['#23386C', '#2A79B1']}
          style={styles.gradient}
        >
          <View style={styles.content}>
          {/* Header */}
          <Header />

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>お知らせ</Text>
          </View>

          {/* Content */}
          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              {/* Featured Card */}
              <FeaturedCard />
              
              <View style={styles.spacer} />
              
              {/* Grid Cards */}
              <View style={styles.gridContainer}>
                {contentCards.map((card, index) => (
                  <View key={index} style={styles.gridItem}>
                    <ContentCard
                      title={card.title}
                      date={card.date}
                      tag={card.tag}
                      tagColor={card.tagColor}
                    />
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Bottom Navigation */}
          <BottomNavigation onNavigate={onNavigate} currentScreen={currentScreen} />
        </View>
      </LinearGradient>
    </View>
    </>
  );
};

export default NotificationScreen;

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
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
  },
  scrollContent: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  featuredCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.43)',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#EC4899', // pink-500
    padding: 14,
    height: 192,
  },
  featuredContent: {
    flex: 1,
    flexDirection: 'row',
  },
  featuredImage: {
    width: 128,
    height: '100%',
    borderRadius: 6,
    overflow: 'hidden',
  },
  featuredImageContent: {
    width: '100%',
    height: '100%',
  },
  featuredTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 25,
    paddingVertical: 4,
    borderTopLeftRadius: 1,
    borderBottomLeftRadius: 1,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 12,
    marginTop: 3,
    marginLeft: -1,
  },
  featuredTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featuredDescriptionContainer: {
    marginTop: 50,
    marginLeft: -130,
  },
  featuredTextContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  featuredTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.55)',
  },
  featuredDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },
  spacer: {
    height: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
  },
  contentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.43)',
    borderRadius: 10,
    padding: 15 ,
    height: 150,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 1,
    borderBottomLeftRadius: 1,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 12,
    marginLeft: -15,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contentCardBody: {
    flex: 1,
    marginBottom: 8,
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
    lineHeight: 18,
  },
  contentDate: {
    fontSize: 12,
    color: '#6B7280', // gray-600
  },
});