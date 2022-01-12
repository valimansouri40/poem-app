class apifeature{
    constructor(data, query){
    this.data= data
    this.query=query
}

    sort(){
        if(this.query.sort){
            const sort= this.query.sort;
            this.data= this.data.sort(`-CreateAt ${sort}`);
        }else{
            this.data= this.data.sort('-CreateAt');
        }
        return this;
    }
    fields(){
       
            const field=this.query.fields;
         
           const includefields= new RegExp(`${this.query.fields}`,'i');
            this.data= this.data.find({$or:[{"Poet":includefields},{"Style":includefields}]})
        return this;
    }
    paginate(){
        const page= this.query.page * 1||1;
        const limit = this.query.limit * 1||100;
        const skip= (page - 1) * limit;
        this.data= this.data.skip(skip).limit(limit);

        return this;
    }
    myPoet(){
        if(this.query.poemId){const myId=this.query.poemId;

        this.data=this.data.find({IdWriter:myId});}
        return this;
    }


}

module.exports= apifeature;