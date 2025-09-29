const grid = [[0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],];
const num = [];
let temp = 0;
function check_rule(board,row,col,num){
    //check row
    for(let i = 0; i < 9; i++){
        if(num == board[row][i]) return false;
    }
        
    //check column
    for(let i = 0; i < 9; i++){
        if(num == board[i][col]) return false;
    }
        
    //check box 3x3
    let pos_box_x = Math.floor(col/3);
    let pos_box_y = Math.floor(row/3);
    
    let box_start_row = Math.floor(row / 3) * 3;
    let box_start_col = Math.floor(col / 3) * 3;

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board[box_start_row + i][box_start_col + j] == num){
                return false;
            }
        }
    }
    return true;
}

function find_entry_cell(board){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(board[i][j] == 0) return [i,j]; //(row,col)
        }
    }
    return null;
}

function sudoku(){
    const pos = find_entry_cell(grid);
    if(pos != null){
        const [row,col] = pos;
        for(let i = 0; i < num.length; i++){
            if(check_rule(grid,row,col,num[i])){
                grid[row][col]=num[i];
                if(sudoku()) return true;
                grid[row][col]=0;
            }
        }
        return false;
    }else{
        return true;
    }
}
                
function generate_game(){
    sudoku()
    for (let i = 0; i < 40; i++){ 
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        grid[row][col] = 0;
    }
}

function draw_table(){
    strokeWeight(3);
    line(0,height/3,width,height/3);
    line(0,height/3*2,width,height/3*2);
    
    line(width/3,0,width/3,height);
    line(width/3*2,0,width/3*2,height);
    strokeWeight(1);
    line(0,height/9,width,height/9);
    line(0,height/9*2,width,height/9*2);
    line(0,height/9*4,width,height/9*4);
    line(0,height/9*5,width,height/9*5);
    line(0,height/9*7,width,height/9*7);
    line(0,height/9*8,width,height/9*8);
    
    line(width/9,0,width/9,height);
    line(width/9*2,0,width/9*2,height);
    line(width/9*4,0,width/9*4,height);
    line(width/9*5,0,width/9*5,height);
    line(width/9*7,0,width/9*7,height);
    line(width/9*8,0,width/9*8,height);
}

function show(){
    fill(0)
    textSize(20)
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(grid[i][j] != 0){
                text(grid[i][j],width/18*2*j+(width/18),height/18*2*i+(height/18))
            }
        }
    }
}

function setup(){
    for(let i = 0; i < 9; i++){
        let temp = Math.floor(Math.random() * 9)+1;
        while(num.includes(temp)){
            temp = Math.floor(Math.random() * 9)+1;
        }
        num.push(temp);
    }
    createCanvas(1270,900);
    generate_game();
}
    
function draw(){
    background(250);
    draw_table();  
    show();
}
