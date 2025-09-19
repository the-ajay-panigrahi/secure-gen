# SecureGen

**Your Ultimate Password Generator & Manager.**

SecureGen is a fully functional, full-stack web application designed for modern security needs. It features a robust, customizable password generator and a secure, real-time password manager for authenticated users. Built with React and Firebase, it provides a seamless and secure experience for creating and storing sensitive credentials.

---

## 🔧 Features

- Secure user authentication (Sign Up & Login).
- Real-time password management (Create, Read, Update, Delete).
- Firestore integration for instant data synchronization across sessions.
- Customizable strong password generator (length, character types).
- Protected routes to secure user-specific data.
- Light/Dark mode with persistence via `localStorage`.
- Fully responsive design built with Tailwind CSS.

---

## 🚀 Live Link

**Launch SecureGen →** [https://securegen-password-manager.vercel.app/](https://securegen-password-manager.vercel.app/)

---

## 🖼️ Screenshots



![image 1](/screenshots/image1.png)
![image 2](/screenshots/image2.png)
![image 3](/screenshots/image3.png)
![image 4](/screenshots/image4.png)
![image 5](/screenshots/image5.png)
![image 6](/screenshots/image6.png)
![image 7](/screenshots/image7.png)
![image 8](/screenshots/image8.png)
![image 9](/screenshots/image9.png)
![image 10](/screenshots/image10.png)

---

## 💡 Why I Built This

I built SecureGen to create a practical, full-stack application that addresses a real-world security need. The goal was to demonstrate a deep understanding of modern web development concepts, including secure authentication, real-time database interactions, global state management with React Context, and protected client-side routing.

---

## 🧱 Challenges & Lessons

- Integrating a secure and seamless authentication flow with Firebase Auth.
- Setting up real-time data synchronization using Firestore's `onSnapshot` listener.
- Managing global loading and authentication states to prevent UI flicker and race conditions.
- Implementing client-side route protection to guard user-specific data.
- Designing a unified form component to handle both "create" and "update" logic for passwords.

---

## 🧠 What I Learned

- The power of Firebase as a Backend-as-a-Service for rapid development of secure, real-time applications.
- How to effectively manage global state across a React application using the Context API.
- Advanced React Hook patterns, including `useEffect` for managing side effects and subscriptions, and `useCallback` for performance optimization.
- The importance of separating concerns by centralizing all backend communication in a dedicated configuration file.
- Efficient and declarative form handling using the `react-hook-form` library.

---

## 🗂️ Tech Stack

- **React** (with React Router & React Hook Form)
- **Firebase** (for Authentication & Firestore Database)
- **Tailwind CSS** for styling
- **Vite** for the build tool
- Deployed on **Vercel**

---

## 📦 Future Enhancements

- Password strength indicator during creation.
- Ability to organize passwords into folders or categories.
- Two-factor authentication (2FA) for enhanced security.
- End-to-end encryption for passwords before storing them in the database.

---

## 📁 Project Setup

Clone the repo and run locally:

```bash
git clone https://github.com/the-ajay-panigrahi/secure-gen
cd secure-gen
npm install
# note: create a .env file and add your Firebase project keys
npm run dev
```

You will need to create a .env file in the root and add your Firebase credentials like this:

```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```


“Security is not a product, but a process.” — Bruce Schneier

