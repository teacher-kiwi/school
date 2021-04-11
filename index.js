const express = require('express');
const app = express();
const fs = require('fs');
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
const template = require('./lib/template.js')

app.get('/', function (request, response) {
  fs.readdir('data', function (error, filelist) {
    var title = '안녕하세요?';
    var description = 'Node.js로 게시판 만들기 연습입니다.';
    var list = template.list(filelist);
    var html = template.html(title, list,
      `<h2>${title}</h2><p>${description}</p>`,
      `<a href="/create">글쓰기</a>`
    );
    response.send(html);
  });
});

app.get('/page/:pageId', function (request, response) {
  fs.readdir('./data', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf-8', function (err, description) {
      var title = filteredId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description);
      var list = template.list(filelist);
      var html = template.html(sanitizedTitle, list, 
        `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
        ` <a href="/create">글쓰기</a>
          <a href="/update/${sanitizedTitle}">수정</a>
          <form action="/delete_process" method="post" onsubmit="">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="삭제">
          </form>`
      );
      response.send(html);
    });
  });
});

app.get('/create', function (request, response) {
  fs.readdir('data', function(error, filelist){
    var title = '글쓰기';
    var list = template.list(filelist);
    var html = template.html(title, list, `
      <form action="create_process" method="post">
        <p><input type="text" name="title" placeholder="제목"></p>
        <p><textarea name="description" placeholder="내용"></textarea></p>
        <p><input type="submit" value="글쓰기"></p>
      </form>
    `, '');
    response.send(html);
  });
});

app.post('/create_process', function(request, response){
  var body ='';
  request.on('data', function(data){
    body = body + data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var title = post.title;
    var description = post.description;
    var filteredId = path.parse(title).base;
    var sanitizedTitle = sanitizeHtml(filteredId);
    var sanitizedDescription = sanitizeHtml(description);
    fs.writeFile(`data/${sanitizedTitle}`, sanitizedDescription, 'utf8', function(err){
      response.redirect(`/page/${sanitizedTitle}`);
    });
  });
});

app.get('/update/:pageId', function(request, response){
  fs.readdir('data', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf-8', function (err, description) {
      var title = filteredId;
      var list = template.list(filelist);
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description);
      var html = template.html(sanitizedTitle, list, 
        `
          <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <p><input type="text" name="title" placeholder="제목" value="${sanitizedTitle}"></p>
            <p><textarea name="description" placeholder="내용">${sanitizedDescription}</textarea></p>
            <p><input type="submit" value="수정"></p>
          </form>
        `, '');
      response.send(html);
    });
  });
});

app.post('/update_process', function(request, response){
  var body ='';
  request.on('data', function(data){
    body = body + data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var id = post.id;
    var title = post.title;
    var description = post.description;
    var filteredId = path.parse(id).base;
    var filteredTitle = path.parse(title).base;
    var sanitizedTitle = sanitizeHtml(filteredTitle);
    var sanitizedDescription = sanitizeHtml(description);
    fs.rename(`data/${filteredId}`, `data/${sanitizedTitle}`, function(error){
      fs.writeFile(`data/${sanitizedTitle}`, sanitizedDescription, 'utf8', function(err){
        response.redirect(`/page/${sanitizedTitle}`);
      });
    });
  });
});

app.post('/delete_process', function(request, response){
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    var id = post.id;
    var filteredId = path.parse(id).base;
    var sanitizedTitle = sanitizeHtml(filteredId);
    fs.unlink(`data/${sanitizedTitle}`, function (error) {
      response.redirect('/');
    });
  });
});

app.listen(process.env.PORT || 8080)