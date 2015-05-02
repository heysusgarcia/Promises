var MyPromise = function(executor) {
  //store all the registered functions in a deferreds array
  var deferreds = [];

  //if the argument passed to resolve is a promise, then we can't call
  //ourselves resolved. Instead we must WAIT until the promise is resolved
  //and use it's resolution value to resolve ourself FOR REAL
  var resolve = function(arg) {
    if (arg && arg.then) {
      //if it has a then, it is a promise so we recursively call resolve on ourself
      arg.then(function(value) {
        resolve(value);
      });
    } else {
      for (var i = 0; i < deferreds.length; i++) {
        var callbackResult = deferreds[i].callback(arg);
        deferreds[i].resolve(callbackResult);
      };
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
