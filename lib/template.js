module.exports = {
    html: function(title, list, body, control){
      return `
      <!doctype html>
      <html lang="ko">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">    
      <title>Node.js 연습 - ${title}</title>
      <meta charset="utf-8">
      </head>
      <body>
      <h1><a href="/">Node.js 연습</a></h1>
      ${list}
      ${control}
      ${body}
      </body>
      </html>
      `;
    },
    list: function(filelist){
      var list = '<ul>';
      var i = 0
      while(i < filelist.length){
        list = list + `<li><a href="/page/${filelist[i]}">${filelist[i]}</a></li>`;
        i++;
      }
      list = list + '</ul>';
      return list;
    }
  }