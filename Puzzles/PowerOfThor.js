let inputs = readline().split(' ');
let lightX = parseInt(inputs[0]);
let lightY = parseInt(inputs[1]);
let initialTX = parseInt(inputs[2]);
let initialTY = parseInt(inputs[3]);

let x=initialTX,y=initialTY;

while (true) {
    let remainingTurns = parseInt(readline());
    let dx = x - lightX;
    let dy = y - lightY;
    let moveTo = '';
    
    if(dy > 0){
        y--;
        moveTo+='N';
    }
    else if(dy < 0)
    {
        y++;
        moveTo+='S';
    }
    if(dx > 0){
        x--;
        moveTo+='W';
    }
    else if(dx < 0)
    {
        x++;
        moveTo+='E';
    }

    print(moveTo);
}