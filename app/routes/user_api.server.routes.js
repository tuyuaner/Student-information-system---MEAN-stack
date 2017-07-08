module.exports = function(app) {
var user_api = require('../controllers/user_api.server.controller');
// app.get('/signup', sign_up.render);
app.post('/api/newUser', user_api.create);
app.get('/api/newUser/', user_api.lists);
app.get('/api/newUser/:username', user_api.lists);
app.get('/api/newUser/:username/:password', user_api.loginUser);
// app.put('/api/updateUser/', user_api.updateUser);
app.put('/api/updateUser/:id', user_api.updateUser);
};
