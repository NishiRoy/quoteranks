var name=require('../controllers/restful.js');

module.exports=function(app){

    app.get('/authors',name.index);

    app.get('/author/:id',name.getAuthor);

    app.post('/edit',name.editAuthor);

    app.post('/create',name.createnew);

    app.post('/postquote',name.addQuote);

    app.get('/destroy/:id',name.destroy);

    app.post('/editpost',name.editPost);
}