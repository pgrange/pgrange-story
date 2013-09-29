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

