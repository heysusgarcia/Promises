var MyPromise = function(executor) {
  executor(resolve, reject);

  var deferreds = [];

  function resolve(arg) {
    for (var i = 0; i < deferreds.length; i++) {
      var callbackResult = deferreds[i].callback(arg);
      deferreds[i].resolve(callbackResult);
    };
  };

  var reject = function(arg) {

  };

  this.then = function(callback) {
    var newPromise = new MyPromise(function(resolve, reject) {
      deferreds.push({resolve: resolve, reject: reject, callback: callback});
    });
    return newPromise;
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

function add37(val){
  return val + 37;
};

fiveMachine().then(add37).then(logCallback);
