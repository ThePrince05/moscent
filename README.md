🌸 Mo'Scent – Modern Fragrance Store
## 📄 Description

Mo'Scent is a modern, client-side e-commerce application built with Vite and React, designed for discovering and purchasing premium fragrances. The platform delivers a seamless shopping experience powered by Firebase for authentication and real-time data.

Users can browse by category (Men, Women, Unisex), explore trending fragrances, discover discounted items, manage favorites, and access a personalized account dashboard — all within a fast, single-page application architecture.

Built with a modular component structure and scalable data flow, Mo'Scent is designed for performance, maintainability, and future expansion into a full production-grade e-commerce system.

## ✨ Key Features

❤️ User Interaction
- Add-to-cart functionality
- Favorites system with state persistence
- Dedicated favorites page
- Real-time product rendering

👤 Account Dashboard
- Personalized user profile
- Orders overview
- Favorites access
- Shipping address management
- Change password
- Change email
- Personal details management
- Payment methods section (ready for secure backend integration)
- Secure logout functionality

🛠️ Admin Access
- Conditional admin dashboard access
- Role-based rendering via AuthContext
- Protected admin tools entry point

## 🛠️ Technologies Used
- React – Component-based architecture
- Vite – Fast development & optimized builds
- React Router – Client-side routing
- Firebase Authentication – Secure login/logout
- Firebase Firestore – Real-time database
- React Context API – Global authentication state
- Tailwind CSS – Utility-first styling
- React Icons (Feather) – Clean UI iconography


## 📦 Installation
1. 	Clone the repository:
```bash
git clone https://github.com/ThePrince05/moscent.git
```

2.	Install dependencies
```bash
npm install
# or
yarn install
```
3. 	Set up environment variables
	Create a .env.local file with your configuration:
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4.	Run the development server:
```bash
npm run dev
# or
yarn dev
```
Open http://localhost:3000 to see your blog.



## 📊 Firestore Schema Example

Collection: fragrances
```bash
{
  "id": "fragrance-001",
  "name": "Midnight Oud",
  "brand": "Luxury House",
  "category": "men",
  "price": 1200,
  "discountedPrice": 950,
  "imageUrl": "https://your-storage-url.com/image.webp",
  "description": "A bold oriental fragrance.",
  "createdAt": "timestamp"
}
```

Collection: users
```bash
{
  "firstName": "John",
  "email": "john@email.com",
  "role": "admin",
  "createdAt": "timestamp"
}
```


## 🔐 Security Notes

- Firebase Authentication secures user sessions.
- Firestore rules should enforce:
- Users can only modify their own profile.
- Admin-only access to privileged routes.

Admin rendering in UI is conditional — Firestore rules must enforce backend protection.
users (managed by Firebase Auth, with Firestore extensions)
- email: string
- role: "admin" | "author" | "reader"
- createdAt: timestamp
- emailVerified: boolean

## 🧪 Usage
Watch a quick demo of the app in action:  
📺 [YouTube Demo](https://youtu.be/_o24ZA6BxBg)

## 📝 License
This project is licensed under the **[Apache License 2.0](LICENSE)**.
