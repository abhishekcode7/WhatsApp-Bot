const qrcode = require("qrcode-terminal");

const { Client } = require("whatsapp-web.js");
const client = new Client();
const prompt = require("prompt-sync")();
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log("WhatsApp Connected 🎉 \n");
  let grpName = prompt("Enter the name of the group: ");
  let msg = prompt("Enter the message to send to each participant: ");
  const chats = await client.getChats();
  try {
    chats.forEach((chat) => {
      if (chat.isGroup == true && chat.name == grpName) {
        chat.participants.forEach((contact) => {
          client.sendMessage(contact.id._serialized, msg);
        });
      }
    });

    console.log("Successfully sent messages to all participants.");
  } catch (error) {
    console.log("Failed to send messages :(");
  }
});

client.initialize();
