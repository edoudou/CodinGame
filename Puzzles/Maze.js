const findExits = (map,x,y,tab) =>{
    if(map[y][x]=='.'){
        map[y][x] = '#';
        if(y == 0 || y == map.length-1|| x==0 || x==map[0].length-1){
            tab.push({x,y});
        }
        else{
            findExits(map,x-1,y,tab);
            findExits(map,x+1,y,tab);
            findExits(map,x,y-1,tab);
            findExits(map,x,y+1,tab);
        }
    }
}

let [W,H] = readline().split(' ');
let inputs = readline().split(' ');
let X = parseInt(inputs[0]);
let Y = parseInt(inputs[1]);
let M = [];
let T = [];

for (let i = 0; i < H; i++) {
    let R = readline();
    M.push(R.split(''));
}

findExits(M,X,Y,T);

T.sort((a,b)=>{
    return (a.x*100 + a.y - (b.x*100+b.y));
})

print(T.length);
for(let e of T)
    print([e.x,e.y].join(' '));