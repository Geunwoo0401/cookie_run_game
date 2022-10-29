var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img2 = new Image();
img2.src = '유령.png';
// 유령의 폭과 높이
var ghost = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw() {
        // 네모 그리기
        // ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y);
    }
}
var img1 = new Image(); // 이미지 넣기
img1.src = '거미.png';
// ghost.draw()

// 장애물 그리기
class Spider {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y); // 장애물 배경
    }
}

// 변수 선언
var timer = 0;
var Spider여러개 = [];
var jumptimer = 0;
var animation;

// 점프 최대 횟수
var maximum_jump_count = 2;

// 현재 점프 횟수
var jump_count = 0;

// 땅의 y좌표(점프 횟수 초기화 비교할떄)
var ground_y_coordination = 200;


function 프레임마다실행할거(){
    animation = requestAnimationFrame(프레임마다실행할거); // 1초에 60번 실행하면 애니메이션 만들수있음
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height); // 캔버스 지우는방법

    if(timer % 500 === 0){ // 1초에 (120)프레임 설정  장애물 스폰 시간
        var spider = new Spider(); // 장애물 스폰
        Spider여러개.push(spider);// 장애물 여러개 스폰
    }
    // 반복문
    Spider여러개.forEach((a, i, o) => {
        // x좌표가 0미만이면 제거
        if (a.x < 0){
            o.splice(i, 1)
        }
        a.x--; // 장애물 왼쪽으로 이동 기능
        Collision(ghost, a);
        a.draw();
    });

    // 점프기능
    if( jump == true ){
        ghost.y--; // 100 프레임 지나면 점프 중단
        jumptimer++; // 점프시 프레임마다 +1
    }
    if(jump === false) {
        if(ghost.y < 200) {
            ghost.y++;
        }
    }
    if(jumptimer > 100){
        jump = false;
        jumptimer = 0;
    }
    // spider.draw();
    // ghost.y -= 2;  // 점프 속도
    ghost.draw();
    IsPlayerOnGround();
}
프레임마다실행할거();

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
  if (ghost.y == ground_y_coordination){
    jump_count = 0;
  }
}


var jump = false;
document.addEventListener('keydown', function (e){
    if (e.code === 'Space'){
      if (maximum_jump_count > jump_count){
        jump = true;
        jump_count++;
      }
      else {
        console.log("점프 이미 두번함");
      }

    }
});
