importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// messagingSenderId.
var config = {
    apiKey: "AIzaSyCFj3QkOS_IB-XbI2qtpr51LP5yKeKOees",
    authDomain: "function-2a0fa.firebaseapp.com",
    databaseURL: "https://function-2a0fa.firebaseio.com",
    projectId: "function-2a0fa",
    storageBucket: "function-2a0fa.appspot.com",
    messagingSenderId: "106306790792"
    };
    firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();