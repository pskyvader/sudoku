import SudokuResolver from '../src/logic/SudokuResolver';

onmessage = function(e) {
    let newboard = new SudokuResolver(n);
    console.log('Message received from main script',newboard);
    var workerResult = 'Result: ' + e;
    console.log('Posting message back to main script');
    postMessage(workerResult);
}