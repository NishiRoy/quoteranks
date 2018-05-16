var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var authorSchema=new mongoose.Schema({
    name:{ type:String, required:true,minlength:3},
    _quotes:[{ type:Schema.Types.ObjectId, ref:'Quotes'}],
},{timestamps:true});
    
mongoose.model('Author',authorSchema);

var quotesSchema=new mongoose.Schema({
    content:{ type:String, required:true,minlength:3},
    votes:{type:Number, required:true},
    _author:{ type:Schema.Types.ObjectId, ref:'Author'},
},{timestamps:true});
    
mongoose.model('Quotes',quotesSchema);