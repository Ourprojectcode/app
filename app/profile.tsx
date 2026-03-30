import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function UPowerRideProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@upowerride.com',
    phone: '+91 98765 43210',
    joinDate: 'Jan 2024',
    totalTrips: 24,
    notificationsEnabled: true,
    walletBalance: 1250,
  });

  const [tempProfile, setTempProfile] = useState(profile);
  const [profileImage, setProfileImage] = useState(null);
  const [showRideHistory, setShowRideHistory] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const rideHistoryData = [
    { id: 1, from: 'Mumbai', to: 'Pune', date: '15 Mar 2024', amount: '₹450', status: 'Completed' },
    { id: 2, from: 'Delhi', to: 'Agra', date: '10 Mar 2024', amount: '₹600', status: 'Completed' },
    { id: 3, from: 'Bangalore', to: 'Mysore', date: '05 Mar 2024', amount: '₹350', status: 'Completed' },
    { id: 4, from: 'Jaipur', to: 'Udaipur', date: '28 Feb 2024', amount: '₹550', status: 'Completed' },
    { id: 5, from: 'Chennai', to: 'Pondicherry', date: '20 Feb 2024', amount: '₹480', status: 'Completed' },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permissions to change profile picture');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setProfile(tempProfile);
      setIsEditing(false);
      setIsLoading(false);
      Alert.alert('Success', 'Profile updated successfully!');
    }, 1000);
  };

  const handleCancelEdit = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleResetPassword = () => {
  Alert.alert(
    'Reset Password',
    'Go to reset password page?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Continue',
        onPress: () => router.push('/reset password'),
      },
    ]
  );
};

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => Alert.alert('Logged out', 'See you soon!') }
      ]
    );
  };

  const StatCard = ({ value, label }) => (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>U power Ride</Text>
          <Text style={styles.headerSubtitle}>Your journey, our passion</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileImageSection}>
            <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Text style={styles.placeholderText}>
                    {profile.name.charAt(0)}
                  </Text>
                </View>
              )}
              <View style={styles.editIconBadge}>
                <Text style={styles.editIcon}>📷</Text>
              </View>
            </TouchableOpacity>
            
            <Text style={styles.userName}>{profile.name}</Text>
            <Text style={styles.userEmail}>{profile.email}</Text>
          </View>

          <View style={styles.statsContainer}>
            <StatCard value={profile.totalTrips} label="Trips" />
            <StatCard value={`₹${profile.walletBalance}`} label="Wallet" />
            <StatCard value="4.8" label="Rating" />
          </View>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            {!isEditing && (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>

          {isEditing ? (
            <View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={tempProfile.name}
                  onChangeText={(text) => setTempProfile({ ...tempProfile, name: text })}
                  placeholder="Enter your name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={tempProfile.email}
                  onChangeText={(text) => setTempProfile({ ...tempProfile, email: text })}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone</Text>
                <TextInput
                  style={styles.input}
                  value={tempProfile.phone}
                  onChangeText={(text) => setTempProfile({ ...tempProfile, phone: text })}
                  placeholder="+91 XXXXX XXXXX"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>📧 Email</Text>
                <Text style={styles.infoValue}>{profile.email}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>📱 Phone</Text>
                <Text style={styles.infoValue}>{profile.phone}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>📅 Joined</Text>
                <Text style={styles.infoValue}>{profile.joinDate}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Reset Password Section */}
        <TouchableOpacity style={styles.actionCard} onPress={handleResetPassword}>
          <View style={styles.actionLeft}>
            <Text style={styles.actionIcon}>🔐</Text>
            <View>
              <Text style={styles.actionTitle}>Reset Password</Text>
              <Text style={styles.actionDescription}>Change your account password</Text>
            </View>
          </View>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>

        {/* Ride History Section */}
        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={() => setShowRideHistory(!showRideHistory)}
        >
          <View style={styles.actionLeft}>
            <Text style={styles.actionIcon}>🚗</Text>
            <View>
              <Text style={styles.actionTitle}>Ride History</Text>
              <Text style={styles.actionDescription}>View all your past rides across India</Text>
            </View>
          </View>
          <Text style={styles.actionArrow}>{showRideHistory ? '▼' : '→'}</Text>
        </TouchableOpacity>

        {showRideHistory && (
          <View style={styles.rideHistoryContainer}>
            {rideHistoryData.map((ride) => (
              <View key={ride.id} style={styles.rideCard}>
                <View style={styles.rideRoute}>
                  <Text style={styles.rideLocation}>{ride.from}</Text>
                  <Text style={styles.rideArrow}>→</Text>
                  <Text style={styles.rideLocation}>{ride.to}</Text>
                </View>
                <View style={styles.rideDetails}>
                  <Text style={styles.rideDate}>{ride.date}</Text>
                  <Text style={styles.rideAmount}>{ride.amount}</Text>
                  <View style={[styles.rideStatus, ride.status === 'Completed' && styles.statusCompleted]}>
                    <Text style={styles.rideStatusText}>{ride.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Wallet Section */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Wallet</Text>
          <View style={styles.walletContainer}>
            <View style={styles.walletBalanceCard}>
              <Text style={styles.walletLabel}>Available Balance</Text>
              <Text style={styles.walletAmount}>₹{profile.walletBalance}</Text>
            </View>
            <TouchableOpacity style={styles.addMoneyButton}>
              <Text style={styles.addMoneyText}>+ Add Money</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Last Transaction</Text>
            <Text style={styles.transactionValue}>₹350 - Trip to Mysore</Text>
          </View>
        </View>

        {/* About Section */}
        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={() => setShowAbout(!showAbout)}
        >
          <View style={styles.actionLeft}>
            <Text style={styles.actionIcon}>ℹ️</Text>
            <View>
              <Text style={styles.actionTitle}>About U power Ride</Text>
              <Text style={styles.actionDescription}>Learn more about our app</Text>
            </View>
          </View>
          <Text style={styles.actionArrow}>{showAbout ? '▼' : '→'}</Text>
        </TouchableOpacity>

        {showAbout && (
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutTitle}>U power Ride - Your Travel Companion</Text>
            <Text style={styles.aboutText}>
              U power Ride is India's premier ride-sharing app designed to make your journeys seamless and memorable. 
              We connect riders with reliable transportation across the country, from the mountains of 
              Himachal to the backwaters of Kerala.
            </Text>
            <Text style={styles.aboutSubtitle}>Features:</Text>
            <Text style={styles.aboutText}>• 24/7 Customer Support</Text>
            <Text style={styles.aboutText}>• Safe and Verified Drivers</Text>
            <Text style={styles.aboutText}>• Best Price Guarantee</Text>
            <Text style={styles.aboutText}>• Real-time Trip Tracking</Text>
            <Text style={styles.versionTextAbout}>Version 1.0.0</Text>
          </View>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>U power Ride v1.0</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4FD',
  },
  
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#2C3E50',
    letterSpacing: -0.5,
  },
  
  headerSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
    opacity: 0.8,
  },
  
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: '#F0F0F0',
  },
  
  profileImagePlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#7AB2D3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  
  placeholderText: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  
  editIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  editIcon: {
    fontSize: 14,
  },
  
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginTop: 8,
  },
  
  userEmail: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 2,
    opacity: 0.8,
  },
  
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  
  statCard: {
    backgroundColor: 'rgba(122, 178, 211, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 90,
  },
  
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7AB2D3',
  },
  
  statLabel: {
    fontSize: 11,
    color: '#7F8C8D',
    marginTop: 4,
  },
  
  detailsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12,
  },
  
  editButton: {
    color: '#7AB2D3',
    fontSize: 14,
    fontWeight: '600',
  },
  
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  
  infoLabel: {
    width: 70,
    fontSize: 14,
    color: '#7F8C8D',
  },
  
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
  },
  
  inputGroup: {
    marginBottom: 16,
  },
  
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 8,
  },
  
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#2C3E50',
    backgroundColor: 'rgba(248, 248, 248, 0.9)',
  },
  
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  
  cancelButtonText: {
    color: '#7F8C8D',
    fontSize: 14,
    fontWeight: '600',
  },
  
  saveButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#7AB2D3',
    alignItems: 'center',
  },
  
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  
  preferenceLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
  },
  
  preferenceDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
  
  actionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  
  actionIcon: {
    fontSize: 24,
  },
  
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  
  actionDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
  
  actionArrow: {
    fontSize: 18,
    color: '#7AB2D3',
  },
  
  rideHistoryContainer: {
    marginHorizontal: 20,
    marginTop: 8,
  },
  
  rideCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  
  rideRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  rideLocation: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    flex: 1,
  },
  
  rideArrow: {
    fontSize: 16,
    color: '#7AB2D3',
    marginHorizontal: 8,
  },
  
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  rideDate: {
    fontSize: 11,
    color: '#7F8C8D',
  },
  
  rideAmount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C3E50',
  },
  
  rideStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: '#E8F4FD',
  },
  
  statusCompleted: {
    backgroundColor: '#D4F1E3',
  },
  
  rideStatusText: {
    fontSize: 10,
    color: '#2C3E50',
    fontWeight: '500',
  },
  
  walletContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  walletBalanceCard: {
    flex: 1,
  },
  
  walletLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  
  walletAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7AB2D3',
  },
  
  addMoneyButton: {
    backgroundColor: '#7AB2D3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  
  addMoneyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  
  transactionLabel: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  
  transactionValue: {
    fontSize: 12,
    color: '#2C3E50',
    fontWeight: '500',
  },
  
  aboutContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    marginTop: 8,
    padding: 20,
    borderRadius: 24,
    marginBottom: 8,
  },
  
  aboutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12,
  },
  
  aboutSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 12,
    marginBottom: 8,
  },
  
  aboutText: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 4,
  },
  
  versionTextAbout: {
    fontSize: 11,
    color: '#7F8C8D',
    marginTop: 12,
    textAlign: 'center',
  },
  
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  
  logoutButtonText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  
  versionText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#7F8C8D',
    marginBottom: 30,
    marginTop: 16,
    opacity: 0.6,
  },
});