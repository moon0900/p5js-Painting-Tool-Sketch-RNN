var brush;
var r;
var g;
var b;

var savecursor;
var delcursor;
var erasecursor;
var colorcursor;
var mlcursor;
var randcursor;

let eraser;
let download;
let del;
let magic;

let ml;
var x;
var y;
let strokeGoing;
let pressPen = "down";
let dog;
let cat;
let flower;
var mlmlml;

let size1 = 40; //굵기 버튼 크기
let size2 = 50; //아이콘 버튼 크기

var randR;
var randG;
var randB;

function preload(){
  eraser = loadImage('eraser.png');
  download = loadImage('download.png');
  del = loadImage('trashcan.png');
  magic = loadImage('magic.png');
  dog = loadImage('dog.png');
  cat = loadImage('cat.png');
  flower = loadImage('flower.png');
  ml = ml5.sketchRNN('cat');
}

function setup() {
  createCanvas(640, 640);
  background(255);
  mlmlml=0;
  brush = 1;
  r=0;
  g=0;
  b=0;
  randR=0;
  randG=0;
  randB=0;
  savecursor=0;
  delcursor=0;
  erasecursor=0;
  colorcursor=1;
  mlcursor=0;
  randcursor=0;
  startml();
}

function startml(){
  x = 320;
  y = 400;
  ml.reset();
  ml.generate(gotStroke);
}

function draw() {
  
  //데쉬 배경
  noStroke();
  fill(240);
  rect(0, 0, 640, 160);
  
  brushmenu(0, 1);
  brushmenu(1, 5);
  brushmenu(2, 10);
  brushmenu(3, 15);
  brushmenu(4, 20);
  brushmenu(5, 25);
  
  palette(1, 0, 0, 0, 340, 10, 20);
  palette(2, 127, 127, 127, 370, 10, 20);
  palette(3, 136, 0, 21, 400, 10, 20);
  palette(4, 237, 28, 36, 430, 10, 20);
  palette(5, 255, 127, 39, 460, 10, 20);
  palette(6, 255, 242, 0, 490, 10, 20);
  palette(7, 34, 177, 76, 520, 10, 20);
  palette(8, 0, 162, 232, 550, 10, 20);
  palette(9, 63, 72, 204, 580, 10, 20);
  palette(10, 163, 73, 164, 610, 10, 20);
  palette(11, 255, 255, 255, 340, 40, 20);
  palette(12, 195, 195, 195, 370, 40, 20);
  palette(13, 185, 122, 87, 400, 40, 20);
  palette(14, 255, 174, 201, 430, 40, 20);
  palette(15, 255, 201, 14, 460, 40, 20);
  palette(16, 239, 228, 176, 490, 40, 20);
  palette(17, 181, 230, 29, 520, 40, 20);
  palette(18, 153, 217, 234, 550, 40, 20);
  palette(19, 112, 146, 190, 580, 40, 20);
  palette(20, 200, 191, 231, 610, 40, 20);
  palette(21, randR, randG, randB, 550, 70, 80);
  
  //랜덤 색상 버튼
  if(randcursor === 1){
    noStroke();
    fill(237, 34, 93);
    ellipse(530-size2/2, 80+size2/2, size2+10, size2+10);
    image(magic, 530-size2, 80, size2, size2);
    randcursor = 0;
  } else{
    image(magic, 530-size2, 80, size2, size2);
  }
  
  //저장
  if(savecursor === 1){
    noStroke();
    fill(237, 34, 93);
    ellipse(20+size2/2, 80+size2/2, size2+10, size2+10);
    image(download, 20, 80, size2, size2);
    savecursor = 0;
  } else{
    image(download, 20, 80, size2, size2);
  }
  
  //다 지우기
  if(delcursor === 1){
    noStroke();
    fill(237, 34, 93);
    ellipse(1*(15+size2)+20+size2/2, 80+size2/2, size2+10, size2+10);
    image(del, 1*(15+size2)+20, 80, size2, size2);
    delcursor = 0;
  } else{
    image(del, 1*(15+size2)+20, 80, size2, size2);
  } 
  
  //지우개
  if(erasecursor === 1){
    noStroke();
    fill(237, 34, 93);
    ellipse(2*(15+size2)+20+size2/2, 80+size2/2, size2+10, size2+10);
    image(eraser, 2*(15+size2)+20, 80, size2, size2);
  } else{
    image(eraser, 2*(15+size2)+20, 80, size2, size2);
  }
  
  strokeWeight(1);
  stroke(200);
  line(3*(15+size2)+25, 80, 3*(15+size2)+25, 80+size2);
  
  //인공지능 그리기 버튼
  mlbutton(1, flower);
  mlbutton(2, cat);
  mlbutton(3, dog);

  if(mouseIsPressed){ 
    if(erasecursor === 1){
      strokeWeight(50);
      stroke(255, 255, 255);
    }
    else if(colorcursor === 21){
      strokeWeight(brush);
      r = randR;
      g = randG;
      b = randB;
      stroke(r, g, b);
    }
    else {
      strokeWeight(brush);
      stroke(r, g, b);
    }
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  
  if(mlmlml > 0){
    if(strokeGoing){
      if(pressPen === "down"){
        stroke(r, g, b);
        strokeWeight(brush);
        line(x, y, x+strokeGoing.dx, y+strokeGoing.dy);
      }
      x = x+strokeGoing.dx;
      y = y+strokeGoing.dy;
    
      pressPen = strokeGoing.pen;
      if(strokeGoing.pen!== "end"){
        strokeGoing = null;
        ml.generate(gotStroke);
      }
    }
  } 
}

function mousePressed(){
  //인공지능 버튼 기능
  if(mouseX>3*(15+size2)+40 && mouseX<3*(15+size2)+40+size2){
      if(mouseY>80 && mouseY<80+size2){
        mlcursor = 1;
        ml = ml5.sketchRNN('flower');
        mlmlml = 1;
        startml();
      }
  }
  if(mouseX>4*(15+size2)+40 && mouseX<4*(15+size2)+40+size2){
      if(mouseY>80 && mouseY<80+size2){
        mlcursor = 2;
        ml = ml5.sketchRNN('cat');
        mlmlml = 2;
        startml();
      }
  }
  if(mouseX>5*(15+size2)+40 && mouseX<5*(15+size2)+40+size2){
      if(mouseY>80 && mouseY<80+size2){
        mlcursor = 3;
        ml = ml5.sketchRNN('dog');
        mlmlml = 3;
        startml();
      }
  }
  
  //랜덤 색 지정
  if(mouseX>530-size2 && mouseX<530){
      if(mouseY>80 && mouseY<80+size2){
        randcursor=1;
        randR = random(255);
        randG = random(255);
        randB = random(255);
      }
    }
  
  //저장
  if(mouseX>20 && mouseX<20+size2){
      if(mouseY>80 && mouseY<80+size2){
        savecursor=1;
        var img;
        img = get(0, 160, 640, 480);
        save(img, 'myImage'+year()+'-'+month()+'-'+day()+'_'+hour()+minute()+second()+millis()+'.png');
      }
    }
  //다 지우기
  if(mouseX > 20+1*(15+size2) && mouseX < 20+1*(15+size2)+size2){
    if(mouseY > 80 && mouseY < 80+size2){ 
      delcursor=1;
      background(255);
    }
  }
  //지우개
  if(mouseX > 20+2*(15+size2) && mouseX < 20+2*(15+size2)+size2){
    if(mouseY > 80 && mouseY < 80+size2){
      erasecursor=1;
    }
  }
}

function brushmenu(n, brushsize){
  strokeWeight(1);
  stroke(200);
  if(brush === brushsize){
    if(erasecursor!=1){
      strokeWeight(5);
      stroke(237, 34, 93);
    }
  }
  if(r > 240 && g > 240 && b > 240){ //브러쉬 색 밝으면 배경 어둡게
    fill(180, 180, 180);
  } else {
    fill(255, 255, 255);
  }
  ellipse(n*(10+size1)+15+size1/2, 15+size1/2, size1, size1);
  fill(r, g, b);
  noStroke();
  ellipse(n*(10+size1)+15+size1/2, 15+size1/2, brushsize, brushsize);
  if(mouseIsPressed){
    if(mouseX>n*(10+size1)+15 && mouseX<n*(10+size1)+15+size1){
      if(mouseY>15 && mouseY<15+size1){
        erasecursor=0;
        brush = brushsize;
      }
    }
  }
}

function palette(n, cr, cg, cb, x, y, s){
  strokeWeight(1);
  stroke(200);
  if(colorcursor === n){
    strokeWeight(5);
    stroke(237, 34, 93);
  }
  fill(cr, cg, cb);
  rect(x, y, s, s);
  if(mouseIsPressed){
    if(mouseX>x && mouseX<x+s){
      if(mouseY>y && mouseY<y+s){
        erasecursor = 0;
        colorcursor = n;
        r = cr;
        g = cg;
        b = cb;
      }
    }
  }
}

function mlbutton(n, icon){
  if(mlcursor === n){
    noStroke();
    fill(r, g, b);
    ellipse((n+2)*(15+size2)+40+size2/2, 80+size2/2, size2+10, size2+10);
    image(icon, (n+2)*(15+size2)+40, 80, size2, size2);
    mlcursor = 0;
  } else{
    image(icon, (n+2)*(15+size2)+40, 80, size2, size2);
  }
}

function gotStroke(err, s){
  strokeGoing = s;
}