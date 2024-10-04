var canvas = document.getElementById('wheel');
var context = canvas.getContext('2d');
var stopped = false;

// initial angle of every spoke
var spoke1_degree = Math.PI / 4;
var spoke2_degree = (3 * Math.PI) / 4;
var spoke3_degree = (7 * Math.PI) / 4;
var spoke4_degree = (5 * Math.PI) / 4;
var spoke5_degree = Math.PI / 2;
var spoke6_degree = 0;
var spoke7_degree = (3 * Math.PI) / 2;
var spoke8_degree = Math.PI;

// jiggle properties
var jiggleVelocity = 10;
var dampingFactor = 0.99;
var stopThreshold = 0.01;


function stopStart() {
    if(stopped == false) {
        stopped = true;
    }
    else {
        stopped = false;
    }
}

function setup() {
    function draw() {
        canvas.width = canvas.width;
        function drawWheelAndBase() {
            // draw unfilled circle in center
            context.beginPath();
            context.strokeStyle = 'gray';
            context.lineWidth = 10;
            context.arc(400, 400, 15, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
        
            // draw four concentric outer circles
            context.beginPath();
            context.arc(400, 400, 125, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
            
            context.beginPath();
            context.arc(400, 400, 50, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
            
            context.beginPath();
            context.arc(400, 400, 150, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
        
            context.beginPath();
            context.arc(400, 400, 220, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
        
            // draw base
            context.save();
            context.translate(400, 400);
            context.rotate((Math.PI) / 3);
            context.beginPath();
            context.moveTo(10, 0);
            context.stroke();
            context.lineTo(400, 0);
            context.stroke();
            context.closePath();
            context.rotate((Math.PI) / 3);
            context.beginPath();
            context.moveTo(10, 0);
            context.stroke();
            context.lineTo(400, 0);
            context.stroke();
            context.closePath();
            context.restore();
        }

        function jiggle(colorX, colorY, angle) {
            var x = 220 * Math.cos(angle) - 35;
            var y = 220 * Math.sin(angle) + 3;
            const xPos = x;
            if (jiggleVelocity > stopThreshold) {
                // update x position based on jiggle factor
                x += (Math.random() - 0.1) * jiggleVelocity;
                if(x < xPos + 90) {
                  x += (Math.random() - 0.1) * jiggleVelocity;
                }
                else {
                    jiggleVelocity = 0; 
                }
                jiggleVelocity *= dampingFactor;
                context.lineWidth = 5;
                context.beginPath();
                context.moveTo(x, y);
                // pick rgb color of cart based on passed color modifiers
                context.strokeStyle = `rgb(0 ${Math.floor(255 - (42.5 * colorX))} ${Math.floor(255 - (42.5 * colorY))})`;
                // draw the cart
                context.bezierCurveTo(x, y - 30, x + 70, y - 30, x + 70, y);
                context.stroke();
                context.lineTo(x, y);
                context.lineTo(x, y + 60);
                context.lineTo(x, y + 50);
                context.lineTo(x + 70, y + 50);
                context.stroke();
                context.lineTo(x + 70, y - 5);
                context.stroke();
                context.lineTo(x + 70, y + 60);
                context.stroke();
                context.lineTo(x, y + 60);
                context.stroke();
                context.moveTo(x, y + 60);
                context.bezierCurveTo(x, y + 80, x + 70, y + 80, x + 70, y + 60);
                context.stroke();
                context.fillStyle = '#db1451';
                context.fill();

                context.moveTo(x, y);

                context.closePath();
            }
        }
        
        
        function drawSpokeAndCart(spoke_x, spoke_y, angle, colorX, colorY) {
            // save canvas axes 
            context.save();
            context.lineWidth = 5;
            // translate axes to center of canvas, then rotate by specified angle
            context.translate(400, 400);
            context.rotate(angle);
            context.strokeStyle = 'red';
            // draw the spoke
            context.beginPath();
            context.moveTo(spoke_x, spoke_y);
            context.lineTo(spoke_x + 225, spoke_y);
            context.stroke();
            context.closePath();
            // re-rotate the axes back to initial alignment
            context.rotate(-angle);
            // draw the cart at appropiate position relative to spoke
            if(stopped == false) {
                drawCart(colorX, colorY, angle);
            }
            // cart is stopped; should jiggle for a bit
            else {
                if(jiggleVelocity > dampingFactor) {
                    jiggle(colorX, colorY, angle);
                }
                else {
                    // no longer moving, draw normally
                    drawCart(colorX, colorY, angle);
                }
            }
            // pop current transformation to return to canvas axes
            context.restore();
        }
        
        function drawCart(colorX, colorY, angle) {
            // configure the position of the cart based on the current angle of the spoke
            var x = 220 * Math.cos(angle) - 35;
            var y = 220 * Math.sin(angle) + 3;

            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(x, y);
            // pick rgb color of cart based on passed color modifiers
            context.strokeStyle = `rgb(0 ${Math.floor(255 - (42.5 * colorX))} ${Math.floor(255 - (42.5 * colorY))})`;
            // draw the cart
            context.bezierCurveTo(x, y - 30, x + 70, y - 30, x + 70, y);
            context.stroke();
            context.lineTo(x, y);
            context.lineTo(x, y + 60);
            context.lineTo(x, y + 50);
            context.lineTo(x + 70, y + 50);
            context.stroke();
            context.lineTo(x + 70, y - 5);
            context.stroke();
            context.lineTo(x + 70, y + 60);
            context.stroke();
            context.lineTo(x, y + 60);
            context.stroke();
            context.moveTo(x, y + 60);
            context.bezierCurveTo(x, y + 80, x + 70, y + 80, x + 70, y + 60);
            context.stroke();
            context.fillStyle = '#db1451';
            context.fill();

            context.moveTo(x, y);

            context.closePath();
        }
        
        // draw the wheel structure
        drawWheelAndBase();
        
        // draw the spokes
        drawSpokeAndCart(0, 0, spoke1_degree, 0, 1);
        drawSpokeAndCart(0, 0, spoke2_degree, 1, 1);
        drawSpokeAndCart(0, 0, spoke3_degree, 2, 1);
        drawSpokeAndCart(0, 0, spoke4_degree, 0, 2);
        drawSpokeAndCart(0, 0, spoke5_degree, 1, 2);
        drawSpokeAndCart(0, 0, spoke6_degree, 2, 2);
        drawSpokeAndCart(0, 0, spoke7_degree, 0, 3);
        drawSpokeAndCart(0, 0, spoke8_degree, 0, 4);
        
        // update the spoke angles only if wheel is not stopped
        if(stopped == false) {
            jiggleVelocity = 10;
            spoke1_degree += 0.005;
            spoke2_degree += 0.005;
            spoke3_degree += 0.005;
            spoke4_degree += 0.005;
            spoke5_degree += 0.005;
            spoke6_degree += 0.005;
            spoke7_degree += 0.005;
            spoke8_degree += 0.005;
        }

        window.requestAnimationFrame(draw);
    }

    
    draw();
    
}
window.onload = setup();



