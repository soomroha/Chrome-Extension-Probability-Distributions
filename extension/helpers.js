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

function gamma(Z)
{

    var RECIP_E = new Decimal(0.36787944117144232159552377016147);
    var TWOPI = new Decimal(6.283185307179586476925286766559);
    var Z = new Decimal(Z);
    var one = new Decimal(1.0);

    var D = one.div(Z.times(10.0));
    D = one.div((Z.times(12)).minus(D));
    D = (D.plus(Z)).times(RECIP_E);
    D = D.pow(Z);
    D = D.times((TWOPI.div(Z)).sqrt());
 
    return D;
}

function igf(S, Z)
{
  if(Z <= 0.0)
  {
    return 0.0;
  }

  var S1 = new Decimal(S);
  var Z1 = new Decimal(Z);
  var one = new Decimal(1.0);
  var Sc = one.div(S1);

  Sc = Sc.times(Z1.pow(S1));
  var temp = new Decimal(Z);
  temp = temp.times(-1);
  Sc = Sc.times(temp.exp());

  var Sum = new Decimal(1.0);
  var Nom = new Decimal(1.0);
  var Denom = new Decimal(1.0);
 
  for(var i = 0; i < 200; i++)
  {
    Nom = Nom.times(Z1);
    S1 = S1.plus(1);
    Denom = Denom.times(S1);
    Sum = Sum.plus(Nom.div(Denom))

  }
  
  return (Sum.times(Sc))
}
