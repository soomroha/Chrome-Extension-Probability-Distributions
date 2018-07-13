document.getElementById('lambda_label').innerHTML = '\u03BB =';

document.getElementById('calculate').onclick = function () {

    var ids = ["lambda_input", "equal_input", "less_input", "greater_input", "less_equal_input", "greater_equal_input", "double_bound_left_input", "double_bound_right_input"];
  
    var used_ids = fetch_and_clean_data(ids);

  
    if (used_ids.length < 1){
      return;
    }
    else{
      var lambda = parseFloat(document.getElementById('lambda_input').value);
      document.getElementById('expected_value_label').innerHTML = "E(X) = " + lambda.toFixed(4)
      document.getElementById('variance_label').innerHTML = "V(X) = " + lambda.toFixed(4)

      for (var x=0; x<used_ids.length; x++){
        update_answers(used_ids[x],lambda);
      }
    } 
  
  }
  
  function update_answers(id, lambda){
  
    var answer_id = id.concat("_answer");
  
    switch(id){
      case "equal_input":
        var y = parseInt(document.getElementById('equal_input').value);
        document.getElementById(answer_id).innerHTML = equal_probability(y,lambda).toFixed(7);
        break;
      
      case "less_input":
        var y = parseInt(document.getElementById('less_input').value);
        document.getElementById(answer_id).innerHTML = less(y,lambda);
        break;
      case "greater_input":
        var y = parseInt(document.getElementById('greater_input').value);
        document.getElementById(answer_id).innerHTML = greater(y,lambda);
        break;
      case "less_equal_input":
        var y = parseInt(document.getElementById('less_equal_input').value);
        document.getElementById(answer_id).innerHTML = less_equal(y,lambda);
        break;
      case "greater_equal_input":
        var y = parseInt(document.getElementById('greater_equal_input').value);
        document.getElementById(answer_id).innerHTML = greater_equal(y,lambda);
        break;
      case "double_bound_left_input":
        var left = parseInt(document.getElementById('double_bound_left_input').value)
        var right = parseInt(document.getElementById('double_bound_right_input').value)
        document.getElementById(answer_id).innerHTML = double_bound(left, right, lambda);
        break;
      default:
        break;
    }
  }
  
  function fetch_and_clean_data(ids){
  
    var used_ids = [];
  
    for(var i = 0; i < ids.length; i++){
  
      current_id = ids[i];
  
      if(current_id == "lambda_input"){
        
        var value = (document.getElementById(current_id).value);
  
        if(!(isNaN(value)) && parseFloat(value) > 0) {
          used_ids.push(current_id);
        }
        else{
          alert("\u03BB must be a real number greater than 0");
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
  
        if(isInteger(value) && parseInt(value) >= 0){
            used_ids.push(current_id);
        }
        else if (value == ""){
  
        }
        else{
          alert("Bounds must be integers and >= 0");
          return [];
        }
  
      }
  
    }
  
    return used_ids;
  }
  
  
  
  function equal_probability(y, lambda){
    
    probability = ((Math.pow(lambda, y))*(Math.exp((-1 * lambda))))/(factorial(y))

    return probability
  }
  
  function poisson_cdf(y, lambda){
  
    sum_prob = 0.0;
    for(var i = 0; i <= y; i++){
      sum_prob += equal_probability(i, lambda);
    }
  
    return sum_prob.toFixed(7);
  }
  
  function poisson_cdf_comp(y, lambda){
    return (1 - poisson_cdf(y, lambda));
  }
  
  function greater_equal(y, lambda){
  
    if(y == 0){
      return (1.0).toFixed(7);
    }
  
    high_eq = poisson_cdf_comp(y-1, lambda);
    return high_eq.toFixed(7);
  }
  
  function less_equal(y, lambda){
    return parseFloat(poisson_cdf(y, lambda)).toFixed(7)
  }
  
  function greater(y, lambda){
    high = poisson_cdf_comp(y, lambda)
    return high.toFixed(7)
  }
  
  function less(y, lambda){
  
    return (1 - greater_equal(y, lambda)).toFixed(7)
  }
  
  function double_bound(a , b, lambda){
    prob = 0.0
    for(var i = a; i <= b; i++){
      prob += equal_probability(i, lambda)
    }
    return prob.toFixed(7)
  }