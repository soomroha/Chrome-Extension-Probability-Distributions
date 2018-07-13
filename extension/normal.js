document.getElementById('mean_label').innerHTML = '\u03BC =';
document.getElementById('sd_label').innerHTML = '\u03C3 =';

document.getElementById('calculate').onclick = function () {

    var ids = ["mean_input", "sd_input", "less_equal_input", "greater_equal_input", "double_bound_left_input", "double_bound_right_input"];
  
    var used_ids = fetch_and_clean_data(ids);
  
    if (used_ids.length < 1){
      return;
    }
    else{
      var mean = parseFloat(document.getElementById('mean_input').value);
      var sd = parseFloat(document.getElementById('sd_input').value);
      document.getElementById('expected_value_label').innerHTML = "E(X) = " + mean.toFixed(4)
      document.getElementById('variance_label').innerHTML = "V(X) = " + (Math.pow(sd, 2)).toFixed(4)
      for (var x=0; x<used_ids.length; x++){
        update_answers(used_ids[x], mean , sd);
      }
    }
  
  }
  
  function update_answers(id, mean, sd){
  
    var answer_id = id.concat("_answer");
  
    switch(id){
      case "less_equal_input":
        var y = parseFloat(document.getElementById('less_equal_input').value);
        document.getElementById(answer_id).innerHTML = less_equal(y, mean, sd);
        break;
      case "greater_equal_input":
        var y = parseFloat(document.getElementById('greater_equal_input').value);
        document.getElementById(answer_id).innerHTML = greater_equal(y, mean, sd);
        break;
      case "double_bound_left_input":
        var left = parseFloat(document.getElementById('double_bound_left_input').value)
        var right = parseFloat(document.getElementById('double_bound_right_input').value)
        document.getElementById(answer_id).innerHTML = double_bound(left, right, mean, sd);
        break;
      default:
        break;
    }
  }
  
  function fetch_and_clean_data(ids){
  
    var used_ids = [];
  
    for(var i = 0; i < ids.length; i++){
  
      current_id = ids[i];
  
      if(current_id == "mean_input"){
  
        var value = (document.getElementById(current_id).value);
  
        if(!(isNaN(value))){
            used_ids.push(current_id);
        }
        else{
          alert("\u03BC must be a real number");
          return [];
        }
  
      }
      else if(current_id == "sd_input"){

        var value = (document.getElementById(current_id).value);
        var check = (isInteger(value) || isFloat(value)) && (parseFloat(value) >= 0)
        if(check){
          used_ids.push(current_id);
        }
        else{
          alert("\u03C3 must be a real number and >= 0");
          return [];
        }
  
      }
  
      else{
  
        var value = (document.getElementById(current_id).value);
  
        if (current_id == "double_bound_left_input"){
          var leftBound = parseInt(value);
          if (document.getElementById("double_bound_right_input").value == "" && document.getElementById("double_bound_left_input").value != ""){
            alert("Please enter an upper bound.");
            return [];
          }
        }
        if (current_id == "double_bound_right_input"){
          if (document.getElementById("double_bound_left_input").value == "" && document.getElementById("double_bound_right_input").value != ""){
            alert("Please enter a lower bound.");
            return [];
          }
  
          if (parseInt(value) < leftBound){
            alert("Upper bound must be >= lower bound.");
            return [];
          }
        }

        if (value == ""){
  
        }
  
        else if(!(isNaN(value))){
            used_ids.push(current_id);
        }

        else{
          alert("Bounds must be real numbers");
          return [];
        }
  
      }
  
    }
  
    return used_ids;
  }
  
  
  // https://stackoverflow.com/questions/5259421/cumulative-distribution-function-in-javascript
  function normal_cdf(y, mean, sigma) 
  {
    var z = (y-mean)/Math.sqrt(2*sigma*sigma);
    var t = 1/(1+0.3275911*Math.abs(z));
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var erf = 1-(((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
    var sign = 1;
    if(z < 0)
    {
        sign = -1;
    }
    return (1/2)*(1+sign*erf);
  }
  
  function greater_equal(y, mean, sigma){
    return (1 - normal_cdf(y, mean , sigma)).toFixed(7)
  }
  
  function less_equal(y, mean ,sigma){

    return parseFloat(normal_cdf(y ,mean, sigma)).toFixed(7)
  }
  
  
  function double_bound(a , b, mean, sigma){
    return (less_equal(b, mean, sigma) - less_equal(a, mean, sigma)).toFixed(7)
  }
  
