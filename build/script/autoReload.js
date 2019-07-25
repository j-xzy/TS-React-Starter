(function autoReload(window){
  const host = window.location.host;
  const evtSource = new EventSource(`http://${host}/__reload__`);

  evtSource.onmessage = function (e) {
    e.data === 'reload' && window.location.reload();
  };
})(window);