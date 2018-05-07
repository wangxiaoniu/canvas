



var DrawBoard = document.getElementById('DrawBoard');
var ctx = DrawBoard.getContext('2d');
var lineWidth=5;


autoSetCanvasSize(DrawBoard);
listenerToUser(DrawBoard)

//工具函数以下 

//监听用户 改变页面宽高
function autoSetCanvasSize(canvas) {
    setCanvasSize()

    //监听用户 改变页面宽高
    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        //获取document窗口 宽document.documentElement.clientWidth 高
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

//橡皮 画笔 删除 下载 功能切换' begin--------------------------

var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')
    deletes.classList.remove('active')
   
}
brush.onclick = function () {
    eraserEnabled = false
    brush.classList.add('active')
    eraser.classList.remove('active')
    deletes.classList.remove('active')
   
}
deletes.onclick=function(){
    eraserEnabled = true
    deletes.classList.add('active')
    eraser.classList.remove('active')
    brush.classList.remove('active')
    ctx.clearRect(0, 0, DrawBoard.width, DrawBoard.height);
}
save.onclick=function(e){
    var url=DrawBoard.toDataURL('image/png')
    var a=document.createElement('a')
    document.body.appendChild(a)
    a.href=url
    a.download='我的画'
    a.click()
}
//橡皮 画笔 删除 下载 功能 end----------------------------

//粗细线条选择
thin.onclick=function(){
    lineWidth=5;
    thin.classList.add('active')
    thick.classList.remove('active')
}
thick.onclick=function(){
    lineWidth=10;
    thick.classList.add('active')
    thin.classList.remove('active')
}

// 画笔颜色切换

black.onclick=function(){
    ctx.strokeStyle = 'black';
    black.className='active'
    blue.classList.remove('active')
    yellow.classList.remove('active')
    red.classList.remove('active')

}
blue.onclick=function(){
    ctx.strokeStyle = 'blue';
    blue.className='active'
    black.classList.remove('active')
    red.classList.remove('active')
    yellow.classList.remove('active')
}
yellow.onclick=function(){
    ctx.strokeStyle = 'yellow';
    yellow.className='active'
    black.classList.remove('active')
    blue.classList.remove('active')
    red.classList.remove('active')
}
red.onclick=function(){
    ctx.strokeStyle = 'red';
    red.className='active'
    black.classList.remove('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
}


//监听用户行动事件
function listenerToUser(canvas) {
    var using = false;
    var x;
    var y;
    if (window.ontouchstart !== undefined) {
        //触屏设备

        // 移动端触屏运动相关 begin--------------------------------------------------------
        //阻止触屏 滚动行为-----------
        document.body.addEventListener('touchmove', function (event) {
            event.preventDefault()
        })
        //阻止触屏 滚动行为 end-------
        canvas.addEventListener("touchstart", function (ev) {

            using = true;

            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                x = ev.touches[0].clientX;
                y = ev.touches[0].clientY;
            }
        });
        canvas.addEventListener("touchmove", function (mm) {
            var lastX = mm.touches[0].clientX;
            var lastY = mm.touches[0].clientY;
            if (!using) { return }

            if (eraserEnabled) {
                ctx.clearRect(lastX - 5, lastY - 5, 10, 10)
            } else {
                ctx.beginPath();
                
                ctx.moveTo(x, y)
                ctx.lineWidth =lineWidth;
                ctx.lineTo(lastX, lastY)
                ctx.stroke()
                ctx.closePath()
                x = lastX;
                y = lastY;
            }
        })

        canvas.addEventListener("touchend", function (ev) {

        })

        // 移动端触屏运动相关 end--------------------------------------------------------
    } else {
        //非触屏设备
        // PC版画笔运动相关 starting ------------------------------------------------
        canvas.onmousedown = function (e) {
            using = true;
            // ctx.beginPath()//第一步开始生成画板路径
            // ctx.fillStyle = "rgb(200,0,0)";//颜色
            // ctx.arc(10, 10, 20,0,Math.PI * 2);//画一个以（10,10）为圆心的以20为半径的圆弧（圆），从0开始到360度结束，成一个圆
            // ctx.fill() //喷漆 填充 颜色
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                x = e.clientX;
                y = e.clientY;
            }

        }
        //画笔 移动出路径
        canvas.onmousemove = function (aa) {
            var lastX = aa.clientX;
            var lastY = aa.clientY;
            if (!using) { return }

            if (eraserEnabled) {
                ctx.clearRect(lastX - 5, lastY - 5, 10, 10)
            } else {
                ctx.beginPath();
               
                ctx.moveTo(x, y)
                ctx.lineWidth =lineWidth;
                ctx.lineTo(lastX, lastY)
                ctx.stroke()
                ctx.closePath()
                x = lastX;
                y = lastY;
            }


        }

        //鼠标松开 停止任何动作
        canvas.onmouseup = function () {
            using = false;
        }

        // PC版画笔运动相关 end--------------------------------------------------------

    }
}



