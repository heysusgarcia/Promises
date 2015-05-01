var MyPromise = function(executor) {
  executor(resolve, reject);

  var deferreds = [];

  function resolve(arg) {
    for (var i = 0; i < deferreds.length; i++) {
      deferreds[i](arg);
    };
  };

  var reject = function(arg) {

  };

  this.then = function(callback) {
    deferreds.push(callback);
  };
}

function fiveMachine(){
  return new MyPromise(function(resolve, reject){
    setTimeout(function(){
      resolve(5);
    }, 1000);
  });
}

function logCallback(value){
  console.log('got ' + value);
}

fiveMachine().then(logCallback);
