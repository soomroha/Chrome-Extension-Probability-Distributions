document.getElementById('calculate').onclick = function () {

  var ids = ["trials_input", "success_input", "equal_input", "less_input", "greater_input", "less_equal_input", "greater_equal_input", "double_bound_left_input", "double_bound_right_input"];

  var used_ids = fetch_and_clean_data(ids);

  if (used_ids.length < 1){
    return;
  }
  else{
    var n = parseInt(document.getElementById('trials_input').value);
    var p = parseFloat(document.getElementById('success_input').value);
    document.getElementById('expected_value_label').innerHTML = "E(X) = " + (n*p).toFixed(4)
    document.getElementById('variance_label').innerHTML = "V(X) = " + (n*p*(1 - p)).toFixed(4)
    for (var x=0; x<used_ids.length; x++){
      update_answers(used_ids[x], n , p);
    }
  }

}

function update_answers(id, n, p){

  var answer_id = id.concat("_answer");

  switch(id){
    case "equal_input":
      var y = parseInt(document.getElementById('equal_input').value);
      document.getElementById(answer_id).innerHTML = equal_probability(y, n, p).toFixed(7);
      break;
    
    case "less_input":
      var y = parseInt(document.getElementById('less_input').value);
      document.getElementById(answer_id).innerHTML = less(y, n, p);
      break;
    case "greater_input":
      var y = parseInt(document.getElementById('greater_input').value);
      document.getElementById(answer_id).innerHTML = greater(y, n, p);
      break;
    case "less_equal_input":
      var y = parseInt(document.getElementById('less_equal_input').value);
      document.getElementById(answer_id).innerHTML = less_equal(y, n, p);
      break;
    case "greater_equal_input":
      var y = parseInt(document.getElementById('greater_equal_input').value);
      document.getElementById(answer_id).innerHTML = greater_equal(y, n, p);
      break;
    case "double_bound_left_input":
      var left = parseInt(document.getElementById('double_bound_left_input').value)
      var right = parseInt(document.getElementById('double_bound_right_input').value)
      document.getElementById(answer_id).innerHTML = double_bound(left, right, n, p);
      break;
    default:
      break;
  }
}

function fetch_and_clean_data(ids){

  var used_ids = [];

  for(var i = 0; i < ids.length; i++){

    current_id = ids[i];

    if(current_id == "trials_input"){

      var value = (document.getElementById(current_id).value);

      if(isInteger(value) && parseInt(value) >= 0){
        used_ids.push(current_id);
        var n = parseInt(value);
      }
      else{
        alert("Please enter a value for n >= 0");
        return [];
      }

    }
    else if(current_id == "success_input"){
      
      var value = (document.getElementById(current_id).value);
      check1 = isFloat(value) && parseFloat(value) >= 0.0 && parseFloat(value) <= 1.0;
      check2 = isInteger(value) && ((parseInt(value) == 0) || (parseInt(value) == 1));

      if(check1 || check2){
        used_ids.push(current_id);
      }
      else{
        alert("Please enter a value for 0 <= p <= 1");
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

      if(isInteger(value) && parseInt(value) >= 0 && parseInt(value) <= n){
          used_ids.push(current_id);
      }
      else if (value == ""){

      }
      else{
        alert("Bounds must be integers and 0 <= bound <= n");
        return [];
      }

    }

  }

  return used_ids;
}



function equal_probability(y, n, p){
  comb = factorial(n) / ((factorial(y)) * factorial(n - y))
  probability = comb * Math.pow(p, y) * Math.pow(1-p, n-y)
  return probability
}

function binomial_cdf(y, n, p){

  sum_prob = 0.0
  for(var i = 0; i <= y; i++){
    sum_prob += equal_probability(i, n , p)
  }

  return sum_prob.toFixed(7)
}

function binomial_cdf_comp(y , n , p){
  return (1 - binomial_cdf(y, n , p))
}

function greater_equal(y, n, p){

  if(y == 0){
    prob_at_zero = equal_probability(0, n, p)
    return (prob_at_zero + (1 - binomial_cdf(0, n, p))).toFixed(7)
  }

  high_eq = binomial_cdf_comp(y-1, n, p)
  return high_eq.toFixed(7)
}

function less_equal(y, n ,p){
  return parseFloat(binomial_cdf(y, n, p)).toFixed(7)
}

function greater(y, n, p){
  high = binomial_cdf_comp(y, n, p)
  return high.toFixed(7)
}

function less(y, n, p){

  return (1 - greater_equal(y, n, p)).toFixed(7)
}

function double_bound(a , b, n, p){
  prob = 0.0
  for(var i = a; i <= b; i++){
    prob += equal_probability(i, n, p)
  }
  return prob.toFixed(7)
}
