// Initialize Firebase
var config = {
  apiKey: "AIzaSyCsXeeqQGEXp7WQAB7WU4blJmS0rCIAZaU",
  authDomain: "makeup-genius-702f9.firebaseapp.com",
  databaseURL: "https://makeup-genius-702f9.firebaseio.com",
  projectId: "makeup-genius-702f9",
  storageBucket: "makeup-genius-702f9.appspot.com",
  messagingSenderId: "416277350179"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

// Create User Constructor
function User(email, password) {
  this.email = email;
  this.password = password;
}
var userIDdata = { empty: true };
var productFields = { expirationDate: "", openingDate: "", product: "" };

User.prototype.signUp = function () {
  firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function () {
    alert("You have signed up successfully!")
    $("#signUpClose").click();
    var currentUID = firebase.auth().currentUser.uid;
    firestore.collection("User").doc(currentUID).set(userIDdata);
  })
  .catch(function (err) {
    alert("Unable to sign up. Please try again!")
  });
};

User.prototype.signIn = function () {
  var self = this;
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () {
      return firebase.auth().signInWithEmailAndPassword(self.email, self.password).then(function () {
        $("#signInClose").click();
        var currentUID = firebase.auth().currentUser.uid;
        // Only create a new UserID document for new users
        firestore.collection("User").doc(currentUID).get().then(doc => {
          if (!doc.exists) {
            firestore.collection("User").doc(currentUID).set(userIDdata);
          }
        });
      });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("Incorrect credentials. Please try again!")
      } else {
        alert(errorMessage);
      }
    });
};

var signOut = function () {
  firebase.auth().signOut().then(function () {
    alert("You have signed out successfully!")
  }).catch(function (err) {
    alert("Unable to sign out!")
  });
};

User.prototype.resetPassword = function () {
  firebase.auth().sendPasswordResetEmail(this.email).then(function () {
    $("#forgotPasswordClose").click();
    alert("An email has been sent to you!");
  }).catch(function (err) {
    alert("Unable to reset password!")
  });
};

$(document).ready(function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $("#private").show();
      $("#public").hide();
    }
    else {
      $("#private").hide();
      $("#public").show();
    }
  });

  $("#signUp").submit(function (event) {
    event.preventDefault();
    var email = $("#emailSU").val();
    var password = $("#passwordSU").val();
    var passwordConf = $("#passwordConfSU").val()
    if (password !== passwordConf) {
      alert("Passwords don't match. Please verify!");
    }
    else { var newUser = new User(email, password) };
    newUser.signUp();
  });

  $("#signIn").submit(function (event) {
    event.preventDefault();
    var email = $("#emailSI").val();
    var password = $("#passwordSI").val();
    var newUser = new User(email, password);
    newUser.signIn();
  });

  // Forgot password
  $("#forgotPasswordButton").click(function () {
    $("#signInModal").modal('hide');
  });

  // Reset password
  $("#forgotPassword").submit(function (event) {
    event.preventDefault();
    var email = $("#emailFP").val();
    var newUser = new User(email);
    newUser.resetPassword();
  });

  $("#signOutButton").click(function () {
    signOut();
  });
});