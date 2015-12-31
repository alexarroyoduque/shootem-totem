var app = require('express')(),
    express = require('express'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    _ = require('lodash');

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var client = {
  screen: '',
  controllers: []
};

io.on('connection', function (socket){
  console.log('Conexión entrando');

  function cleanRoom() {
    console.log('Sala vaciada');
    client.controllers.length = 0;
    socket.emit('cleanRoom_resend', {});
    socket.broadcast.emit('cleanRoom_resend', {});
  }
  socket.on('cleanRoom', function () {
    if (client.screen) {
      cleanRoom();
    }
  });

  socket.on('disconnect', function () {
    if (client.screen === socket.id) {
      console.log('Pantalla desconectada');
      cleanRoom();
    } else {
      console.log('Jugador desconectado');
      _.remove(client.controllers, {id: socket.id});
    }
  });

  socket.on('register_screen', function (data) {
    console.log('Screen registrada');
    client.screen = socket.id;
  });

  socket.on('register_newPlayer', function (data) {
    console.log('register_newPlayer');
    var playerData = {id: socket.id};

    if (!_.find(client.controllers, {numberOfPlayer: 0})) {
      playerData.numberOfPlayer = 0
    } else if (!_.find(client.controllers, {numberOfPlayer: 1})) {
      playerData.numberOfPlayer = 1
    }

    console.log('playerData.numberOfPlayer');
    console.log(playerData.numberOfPlayer);
    if (typeof playerData.numberOfPlayer !== 'undefined') {
      client.controllers.push(playerData);
      console.log('Nuevo jugador');
      console.log(client.controllers);
      socket.emit('register_newPlayer_resend', playerData)
    }
  });

  socket.on('startGame', function () {
    var areAllPlayersReady = true;
    if (client.screen) {
      for (var i = 0; i < client.controllers.length; i++) {
        areAllPlayersReady = areAllPlayersReady && client.controllers[i].isReady;
      }

      if (areAllPlayersReady) {
        console.log('Iniciando... todos los jugadores listos');
        socket.emit('startGame_resend');
        socket.broadcast.emit('startGame_resend');
      } else {
        console.log('Imposible empezar... algunos jugadores no están listos');
        socket.emit('playersNotReady');
        socket.broadcast.emit('playersNotReady');
      }
    }
  });

  socket.on('playerIsReady', function (data) {
    var player;
    if (data.isReady) {
      _.find(client.controllers, {numberOfPlayer: data.numberOfPlayer}).isReady = true;
      console.log('El jugador ' + data.numberOfPlayer + ' está listo');
    } else {
      _.find(client.controllers, {numberOfPlayer: data.numberOfPlayer}).isReady = false;
      console.log('El jugador ' + data.numberOfPlayer + ' no está listo');
    }
    socket.emit('playerIsReady_resend', client.controllers);
    socket.broadcast.emit('playerIsReady_resend', client.controllers);
  });

  socket.on('actionCode', function (data) {
    console.log('Desde app.js');
    console.log('actionCode');
    console.log(data);
    if (client.screen) {
      io.to(client.screen).emit('actionCode_resend', {
        actionCode: data.actionCode,
        numberOfPlayer: data.numberOfPlayer
      });
    }
  });
});

app.use(express.static('src'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/screen', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/controller', function (req, res) {
  res.sendFile(__dirname + '/controller.html');
});