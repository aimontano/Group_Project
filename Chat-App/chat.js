
//chat-app scripts

  const config = {
    apiKey: "AIzaSyB9S-mCQGEi097jF4ZuSCKacRifBAhSOrw",
    authDomain: "donde-chat.firebaseapp.com",
    databaseURL: "https://donde-chat.firebaseio.com",
    projectId: "donde-chat",
    storageBucket: "donde-chat.appspot.com",
    messagingSenderId: "916819442348"
  };
  firebase.initializeApp(config);

  const database = firebase.database();

  $('#send-message-btn').on('click', function (event) {
    event.preventDefault();
    var username = 'username';
    var messageText = $("#newChat").val();
    var now = moment().format('MM/DD/YY - hh:mm:ss A');
    var newChat = {
      user: username,
      message: messageText,
      timestamp: now
    };
    database.ref().push(newChat);
    $('#newChat').val('');
  });

  database.ref().on('child_added', function(childSnapshot) {
    var sender = childSnapshot.val().user;
    var chat = childSnapshot.val().message;
    var time = childSnapshot.val().timestamp;
    var chatBubble = $("<div class='card' id='new-chat-bubble'>");
    var author = $("<span class='card-title' id='chat-sender'>").html(sender + ":");
    var content = $("<span class='card-text p-2' id='chat-content'>").html(chat);
    var stamp = $("<span class='card-text' id='chat-time'>").html(time);
    $("#messageThread").append(chatBubble, author, stamp, "<br>", content);
  });

//
