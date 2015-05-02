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
      resolveOrReject(arg, "resolve");
    };
  };

  var reject = function(arg) {
    resolveOrReject(arg, "reject");
  };

  var resolveOrReject = function(arg, resolveOrRejectCallback) {
    for (var i = 0; i < deferreds.length; i++) {
      var callbackResult = deferreds[i].callback(arg);
      if (resolveOrRejectCallback === "resolve") {
        deferreds[i].resolve(callbackResult);
      } else {
        deferreds[i].reject(callbackResult);
      }
    };
  };

  this.then = function(callback) {
    var newPromise = new MyPromise(function(resolve, reject) {
      deferreds.push({resolve: resolve, reject: reject, callback: callback});
    });
    return newPromise;
  };

  executor(resolve, reject);
}

function fiveMachine(){
  return new MyPromise(function(resolve, reject){
    setTimeout(function(){
      resolve(5);
      // reject("I don't know, you probably spelled initialize wrong");
    }, 1000);
  });
}
