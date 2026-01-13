# 🇮🇳 India Tourism App - MysticIndiaTours

A modern, full-featured React web application for exploring and planning trips to incredible destinations across India. Discover beautiful places, save favorites, plan itineraries, and share your travel experiences with the community.

![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![Firebase](https://img.shields.io/badge/Firebase-12.1.0-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Features

### Home & Discovery
- **Browse Destinations**: Explore a curated collection of Indian tourist destinations
- **Advanced Search**: Search destinations by name or description
- **Smart Filtering**: Filter by region and best time to visit
- **Destination Cards**: Beautiful cards with images, ratings, and descriptions
- **Image Carousel**: Stunning visual showcase of India's beauty

### Favorites System
- **Save Favorites**: Add destinations to your personal favorites list
- **Real-time Sync**: Favorites are synced to Firebase Firestore in real-time
- **Persistent Storage**: Your favorites are saved per user account
- **Quick Access**: View and manage all your favorite destinations in one place

### Travel Planning
- **Create Trips**: Plan your trips with custom names and dates
- **Select Destinations**: Choose from your favorites to build itineraries
- **Save Itineraries**: Store your trip plans in Firebase for future reference
- **Date Management**: Set start and end dates for your trips

### Experience Sharing
- **Share Experiences**: Post your travel experiences with photos
- **Community Feed**: Browse experiences shared by other travelers
- **Image Upload**: Upload and share images from your travels
- **Real-time Updates**: See new experiences as they're posted

### Authentication
- **Email/Password**: Sign up and login with email
- **Google Sign-in**: Quick authentication with Google
- **User Profiles**: Personalized experience with user accounts
- **Protected Features**: Save trips and favorites require authentication

### Contact
- **Contact Form**: Reach out to the team with questions or feedback
- **Message Storage**: All messages are stored securely in Firebase

## Tech Stack

- **Frontend Framework**: React 18.3.1
- **Routing**: React Router DOM 6.24.0
- **UI Library**: React Bootstrap 2.10.3 & Bootstrap 5.3.3
- **Styling**: Styled Components 6.1.11
- **Backend**: Firebase 12.1.0
  - Authentication (Email/Password & Google)
  - Firestore Database
  - Cloud Storage
- **Data Fetching**: TanStack React Query 5.85.5
- **Build Tool**: Create React App (react-scripts 5.0.1)

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Firebase Account** (for backend services)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/india-tourism-app.git
cd india-tourism-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable the following services:
   - **Authentication** (Email/Password & Google)
   - **Firestore Database**
   - **Storage** (optional, for image uploads)

3. Get your Firebase configuration from Project Settings → General → Your apps

4. Create a `.env` file in the root directory:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Firestore Database Setup

Create the following collections in Firestore:

- **destinations**: Collection of tourist destinations
  ```javascript
  {
    name: "String",
    description: "String",
    image: "String (URL)",
    region: "String",
    bestTime: "String",
    rating: "Number"
  }
  ```

- **favorites**: User favorites (document ID = user UID)
  ```javascript
  {
    items: [Array of destination objects]
  }
  ```

- **experiences**: Travel experiences shared by users
  ```javascript
  {
    name: "String",
    location: "String",
    description: "String",
    image: "String (URL)",
    timestamp: "Timestamp"
  }
  ```

- **contactMessages**: Contact form submissions
  ```javascript
  {
    name: "String",
    email: "String",
    message: "String",
    createdAt: "Timestamp"
  }
  ```

- **users**: User profiles (document ID = user UID)
  ```javascript
  {
    email: "String",
    displayName: "String",
    favorites: [],
    createdAt: "Timestamp"
  }
  ```

- **itineraries/{userId}/trips**: User trip itineraries
  ```javascript
  {
    name: "String",
    startDate: "String",
    endDate: "String",
    destinations: [Array of destination objects],
    createdAt: "Timestamp"
  }
  ```

### 5. Run the Application

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
india-tourism-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── authentication/
│   │   ├── auth.js              # Authentication service
│   │   └── LoginPage.js         # Login/Signup component
│   ├── components/
│   │   ├── Contact/
│   │   │   ├── ContactForm.js   # Contact form component
│   │   │   └── ContactFrom.style.js
│   │   ├── Home/
│   │   │   ├── Home.js          # Main destinations page
│   │   │   └── Home.styles.js   # Styled components
│   │   ├── DestinationHook.js   # Custom hook for fetching destinations
│   │   ├── Experience.js        # Experience sharing component
│   │   ├── Favorites.js         # Favorites display component
│   │   ├── FavoritesContext.js  # Favorites context provider
│   │   └── Travel.js            # Trip planning component
│   ├── firebase/
│   │   └── config.js            # Firebase configuration
│   ├── App.js                   # Main app component with routing
│   ├── App.css                  # Global styles
│   └── index.js                 # Entry point
├── .env                         # Environment variables (create this)
├── package.json
└── README.md
```

## Key Features Explained

### Real-time Favorites
The favorites system uses Firebase Firestore's real-time listeners to keep your favorites synchronized across all devices. When you add or remove a favorite, it's instantly saved to the cloud.

### Trip Planning
Create personalized trip itineraries by selecting from your favorite destinations. Each trip includes:
- Custom trip name
- Start and end dates
- Selected destinations from your favorites
- Automatic saving to Firebase

### Experience Sharing
Users can share their travel experiences with the community. Each experience includes:
- Traveler name
- Location visited
- Description
- Optional image upload

## Security Rules (Firestore)

For production, set up proper Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own favorites
    match /favorites/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can only read/write their own trips
    match /itineraries/{userId}/trips/{tripId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Everyone can read destinations
    match /destinations/{document=**} {
      allow read: if true;
      allow write: if false; // Only admins can write
    }
    
    // Everyone can read experiences
    match /experiences/{document=**} {
      allow read: if true;
      allow create: if request.auth != null;
    }
    
    // Contact messages - only create
    match /contactMessages/{document=**} {
      allow create: if true;
      allow read: if false; // Only admins can read
    }
  }
}
```

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase Hosting:
```bash
firebase init hosting
```

4. Deploy:
```bash
firebase deploy
```

### Alternative Deployment Options

- **Vercel**: Connect your GitHub repo to Vercel for automatic deployments
- **Netlify**: Drag and drop the `build` folder or connect via Git
- **GitHub Pages**: Use `gh-pages` package for deployment

## Testing

Run the test suite:

```bash
npm test
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## Acknowledgments

- Images from [Pixabay](https://pixabay.com/) and other free image sources
- Firebase for backend services
- React community for amazing tools and libraries

## Support

For support, email akhilesh.singh9367@gmail.com or open an issue in the repository.

---

Made with ❤️ for exploring Incredible India
