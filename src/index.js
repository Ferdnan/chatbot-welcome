const venom = require('venom-bot'), messagesSent = require('./messagesSent');
const sendMessage = require('./messages');

venom.create({
    session: 'bot-welcome'
}).then(async (client) => {
    client.onMessage(async (message) => {

        if (message.type !== 'chat' || message.isGroupMsg) return;

        console.log(`
        Tipos de mensagens: ${message.type}\n
        Mensagem Recebida: ${message.body}\n
        Mensagem Grupo: ${message.isGroupMsg}
        `);

        lastMessageDate = messagesSent[message.from];
        currentDate = new Date().toLocaleDateString();

        if (!lastMessageDate || lastMessageDate !== currentDate || message.body.includes('0')) {
            setTimeout(async () => {
                await client.sendText(message.from, sendMessage.boasvindas);
            }, 1000);
            messagesSent[message.from] = currentDate;
        };

        switch (message.body) {
            case '1':
                await client.sendText(message.from, sendMessage.atendente);
                break;
            case '2':
                await client.sendImage(message.from, sendMessage.cardapio1);
                await client.sendImage(message.from, sendMessage.cardapio2);
                break;
            case '3':
                await client.sendText(message.from, sendMessage.horario);
                break;
            case '4':
                await client.sendText(message.from, sendMessage.endereco);
                break;
            default:
                break;

        };
    });
});