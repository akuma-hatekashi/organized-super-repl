/*let mario = {}, luigi = {}, goomba, bowser, coin, joystick = {}, cloud;
let width,height;
let clouds = [];
let x = 0, y = 0;
let xvel = false;
let yvel = false;
//let mouseIn;
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.class("game")
  width = windowWidth, height = windowHeight;
  mario.r = loadImage('mr.png');
  mario.l = loadImage('ml.png');
  luigi.r = loadImage('lr.png');
  luigi.l = loadImage('ll.png');
  goomba = loadImage('g.png');
  bowser = loadImage('b.png');
  coin = loadImage('m.png');
  cloud = loadImage('c.png')
  joystick = {
    l: loadImage('l.png'),
    r: loadImage('r.png'),
    u: loadImage('u.png')
  };
  for(var i = 0; i < 30; i ++){
    clouds.push({x: random(0,width), y: random(0,height), s: random(30,100),rand: random(0,100)})
  }
  textAlign(RIGHT);
}

function drawbg(){
  for(var i = 0; i < clouds.length; i ++){
    image(cloud, clouds[i].x+sin(cos(frameCount/(clouds[i].s+clouds[i].rand)))*12, clouds[i].y, clouds[i].s, clouds[i].s)
  }
}

function draw() {
  background(120, 210, 255);
  drawbg();
  image(mario.r,0,0,50,50);
  image(mario.l,50,0,50,50);
  image(luigi.r,100,0,50,50);
  image(luigi.l,150,0,50,50);
  image(goomba,0,50,50,50);
  image(bowser,50,50,50,50);
  image(coin,0,100,50,50);
  image(cloud,50,100,50,50)
  image(joystick.l,0,150,70,70);
  image(joystick.r,70,150,70,70);
  image(joystick.u,140,150,70,70);
  fill(0);
  x+=xvel;
  y+=yvel;
  text("X: "+x, width/2, height/2);
  text("Y: "+y, width/2, height/2+10);
}

function mousePressed() {
  if(mouseX >= 0 && mouseY >= 150 && mouseX <= 0+70 && mouseY <= 150+70 && mouseIsPressed){
    xvel = -0.5;
  }
  if(mouseX >= 70 && mouseY >= 150 && mouseX <= 70+70 && mouseY <= 150+70 && mouseIsPressed){
    xvel = 0.5;
  }
  if(mouseX >= 140 && mouseY >= 150 && mouseX <= 140+70 && mouseY <= 150+70 && mouseIsPressed){
    yvel = 0.5;
  }
}
function mouseReleased() {
  xvel = 0;
  yvel = 0;
}

function touchStart() {
  if(mouseX >= 0 && mouseY >= 150 && mouseX <= 0+70 && mouseY <= 150+70 && mouseIsPressed){
    xvel = -0.5;
  }
  if(mouseX >= 70 && mouseY >= 150 && mouseX <= 70+70 && mouseY <= 150+70 && mouseIsPressed){
    xvel = 0.5;
  }
  if(mouseX >= 140 && mouseY >= 150 && mouseX <= 140+70 && mouseY <= 150+70 && mouseIsPressed){
    yvel = 0.5;
  }
}*/
/**
 * PLATFORMING
 * CODE.
 */
/**
 * NOTES
 * xvel replace with player.xvel
 * yvel replace with player.yvel
 * Size is 20 20 but joystick can be 50x50
 * Joystick moving must be player.xvel += player.speed; and stuff
 */
/**
 * BLOCKS
 * P = player
 * @ = portal
 * M = trampoline
 * b = normal block
 * _ = ice
 * # = lava
 * & = monster
 * % = cannon
 * coming: *o = coin*
 * coming: "* = fake portal"
 * 17 max lines for y
 * 20 max lines for x
 */
var playerSize = [22, 22];
var pJumpHeight = 8;
var playerColor;
var grid = 32;
var score = 0;
var width, height;
var level = 0;
var keys = [];
var level_h;
var level_w;
var transparence = 0;
var redTrans = 0;
var cam;
var scene = "home";
var mario = {}, luigi = {}, goomba, bowser, coin, joystick = {}, cloud;
var clouds = [];

function setup() {
  playerColor = color(255, 0, 0);
  noStroke();
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.class("game")
  width = windowWidth, height = windowHeight;
  mario.r = loadImage('mr.png');
  mario.l = loadImage('ml.png');
  luigi.r = loadImage('lr.png');
  luigi.l = loadImage('ll.png');
  goomba = loadImage('g.png');
  bowser = loadImage('b.png');
  coin = loadImage('m.png');
  cloud = loadImage('c.png')
  joystick = {
    l: loadImage('l.png'),
    r: loadImage('r.png'),
    u: loadImage('u.png')
  };
  for(var i = 0; i < 30; i ++){
    clouds.push({x: random(0,width), y: random(0,height), s: random(30,100),rand: random(0,100)})
  }
  textAlign(RIGHT);
  level_h = windowWidth*10000;
  level_w = windowHeight*10000;
  var options = {
    preventDefault: true
  };

  // document.body registers gestures anywhere on the page
  var hammer = new Hammer(document.body, options);
  hammer.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
  });

  hammer.on("swipe", swiped);
}
var levels = [/*
  [
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                   P",
    "bbbbbbbbbbbbbbbbbbbb",
  ],*/
  [
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "b                  b",
    "b                  b",
    "b                  b",
    "b                  b",
    "b      @          Pb",
    "bbbbbbbbbbbbbbbbbbbb",
  ],
  [
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "@                   ",
    "bbbbbbbbbbbbb      ",
    "_ _ _ _ _ _ _b      ",
    "_____________b      ",
    "_ _ _ _ _ _ _b     P",
    "bbbbbbbbbbbbbbbbbbbb",
  ],
  [
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    " P                @ ",
    "bbbbbbbbbbbbbbbbbbbb",
  ],
  [
    "           #        ",
    " _              &   ",
    "                    ",
    "     %_             ",
    "     __             ",
    "       _   b        ",
    "    _               ",
    "                    ",
    "           #        ",
    "                    ",
    "                    ",
    "     M              ",
    "          D         ",
    "     M              ",
    "        #     P     ",
    "    _ &b           @  b",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  ],
  [
    "                   ",
    "                   ",
    "                   ",
    "                   ",
    " b                 ",
    " b                 ",
    " bM                ",
    " b##               ",
    " b                 ",
    " b%         %%%%%%%",
    " b%   M    #       ",
    " b%   #   %#       ",
    " b        %#       ",
    " b        %#       ",
    " b  #         #%#  ",
    "@b  M  A#    #%## P",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  ],
  [
    "        #          ",
    "        #          ",
    "        #          ",
    "        #          ",
    "        #          ",
    "        #          ",
    "        #          ",
    "        #          ",
    "####  ###          ",
    "        #          ",
    "M       #          ",
    "      #######M%###",
    "M  AA#%%#######A   ",
    "    %A%%#######%   ",
    "MM  @A%%#######A& P",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  ],
  [
    " _      ###########",
    " _      ###########",
    " _      ###########",
    " _      ###########",
    " _      ###########",
    " _      ###########",
    " _      ###########",
    " _      ###########",
    " _      ###########",
    " _      ###########",
    " _      ###########",
    " _%%%%%%###########",
    " _                 ",
    " _        A  A  A  ",
    " _                 ",
    " _                 ",
    "@_      A  A  A  A P",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  ],
  [
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "bbbb    b           ",
    "bbbb   #b           ",
    "bbbb    b        %%%",
    "bbbb    b%        %%",
    "bbbb##  b   M      %",
    "bbbb    b###b       ",
    "bbbb    b###b###b   ",
    "%%%b  ##b###b###b   ",
    "       #b###b###b  P",
    "b bbbbbbbbbbbbbbbbbb",
    "b     % % % %      b",
    "bb                 b",
    "bbb   A###&####&##@b",
    "bbbbbbbbbbbbbbbbbbbb",
  ],
  [
    "                    ",
    "                    ",
    "                    ",
    "                   A",
    "         %%      ##b",
    "A        %%       #b",
    "b                 #b",
    "b      A         Mbb",
    "b%     bb##      bbb",
    "b      bb##      bbb",
    "b  %   bbb#     %bbb",
    "b     %bbb      bbbb",
    "b_    %bbb       bbb",
    "       bbbM       bb",
    "A      bbbbbb       ",
    "b     Ab##bbbb     P",
    "b     bb%  %bbbbbbbb",
    "b A    %    bb@    b",
    "b#b#A    A   bbbbb b",
    "b#b#b &  b     #   b",
    "bbbbbbbbbbbbbbbbbbbb",
  ],
  [
    "                         ",
    "                         ",
    "                __       ",
    "          __        b    ",
    "     bbbbbbbbbbbbbb      ",
    "    b%%%%%    %%%%%b   bb",
    "    b              b    b",
    "    b              b    b",
    "    b   bbbbbbbbbb bb#  b",
    "    b   b##bbb%    b##  b",
    "    b   bbbb%     %b#   b",
    "    b  bbb         b    b",
    "    b  bb     AA  AbM   b",
    "    b bb   A  b#AAb#b   b",
    "    b bb A bbbbbb#bb    b",
    "b     bb@bbb###b#bb# P bb",
    "bbbbbbbbbbbbbbbbbbbbbbbbb",
  ],
  [
    "                     bbbbbbbbbbbbbbbbbbbbbbbbb",
    "                                              ",
    "bbbbbbbbbbbbbbbbbbbbbb Mb          A   A      ",
    "#####################b Mb A     A         A   ",
    "AAAAAAAAAAAAAAAAAAAAAb Mb     A   A   A     A ",
    "###########   #    ##b Mb   A   A       A     ",
    "                       MbA     A   A       A  ",
    "                       Mb              A      ",
    "  %     b   M   M      Mb   AA    A  A    A   ",
    "       Ab  MMM MMMM    Mb               A     ",
    "      #b#bbbbbbbbbbbb  bb            A   A    ",
    "     b#b############bM b    A    A A          ",
    "%   bb#b#bbbbbbbbbb#bM b A           A A      ",
    "   b#b#b#b________b#bM b####A    @            ",
    "  b##b#b#b________b#bM bbbbb  A bbb   A  A    ",
    "Pb###b#b#b________b#bM     b##################",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  ],
  [
    "                    ",
    "bbbbbbbbbbbbbb   bM ",
    "                 bM ",
    "                 bM ",
    "  b     &   &  & bM ",
    "  b##############bM ",
    "  b##############bM ",
    "  bAAAAAAAAAAAAAAbM ",
    "                 bM ",
    "    A           %bM ",
    "            A    bM ",
    "                 bM ",
    "   A  A A A  A   bM ",
    "bbbbbbbbbbbbbb   bM ",
    "                bbM ",
    "@              b#  P",
    "bbbbbbbbbbbbbbbbbbbb",
  ],
  [
    "                    ",
    "bbbbbbbbbbbbbb   bM ",
    "                 bM ",
    "                 bM ",
    "  b     &   &  &bbM ",
    "M b##############bM ",
    "  b##############bM ",
    "  bAAAAAAAAAAAAAAbM ",
    "M                bM ",
    "    A       A   %bM ",
    "                 bM ",
    "M                bM ",
    "   A  A A A  A   bM ",
    "bbbbbbbbbbbbbb   bM ",
    "                bbM ",
    "P              b@   ",
    "bbbbbbbbbbbbbbbbbbbb",
  ],
 /* [
    "                    ",
    "                    ",
    "                    ",
    "            M                            @",
    "                            M          bbb",
    "                    M                      M   ",
    "         M                               M",
    "                 M                   M",
    "                       M         M",
    "      M                        M",
    "               M          M  ",
    "                           ",
    "            M              ",
    "                           ",
    "        M                  ",
    "                           ",
    "           M               ",
    "                           ",
    "       M                    ",
    "b&                          &&&&&&&&&&&&&&&&&&&&",
    "bbbbbPMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  ],
  [
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "@                           ",
    "M  M     M                    ",
    "               M                    ",
    "                   M                            ",
    "                       M                    ",
    "                                               ",
    "                            M                   ",
    "                                               ",
    "                              M                 ",
    "                                  M             ",
    "                                    M           ",
    "                                      M         ",
    "                                       M        ",
    "                                         M      ",
    "                                           M    ",
    "                                             M  ",
    "%%%%&&&%&%&%%%&&&                              P ",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAA",
  ],
  [
    "                           ",
    "                           ",
    "                           ",
    "                           ","                           ",
    "                           ","                           ",
    "           M                ",
    "                      M     ",
    "                           ",
    "       M         M           ",
    "                           ",
    " M           M              M       M      ",
    "   M        M                 M     ",
    "  M            M    M    M           M   ",
    "     M             M       M          ",
    "           M      M             M    ",
    "   M                   @",
    "           M       M       M ",
    "                           ",
    "    M          M       M      ",
    "                           ",
    "           M        M        ",
    " M            M         M     ",
    "      M                     ",
    "           M       M         ",
    "                           ",
    "    M                    M   ",
    "             M       M     M  ",
    "     M                      ",
    "         M                  ",
    "   M            M           ",
    "                bbbbbbbb  b",
    "                b         b",
    "                b   bbbbbbb",
    "                b         b",
    "                b         b",
    "                bbbbbb    b",
    "                b         b",
    "                b         b",
    "                b     bbbbb",
    "                b         b",
    "                b         b",
    "                bbbbbb    b",
    "                b         b",
    "                b         b",
    "                b    bbbbbb",
    "                b         b",
    "                b         b",
    "                bbbbbb    b",
    "                b         b",
    "                b    bbbbbb",
    "AAAAAAAAAAAAAAAAb   P     bAAAAAAAAAAAA",
    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  ],*/
  [
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "       %          % ",
    "   %       %        ",
    "       #    #  %    ",
    "   %       %     %  ",
    "      %  %    %     ",
    "  %        %      % ",
    "_    # %      #     ",
    "@_  % ########     P",
    "bbbbbbbbbbbbbbbbbbbb",
  ],
];
//@key interaction
keyPressed = function () {
  keys[keyCode] = true;
};
keyReleased = function () {
  keys[keyCode] = false;
};
var polygonCollide = function (shape1, shape2) {
  var isBetween = function (c, a, b) {
    return (a - c) * (b - c) <= 0;
  };
  /* Do ranges a and b overlap? */
  var overlap = function (a, b) {
    return isBetween(b.min, a.min, a.max) || isBetween(a.min, b.min, b.max);
  };
  /*
   * Project shape onto axis.  Simply
   * compute dot products between the
   * shape's vertices and the axis, and
   * keep track of the min and max values.
   */
  var project = function (shape, axis) {
    var mn = Infinity;
    var mx = -Infinity;
    for (var i = 0; i < shape.length; i++) {
      var dot = shape[i].x * axis.x + shape[i].y * axis.y;
      mx = max(mx, dot);
      mn = min(mn, dot);
    }
    return {
      min: mn,
      max: mx
    };
  };
  /* Compute all projections axes of shape. */
  var getAxes = function (shape) {
    var axes = [];
    for (var i = 0; i < shape.length; i++) {
      var n = (i + 1) % shape.length;
      /*
       * The edge is simply the delta between i and n.
       * The axis is the edge's normal. And a normal 
       * of (x, y) is either of (y, -x) or (-y, x).
       */
      axes[i] = {
        y: shape[i].x - shape[n].x,
        x: -(shape[i].y - shape[n].y)
      };
    }
    return axes;
  };
  var shapes = [shape1, shape2];
  for (var s = 0; s < shapes.length; s++) {
    var axes = getAxes(shapes[s]);
    for (var i = 0; i < axes.length; i++) {
      var axis = axes[i];
      /* Project both shapes onto this axis */
      var p1 = project(shape1, axis);
      var p2 = project(shape2, axis);
      if (!overlap(p1, p2)) {
        /* The two shapes cannot overlap */
        return false;
      }
    }
  }
  return true; /* they overlap */
}; //for triangular collisions
var Camera1 = function (x, y) {
  this.x = x;
  this.y = y;
  this.w = width;
  this.h = height;
  this.view = function (plyer) {
    this.x = plyer.x;
    this.y = plyer.y;
    this.x = constrain(this.x, this.w / 2, level_w - this.w / 2);
    this.y = constrain(this.y, this.h / 2, level_h - this.h / 2);
    translate(width/2 - this.x, height/2 - this.y);
  };
};
var view = function (obj) {
  return obj.x + width/2 - cam.x < width && obj.x + width/2 - cam.x > -obj.w &&
    obj.y + width/2 - cam.y < height && obj.y + width/2 - cam.y > -obj.h;
};
var collide = function (obj1, obj2) {
  return obj1.x < obj2.x + obj2.w && obj1.x + obj1.w > obj2.x &&
    obj1.y < obj2.y + obj2.h && obj1.y + obj1.h > obj2.y;
};

//@player
var Player = function (x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.speed = 0.5;
  this.yvel = 0;
  this.xvel = 0;
  this.gravity = 0.3;
  this.JH = pJumpHeight;
  this.falling = false;
  this.speedLimit = 5;
  this.mxvel = 0;
  this.fallLimit = 8;
  this.health = 100;
  this.dir = 0;
  this.color = playerColor; //art stuff
  this.dead = false;
  this.deadTimer = 0;
  this.update = function (blocks) {
    this.sight = this.w / 4; //calculate the offset of the face based on the width of the player.
    if (!this.dead) { //moving
      if (keys[UP_ARROW] && !this.falling) {
        this.yvel = -this.JH;
      }
      if (keys[RIGHT_ARROW]) {
        this.xvel += this.speed;
        this.dir += this.speed;
      }
      if (keys[LEFT_ARROW]) {
        this.xvel -= this.speed;
        this.dir -= this.speed;
      }
    }
    cam = new Camera1(this.x, this.y)
    if (!keys[RIGHT_ARROW] && !keys[LEFT_ARROW]) {
      if (this.dir > 0) {
        this.dir -= this.speed;
      }
      if (this.dir < 0) {
        this.dir += this.speed;
      }
      if (this.xvel > 0) {
        this.xvel -= this.speed;
      }
      if (this.xvel < 0) {
        this.xvel += this.speed;
      }
    }
    this.dir = constrain(this.dir, -this.sight, this.sight);
    this.xvel = constrain(this.xvel, -this.speedLimit, this.speedLimit);
    if (this.yvel > this.fallLimit) {
      this.yvel = this.fallLimit;
    }
    this.x = constrain(this.x, 0, level_w - this.w);
    this.x += this.xvel;
    this.x += this.mxvel;
    this.applyCollision(blocks, this.xvel, 0); // apply speed and collisions
    this.applyCollision(blocks, this.mxvel, 0); // apply speed and collisions
    this.falling = true;
    this.y += this.yvel;
    this.applyCollision(blocks, 0, this.yvel);
    this.yvel += this.gravity;
    if (this.health <= 0) {
      this.dead = true;
    }
    if (this.dead) {
      this.deadTimer+=10;
    }
    if (this.xvel < 0) {
      fill(255, 0, 0);
      image(mario.l, this.x, this.y, this.w, this.h);
    }
    if (this.xvel >= 0) {
      fill(255, 255, 0);
      image(mario.r, this.x, this.y, this.w, this.h);
    }
  };
  this.draw = function () {
    var d = (this.dir / this.w) * 15;
    /*if (this.xvel <= 0) {
      fill(255, 0, 0);
      rect(this.x, this.y, this.w, this.h);
    }
    if (this.xvel >= 0) {
      fill(255, 25, 0);
      rect(this.x, this.y, this.w, this.h);
    }*/
  };
  this.applyCollision = function (obj, velx, vely) {
    for (var i = 0; i < obj.length; i++) {
      if (collide(this, obj[i]) && obj[i].solid) { // handle collisions
        if (obj[i].type === "ice") {
          obj[i].melting = true;
        } //make the ice blocks start melting
        if (vely > 0) {
          this.yvel = 0;
          this.falling = false;
          this.y = obj[i].y - this.h;
        }
        if (vely < 0) {
          this.yvel = 0;
          this.falling = true;
          this.y = obj[i].y + obj[i].h;
        }
        if (velx < 0) {
          this.xvel = 0;
          this.mxvel = 0;
          this.x = obj[i].x + obj[i].w;
        }
        if (velx > 0) {
          this.xvel = 0;
          this.mxvel = 0;
          this.x = obj[i].x - this.w;
        }
      }
    }
  };
  this.healthBar = function () {
    textSize(14);
    fill(255);
    rect(20, 20, 100, 15);
    fill(255, 0, 0);
    rect(20, 20, this.health, 15);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Health " + max(0, round(this.health)) + "%", 70, 20 + 15 / 2);
    this.health = constrain(this.health, 0, 100);
  };
};
var player = new Player(200, 100, playerSize[0], playerSize[1]);

//@blocks
var Block = function (x, y, w, h, type, i) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.isImage = i;
  this.type = type;
  this.melting = false;
  this.solid = true;
  this.op = 255;
  this.draw = function () {
    //if (view(this)) {
      switch (this.type) {
      case "solid":
      case "moving":
        noStroke();
        fill(122, 90, 0);
        rect(this.x, this.y, this.w, this.h);
        fill(31, 232, 0);
        rect(this.x, this.y, this.w, this.h-25);
        break;
      case "ice":
        strokeWeight(2);
        stroke(255, 255, 255, this.op);
        fill(150, 207, 245, this.op);
        rect(this.x + 1, this.y + 1, this.w - 2, this.h - 2);
        break;
      }
    //}
  };
  this.update = function () {
    if (this.type === "ice") {
      if (this.melting) {
        this.op -= 2;
      }
      if (this.op < 50) {
        this.solid = false;
      }
      if (this.op < -120) {
        this.op = 255;
        this.melting = false;
        this.solid = true;
      }
    }
  };
};
var blocks = [];
blocks.add = function (x, y, w, h, t) {
  this.push(new Block(x, y, w, h, t));
};
blocks.apply = function () {
  for (var i = 0; i < this.length; i++) {
    this[i].draw();
    this[i].update();
  }
};

//@portal
var Goal = function (x, y, radius, i) {
  this.x = x;
  this.y = y;
  this.w = radius;
  this.h = radius;
  this.isImage = i;
  this.timer = 0;
  this.complete = false;
  this.color = 0;
  this.draw = function () {
    //if (view(this)) {
      /*colorMode(HSB);
      
      for (var i = 0; i < this.w / 2; i += 2) {
        fill(255, 0, 255, i * 10);
        ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w - i * 2, this.h - i * 2);
      }
      noFill();
      strokeWeight(2);
      for (var i = 0; i < this.w / 2; i += 2) {
        this.opacity = (sin(i * frameCount) * 70);
        stroke(frameCount % 255, 255, 255, this.opacity);
        ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w - i * 2, this.h - i * 2);
      }
      colorMode(RGB);*/
      fill(18, 184, 62);
      rect(this.x + 3, this.y, this.w - 6, this.h);
      fill(0, 122, 31);
      rect(this.x, this.y, this.w, this.h - 13);
    //}
  };
  this.update = function () {
    if (collide(this, player)) {
      nextlevel();
    }
  };
};
var portals = [];
portals.add = function (x, y, r) {
  this.push(new Goal(x, y, r));
};
portals.apply = function () {
  for (var i = 0; i < this.length; i++) {
    this[i].draw();
    this[i].update();
  }
};

//@lava
var Lava = function (x, y, s, i) {
  this.x = x;
  this.y = y;
  this.w = s;
  this.h = s;
  this.s = (s / 3);
  this.isImage = i;
  this.draw = function () {
    //if (view(this)) {
      for (var x = 0; x < this.w; x += this.s) {
        for (var y = 0; y < this.h; y += this.s) {
          fill(random(100, 200), 0, 0);
          rect(this.x + x, this.y + y, this.s, this.s);
        }
      }
    //}
  };
  this.update = function () {
    if (collide(this, player)) {
      player.health -= 2;
      redTrans = 80;
    }
  };
};
var lava = [];
lava.add = function (x, y, s) {
  lava.push(new Lava(x, y, s));
};
lava.apply = function () {
  for (var i = 0; i < lava.length; i++) {
    lava[i].draw();
    lava[i].update();
  }
};

//@spikes
var Spike = function (x, y, w, h, i) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.isImage = i;
  this.draw = function () {
    //if (view(this)) {
      fill(120);
      triangle(this.x + this.w / 2, this.y, this.x, this.y + this.h, this.x + this.w, this.y + this.h);
    //}
  };
  this.update = function () {
    if (polygonCollide([{
            x: player.x,
            y: player.y
          },
          {
            x: player.x + player.w,
            y: player.y
          },
          {
            x: player.x + player.w,
            y: player.y + player.h
          },
          {
            x: player.x,
            y: player.y + player.h
          }
        ], //the player
        [{
            x: this.x + this.w / 2,
            y: this.y
          },
          {
            x: this.x,
            y: this.y + this.h
          },
          {
            x: this.x + this.w,
            y: this.y + this.h
          }
        ])) {
      player.yvel = -player.JH;
      player.health -= 5;
      redTrans = 80; //red flash
    }
  };
};
var spikes = [];
spikes.add = function (x, y, s) {
  this.push(new Spike(x, y, s, s));
};
spikes.apply = function () {
  for (var i = 0; i < spikes.length; i++) {
    this[i].draw();
    this[i].update();
  }
};

//@jumpBlocks
var JumpBlock = function (x, y, w, h, i) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.isImage = i;
  this.draw = function () {
    //if (view(this)) {
      fill(255, 71, 169);
      rect(this.x, this.y, this.w, this.h);
    //}
  };
  this.update = function () {
    if (collide(this, player)) {
      player.yvel = -player.JH * 1.3;
    }
  };
};
var jumpBlocks = [];
jumpBlocks.add = function (x, y, w, h) {
  this.push(new JumpBlock(x, y, w, h));
};
jumpBlocks.apply = function () {
  for (var i = 0; i < this.length; i++) {
    this[i].draw();
    this[i].update();
  }
};

//@bullet
var Bullet = function (x, y, s, angle) {
  this.x = x;
  this.y = y;
  this.w = s;
  this.h = s;
  this.deleted = false;
  this.angle = angle;
  this.draw = function () {
    if (!this.deleted) {
      fill(50);
      ellipseMode(CORNER);
      ellipse(this.x, this.y, this.w, this.h);
      ellipseMode(CENTER);
    }
  };
  this.update = function () {
    this.x += cos(this.angle) * 2;
    this.y += sin(this.angle) * 2;
    if (collide(this, player) && !this.deleted && !player.dead) {
      this.deleted = true;
      player.health -= 10;
      redTrans = 80;
    }
    for (var i = 0; i < blocks.length; i++) {
      if (collide(this, blocks[i]) && !this.deleted) {
        this.deleted = true;
      }
    }
  };
};
var bullets = [];
bullets.add = function (x, y, angle) {
  this.push(new Bullet(x, y, 5, angle));
};
bullets.apply = function () {
  for (var i = 0; i < this.length; i++) {
    bullets[i].draw();
    bullets[i].update();
    if (bullets[i].deleted) {
      bullets.splice(i, 1);
    }
  }
};

//@cannon
var Cannon = function (x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.angle = Math.atan2(this.x - player.x, player.y - this.y);
  this.bullets = [];
  this.draw = function () {
    // if (view(this)) {
      
      push();
      fill(80);
      translate(this.x + this.w / 2, this.y + this.h / 2);
      rotate(this.angle);
      rect(-5, 5, this.w / 3, 10);
      pop();
      image(bowser, this.x, this.y, this.w, this.h);
      
      /*
      fill(80);
      ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w * 3 / 5, this.h * 3 / 5);*/
    //}
  };
  this.update = function () {
    this.angle = Math.atan2(this.x - player.x, player.y - this.y);
    if ((frameCount % 50) === 0) {
      bullets.add(this.x + this.w / 2, this.y + this.h / 2, this.angle + 90);
    }
  };
};
var cannons = [];
cannons.add = function (x, y, s) {
  this.push(new Cannon(x, y, s, s));
};
cannons.apply = function () {
  for (var i = 0; i < this.length; i++) {
    this[i].draw();
    this[i].update();
  }
};
//@Monster
var Monster = function (x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.dead = false; // is the monster "dead"?
  this.xvel = 1; // monster's speed
  this.angle=0; // the monster's eye's angle
  this.draw = function () {
    if (!this.dead) {
      image(goomba, this.x, this.y, this.w, this.h);
      // draw the monster
      /*fill(23, 130, 57);
      noStroke();
      rect(this.x,this.y,this.w,this.h); // main body
      fill(255, 255, 255);
      stroke(0);
      ellipse(this.x+this.w/2,this.y+this.h/2,this.w/2,this.h/2); // the white of the eye
      // the pupil
      push();
      translate(this.x+this.w/2,this.y+this.h/2);
      rotate(this.angle);
      fill(0, 0, 0);
      ellipseMode(CORNER);
      ellipse(0,0,this.w/5,this.h/5);
      ellipseMode(CENTER);
      pop();
      noStroke();*/
    }
  };
  this.update = function () {
    if (!this.dead) {
      this.angle = atan2(this.x-player.x,player.y-this.y);//make the angle point to the player
      this.x += this.xvel;
      for (var i = 0; i < blocks.length; i++) {
        if (collide(this, blocks[i])) {
          this.xvel = -this.xvel;
        }
      }
      if (collide(this, player)) {
        if (!player.falling && !this.dead && !player.dead) {
          player.health -= 5;
          redTrans = 80;
        } else if (player.yvel > 0 && player.falling) {
          score += 10;
          this.dead = true; // the monster is "dead"
          player.yvel = -player.JH; // make the player hop 
        }
      }
    }
  };
};
var monsters = [];
monsters.add = function (x, y, w, h) {
  monsters.push(new Monster(x, y, w, h));
};
monsters.apply = function () {
  for (var i = 0; i < monsters.length; i++) {
    monsters[i].update();
    monsters[i].draw();
    if (monsters[i].dead) {
      monsters.splice(i, 1);
    }
  }
};
//manage the objects in the game
var objects = [blocks, portals, lava, spikes, jumpBlocks, cannons, bullets, monsters];
objects.remove = function () {
  for (var i = 0; i < objects.length; i++) {
    for (var j = 0; j < objects[i].length; j++) {
      objects[i].splice(j, objects[i].length);
    }
  }
};
// Draw blocks
var updateMap = function () {
  objects.remove();
  for (var col = 0; col < levels[level].length; col++) {
    var cells = levels[level][col];
    for (var row = 0; row < cells.length; row++) {
      switch (cells[row]) {
      case "b":
        blocks.add(row * grid, col * grid, grid, grid, "solid");
      break;
      case "@":
        portals.add(row * grid, col * grid, grid);
      break;
      case "_":
        blocks.add(row * grid, col * grid + (grid / 3) * 2, grid * 2, grid / 3, "ice");
      break;
      case "#":
        lava.add(row * grid, col * grid, grid, grid);
      break;
      case "P":
        player = new Player(row * grid - (player.w - grid) / 2, col * grid - (player.h - grid) / 2, playerSize[0], playerSize[1]);
      break;
      case "A":
        spikes.add(row * grid, col * grid, grid, grid);
      break;
      case "M":
        jumpBlocks.add(row * grid, col * grid + grid * 2 / 3, grid, grid / 3);
      break;
      case "%":
        cannons.add(row * grid, col * grid, grid);
      break;
      case "&":
        monsters.add(row * grid, col * grid, grid, grid);
      break;
      }
      level_w = levels[level][col].length * grid;
      level_h = levels[level].length * grid;
    }
  }
};
var resetCam = function () {
  cam.x = player.x;
  cam.y = player.y;
}; //reset the cam to the player's location.

function drawbg(){
  background(120, 210, 255);
  for(var i = 0; i < clouds.length; i ++){
    image(cloud, clouds[i].x+sin(cos(frameCount/(clouds[i].s+clouds[i].rand)))*12, clouds[i].y, clouds[i].s, clouds[i].s)
  }
}

var nextlevel = function () {
  if (level+1 < levels.length) {
    level++;
    updateMap();
    resetCam();
  } else {
    scene = "win";
  }
}
var applyGame = function () {
  blocks.apply();
  portals.apply();
  if (!player.dead) {
    player.draw();
  }
  lava.apply();
  spikes.apply();
  jumpBlocks.apply();
  monsters.apply();
  bullets.apply();
  cannons.apply();
  player.update(blocks);
};
updateMap();
var cam = new Camera1(player.x, player.y);
var draw = function () {
  drawbg();
  switch(scene){
    case "home":
      noStroke();
      //background(200, 255, 255);
      push();
      cam.view(player);
      applyGame();
      pop();
      player.healthBar();
      if (player.deadTimer > 10) {
        updateMap();
        resetCam();
      }
      //@transparency
      {
        fill(255, 255, 255, transparence);
        rect(0, 0, width, height);
        fill(255, 0, 0, redTrans);
        rect(0, 0, width, height);
        transparence -= 0.2;
        redTrans -= 1;
        transparence = constrain(transparence, 0, 255);
        redTrans = constrain(redTrans, 0, 255);
      }
    break;
    case "win":
    //background(0, 0, 0);
    fill(0);
    textSize(20);
    transparence = 0;
    text("CONGRATULATIONS.\nYou won!\n(what a gamer)", width/2, height/2);
    break;
  }
};
function swiped(event) {
  if (event.direction == 4) {//right
    if(player.mxvel < 5){
      player.mxvel += 1;
    }
  } else if (event.direction == 8) {//up
    if(!player.falling){
      player.yvel = -pJumpHeight;
    }
  } else if (event.direction == 2) {//left
    if(player.mxvel > -5){
      player.mxvel += -1;
    }
  }else if (event.direction == 16) {//down
    player.mxvel = 0;
    player.yvel = 0;
  }
}
function touchStart(){
  console.log(pmouseX - mouseX);
}
