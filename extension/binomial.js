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