const grid = [[0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],];

let num = [];
let temp = 0;
let entry_cell = [];
let answer = [];
let status = 1;
let correct_cell = [];
let selected_cell = [-1, -1];
let load = false;
let editable = true;

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
    entry_cell = [];
    answer = [];
    sudoku()
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            row.push(grid[i][j]);
        }
        answer.push(row);
    }
    for (let i = 0; i < 40; i++){ 
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (grid[row][col] !== 0){
            grid[row][col] = 0;
            entry_cell.push([row, col]);
        }
    }
}

function interface(){
    background(200);
    fill(0);
    textSize(100);
    text("sudoku",(width-300)/2,150);
    textSize(45);
    text("new game",(width-200)/2,height-400);
    text("load game",(width-200)/2,height-200);
    
    line(width/2-120,height-450,width/2+125,height-450);
    line(width/2-120,height-380,width/2+125,height-380);
    line(width/2-120,height-450,width/2-120,height-380);
    line(width/2+125,height-450,width/2+125,height-380);

    line(width/2-120,height-250,width/2+125,height-250);
    line(width/2-120,height-180,width/2+125,height-180);
    line(width/2-120,height-250,width/2-120,height-180);
    line(width/2+125,height-250,width/2+125,height-180);
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
    textSize(20);
    let cell_w = width / 9;
    let cell_h = height / 9;

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if (correct_cell.some(c => c[0] === i && c[1] === j)) {
                fill(102, 255, 102);
                noStroke();
                rect(j * cell_w, i * cell_h, cell_w, cell_h);
                stroke(0);
            }
            if (selected_cell[0] === i && selected_cell[1] === j) {
                fill(180);
                noStroke();
                rect(j * cell_w, i * cell_h, cell_w, cell_h);
                stroke(0);
            }
            if(grid[i][j] !== 0){
                fill(0);
                text(grid[i][j], cell_w * j + cell_w / 2, cell_h * i + cell_h / 1.5);
                if (status === 3 && grid[i][j] !== answer[i][j] && entry_cell.some(c => c[0] === i && c[1] === j)) {
                    fill(255, 0, 0);
                    noStroke();
                    rect(j * cell_w, i * cell_h, cell_w, cell_h);
                    stroke(0);
                    fill(0);
                    text(grid[i][j], cell_w * j + cell_w / 2, cell_h * i + cell_h / 1.5);
                }
            }
            if (grid[i][j] === 0 && status === 3) {
                fill(255, 0, 0);
                noStroke();
                rect(j * cell_w, i * cell_h, cell_w, cell_h);
                stroke(0);
            }
        }
    }
}

function load_game() {
  grid = [];
  answer = [];
  entry_cell = [];

  loadStrings("save_game.txt", (lines) => {
    if (!lines || lines.length < 10) {
      print("Invalid save file");
      return;
    }

    for (let i = 0; i < 9; i++) {
      let str_values = lines[i].split(",");
      let row = [];
      for (let v of str_values) {
        if (v !== "") row.push(int(v));
      }
      answer.push(row);
      grid.push([...row]); // copy
    }

    if (lines[9].trim() !== "ENTRY_CELL") {
      print("Invalid file format");
      return;
    }

    for (let i = 10; i < lines.length; i++) {
      let coords = lines[i].trim().split(",");
      if (coords.length === 2) {
        let r = int(coords[0]);
        let c = int(coords[1]);
        entry_cell.push([r, c]);
        grid[r][c] = 0;
      }
    }

    status = 2;
    print("Game loaded");
  });
}

function save_game() {
    let content = "";
  
    // ------------------ save answer ------------------
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        content += str(answer[r][c]) + ",";
      }
      content += "\n";
    }
  
    // ------------------ save entry cell ------------------
    content += "ENTRY_CELL\n";
    for (let cell of entry_cell) {
      content += cell[0] + "," + cell[1] + "\n";
    }
  
    saveStrings([content], "save_game.txt");
}

function mousePressed() {
    if (status === 1) {
        let x = mouseX;
        let y = mouseY;
      
        if (x > width / 2 - 120 && x < width / 2 + 125 &&
            y > height - 450 && y < height - 380) {
          print("new");
          status = 2;
        } else if (x > width / 2 - 120 && x < width / 2 + 125 && y > height - 250 && y < height - 180) {
          print("load");
          load_game();
        }
    }

    if (status !== 1) {
        let cell_w = width / 9;
        let cell_h = height / 9;
        let col = Math.floor(mouseX / cell_w);
        let row = Math.floor(mouseY / cell_h);
        if (row >= 0 && row < 9 && col >= 0 && col < 9) {
            if (entry_cell.some(cell => cell[0] === row && cell[1] === col)) {
                selected_cell = [row, col];
            } else {
                selected_cell = [-1, -1];
            }
        }
    }
}

function keyPressed(){
    if (selected_cell[0] === -1 && selected_cell[1] === -1) return;
    let row = selected_cell[0];
    let col = selected_cell[1];
    if ("123456789".includes(key) && status === 2) {
        if (entry_cell.some(cell => cell[0] === row && cell[1] === col)) {
            grid[row][col] = parseInt(key);
        }
    } else if (key === '0' || keyCode === DELETE) {
        if (entry_cell.some(cell => cell[0] === row && cell[1] === col)) {
            grid[row][col] = 0;
        }
    } else if (keyCode === ENTER) {
        status = 3;
        correct_cell = [];
        for (let i = 0; i < entry_cell.length; i++) {
            let [r, c] = entry_cell[i];
            if (grid[r][c] === answer[r][c]) {
                correct_cell.push([r, c]);
            }
        }
    } else if (key === 's' || key === 'S') {
        save_game();
    } else if (key === 'r' || key === 'R') {
        editable = true;
        status = 2;
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
    print(answer);
}
    
function draw(){
    if(status == 1){
        interface();
    }else{
        background(250);
        draw_table();  
        show();
    }
}
