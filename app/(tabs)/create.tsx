import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';

interface PostData {
  type: 'quote' | 'update';
  content: string;
  quoteInfo: {
    originalAuthor: string;
    bookTitle: string;
    pageNumber: string;
    year: string;
  } | null;
}

export default function CreatePost() {
  const router = useRouter();
  const [isQuote, setIsQuote] = useState(false);
  const [postData, setPostData] = useState<PostData>({
    type: 'update',
    content: '',
    quoteInfo: null,
  });

  const handleSubmit = () => {
    if (!postData.content.trim()) {
      // Show error or alert
      return;
    }

    // Here you would typically send the data to your backend
    // For now, we'll just navigate back
    console.log('New Post:', postData);
    router.back();
  };

  const updatePostData = (field: string, value: string) => {
    if (field === 'content' || field === 'type') {
      setPostData(prev => ({ ...prev, [field]: value }));
    } else {
      setPostData(prev => ({
        ...prev,
        quoteInfo: {
          ...prev.quoteInfo!,
          [field]: value,
        },
      }));
    }
  };

  const handleTypeToggle = (value: boolean) => {
    setIsQuote(value);
    setPostData({
      type: value ? 'quote' : 'update',
      content: '',
      quoteInfo: value ? {
        originalAuthor: '',
        bookTitle: '',
        pageNumber: '',
        year: '',
      } : null,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isQuote ? 'New Quote' : 'New Update'}
        </Text>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[
            styles.submitButton,
            !postData.content.trim() && styles.submitButtonDisabled,
          ]}
          disabled={!postData.content.trim()}
        >
          <Text style={styles.submitButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.typeSelector}>
          <Text style={styles.typeLabel}>Post Type</Text>
          <View style={styles.typeToggle}>
            <Text style={[styles.typeText, !isQuote && styles.activeType]}>
              Update
            </Text>
            <Switch
              value={isQuote}
              onValueChange={handleTypeToggle}
              trackColor={{ false: '#3d3d45', true: COLORS.primary }}
              thumbColor="#fff"
              ios_backgroundColor="#3d3d45"
              style={styles.switch}
            />
            <Text style={[styles.typeText, isQuote && styles.activeType]}>
              Quote
            </Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              styles.contentInput,
              isQuote && styles.quoteInput,
            ]}
            placeholder={isQuote ? 'Enter the quote...' : 'What\'s on your mind?'}
            placeholderTextColor="#666"
            multiline
            value={postData.content}
            onChangeText={(text) => updatePostData('content', text)}
          />

          {isQuote && (
            <View style={styles.quoteDetails}>
              <TextInput
                style={styles.input}
                placeholder="Original Author"
                placeholderTextColor="#666"
                value={postData.quoteInfo?.originalAuthor}
                onChangeText={(text) => updatePostData('originalAuthor', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Book Title (optional)"
                placeholderTextColor="#666"
                value={postData.quoteInfo?.bookTitle}
                onChangeText={(text) => updatePostData('bookTitle', text)}
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Page Number"
                  placeholderTextColor="#666"
                  keyboardType="number-pad"
                  value={postData.quoteInfo?.pageNumber}
                  onChangeText={(text) => updatePostData('pageNumber', text)}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Year"
                  placeholderTextColor="#666"
                  keyboardType="number-pad"
                  value={postData.quoteInfo?.year}
                  onChangeText={(text) => updatePostData('year', text)}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292933',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#3d3d45',
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Sunset-Serial-Medium',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Sunset-Serial-Medium',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  typeSelector: {
    marginBottom: 20,
  },
  typeLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Sunset-Serial-Medium',
  },
  typeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3d3d45',
    borderRadius: 20,
    padding: 4,
  },
  typeText: {
    color: '#fff',
    opacity: 0.6,
    fontSize: 14,
    paddingHorizontal: 12,
    fontFamily: 'Sunset-Serial-Medium',
  },
  activeType: {
    opacity: 1,
  },
  switch: {
    marginHorizontal: 8,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    backgroundColor: '#3d3d45',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
    fontFamily: 'Sunset-Serial-Medium',
  },
  contentInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  quoteInput: {
    fontStyle: 'italic',
    fontSize: 18,
    lineHeight: 26,
  },
  quoteDetails: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 0.48,
  },
});