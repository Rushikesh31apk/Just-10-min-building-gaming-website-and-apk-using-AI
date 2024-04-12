document.getElementById('easy-mode').addEventListener('click', function() {
    startGame('easy');
  });
  
  document.getElementById('medium-mode').addEventListener('click', function() {
    startGame('medium');
  });
  
  document.getElementById('hard-mode').addEventListener('click', function() {
    startGame('hard');
  });
  
  function startGame(difficulty) {
    // Redirect to the Tic Tac Toe game page with the selected difficulty level
    window.location.href = `index.html?difficulty=${difficulty}`;
  }
  