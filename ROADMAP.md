#Shootem-totem road map

[TOC]

##0.0.4: phaser 2.1.3

+ Firebase deploy
+ Gulp 4
+ gulp build fixed

##0.0.3: phaser 2.2.4

+ Control de juego desde otro navegador usando websockets. socket.io
+ Nueva tarea "gulp server" que levanta un express
+ Controlador básico para dispositivo móvil
+ Conexión con el juego desde otro navegador conectado a la misma red. Ejemplo http://192.168.1.133:3000/controller

+ Nivel 2
    + Enemigos
    + Backgrounds
    + Música
    + Terminator 1 (jefe)
    + Terminator 2 (jefe)

+ Nivel 3
    + Enemigos
    + Backgrounds
    + Música
    + Hal9000 (jefe)

##0.0.2: phaser 2.2.4

+ Dos jugadores
    + En phaser gestionar los jugadores como grupo
    + Opción 1
        + Teclado
        + Teclado
    + Opción 2
        + Teclado
        + Mando XBOX
    + Opción 3
        + Mando XBOX
        + Mando XBOX

##0.0.1: phaser 2.2.4

+ Background
    + Imagen
    + Parallax
+ Jugador
    + Imagen
        + Teclado
            + Movimiento
            + Acciones: disparar, power up y shenron
        + Mando XBOX
            + Movimiento
            + Acciones: disparar, power up y shenron
+ Cuando el jugador tiene power up mostrarlo
+ Mensaje de fin del juego
+ Al hacer click en la partida vas a pantalla completa
+ Resurrección si quedan vidas con tiempo de invulnerabilidad
+ Crear enemigos
    + Cuadrado: disparo recto y movimiento lento vertical
    + Diamante: disparo dirigido a jugador y movimiento lento vertical
    + Pentágono: disparo recto y movimiento diagonal a izquierda
    + Rectángulo: disparo dirigido y movimiento diagonal a izquierda
    + Pirámide: disparo dirigido y movimiento muy lento vertical, mucha vida.
+ Tamaños de colisión
    + Enemigos
    + Jugador
+ Generación automática de enemigos
+ Gestión de daños de jugador
    + daños al recibir impacto de proyectil enemigo
    + daños al recibir impacto de enemigo
    + calculo de probabilidad de morir
    + actualización de interfaz de daño
+ HUD
    + Diseño
    + Vidas
    + Trifuerzas
    + Bolas de dragón
+ Trifuerza
    + Diseño
    + Generación automática cada X puntos
    + Al coger 3 aparece el jefe
+ Bolas de dragón:
    + Diseño
    + Generación automática cada X tiempo
+ Power ups
    + Generación de power ups
    + newteam: tiro del águila de Óliver Átom
        + sprite
        + funcionalidad
    + martillo de thor: rayo
        + sprite
        + funcionalidad
    + ghostbuster: trampa de los cazafantasmas que atrae los proyectiles enemigos
        + sprite
        + funcionalidad
+ Partículas
    + Al golpear enemigos
    + Al golpear jugador
+ Shenron
    + Solo invocar con 7 bolas de dragon
    + Super saiyan, vida extra y reparación de daños para el jugador 
+ Jefe Stargate
    + Diseño
    + Habilidades
        + Crear enemigos
        + Disparar
+ Carga inicial
    + Diseño de barra de carga
+ Intro
    + Mensaje del big boss describiendo la misión
        + Aquí Big Boss. La inteligencia artificial HAL 9000 a tomado conciencia de sí misma  y ha ejercido el control sobre otros sistemas electrónicos. Nuestra misión con nombre en clave Totem reside en destruir a HAL 9000. El enemigo además se ha hecho con el control de otras importantes tecnologías como: Stargate permitiendo el paso de tecnología desde otros mundos para reforzar al enemigo y Skynet una inteligencia artificial concebida para la defensa militar. Se le proporcionará un prototipo de nave experimental de los 90 imposible de ser controlada por el enemigo. Buena suerte.
+ Menú inicial
    + Diseño de título Shootem Totem
    + ~~Animación de colores aleatorios. (Descartado por efectos extraños)~~
    + Portada para menú
    + Opciones
        + Jugar, one player
        + Manual
        + Ver intro de nuevo
        + Créditos
+ Audio
    + Música menú
    + Música del nivel
    + Sonido al impactar proyectil con objeto
    + Sonido al lanzar powerups
    + Sonido al invocar Shenron
    + Sonido super guerrero
