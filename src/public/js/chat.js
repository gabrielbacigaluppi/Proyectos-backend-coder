const socketClient = io();

const form = document.getElementById("chatForm");
const inputMessage = document.getElementById("chatMessage");
const h3Name = document.getElementById("name");
const divChat = document.getElementById("chat");

let user;

//Ventana de inicio de sesion
Swal.fire({
    title: "Welcome",
    text: "What is your name",
    input: "text",
    inputValidator: (value) => {
        if (!value) {
            return "Name is required";
        }
    },
    confirmButtonText: "Enter",
}).then((input) => {
    user = input.value;
    h3Name.innerText = `Chat user: ${user}`;
    socketClient.emit("newUser", user);
});

//Nuevo usuario conectado
socketClient.on("newUserBroadcast", (user) => {
    Toastify({
        text: `${user} connected`,
        duration: 5000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
});

//Nuevo mensaje subido, 
form.onsubmit = (e) => {
    e.preventDefault();
    const infoMessage ={
        user_email: user,
        message: inputMessage.value,
    };
    socketClient.emit('message',infoMessage);
}

//Modificar el html con el nuevo mensaje
socketClient.on("chat", (messages) => {
    const messageElement = document.createElement("p");
    messageElement.innerText = `${messages.user_email}: ${messages.message}`;
    divChat.appendChild(messageElement);
});
