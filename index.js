var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// 변수 선언
var timer = 0;
var totalScore = 1;

var spiderList = [];
var candyList = [];

const jumpFrame = 100;
var jumpTimer = 0;
var animation;

// 점프 최대 횟수
const maximumJumpCount = 2;
var frequency = 500;

// 현재 점프 횟수, 점프 기본상태 초기
var jumpCount = 0;
var isJumpKeyActive = false;

// 땅의 y좌표(점프 횟수 초기화 비교할떄)
const groundYCoordination = 200;


// 이미지 넣기
const spiderImg = new Image();
spiderImg.src = '거미.png';

const ghostImg = new Image();
ghostImg.src = '유령.png';

const candyImg = new Image();
candyImg.src = '사탕.png';

const backGroundImg = new Image();
backGroundImg.src = '배경.png';

const backGroundImgX = 0;
const backGroundImgY = -200;


// 유령의 폭과 높이
var ghost = {
    x : 10,
    y : groundYCoordination,
    width : 50,
    height : 50,
    isJump : false,
    draw() {
        // 네모 그리기
        // ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(ghostImg, this.x, this.y);
    }
}


// 장애물 그리기
class Spider {
    constructor() {
        this.x = 500;
        this.y = groundYCoordination;
        this.width = 50;
        this.height = 50;
        
        
    }
    draw(){
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(spiderImg, this.x, this.y); // 장애물 배경
    }
}

// 캔디 그리기
// class Candy {
//     constructor() {
//         this.x = 500;
//         this.y = -200;
//         this.width = 50;
//         this.height = 50;
//     }
//     draw(){
//         ctx.drawImage(candyImg, this.x, this.y);
//     }
// }

function animationFrameCallback(){
    animation = requestAnimationFrame(animationFrameCallback); // 1초에 60번 실행하면 애니메이션 만들수있음
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height); // 캔버스 지우는방법
    ctx.drawImage(backGroundImg, backGroundImgX, backGroundImgY); // 배경 그림


    if(timer % frequency === 0){ // 1초에 (120)프레임 설정  장애물 스폰 시간
        var spider = new Spider(); // 장애물 스폰
        spiderList.push(spider);// 장애물 여러개 스폰

        // 캔디 스폰 슈도코드
        var candy = new Candy(); // 캔디 스폰
        // candy.y = random(0, 100)
        candyList.push(candy);// 캔디 여러개 스폰
    }
    // 반복문
    spiderList.forEach((a, i, o) => {
        // x좌표가 0미만이면 제거
        if (a.x < 0){
            o.splice(i, 1)
        }
        a.x--; // 장애물 왼쪽으로 이동 기능
        Collision(ghost, a);
        a.draw();
    });

    // candyList.forEach((a, i, o) => {
    //     // x좌표가 0미만이면 제거
    //     if (a.x < 0){
    //         o.splice(i, 1)
    //     }
    //     a.x--; // 캔디 왼쪽으로 이동 기능
    //     TouchCandy(ghost, a);
    //     a.draw();
    // });

    // 점프기능
    if( isJumpKeyActive == true ){
        ghost.isJump = true;
        isJumpKeyActive = false;
        jumpTimer = 0;
    }
    if(ghost.isJump == true){
      // y가 0일때 최대 높이, y가 200이면 땅
        ghost.y--; // 100 프레임 지나면 점프 중단
        jumpTimer++; // 점프시 프레임마다 +1
    }
    if(ghost.isJump == false) {
        if(ghost.y < groundYCoordination) {
            ghost.y++;
        }
    }
    if(jumpTimer > jumpFrame){
        ghost.isJump = false
        jumpTimer = 0;
    }
    // spider.draw();
    // candy.draw();
    // ghost.y -= 2;  // 점프 속도
    ghost.draw();
    IsPlayerOnGround();
}

// 충돌확인
function Collision(ghost, Spider){
    var x축차이 = Spider.x - (ghost.x + ghost.width);
    var y축차이 = Spider.y - (ghost.y + ghost.height);
    if (x축차이 < 0 && y축차이 < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height); // 캔버스 지우는방법 클리어
        cancelAnimationFrame(animation) // 애니메이션 중단
            alert("GAME OVER");
    }
}

// 땅에 닿으면 점프 초기화
function IsPlayerOnGround(){
  if (ghost.y == groundYCoordination){
    jumpCount = 0;
  }
}

document.addEventListener('keydown', function (e){
    if (e.code === 'Space'){
      if (maximumJumpCount > jumpCount){
        isJumpKeyActive = true;
        jumpCount++;
      }
      else {
        console.log("점프 이미 두번함");
      }

    }
});

function main(){
  canvas.width = window.innerWidth - 100;
  canvas.height = window.innerHeight - 100;
  animationFrameCallback();
}

main();
