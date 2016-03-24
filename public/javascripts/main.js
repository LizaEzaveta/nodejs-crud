function del(id) {
  var xhr = new XMLHttpRequest();
  var path = '/' + id;
  xhr.open('POST', path, true);
  xhr.send();
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      window.location.reload(); 
    }
  };
};
function edit(id) {
  window.location.href = 'edit/' + id;
};
