var timeElHTML= function(time){
  var el = document.createElement('time');
  el.setAttribute('data-time', new Date() - time);
  TimeAgo.new(el);

  return el.innerHTML;
}

