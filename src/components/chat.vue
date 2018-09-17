<template>

    <div class="chat-app">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Donde Chat</h3>
                <h6 class="card-subtitle" id="userWelcome" value="">username</h6>
            </div>
            <div id="chat-display" class="card-body">
            <span v-for="message in chatData" :key="message.id">
                <div class='card' id='new-chat-bubble'></div>
                <span class='card-title' id='chat-sender'>{{ message.sender }}:</span>
                <span class='card-text p-2' id='chat-content'>{{ message.chat }}</span>
                <span class='card-text' id='chat-time'>{{ message.time }}</span>
            </span>
            </div>
            <div class="card-body" id="new-message-box">  
            <div class="form-group">
                <form>
                    <label for="newMessage"><h4>New Message:</h4></label>
                    <input v-model="chatMessage" type="text" class="form-control" id="newChat" placeholder="enter message">
                    <button v-on:click.prevent="sendMessage()" class="btn btn-success" id="send-message-btn">Send</button>    
                </form>
            </div>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    name: 'Chat',
    data() {
        return {
            chatMessage: '',
            chatData: []
        }
    },
    methods: {
        sendMessage: function(event) {
            const database = firebase.database();
            var username = 'username';
            var now = moment().format('MM/DD/YY - hh:mm:ss A');
            var newChat = {
                user: username,
                message: this.chatMessage,
                timestamp: now
            };
            database.ref().push(newChat);
            this.chatMessage = '';
        }
    },
    created: function() {
        const database = firebase.database();
        database.ref().on('child_added', (childSnapshot) => {
            var sender = childSnapshot.val().user;
            var chat = childSnapshot.val().message;
            var time = childSnapshot.val().timestamp;
            var id = childSnapshot.key;
            var messageObject = {
                sender,
                chat,
                time,
                id
            }
            this.chatData.push(messageObject);
        });
    }
}

 

//   $('#send-message-btn').on('click', function (event) {
//     event.preventDefault();
//     var username = 'username';
//     var messageText = $("#newChat").val();
//     var now = moment().format('MM/DD/YY - hh:mm:ss A');
//     var newChat = {
//       user: username,
//       message: messageText,
//       timestamp: now
//     };
//     database.ref().push(newChat);
//     $('#newChat').val('');
//   });

//   database.ref().on('child_added', function(childSnapshot) {
//     var sender = childSnapshot.val().user;
//     var chat = childSnapshot.val().message;
//     var time = childSnapshot.val().timestamp;
//     var chatBubble = $("<div class='card' id='new-chat-bubble'>");
//     var author = $("<span class='card-title' id='chat-sender'>").html(sender + ":");
//     var content = $("<span class='card-text p-2' id='chat-content'>").html(chat);
//     var stamp = $("<span class='card-text' id='chat-time'>").html(time);
//     $("#messageThread").append(chatBubble, author, stamp, "<br>", content);
//   });

</script>

<style>

body{
    font-family: 'Trebuchet MS', Arial, sans-serif;
}
.chat-app {
    max-width: 400px;
    box-shadow: 3px 3px rgba(51, 51, 51, 0.8);
    border-radius: 5px;
    position: fixed;
    bottom: 3px;
    right: 0;
}

.card-header {
    background: rgb(150, 0, 24);
    color: white;
    display: inline-block;
    box-shadow: 0 3px rgba(51, 51, 51, 0.75)
}

.card-title {
    display: inline-block;
    margin-right: 80px;
}

.card-subtitle {
    display: inline-block;
    position: absolute;
    right: 10px;
}

#new-message-box {
    background-color: rgba(115, 194, 251, 0.267)
}

#userWelcome {
    padding-right: 25px;
}

#chat-display {
    min-height: 250px;
    max-height:350px;
    overflow: scroll;
    background-color: rgba(255, 255, 255, 0.753);
}

#chat-sender {
    font-size: 14px;
    display: inline-block;
    font-weight: bold;
}

#chat-time {
    font-size: 12px;
    font-style: italic;
    color: grey;
    text-align: right;
    display: inline-block;
    float: right;
}

#chat-content {
    font-family: Arial;
}

.form-group {
    margin-top: 25px;
}

#newChat {
    min-height: 50px;
    max-height: 150px;
    overflow: scroll;
}

.btn {
    margin-top: 15px;
    width: 100px;
    margin-bottom: 10px;
}

</style>