let grid = [[0,0,0,0,0,0,0,0,0],
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
let highlightRow = 0;
let rowSpeed = 200; 

function check_rule(board,row,col,num){
    //check row
    for(let i = 0; i < 9; i++){
        if(num == board[row][i]) return false;
    }
        
    //check column
    for(let i = 0; i < 9; i++){
        if(num == board[i][col]) return false;
    }
    
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

function count_empty_cell(board){
    let emptyCounts = [];
    for (let r = 0; r < 9; r++) {
        let count = 0;
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === 0)count++;
        }
        emptyCounts.push(count);
    }

    return emptyCounts;
}

function display_empty_count(counts) {
    fill(0);
    textSize(22);
    let cell_h = height / 9;
    let box_w = 80;
    let box_h = cell_h * 0.6;
    for (let r = 0; r < 9; r++) {
        let message = counts[r];
        fill(255);
        stroke(0);
        strokeWeight(2);
        rect((width * 0.7) + 10, r * cell_h + (cell_h - box_h)/2 + 13, box_w, box_h);

        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(message, (width * 0.7) + 10 + box_w/2, r * cell_h + cell_h/2 + 13);
    }
    fill(0);
    textSize(25);
    textAlign(LEFT, BOTTOM);
    text("Empty: ", (width * 0.7) + 10, 0 * cell_h + 25);
    stroke(0);
    strokeWeight(1);
}
                
function generate_game(){
    entry_cell = [];
    answer = [];
    sudoku();
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
    emptyCounts = count_empty_cell(grid);
}

function interface(){
    if(status == 1){
        background(200);
        fill(0);
        textSize(70);
        text("sudoku",(width-200)/2,150);
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
}

function draw_table(){
    strokeWeight(3);
    line(0, (height/9)*3,  width*0.7, (height/9)*3);
    line(0, (height/9)*6,  width*0.7, (height/9)*6);
    line((width * 0.7) / 3, 0, (width * 0.7) / 3, height);
    line((width * 0.7) / 3 * 2, 0, (width * 0.7) / 3 * 2, height);

    strokeWeight(1);
    line(0, height / 9, width * 0.7, height / 9);
    line(0, height / 9 * 2, width * 0.7, height / 9 * 2);
    line(0, height / 9 * 4, width * 0.7, height / 9 * 4);
    line(0, height / 9 * 5, width * 0.7, height / 9 * 5);
    line(0, height / 9 * 7, width * 0.7, height / 9 * 7);
    line(0, height / 9 * 8, width * 0.7, height / 9 * 8);

    line((width * 0.7) / 9,     0, (width * 0.7) / 9,     height);
    line((width * 0.7) / 9 * 2, 0, (width * 0.7) / 9 * 2, height);
    line((width * 0.7) / 9 * 4, 0, (width * 0.7) / 9 * 4, height);
    line((width * 0.7) / 9 * 5, 0, (width * 0.7) / 9 * 5, height);
    line((width * 0.7) / 9 * 7, 0, (width * 0.7) / 9 * 7, height);
    line((width * 0.7) / 9 * 8, 0, (width * 0.7) / 9 * 8, height);

    strokeWeight(3);
    line(0, 0, width * 0.7, 0);
    line(0, height, width * 0.7, height);
    line(0, 0, 0, height);
    line(width * 0.7, 0, width * 0.7, height);
}

function show(){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            fill(0);
            textSize(20);
            let cell_w = (width * 0.7) / 9;
            let cell_h = height / 9;
            
            if (i === highlightRow) {
                noStroke();
                fill(255, 255, 0, 100);
                rect(j * cell_w, i * cell_h, cell_w, cell_h);
                stroke(0);
            }
            
            if (selected_cell) {
                let [sel_i, sel_j] = selected_cell;
                if (i === sel_i || j === sel_j) {
                    fill(220);
                    noStroke();
                    rect(j * cell_w, i * cell_h, cell_w, cell_h);
                    stroke(0);
                }
            }
      
            if (grid[i][j] !== 0) {
                let isEntry = false;
                for (let k = 0; k < entry_cell.length; k++) {
                    if (entry_cell[k][0] === i && entry_cell[k][1] === j) {
                        isEntry = true;
                        break;
                    }
                }
                
                if (!isEntry) {
                    fill(180, 220, 255);
                    noStroke();
                    rect(j * cell_w, i * cell_h, cell_w, cell_h);
                    stroke(0);
                }
              
                let isCorrect = false;
                for (let k = 0; k < correct_cell.length; k++) {
                    if (correct_cell[k][0] === i && correct_cell[k][1] === j) {
                        isCorrect = true;
                        break;
                    }
                }
                
                if (isCorrect) {
                    fill(102, 255, 102);
                    noStroke();
                    rect(j * cell_w, i * cell_h, cell_w, cell_h);
                    stroke(0);
                }
          }

          if (grid[i][j] !== 0) {
              fill(0);
              textAlign(CENTER, CENTER);
              text(grid[i][j], j * cell_w + cell_w / 2, i * cell_h + cell_h / 2);
      
              if (grid[i][j] !== answer[i][j]) {
                  fill(255, 0, 0);
                  noStroke();
                  rect(j * cell_w, i * cell_h, cell_w, cell_h);
                  stroke(0);
                  fill(0);
                  text(grid[i][j], j * cell_w + cell_w / 2, i * cell_h + cell_h / 2);
              }
          }
      }
  }

  if (arraysEqual(grid, answer)) {
      fill(255);
      rect(width - 190, height - 100, 170, 50);
      fill(0);
      textSize(50);
      text("restart", width - 190 + 170 / 2, height - 100 + 50 / 2);
  }
  display_empty_count(emptyCounts);
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
          console.log("new");
          status = 2;
        } else if (x > width / 2 - 120 && x < width / 2 + 125 && y > height - 250 && y < height - 180) {
          console.log("load");
          load_game();
        }
    }

    if (status !== 1) {
        let cell_w = width * 0.7 / 9;
        let cell_h = height / 9;
        let col = Math.floor(mouseX / cell_w);
        let row = Math.floor(mouseY / cell_h);
        if (row >= 0 && row < 9 && col >= 0 && col < 9) {
            let isEntry = false;
            for (let i = 0; i < entry_cell.length; i++) {
                if (entry_cell[i][0] === row && entry_cell[i][1] === col) {
                    isEntry = true;
                    break;
                }
            }
            
            if (isEntry) {
                selected_cell = [row, col];
            } else {
                selected_cell = [-1, -1];
            }
        }
    }
    if ((status === 2 || status === 3) && mouseX > (width - 190) && mouseX < (width - 190 + 170) && mouseY > (height - 100) && mouseY < (height - 100 + 50)) {
        console.log("restart");
        restart_game();
    }
}

function keyPressed(){
    if (selected_cell[0] === -1 && selected_cell[1] === -1) return;
    let row = selected_cell[0];
    let col = selected_cell[1];
    let isEntry = false;
    for (let i = 0; i < entry_cell.length; i++) {
        if (entry_cell[i][0] === row && entry_cell[i][1] === col) {
            isEntry = true;
            break;
        }
    }
    
    if (isEntry && status === 2) {
        let prev_value = grid[row][col];
        if ("123456789".includes(key) && status === 2) {
            if (isEntry) {
                grid[row][col] = parseInt(key);
            }
        } else if (key === '0' || keyCode === DELETE) {
            if (isEntry) {
                grid[row][col] = 0;
            }
        }
      
        correct_cell = [];
        for (let i = 0; i < entry_cell.length; i++) {
            let [r, c] = entry_cell[i];
            if (grid[r][c] === answer[r][c]) {
                correct_cell.push([r, c]);
            }
        }
        
        if (grid[row][col] === answer[row][col] && prev_value !== answer[row][col]) {
            emptyCounts = count_empty_cell(grid);
        }
    }

    
    if (key === 's' || key === 'S') {
        save_game();
    }
    
    if (arraysEqual(grid, answer)) {
        status = 3;
    }
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i].length !== b[i].length) return false;
        for (let j = 0; j < a[i].length; j++) {
            if (a[i][j] !== b[i][j]) return false;
        }
    }
    return true;
}

function restart_game() {
    grid = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            row.push(0);
        }
        grid.push(row);
    }
  
    entry_cell = [];
    correct_cell = [];
    selected_cell = [-1, -1];
    num = [];
  
    while (num.length < 9) {
        let temp = int(random(1, 10));
        if (!num.includes(temp)) {
            num.push(temp);
        }
    }
  
    generate_game();
    status = 2;
}

function setup(){
    for(let i = 0; i < 9; i++){
        let temp = Math.floor(Math.random() * 9)+1;
        while(num.includes(temp)){
            temp = Math.floor(Math.random() * 9)+1;
        }  
        num.push(temp);
    }
    createCanvas(1270,650);
    generate_game();
    print(answer);
}
    
function draw(){
    if (frameCount % rowSpeed === 0) {
        highlightRow = (highlightRow + 1) % 9;
    }
    if(status == 1){
        interface();
    }else{
        background(250);
        if (status === 2 && arraysEqual(grid, answer)) {
            status = 3;
        }
        show();
        draw_table();
        fill(0);
        textSize(35);
        if (status === 2 || status === 3) {
            fill(255);
            rect(width - 190, height - 100, 170, 50);
            fill(0);
            textAlign(CENTER, CENTER);
            text("restart", width - 190 + 170 / 2, height - 100 + 50 / 2);
        }
    }
}
