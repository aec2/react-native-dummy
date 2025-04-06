import { Text, TouchableOpacity, View, StyleSheet, FlatList, Image } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { COLORS } from "@/constants/theme";

interface Post {
  id: string;
  type: 'quote' | 'update';
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  timestamp: string;
  quoteInfo?: {
    originalAuthor: string;
    bookTitle?: string;
    pageNumber?: number;
    year?: number;
  };
}

const mockPosts: Post[] = [
  {
    id: '1',
    type: 'quote',
    content: "The best way to predict the future is to create it.",
    author: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    quoteInfo: {
      originalAuthor: "Peter Drucker",
      bookTitle: "The Ecological Vision",
      pageNumber: 78,
      year: 1993
    },
    likes: 42,
    comments: 5,
    timestamp: "2h ago"
  },
  {
    id: '2',
    type: 'update',
    content: "Just reached 1000 days of consistent meditation practice! 🧘‍♂️ The journey has been transformative, teaching me patience, mindfulness, and inner peace. Here's to the next 1000 days! 🌟",
    author: {
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    likes: 128,
    comments: 12,
    timestamp: "4h ago"
  },
  {
    id: '3',
    type: 'quote',
    content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    quoteInfo: {
      originalAuthor: "Winston Churchill",
      year: 1941
    },
    likes: 89,
    comments: 7,
    timestamp: "6h ago"
  },
  {
    id: '4',
    type: 'update',
    content: "Finally completed my first marathon! 🏃‍♂️ 26.2 miles of pure determination. Thank you to everyone who supported me through the training. Remember: every mile is a victory! 🏅",
    author: {
      name: "Sarah Williams",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    likes: 256,
    comments: 34,
    timestamp: "8h ago"
  },
  {
    id: '5',
    type: 'quote',
    content: "In the middle of difficulty lies opportunity. - Albert Einstein",
    author: {
      name: "Alex Chen",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    likes: 167,
    comments: 15,
    timestamp: "12h ago"
  },
  {
    id: '6',
    type: 'update',
    content: "Just launched my first indie app! 🚀 After 6 months of late nights and countless cups of coffee, it's finally live. Check it out and let me know what you think! 💻✨",
    author: {
      name: "David Kim",
      avatar: "https://i.pravatar.cc/150?img=6"
    },
    likes: 342,
    comments: 45,
    timestamp: "1d ago"
  },
  {
    id: '7',
    type: 'quote',
    content: "The only way to do great work is to love what you do. - Steve Jobs",
    author: {
      name: "Emily Parker",
      avatar: "https://i.pravatar.cc/150?img=7"
    },
    likes: 198,
    comments: 21,
    timestamp: "1d ago"
  },
  {
    id: '8',
    type: 'update',
    content: "Hit a major milestone today: 100 days of coding streak! 💪 Learning something new every day. The tech community here has been incredibly supportive. Keep pushing, everyone! #100DaysOfCode",
    author: {
      name: "Tom Wilson",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    likes: 423,
    comments: 56,
    timestamp: "2d ago"
  },
  {
    id: '9',
    type: 'quote',
    content: "Your time is limited, don't waste it living someone else's life.",
    author: {
      name: "Lisa Anderson",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    likes: 276,
    comments: 23,
    timestamp: "2d ago"
  },
  {
    id: '10',
    type: 'update',
    content: "Just finished reading 'Atomic Habits' for the third time! 📚 Each read reveals new insights. Key takeaway: Small changes compound into remarkable results. What's your favorite self-improvement book? 🤔",
    author: {
      name: "Ryan Martinez",
      avatar: "https://i.pravatar.cc/150?img=10"
    },
    likes: 189,
    comments: 42,
    timestamp: "3d ago"
  }
];

export default function Index() {
  const [posts, setPosts] = useState(mockPosts);

  const renderQuoteInfo = (quoteInfo: Post['quoteInfo']) => {
    if (!quoteInfo) return null;
    
    return (
      <View style={styles.quoteInfoContainer}>
        <Text style={styles.quoteAuthor}>― {quoteInfo.originalAuthor}</Text>
        {quoteInfo.bookTitle && (
          <Text style={styles.quoteDetails}>
            {quoteInfo.bookTitle}
            {quoteInfo.pageNumber ? `, p.${quoteInfo.pageNumber}` : ''}
            {quoteInfo.year ? ` (${quoteInfo.year})` : ''}
          </Text>
        )}
        {!quoteInfo.bookTitle && quoteInfo.year && (
          <Text style={styles.quoteDetails}>({quoteInfo.year})</Text>
        )}
      </View>
    );
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.authorName}>{item.author.name}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.content}>{item.content}</Text>
      
      {item.type === 'quote' && renderQuoteInfo(item.quoteInfo)}

      <View style={styles.postFooter}>
        <View style={styles.footerLeft}>
          <TouchableOpacity style={styles.footerButton}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
            <Text style={styles.footerText}>{item.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#fff" />
            <Text style={styles.footerText}>{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerButton}>
            <Ionicons name="share-social-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={[
          styles.typeIndicator,
          item.type === 'quote' ? styles.quoteIndicator : styles.updateIndicator
        ]}>
          <Ionicons 
            name={item.type === 'quote' ? "chatbubble-outline" : "create-outline"} 
            size={14} 
            color="#fff" 
          />
          <Text style={styles.typeText}>
            {item.type === 'quote' ? 'Quote' : 'Update'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
        <Link href="/counter" asChild>
          <TouchableOpacity style={styles.counterButton}>
            <Ionicons name="timer-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292933",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Sunset-Serial-Medium",
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 12,
    paddingTop: 8,
  },
  postCard: {
    backgroundColor: "#3d3d45",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Sunset-Serial-Medium",
  },
  timestamp: {
    color: "#fff",
    opacity: 0.6,
    fontSize: 12,
    marginTop: 2,
    fontFamily: "Sunset-Serial-Medium",
  },
  moreButton: {
    padding: 4,
  },
  content: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    fontFamily: "Sunset-Serial-Medium",
  },
  postFooter: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingTop: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  footerText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 14,
    fontFamily: "Sunset-Serial-Medium",
  },
  quoteInfoContainer: {
    marginTop: -8,
    marginBottom: 16,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.primary,
  },
  quoteAuthor: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
    fontFamily: "Sunset-Serial-Medium",
  },
  quoteDetails: {
    color: "#fff",
    opacity: 0.7,
    fontSize: 12,
    fontFamily: "Sunset-Serial-Medium",
  },
  typeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  quoteIndicator: {
    backgroundColor: `${COLORS.primary}40`,
  },
  updateIndicator: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  typeText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
    fontFamily: "Sunset-Serial-Medium",
  },
});