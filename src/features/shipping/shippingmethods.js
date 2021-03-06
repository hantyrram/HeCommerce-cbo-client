/**
 * Default Shipping Method Templates
 */



function calculate(){
   console.log('Calculating Cost');
}

function FlatRateShipping(){}

function FreeShipping(){}

function LocalPickup(){}

FlatRateShipping.prototype.calculate = calculate;
FreeShipping.prototype.calculate = calculate;
LocalPickup.prototype.calculate = calculate;

const flatRateShipping = new FlatRateShipping();

const freeShipping = new FreeShipping();

const localPickup = new LocalPickup();

Object.defineProperties(flatRateShipping,{
   _name: {
      get: ()=> 'FLAT_RATE_SHIPPING',
      enumerable:true
   },
   title: {
      get: ()=>{
         return this.title;
      },
      set: (newTitle)=>{
         this.title = newTitle;
      },
      enumerable:true
   },
   cost: {
      get: ()=>{
         return this.cost;
      },
      set: (newCost)=>{
         this.cost = newCost;
      },
      enumerable:true
   },
   description: {
      get: ()=>{
         return this.description;
      },
      set: (newDescription)=>{
         this.description = newDescription;
      },
      enumerable:true
   },
   defaultTitle: {
      get: ()=>{
         return 'Flat Rate Shipping' ;
      },
      enumerable:true
   }
});

Object.defineProperties(freeShipping,{
   _name: {
      get: ()=> 'FREE_SHIPPING',
      enumerable:true
   },
   title: {
      get: ()=>{
         return this.title;
      },
      set: (newTitle)=>{
         this.title = newTitle;
      },
      enumerable:true
   },
   cost: {
      get: ()=>{
         return this.cost;
      },
      set: (newCost)=>{
         this.cost = newCost;
      },
      enumerable:true
   },
   description: {
      get: ()=>{
         return this.description;
      },
      set: (newDescription)=>{
         this.description = newDescription;
      },
      enumerable:true
   },
   defaultTitle: {
      get: ()=>{
         return 'Free Shipping' ;
      },
      enumerable:true
   }
});

Object.defineProperties(localPickup,{
   _name: {
      get: ()=> 'LOCAL_PICKUP',
      enumerable:true
   },
   title: {
      get: ()=>{
         return this.title;
      },
      set: (newTitle)=>{
         this.title = newTitle;
      },
      enumerable:true
   },
   cost: {
      get: ()=>{
         return this.cost;
      },
      set: (newCost)=>{
         this.cost = newCost;
      },
      enumerable:true
   },
   description: {
      get: ()=>{
         return this.description;
      },
      set: (newDescription)=>{
         this.description = newDescription;
      },
      enumerable:true
   },
   defaultTitle: {
      get: ()=>{
         return 'Local Pickup' ;
      },
      enumerable:true
   }
});

export default [
   flatRateShipping,
   freeShipping,
   localPickup
]