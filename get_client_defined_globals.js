;(function(){
  var iframe = document.createElement('iframe');
  iframe.src = "about:blank";
  document.body.appendChild(iframe);

  var windowVars = Object.keys(iframe.contentWindow);
  var globals = {};
  Object.keys(window).forEach(key=>{
    if (!windowVars.includes(key)) globals[key] = window[key];
  });

  document.body.removeChild(iframe);
  return globals;
})();
