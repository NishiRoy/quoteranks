var mongoose=require('mongoose');
var Author=mongoose.model('Author');
var Quotes=mongoose.model('Quotes');

function Authors(){

this.index=function(req,res){
    Author.find({},function(err, author) {
        if(err) {
            console.log(err);
            res.json({message:'error',data:err});
        }
        res.json({message:'success',data:author});
    });
  
}


this.createnew=function(req,res){
      console.log(req.body.data);
    var author_new=new Author({name:req.body.data});
    author_new.save(function(err,author){
        if(err)
        {
            console.log('error');
            res.json({message:'error',data:err})
        }
        else
        {
            console.log('Succesfully created new cake');
            res.json({message:'success',data:author});
        }
    });
}



this.destroy=function(req,res){
    console.log("Imma delete you");
    Quotes.findOneAndRemove({_id:req.params.id},function(err,quo){
        if(err)
        {
            console.log('error');
            res.json({message:'error',data:err})
        }
        else
        {
            console.log('Succesfully deleted');
            res.json({message:'success',data:quo})
        }

    })
}

this.getAuthor = function(req, res) {
    console.log("What the what",req.params.id);
    Author.find({_id: req.params.id}).populate('_quotes').exec( function(err, results){
        if(err)
        {
            res.json({message:'error',error:err})
        }
        else
        {
            console.log('Succesfully Got one');
            res.json({message:'success',data:results})
        }
    });
}

this.editAuthor=function(req,res){
    console.log(req.body);
    Author.update({_id:req.body.id},{$set:{'name':req.body.name}},function(err,author){
        if(err){
            console.log("error");
            res.json({message:'error',error:err})
        }
        else{
            console.log("Successfully deleted stuff");
            res.json({message:'success',data:author});
        }
    })
}

this.addQuote=function(req,res){

    console.log("Here",req.body);

        var quote=new Quotes({content:req.body.data.content,votes:req.body.data.votes});
        quote._author=req.body.data.id;
        quote.save(function(err){
            if(err){
                console.log(err);
                res.json({message:'error',error:err})
            }
            else{
                Author.update({_id:req.body.data.id},{$push:{_quotes:quote}},function(err,auth){
                    if(err){
                        console.log(err);
                        res.json({message:'error',error:err})
                    }
                    else{
                        console.log("Successfully updated this",auth);
                        res.json({message:"success",data:auth});
                    }
                
                })
            }
        })
    
    }


this.editPost=function(req,res){

    console.log("Here",req.body);

    Quotes.findById(req.body.id,function(err,quo){

        if(err)
        {
            console.log("error",err);
            res.json({message:'error',error:err});
        }
        else{
            console.log(quo,"Hey ",req.body.votes);
            quo.votes=Number(req.body.votes);
            quo.save(function(err,q){
                if(err)
                console.log("It did not update");
                else{
                    console.log("Successfully updated this");
                    res.json({message:"success",data:q});
                }
            })
        }
    })
}
}

module.exports=new Authors();