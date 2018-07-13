function isFloat(value){

    if (!isNaN(value) && value.toString().indexOf('.') != -1)
    {
      return true;
    }
    else{
      return false;
    }
}
  
function isInteger(value){

    return (!(isNaN(value)) && (value.toString().indexOf('.') == -1));
}

function factorial(userInt)
{
  if(userInt===0)
    return '1'

  if(!userInt)
    return ''

  var i, nextNumber, carret,

  result = userInt.toString().split('').reverse().map(Number)

  while(--userInt){
    i = carret = 0

    while((nextNumber = result[i++]) !== undefined || carret) {
      carret = (nextNumber || 0) * userInt + carret
      result[i-1] = carret % 10
      carret = parseInt(carret/10)
    }
  }

  return new BigNumber(result.reverse().join('')).valueOf()
}