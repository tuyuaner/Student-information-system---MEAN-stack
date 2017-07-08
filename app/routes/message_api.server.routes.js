module.exports = function(app) {
var message_api = require('../controllers/message_api.server.controller');
app.get('/api/getMessages/:recipient',message_api.lists);
app.put('/api/updateMessageImportance/:id/:importance', message_api.updateImp);
app.post('/api/saveMessage', message_api.saveMessage);
app.delete('/api/deleteMessage/:id', message_api.delete);
};
