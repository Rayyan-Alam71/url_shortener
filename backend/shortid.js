function generateURL(){
    let id = '';
    const length = 6;
    const ARR = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',]

    for(let i=0; i<length; i++){
        const randomX = Math.floor(Math.random()*52);
        console.log(randomX);
        id+=ARR[randomX];
    }
    return id;
}
module.exports = {generateURL}