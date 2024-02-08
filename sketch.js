const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var plank;
var ground;
var higherground;
var con;
var con2;
var rope;
var elevador,elevador_img;
var fruit;
// bubble
var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;









function preload()
{
  elevador_img = loadImage("elevador.png")
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  star_img = loadImage('star.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');








  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

   var fruit_options = {
    restitution: 0.8
  }
  bk_song.play();
  bk_song.setVolume(0.5);




  ground =new Ground(250,height-10,width,20);
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);
  
  elevador = createSprite(250,460,20,20);
  elevador.addImage(elevador_img);
  elevador.scale = 0.6;
  
  //sprite do coelho
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(250,657,100,100);
  
  bunny.scale = 0.2;
  higherground =new Ground(250,730,100,10);

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  rope = new Rope(4,{x:230,y:330});
  rope2 = new Rope(4,{x:50,y:450});
  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);

  //botão 1
  button = createImg('cut_btn.png');
  button.position(200,320);
  button.size(50,50);
  button.mouseClicked(remove_rope);




  button2 = createImg('cut_btn.png');
  button2.position(30,420);
  button2.size(50,50);

  button2.mouseClicked(drop2);

  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  ground.show();
  higherground.show();
  rope.show();
  rope2.show();

  if(collide(fruit,bunny,80)==true)
  {
   
    elevador.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    

    bunny.changeAnimation('eating');

    eating_sound.play();
    
  }
  
  if(collide(fruit,elevador,40) == true)
    {
      engine.world.gravity.y = +1;
      elevador.position.x = fruit.position.x;
      elevador.position.y = fruit.position.y;
    }

  drawSprites();

}

function drop()
{
  cut_sound.play();
  rope.break();
  con.dettach();
  con = null; 
} 

function drop2() {
cut_sound.play();
rope2.break();
con2.dettach();
con2 = null;



}

function remove_rope()
{
  rope.break();
  con.dettach();
  con = null; 
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              //World.remove(engine.world,fruit);
              //fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

