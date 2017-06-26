let _map = {
  'A': '.-',
  'B': '-...',
  'C': '-.-.',
  'D': '-..',
  'E': '.',
  'F': '..-.',
  'G': '--.',
  'H': '....',
  'I': '..',
  'J': '.---',
  'K': '-.-',
  'L': '.-..',
  'M': '--',
  'N': '-.',
  'O': '---',
  'P': '.--.',
  'Q': '--.-',
  'R': '.-.',
  'S': '...',
  'T': '-',
  'U': '..-',
  'V': '...-',
  'W': '.--',
  'X': '-..-',
  'Y': '-.--',
  'Z': '--..'
};

const toMorse = (word) => {
    let s='';
    for(let e of word){
        s+=_map[e];
    }
    return s;
}

let L = readline();
let N = parseInt(readline());
let min,max=1,dico={};
let cache = {};
let maxWord;
let count;
let cachedCount;

for (let i = 0; i < N; i++) {
    let W = readline();
    let WMorse = toMorse(W);
    let size = WMorse.length;
    
    dico[WMorse]= dico[WMorse]+1 || 1;
    if(i===0)
        min = max = size;
    else{
        if(size > max)max = size;
        else if(size < min) min = size;
    }
}

count = (str) => {
    let c = 0,n;
    let maxLoop = str.length;
    if(str.length === 0)return 1;
    if(max < str.length)maxLoop = max;
    for(let i = min-1; i < maxLoop; i++){
        if(n = dico[str.substring(0,i+1)])
            c += n * cachedCount(str.substring(i+1));
    }
    return c;
}

cachedCount = (str)=>{
    var key = str;
    if(key in cache){
        return cache[key];
    }else{
        return cache[key] = count(str);           
    }
}

print(cachedCount(L));