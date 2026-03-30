import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Mail,
  Lock,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// ✅ Types
type StageType = 'EMAIL' | 'OTP' | 'RESET' | 'SUCCESS';

const STAGES: Record<StageType, StageType> = {
  EMAIL: 'EMAIL',
  OTP: 'OTP',
  RESET: 'RESET',
  SUCCESS: 'SUCCESS',
};

export default function ForgotPasswordScreen(): JSX.Element {
  const router = useRouter();

  const [stage, setStage] = useState<StageType>(STAGES.EMAIL);
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBack = (): void => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (stage === STAGES.EMAIL) router.back();
    else if (stage === STAGES.OTP) setStage(STAGES.EMAIL);
    else if (stage === STAGES.RESET) setStage(STAGES.OTP);
    else router.back();
  };

  const handleContinue = async (): Promise<void> => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);

    if (stage === STAGES.EMAIL) setStage(STAGES.OTP);
    else if (stage === STAGES.OTP) setStage(STAGES.RESET);
    else if (stage === STAGES.RESET) setStage(STAGES.SUCCESS);
  };

  // ---------------- UI ---------------- //

  const renderEmailStage = (): JSX.Element => (
    <Animated.View entering={FadeInDown.duration(800)} style={styles.card}>
      <View style={styles.iconContainer}>
        <Mail size={32} color="#0EA5E9" />
      </View>

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your email and we'll send a verification code.
      </Text>

      <View style={styles.inputWrapper}>
        <Mail size={20} color="#94A3B8" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#94A3B8"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleContinue}
        disabled={!email}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Sending...' : 'Send Code'}
        </Text>
        {!isLoading && <ArrowRight size={20} color="#FFF" />}
      </TouchableOpacity>
    </Animated.View>
  );

  const renderOtpStage = (): JSX.Element => (
    <Animated.View entering={SlideInRight} exiting={SlideOutLeft} style={styles.card}>
      <View style={styles.iconContainer}>
        <ShieldCheck size={32} color="#0EA5E9" />
      </View>

      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code</Text>

      <View style={styles.otpContainer}>
        <TextInput
          style={styles.otpInput}
          maxLength={6}
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
        />
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleContinue}
        disabled={otp.length < 6}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderResetStage = (): JSX.Element => (
    <Animated.View entering={SlideInRight} style={styles.card}>
      <View style={styles.iconContainer}>
        <KeyRound size={32} color="#0EA5E9" />
      </View>

      <Text style={styles.title}>New Password</Text>

      <View style={styles.inputWrapper}>
        <Lock size={20} color="#94A3B8" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Lock size={20} color="#94A3B8" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleContinue}
        disabled={!newPassword || newPassword !== confirmPassword}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderSuccessStage = (): JSX.Element => (
    <Animated.View entering={FadeInUp} style={[styles.card, styles.successCard]}>
      <CheckCircle2 size={64} color="#10B981" />
      <Text style={styles.title}>Success!</Text>
      <Text style={styles.subtitle}>Password updated successfully</Text>

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: '#10B981' }]}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />

          <LinearGradient
            colors={['#0C4A6E', '#0EA5E9', '#38BDF8']}
            style={styles.background}
          />

          <SafeAreaView style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <ArrowLeft size={24} color="#FFF" />
              </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.avoidingView}
            >
              {stage === STAGES.EMAIL && renderEmailStage()}
              {stage === STAGES.OTP && renderOtpStage()}
              {stage === STAGES.RESET && renderResetStage()}
              {stage === STAGES.SUCCESS && renderSuccessStage()}
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
}

// ---------------- STYLES ---------------- //

const styles = StyleSheet.create({
  container: { flex: 1 },

  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    height: 60,
    justifyContent: 'center',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avoidingView: {
    flex: 1,
    justifyContent: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 28,
    elevation: 10,
  },

  successCard: {
    alignItems: 'center',
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: 25,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 14,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },

  otpContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    marginBottom: 20,
  },

  otpInput: {
    height: 60,
    textAlign: 'center',
    fontSize: 28,
    letterSpacing: 8,
  },

  primaryButton: {
    backgroundColor: '#0EA5E9',
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});