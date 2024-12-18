function getCookieList(headerCookie){
    let cookie = {};
    if(!headerCookie){
        return cookie
    }else{
        headerCookie.split(';').forEach(function(el) {
            let [key,value] = el.split('=');
            cookie[key.trim()] = value;
          })
          return cookie
    }
  
}

module.exports ={
    getCookieList
}