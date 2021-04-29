
export function debounce(func, wait) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      func.apply(context, args)
    }, wait);
  }
}

export function throttle(fn, interval) {
 
  let flag = true;
  return function(...args) {
    let context = this;
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(context, args);
      flag = true;
    }, interval);
  };
}
export function getFormatDate(dates,minute) {
  var date = new Date(dates);
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var hour,minutes,second
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate ;
  if(minute){
    hour = date.getHours(); //获取系统时， 
    minutes = date.getMinutes(); //分 
    second = date.getSeconds(); //秒 
    if(hour<=9){
      hour = "0"+hour
    }
    if(minutes<=9){
      minutes = "0"+minutes
    }
    if(second<=9){
      second = "0"+second
    }
    currentdate = currentdate + " " +hour+":"+minutes+":"+second
  }
  return currentdate;
}

