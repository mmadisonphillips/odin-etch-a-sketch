let gridContainer = document.querySelector('.gridContainer');
let resetButton = document.querySelector('.resetButton');
resetButton.addEventListener('click', () => {
  grid = initializeGrid(prompt("Enter new width of grid:"));
  resetGridDisplay();
});
let grid = initializeGrid();
resetGridDisplay();

function initializeGrid(x = 16) {
  x = parseInt(x);
  if (typeof x != 'number' || isNaN(x)) x = 16;
  if (x > 100) x = 100;
  if (x < 1) x = 1;

  let grid = [...Array(x**2)].map(() => {
    let pixel = document.createElement('div');
    let fade = document.createElement('div');
    pixel.classList.add('pixel');
    fade.classList.add('fade');
    pixel.appendChild(fade);
    pixel.addEventListener('mouseenter', e => activatePixel(e));
    return pixel;
  })
  return grid;
}

function resetGridDisplay() {
  gridContainer.replaceChildren(...grid);
  gridContainer.style.gridTemplateColumns =
    `repeat(${Math.round(grid.length**0.5)},1fr)`;
  gridContainer.style.gridTemplateRows =
    `repeat(${Math.round(grid.length**0.5)},1fr)`;
}

function activatePixel(e) {
  let pixel = e.currentTarget;
  pixel.style.backgroundColor = randomRGB();
  pixel.style.border = 'none';
  pixel.firstChild.classList.remove("activated");
  pixel.firstChild.offsetWidth;
  pixel.firstChild.classList.add("activated");
}

function randomRGB() {
  function rand255() {
    return Math.round(Math.random()*255);
  }
  return `rgb(${rand255()},${rand255()},${rand255()})`;
}
