const mongoose= require('mongoose');
const Poem = require('./PoemModels');

const RateSchema= mongoose.Schema({

        Rate:{
            required:[true,''],
            type:Number,
            max:[5,''],
            min:[1,'']
        },
        PoemId:{
            type:mongoose.Schema.ObjectId,
            ref:'Poem'
        },
        UserId:{
            type:mongoose.Schema.ObjectId,
            ref:'user'
        }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

RateSchema.statics.calcAverageRatings= async function(poemId){

    const stats= await this.aggregate([
           { $match:{ PoemId : poemId    }
        },
        {
            $group:{
                _id:'$Poemid',
                sum:{$sum:1},
                rate:{$avg: '$Rate'}
            }
        }
    ]);

    if (stats.length > 0) {
        await Poem.findByIdAndUpdate(poemId, {
          ratingQuntity: stats[0].sum,
          rating: stats[0].rate
        });
      } else {
        await Poem.findByIdAndUpdate(poemId, {
          ratingsQuantity: 0,
          rating: 4.5
        });
      }

}

RateSchema.post('save', function() {
    // this points to current review
    
    this.constructor.calcAverageRatings(this.PoemId);


  });
  
  RateSchema.pre(/^findOneAnd/, async function(next) {

    
    this.r = await this.findOne();

    next();
  });
  
  RateSchema.post(/^findOneAnd/, async function() {
    // await this.findOne(); does NOT work here, query has already executed
    await this.r.constructor.calcAverageRatings(this.r.PoemId);
  });
  // // findByIdAndUpdate
  // // findByIdAndDelete
  // RateSchema.pre(/^findOneAnd/, async function(next) {
  //   this.r = await this.findOne();
  //    console.log(this.r,'this.r');
  //   next();
  // });
  
  // RateSchema.post(/^findOneAnd/, async function() {
  //   // await this.findOne(); does NOT work here, query has already executed
  //   await this.r.constructor.calcAverageRatings(this.r.PoemId);
  // });

const Rate= mongoose.model('Rate', RateSchema);



module.exports=Rate;