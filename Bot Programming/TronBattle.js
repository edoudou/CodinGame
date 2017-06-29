let map = [];
let mapP = [[],[],[],[]];

initMap(map);

for(let i = 0; i < 4; i++){
    initMap(mapP[i]);
}

let tabP= [null,null,null,null];
let P;

// game loop
while (true) {
    let inputs = readline().split(' ');
    let N = parseInt(inputs[0]); // total number of players (2 to 4).
    P = parseInt(inputs[1]); // your player number (0 to 3).
    
    
    for (let i = 0; i < N; i++) {
        let inputs = readline().split(' ');
        let X0 = parseInt(inputs[0]); // starting X coordinate of lightcycle (or -1)
        let Y0 = parseInt(inputs[1]); // starting Y coordinate of lightcycle (or -1)
        let X1 = parseInt(inputs[2]); // starting X coordinate of lightcycle (can be the same as X0 if you play before this player)
        let Y1 = parseInt(inputs[3]); // starting Y coordinate of lightcycle (can be the same as Y0 if you play before this player)
        
        
        if(X0 != -1){
            mapP[i][X0][Y0] = 0;
            mapP[i][X1][Y1] = 0;
        }
        else 
            initMap(mapP[i]);
               
        tabP[i] = {
            x:X1,
            y:Y1
        }
    }
    updateMap();

    findBestPathFrom(tabP[P].x,tabP[P].y);
}


function initMap(map){
    for(let i = 0; i < 30; i ++)
    {
        map[i] = [];
        for(let j = 0; j < 20; j ++){
            map[i][j] = 1;
        }
    }
}
function updateMap(){
    for(let i = 0; i < 30; i ++)
    {
        for(let j = 0; j < 20; j ++){
            map[i][j] = mapP[0][i][j]&&mapP[1][i][j]&&mapP[2][i][j]&&mapP[3][i][j];
        }
    }
}

function move(dx,dy){
    if(dx == -1)
        print('LEFT'); // A single line with UP, DOWN, LEFT or RIGHT
    else if(dx == 1)
        print('RIGHT');
    else if(dy == -1)
        print('UP');
    else if(dy == 1)
        print('DOWN');
    else
        print('LEFT');
}

function bestPathL(){
    let cpyMap0 = map.map(function(arr) {
        return arr.slice();
    });
    let cpyMap1 = map.map(function(arr) {
        return arr.slice();
    });
    let cpyMap2 = map.map(function(arr) {
        return arr.slice();
    });
    let cpyMap3 = map.map(function(arr) {
        return arr.slice();
    });
}

function testPath(posArray){
    
}

function findBestPathFrom(x,y){
    let cpyMap0 = map.map(function(arr) {
        return arr.slice();
    });
    for(let i = 0; i < tabP.length;i++){
        if(i != P && tabP[i] && tabP[i].x != -1){
            let x = tabP[i].x;
            let y = tabP[i].y;
            if(x > 0) cpyMap0[x-1][y] = 0;
            if(x < 29) cpyMap0[x+1][y] = 0;
            if(y > 0) cpyMap0[x][y-1] = 0;
            if(y < 19) cpyMap0[x][y+1] = 0;
        }
    }
    let prio = setPrio();
    let l,r,u,d;
    let cl,cr,cu,cd;
    for(let i = 0; i < 4;i++){
        if(prio[i] == 'l')[l,cl] = testPath(x-1,y,0,cpyMap0);
        if(prio[i] == 'r')[r,cr] = testPath(x+1,y,0,cpyMap0);
        if(prio[i] == 'u')[u,cu] = testPath(x,y-1,0,cpyMap0);
        if(prio[i] == 'd')[d,cd] = testPath(x,y+1,0,cpyMap0);
    }
    printErr(countP(cl),countP(cr),countP(cu),countP(cd));
    
    l/=(countP(cl)+1);
    r/=(countP(cr)+1);
    u/=(countP(cu)+1);
    d/=(countP(cd)+1);
    
    let max = Math.max(l,r,u,d);
    
    if(max < 20){
        cpyMap0 = map.map(function(arr) {
            return arr.slice();
        });
        
        for(let i = 0; i < 4;i++){
            if(prio[i] == 'l')[l,cl] = testPath(x-1,y,0,cpyMap0);
            if(prio[i] == 'r')[r,cr] = testPath(x+1,y,0,cpyMap0);
            if(prio[i] == 'u')[u,cu] = testPath(x,y-1,0,cpyMap0);
            if(prio[i] == 'd')[d,cd] = testPath(x,y+1,0,cpyMap0);
        }
        printErr(countP(cl),countP(cr),countP(cu),countP(cd));
        
        l/=(countP(cl)+1);
        r/=(countP(cr)+1);
        u/=(countP(cu)+1);
        d/=(countP(cd)+1);
        
        max = Math.max(l,r,u,d);
    }

    printErr(max,l,r,u,d);

    if(l==max)move(-1,0);
    else if(r==max)move(1,0);
    else if(u==max)move(0,-1);
    else if(d==max)move(0,1);
    else move(-1,0);
}

function setPrio(){
    let prio= ['l','r','u','d'];
    let closest = findClosest();

    if(tabP[P].x - closest.x * ((closest.x < 15)*2 - 1) < 0){
        prio[0] = 'r';
        prio[1] = 'l';
    }
    else
    {
        prio[0] = 'l';
        prio[1] = 'r';
    }
    if(tabP[P].y  - closest.y * ((closest.y < 10)*2 - 1) < 0){
        prio[2] = 'u';
        prio[3] = 'd';
    }
    else
    {
        prio[2] = 'd';
        prio[3] = 'u';
    }

    if(Math.abs(tabP[P].y - closest.y) > Math.abs(tabP[P].x - closest.x)){
        let prio01 = [prio[0],prio[1]];
        [prio[0],prio[1]] = [prio[2],prio[3]];
        [prio[2],prio[3]] = prio01;
    }
    
    printErr(prio);
    return prio;
}

function testPath(x,y,count,mapcpy){
    let l = 0, r = 0 , u = 0 , d = 0;
    let opps = [false,false,false,false];
    if(mapcpy && 0 <= x && x < 30 && 0 <= y && y < 20){
        if(mapcpy[x][y]){
            let oppl,oppr,oppu,oppd;
            mapcpy[x][y] = 0;
            
            [l,oppl] = testPath(x-1,y,count+1,mapcpy);
            [r,oppr] = testPath(x+1,y,count+1,mapcpy);
            [u,oppu] = testPath(x,y-1,count+1,mapcpy);
            [d,oppd] = testPath(x,y+1,count+1,mapcpy);
            for(let i = 0; i < 4;i++){
                if(i!=P){
                    opps[i]=oppl[i]||oppr[i]||oppu[i]||oppd[i];
                }
            }
        }
        else{
            for(let i = 0; i < tabP.length;i++){
                if(i!=P && tabP[i]){
                    if(x == tabP[i].x && y == tabP[i].y)opps[i]=true;
                }
            }
        }
    }
    return [Math.max(count,l,r,u,d),opps];
}

function countP(tab){
    let count= 0
    for(let i = 0; i < tab.length;i++){
        if(tab[i])count++;
    }
    return count;
}

function findBestDir(x,y,map){
    let dx = 0,dy = 0;
    if(x < 15){
        if(x < 29 && map[x + 1][y])
            dx = 1;
        else if(x > 0 && map[x - 1][y])
            dx = -1;
    }
    else
    {
        if(x > 0 && map[x - 1][y])
            dx = -1;
        else if(x < 29 && map[x + 1][y])
            dx = 1;
    }
    if(y > 9){
        if(y > 0 && map[x][y - 1])
            dy = -1;
        else if(y < 19 && map[x][y + 1])
            dy = 1;
    }
    else
    {
        if(y < 19 && map[x][y + 1])
            dy = 1;
        else if(y > 0 && map[x][y - 1])
            dy = -1;
    }

    return {dx,dy};
}

function findClosest(){
    let x = tabP[P].x;
    let y = tabP[P].y;
    let min = 100000;
    let ent = null;
    for (let i = 0; i < tabP.length; i++) {
        if(i != P && tabP[i] && tabP[i].x != -1){
            let dist = getDist(x,y,tabP[i].x,tabP[i].y);
            if(dist < min){
                min = dist;
                ent = tabP[i];
            }
        }
    }
    return ent;
}

function getDist(x1,y1,x2,y2){
    let dx = Math.abs(x1 - x2);
    let dy = Math.abs(y1 - y2);
    let sum = Math.pow(dx,2) + Math.pow(dy,2);
    let dist = Math.sqrt(sum);
    return dist;
}