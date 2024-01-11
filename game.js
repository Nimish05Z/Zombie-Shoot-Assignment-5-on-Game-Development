// Iteration 1: Declare variables required for this game
let ZombieArray = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png",
];

let gameBody = document.getElementById("game-body");
let time = Number(document.getElementById("timer").textContent);
let zombieId = 0;


// Iteration 1.2: Add shotgun sound
let shotGunAudio = new Audio("./assets/shotgun.wav");
gameBody.onclick=()=>{
    shotGunAudio.currentTime = 0;
    shotGunAudio.play();
}


// Iteration 1.3: Add background sound
let bgSound = new Audio("./assets/bgm.mp3");
bgSound.play();
bgSound.loop = true;


// Iteration 1.4: Add lives
let maxLives = 3;
let lives = maxLives;


// Iteration 2: Write a function to make a zombie
function makeAZombie(){
    let zombie=document.createElement("img");
    let randomIndex = getRandomInt(0, ZombieArray.length);
    let zombieName = ZombieArray[randomIndex];
    let zombieImgSrc = `./assets/${zombieName}`;
    zombie.src=zombieImgSrc;
    zombie.setAttribute("class","zombie-image");
    zombie.setAttribute("id",`zombie-${zombieId}`)
    let randomLeftDist=getRandomInt(10,90);
    zombie.style.left=`${randomLeftDist}vw`;
    let animationDuration=getRandomInt(3,6);
    zombie.style.animationDuration = `${animationDuration}s`
    gameBody.append(zombie);
    zombie.onclick=()=>{
        destructZombie(zombie);
    }
}


// Iteration 3: Write a function to check if the player missed a zombie
function checkCollision(zombie){
    if(zombie.getBoundingClientRect().top<=0){
        lives--;
        return true;
    }
        return false;
}


// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destructZombie(zombie){
    zombie.style.display="none";
    zombieId++;
    makeAZombie();
}


// Iteration 5: Creating timer
let timer = setInterval(()=>{
    time--;
    document.getElementById("timer").innerText=time;
    let zombie=document.getElementById("zombie-"+zombieId);
    if(checkCollision(zombie)==true){
        destructZombie(zombie);
        if(lives==0){
            clearInterval(timer);
            window.location.href="./game-over.html"
        }
    }
    if(time==0){
        clearInterval(timer);
        window.location.href="./game-over.html"
    }
},1000)


// Iteration 6: Write a code to start the game by calling the first zombie
makeAZombie(zombieId);


// Iteration 7: Write the helper function to get random integer
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomNo = Math.floor(Math.random()*(max - min) + min);
    return randomNo;
}