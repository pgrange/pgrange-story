Object.defineProperty(
  Array.prototype, 
  'contains', 
  {
    enumerable: false, 
    value: function(value){ 
      return this.indexOf(value) !== -1 
    }
  }
)

Object.defineProperty(
  Array.prototype, 
  'last', 
  {
    enumerable: false, 
    value: function(){ 
      return this[this.length - 1];
    }
  }
)
