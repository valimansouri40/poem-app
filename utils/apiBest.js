class apiBest{
    constructor(data,query){
        this.data=data,
        this.query=query
    }
    Quintity(){
        if(this.query.Quintity){
            this.data=this.data.find().sort('-ratingQuntity').limit(2);
        }
        return this;
    }
    ratings(){
        if(this.query.rate){
            this.data=this.data.find().sort('-rating').limit(2);
        }
        return this;
    }
}

module.exports=apiBest;