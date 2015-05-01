var MyPromise = function(executor) {
  var deferreds = [];

  var resolve = function(arg) {
    for (var i = 0; i < deferreds.length; i++) {
      var callbackResult = deferreds[i].callback(arg);
      deferreds[i].resolve(callbackResult);
    };
  };

  var reject = function(arg) {
    for (var i = 0; i < deferreds.length; i++) {
      var callbackResult = deferreds[i].callback(arg);
      deferreds[i].reject(callbackResult);
    };
  };

  this.then = function(callback) {
    var newPromise = new MyPromise(function(resolve, reject) {
      debugger
      deferreds.push({resolve: resolve, reject: reject, callback: callback});
    });
    return newPromise;
  };

  executor(resolve, reject);
}

function fiveMachine(){
  return new MyPromise(function(resolve, reject){
    setTimeout(function(){
      //resolve(5);
      reject("I don't know, you probably spelled initialize wrong");
    }, 1000);
  });
}

function alerter(message){
  alert(message);
}

function logCallback(value){
  console.log('got ' + value);
}

fiveMachine().then(logCallback, alerter);
