const puzzleContainer = document.querySelector('.puzzle-container');
const puzzle = document.querySelector('.puzzle');
const squares = puzzle.querySelectorAll('.square');
const queen = document.querySelector('.queen');

// Set up drag and drop event listeners
puzzleContainer.addEventListener('dragstart', handleDragStart);
puzzleContainer.addEventListener('dragover', handleDragOver);
puzzleContainer.addEventListener('drop', handleDrop);

// Set up dropzone event listeners
for (const square of squares) {
  square.addEventListener('dragenter', handleDragEnter);
  square.addEventListener('dragleave', handleDragLeave);
}

let currentDropzoneElement;
let currentDraggableElement;

function handleDragStart(e) {
    currentDraggableElement = e.target;
    e.dataTransfer.setData('text', e.target.id);
}
  

function handleDragOver(e) {
  e.preventDefault();
}


function handleDrop(e) {
    e.preventDefault();
    currentDropzoneElement = e.target;
  
    if (currentDropzoneElement.classList.contains('dropzone')) {
        if (currentDraggableElement.id === 'queen' && currentDropzoneElement.classList.contains('h4') ) {
            currentDraggableElement.parentElement.removeChild(currentDraggableElement);
            currentDropzoneElement.appendChild(currentDraggableElement);
            currentDropzoneElement.classList.remove('valid-dropzone');
            currentDropzoneElement.classList.remove('invalid-dropzone');
            currentDropzoneElement.style.backgroundColor = 'limegreen';
            document.body.classList.add('animated', 'fadeOutDown');
            setTimeout(() => {
                window.location = "index.html";
            }, 1000);
            
        } else {
            const originalPosition = currentDraggableElement.parentElement;
            currentDraggableElement.parentElement.removeChild(currentDraggableElement);
            currentDropzoneElement.appendChild(currentDraggableElement);
            currentDropzoneElement.classList.remove('valid-dropzone');
            currentDropzoneElement.classList.remove('invalid-dropzone');
            // Change the square color to red for a second, then reset
            currentDropzoneElement.style.backgroundColor = 'red';
            setTimeout(() => {
                currentDraggableElement.parentElement.removeChild(currentDraggableElement);
                originalPosition.appendChild(currentDraggableElement);
                currentDropzoneElement.style.backgroundColor = '';
            }, 1000);
    
        }
        
    }
}
  

// function handleDrop(e) {
//     e.preventDefault();
//     currentDropzoneElement = e.target;
  
//     if (currentDropzoneElement.classList.contains('dropzone')) {
//       if (currentDraggableElement.id === 'queen') {
//         // Allow the queen to be dropped in the h4 square
//         currentDraggableElement.parentElement.removeChild(currentDraggableElement);
//         currentDropzoneElement.appendChild(currentDraggableElement);
//         currentDropzoneElement.classList.remove('valid-dropzone');
//         currentDropzoneElement.classList.remove('invalid-dropzone');
//       } else {
//         // Reset the puzzle if a piece other than the queen is dropped onto the h4 square
//         currentDropzoneElement.style.backgroundColor = 'red';
//         setTimeout(() => {
//           currentDraggableElement.parentElement.removeChild(currentDraggableElement);
//           currentDraggableElement.parentElement.appendChild(currentDraggableElement);
//           currentDropzoneElement.style.backgroundColor = '';
//         }, 1000);
//       }
  
//       currentDropzoneElement.classList.remove('valid-dropzone');
//       currentDropzoneElement.classList.remove('invalid-dropzone');
//     }
    
// }
  
  

function handleDragEnter(e) {
  e.preventDefault();
  currentDropzoneElement = e.target;

  if (currentDropzoneElement.classList.contains('dropzone')) {
    currentDropzoneElement.classList.add('valid-dropzone');
    
  } else {
    currentDropzoneElement.classList.add('invalid-dropzone');
  }
}

function handleDragLeave(e) {
  e.preventDefault();
  currentDropzoneElement = e.target;

  if (currentDropzoneElement.classList.contains('dropzone') && currentDraggableElement.classList.contains('queen')) {
    currentDropzoneElement.classList.remove('valid-dropzone');
  } else {
    currentDropzoneElement.classList.remove('invalid-dropzone');
  }
}
