import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

/**
 * OKA SUPREME — HYPER-PASSENGER EDITION
 * Features:
 * - Smart Search with Live Context (Home/Work/Weather)
 * - Multimodal Booking (Ride, Flash Delivery, Metro/Bus)
 * - Scheduled Rides & Intercity Specials
 * - Elite Rewards & Oka Coins
 * - Premium Skyblue Glassmorphism Design
 */
export default function HomeScreen() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState("bike");
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    { id: 'bike', name: ' Bike', price: '₹22', icon: 'motorbike', color: '#4FC3F7', time: '1 min', tag: 'Fastest' },
    { id: 'auto', name: 'Auto', price: '₹45', icon: 'taxi', color: '#01579B', time: '3 min', tag: 'Eco' },
    { id: 'cab', name: 'Cab', price: '₹120', icon: 'car-hatchback', color: '#0277BD', time: '5 min', tag: 'Premium' },
    { id: 'shared_cab', name: 'Shared Cab', price: '₹65', icon: 'account-group', color: '#0288D1', time: '4 min', tag: 'Economical' },
    { id: 'shared_auto', name: 'Shared Auto', price: '₹25', icon: 'taxi', color: '#03A9F4', time: '2 min', tag: 'New' },
    { id: 'parcel', name: 'Parcel Delivery', price: '₹30', icon: 'package-variant-closed', color: '#01579B', time: 'Express', tag: 'Delivery' },
  ];

  const animatedPulse = useAnimatedStyle(() => ({
    opacity: withRepeat(withSequence(withTiming(0.4, { duration: 1500 }), withTiming(1, { duration: 1500 })), -1, true),
    transform: [{ scale: withRepeat(withSequence(withTiming(1.1, { duration: 1500 }), withTiming(1, { duration: 1500 })), -1, true) }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E1F5FE" translucent={false} />

      {/* ─── TOP SUPREME HEADER ─── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.dayGreeting}>Good Morning,</Text>
          <View style={styles.brandRow}>
            <Text style={styles.brandName}>Oka Supreme</Text>
            <View style={styles.eliteTag}>
              <MaterialCommunityIcons name="crown" size={12} color="#0288D1" />
              <Text style={styles.eliteText}>ELITE</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.coinBadge}>
            <MaterialCommunityIcons name="database" size={16} color="#0288D1" />
            <Text style={styles.coinText}>1,240</Text>
          </TouchableOpacity>
           {/* ✅ PROFILE NAVIGATION */}
          <TouchableOpacity
            style={styles.avatarBtn}
            onPress={() => router.push("/profile")}
          >
            <Image
              source="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400"
              style={styles.avatarImg}
              contentFit="cover"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

        {/* ─── SMART SEARCH & CONTEXT ─── */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.searchSection}>
          <View style={styles.searchCard}>
            <View style={styles.searchBar}>
              <View style={styles.dotIndicator} />
              <TextInput
                placeholder="Where are you going today?"
                placeholderTextColor="#81D4FA"
                style={styles.searchInput}
              />
              <TouchableOpacity style={styles.searchBtn}>
                <Ionicons name="search" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.contextLine}>
              <Ionicons name="cloud" size={14} color="#0288D1" />
              <Text style={styles.contextText}>Clear skies • Perfect for a Bike ride</Text>
            </View>

          </View>
        </Animated.View>

        {/* ─── OKA EXCLUSIVE: MULTIMODAL HUB ─── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Exclusive Services</Text>
          <TouchableOpacity><Text style={styles.viewMore}>Show All</Text></TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.serviceRow}>
          <TouchableOpacity style={styles.hubCard}>
            <View style={[styles.hubIcon, { backgroundColor: '#E1F5FE' }]}>
              <MaterialCommunityIcons name="calendar-clock" size={24} color="#0288D1" />
            </View>
            <Text style={styles.hubLabel}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hubCard}>
            <View style={[styles.hubIcon, { backgroundColor: '#F1F8FE' }]}>
              <MaterialCommunityIcons name="train-car" size={24} color="#01579B" />
            </View>
            <Text style={styles.hubLabel}>Metro Connect</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hubCard}>
            <View style={[styles.hubIcon, { backgroundColor: '#E0F2F1' }]}>
              <MaterialCommunityIcons name="earth" size={24} color="#00897B" />
            </View>
            <Text style={styles.hubLabel}>Intercity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hubCard}>
            <View style={[styles.hubIcon, { backgroundColor: '#E1F5FE' }]}>
              <MaterialCommunityIcons name="gift-outline" size={24} color="#0288D1" />
            </View>
            <Text style={styles.hubLabel}>Send Gift</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* ─── HYPER SERVICES FEED ─── */}
        <Animated.View entering={FadeInUp.delay(300)} style={styles.bookingFeed}>
          <Text style={styles.sectionTitle}>Choose Your Fleet</Text>
          {services.map((service, idx) => (
            <TouchableOpacity
              key={service.id}
              style={[styles.feedCard, selectedService === service.id && styles.feedCardActive]}
              onPress={() => setSelectedService(service.id)}
            >
              <View style={[styles.feedIconWrap, { backgroundColor: service.color + '15' }]}>
                <MaterialCommunityIcons name={service.icon as any} size={32} color={service.color} />
              </View>
              <View style={styles.feedContent}>
                <View style={styles.feedTop}>
                  <Text style={styles.feedName}>{service.name}</Text>
                  {service.tag && (
                    <View style={[styles.tagBadge, { backgroundColor: service.color + '20' }]}>
                      <Text style={[styles.tagText, { color: service.color }]}>{service.tag}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.feedTime}>{service.time} arrival • Near you</Text>
              </View>
              <View style={styles.feedPriceWrap}>
                <Text style={[styles.feedPrice, selectedService === service.id && { color: '#fff' }]}>{service.price}</Text>
                <Ionicons name="chevron-forward" size={16} color={selectedService === service.id ? "#fff" : "#B3E5FC"} />
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* ─── PREMIUM MAP CONTEXT ─── */}
        <Animated.View entering={FadeInUp.delay(500)} style={styles.mapContainer}>
          <View style={styles.mapHeader}>
            <Text style={styles.sectionTitle}>Real-time Network</Text>
            <View style={styles.liveBadge}>
              <Animated.View style={[styles.liveDot, animatedPulse]} />
              <Text style={styles.liveLabel}>120+ Active Drivers</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.mapVisual}>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800' }}
              style={styles.mapBg}
              imageStyle={{ borderRadius: 32 }}
            >
              <View style={styles.mapOverlay}>
                {/* Centered User Indicator */}
                <View style={styles.userBeacon}>
                  <View style={styles.beaconOuter} />
                  <View style={styles.beaconInner} />
                </View>
                {/* Driver Indicators */}
                <View style={[styles.driverMarker, { top: '20%', left: '30%' }]}>
                  <MaterialCommunityIcons name="motorbike" size={14} color="#03A9F4" />
                </View>
                <View style={[styles.driverMarker, { bottom: '30%', right: '40%' }]}>
                  <MaterialCommunityIcons name="car" size={14} color="#0288D1" />
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F8FE", // Ultra Light Sky
  },
  scroll: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  dayGreeting: {
    fontSize: 14,
    color: '#81D4FA',
    fontWeight: '600',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#01579B',
  },
  eliteTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1F5FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  eliteText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#0288D1',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1F5FE',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  coinText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0288D1',
  },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#0288D1',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },

  /* Search Section */
  searchSection: {
    padding: 20,
    marginTop: 10,
  },
  searchCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 20,
    elevation: 8,
    shadowColor: '#0288D1',
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8FE',
    borderRadius: 18,
    paddingLeft: 15,
    height: 56,
  },
  dotIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0288D1',
  },
  searchInput: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#01579B',
  },
  searchBtn: {
    backgroundColor: '#0288D1',
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  contextLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 15,
    paddingLeft: 5,
  },
  contextText: {
    fontSize: 12,
    color: '#03A9F4',
    fontWeight: '600',
  },

  /* Hub Section */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#01579B',
  },
  viewMore: {
    fontSize: 12,
    color: '#0288D1',
    fontWeight: 'bold',
  },
  serviceRow: {
    paddingLeft: 25,
    marginTop: 15,
    paddingRight: 20,
  },
  hubCard: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 24,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    elevation: 4,
  },
  hubIcon: {
    width: 50,
    height: 50,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hubLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#01579B',
    textAlign: 'center',
  },

  /* Booking Feed */
  bookingFeed: {
    paddingHorizontal: 25,
    marginTop: 35,
    gap: 15,
  },
  feedCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1F5FE',
  },
  feedCardActive: {
    backgroundColor: '#0288D1',
    borderColor: '#0288D1',
    elevation: 10,
  },
  feedIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedContent: {
    flex: 1,
    marginLeft: 15,
  },
  feedTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  feedName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#01579B',
  },
  tagBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  feedTime: {
    fontSize: 12,
    color: '#81D4FA',
    marginTop: 4,
    fontWeight: '600',
  },
  feedPriceWrap: {
    alignItems: 'flex-end',
    gap: 5,
  },
  feedPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0288D1',
  },

  /* Map Visual */
  mapContainer: {
    marginTop: 35,
    paddingHorizontal: 25,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
  },
  liveLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#01579B',
  },
  mapVisual: {
    height: 180,
    borderRadius: 32,
    overflow: 'hidden',
    elevation: 6,
  },
  mapBg: {
    flex: 1,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 136, 209, 0.05)',
  },
  userBeacon: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  beaconOuter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(2, 136, 209, 0.2)',
  },
  beaconInner: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0288D1',
    borderWidth: 2,
    borderColor: '#fff',
  },
  driverMarker: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 50,
    elevation: 5,
  },

  /* Action Section */
  actionSection: {
    padding: 25,
    marginTop: 10,
  },
  primaryBtn: {
    backgroundColor: '#0288D1',
    borderRadius: 28,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    elevation: 12,
    shadowColor: '#0288D1',
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  btnContent: {
    flex: 1,
  },
  btnLabel: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  btnSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    marginTop: 2,
  },
  btnIconBox: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionInfo: {
    textAlign: 'center',
    fontSize: 10,
    color: '#B3E5FC',
    marginTop: 10,
    fontWeight: 'bold',
  },
});