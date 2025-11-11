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
    line(0, height / 3, width / 2, height / 3);
    line(0, (height / 3) * 2, width / 2, (height / 3) * 2);
    line(width / 6, 0, width / 6, height);
    line((width / 6) * 2, 0, (width / 6) * 2, height);
  
    strokeWeight(1);
    line(0, height / 9, width / 2, height / 9);
    line(0, (height / 9) * 2, width / 2, (height / 9) * 2);
    line(0, (height / 9) * 4, width / 2, (height / 9) * 4);
    line(0, (height / 9) * 5, width / 2, (height / 9) * 5);
    line(0, (height / 9) * 7, width / 2, (height / 9) * 7);
    line(0, (height / 9) * 8, width / 2, (height / 9) * 8);
  
    line(width / 18, 0, width / 18, height);
    line((width / 18) * 2, 0, (width / 18) * 2, height);
    line((width / 18) * 4, 0, (width / 18) * 4, height);
    line((width / 18) * 5, 0, (width / 18) * 5, height);
    line((width / 18) * 7, 0, (width / 18) * 7, height);
    line((width / 18) * 8, 0, (width / 18) * 8, height);
}

function show(){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            fill(0);
            textSize(20);
            let cell_w = width / 2 / 9;
            let cell_h = height / 9;
      
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
      rect(width - 300, height - 100, 170, 50);
      fill(0);
      textSize(50);
      text("restart", width - 215, height - 80);
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
          console.log("new");
          status = 2;
        } else if (x > width / 2 - 120 && x < width / 2 + 125 && y > height - 250 && y < height - 180) {
          console.log("load");
          load_game();
        }
    }

    if (status !== 1) {
        let cell_w = width/2 / 9;
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
    if ((status === 2 || status === 3) && mouseX > width - 300 && mouseX < width - 130 && mouseY > height - 100 && mouseY < height - 50) {
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

function flow_s(x, y, scale) {
  fill(0, 255, 0);
  ellipse(x, y, 110 * scale, 50 * scale);
  fill(0);
  textSize(35 * scale);
  textAlign(CENTER, CENTER);
  text("start", x, y);
}

function flow_e(x, y, s, scale) {
  fill(s === 0 ? 255 : color(0, 255, 0));
  ellipse(x, y, 110 * scale, 50 * scale);
  fill(0);
  textSize(35 * scale);
  textAlign(CENTER, CENTER);
  text("end", x, y);
}

function flow_o(x, y, t, s, scale) {
  textSize(35 * scale);
  let w = textWidth(t) + 20 * scale;
  let h = 40 * scale;
  fill(s === 1 ? color(0, 255, 0) : 255);
  rect(x, y, w, h);
  fill(0);
  textAlign(LEFT, CENTER);
  text(t, x + 10 * scale, y + h / 2);
}

function flow_c(x, y, t, s, scale) {
  textSize(35 * scale);
  let w = textWidth(t) + 350 * scale;
  let h = 70 * scale;
  stroke(0);
  strokeWeight(2);
  let left_x = x - w / 2;
  let right_x = x + w / 2;
  let top_y = y - h / 2;
  let bottom_y = y + h / 2;
  fill(s === 1 ? color(0, 255, 0) : color(255, 0, 0));
  beginShape();
  vertex(x, top_y);
  vertex(right_x, y);
  vertex(x, bottom_y);
  vertex(left_x, y);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  text(t, x, y);
}

function flowchart(x, y) {
  let maxHeight = height;
  let neededHeight = 600;
  let scale = Math.min(0.6, (maxHeight - y - 20) / neededHeight);

  let r = selected_cell[0];
  let c = selected_cell[1];
  if (r === -1 || c === -1) {
    r = 0;
    c = 0;
  }

  flow_s(x, y, scale);
  flow_o(x - 100 * scale, y + 50 * scale, "create sudoku", 1, scale);

  let s1 = arraysEqual(grid, answer) ? 1 : 0;
  flow_c(x + 5 * scale, y + 160 * scale, "All the answer are correct?", s1, scale);

  let s2 = grid[r][c] !== 0 ? 1 : 0;
  flow_c(x + 5 * scale, y + 270 * scale, "Have the answer from player?", s2, scale);

  let s3 = 0, s4 = 0;
  if (inCorrectCell(r, c) && grid[r][c] !== 0) {
    s3 = 1;
  } else if (grid[r][c] !== 0) {
    s4 = 1;
  }

  flow_c(x + 5 * scale, y + 380 * scale, "Is the answer correct?", s3, scale);
  flow_o(x + 120 * scale, y + 470 * scale, "Let the box be green", s3, scale);
  flow_o(x - 400 * scale, y + 470 * scale, "Let the box be red", s4, scale);
  flow_e(x, y + 625 * scale, s1, scale);
  
  fill(0);
  textSize(18 * scale);

  function arrow_line(x1, y1, x2, y2, scale) {
    line(x1, y1, x2, y2);
    if (y2 > y1) {
      line(x2 - 5 * scale, y2 - 10 * scale, x2, y2);
      line(x2 + 5 * scale, y2 - 10 * scale, x2, y2);
    }
  }

  arrow_line(x, y + 25 * scale, x, y + 50 * scale, scale);
  arrow_line(x, y + 90 * scale, x, y + 125 * scale, scale);
  text("No", x + 10 * scale, y + 215 * scale);
  arrow_line(x, y + 195 * scale, x, y + 235 * scale, scale);
  text("No", x + 10 * scale, y + 325 * scale);
  arrow_line(x, y + 305 * scale, x, y + 345 * scale, scale);

  text("No", x - 295 * scale, y + 430 * scale);
  arrow_line(x - 265 * scale, y + 380 * scale, x - 265 * scale, y + 470 * scale, scale);

  text("Yes", x + 285 * scale, y + 430 * scale);
  arrow_line(x + 275 * scale, y + 380 * scale, x + 275 * scale, y + 470 * scale, scale);

  arrow_line(x - 265 * scale, y + 510 * scale, x - 265 * scale, y + 550 * scale, scale);
  arrow_line(x + 270 * scale, y + 510 * scale, x + 270 * scale, y + 550 * scale, scale);

  line(x - 265 * scale, y + 550 * scale, x + 455 * scale, y + 550 * scale);
  line(x + 455 * scale, y + 550 * scale, x + 455 * scale, y + 110 * scale);
  line(x + 455 * scale, y + 110 * scale, x, y + 110 * scale);
  line(x, y + 110 * scale, x + 10 * scale, y + 105 * scale);
  line(x, y + 110 * scale, x + 10 * scale, y + 115 * scale);

  text("No", x + 350 * scale, y + 260 * scale);
  line(x + 300 * scale, y + 270 * scale, x + 455 * scale, y + 270 * scale);
  line(x + 455 * scale, y + 270 * scale, x + 445 * scale, y + 265 * scale);
  line(x + 455 * scale, y + 270 * scale, x + 445 * scale, y + 275 * scale);

  text("Yes", x - 350 * scale, y + 150 * scale);
  line(x - 280 * scale, y + 160 * scale, x - 420 * scale, y + 160 * scale);
  line(x - 420 * scale, y + 160 * scale, x - 420 * scale, y + 580 * scale);
  line(x - 420 * scale, y + 580 * scale, x, y + 580 * scale);
  line(x, y + 580 * scale, x, y + 600 * scale);
  line(x - 5 * scale, y + 590 * scale, x, y + 600 * scale);
  line(x + 5 * scale, y + 590 * scale, x, y + 600 * scale);
}

function inCorrectCell(r, c) {
  for (let i = 0; i < correct_cell.length; i++) {
    if (correct_cell[i][0] === r && correct_cell[i][1] === c) {
      return true;
    }
  }
  return false;
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
    if(status == 1){
        interface();
    }else{
        background(250);
        line(width/2,0,width/2,height);
        if (status === 2 && arraysEqual(grid, answer)) {
            status = 3;
        }
        show();
        draw_table();
        fill(0);
        textSize(35);
        text("Flow chart",width/2+100,20);
        if (status === 2 || status === 3) {
            fill(255);
            rect(width - 300, height - 100, 170, 50);
            fill(0);
            textSize(50);
            text("restart", width - 215, height - 80);
        }
        flowchart(960, 70);
    }
}
