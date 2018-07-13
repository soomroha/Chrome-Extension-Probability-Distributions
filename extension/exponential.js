document.getElementById('beta_label').innerHTML = '\u03B2 =';

document.getElementById('calculate').onclick = function () {

    var ids = ["beta_input", "less_equal_input", "greater_equal_input", "double_bound_left_input", "double_bound_right_input"];
  
    var used_ids = fetch_and_clean_data(ids);
  
    if (used_ids.length < 1){
      return;
    }
    else{
      var beta = parseFloat(document.getElementById('beta_input').value);
      document.getElementById('expected_value_label').innerHTML = "E(X) = " + beta.toFixed(4)
      document.getElementById('variance_label').innerHTML = "V(X) = " + (Math.pow(beta, 2)).toFixed(4)
      for (var x=0; x<used_ids.length; x++){
        update_answers(used_ids[x],beta);
      }
    }
  
  }
  
  function update_answers(id, beta){
  
    var answer_id = id.concat("_answer");
  
    switch(id){
      case "less_equal_input":
        var y = parseFloat(document.getElementById('less_equal_input').value);
        document.getElementById(answer_id).innerHTML = less_equal(y, beta);
        break;
      case "greater_equal_input":
        var y = parseFloat(document.getElementById('greater_equal_input').value);
        document.getElementById(answer_id).innerHTML = greater_equal(y, beta);
        break;
      case "double_bound_left_input":
        var left = parseFloat(document.getElementById('double_bound_left_input').value)
        var right = parseFloat(document.getElementById('double_bound_right_input').value)
        document.getElementById(answer_id).innerHTML = double_bound(left, right, beta);
        break;
      default:
        break;
    }
  }
  
  function fetch_and_clean_data(ids){
  
    var used_ids = [];
  
    for(var i = 0; i < ids.length; i++){
  
      current_id = ids[i];
  
      if(current_id == "beta_input"){
  
        var value = (document.getElementById(current_id).value);
  
        if(!(isNaN(value)) && parseFloat(value) > 0){
            used_ids.push(current_id);
        }
        else{
          alert("\u03B2 must be a real number and > 0");
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
  
  
  function exponential_cdf(y, beta) 
  {
    if(y <= 0){
        return (0).toFixed(7)
    }
    else{
        prob = 1 - (Math.exp((-1 * y)/beta))
        return prob
    }
  }
  
  function greater_equal(y, beta){
    return (1 - exponential_cdf(y, beta)).toFixed(7)
  }
  
  function less_equal(y, beta){
    return parseFloat(exponential_cdf(y ,beta)).toFixed(7)
  }
  
  
  function double_bound(a , b, beta){

    return (less_equal(b, beta) - less_equal(a, beta)).toFixed(7)
  }
  