document.getElementById('calculate').onclick = function () {

    var ids = ["population_input", "number_success_input", "sample_size_input", "equal_input", "less_input", "greater_input", "less_equal_input", "greater_equal_input", "double_bound_left_input", "double_bound_right_input"];
  
    var used_ids = fetch_and_clean_data(ids);

  
    if (used_ids.length < 1){
      return;
    }
    else{
      var N = parseInt(document.getElementById('population_input').value);
      var r = parseInt(document.getElementById('number_success_input').value);
      var n = parseInt(document.getElementById('sample_size_input').value);

      if(N == 1){
        document.getElementById('expected_value_label').innerHTML = "E(X) = " + ((n * r)/N).toFixed(4)
        document.getElementById('variance_label').innerHTML = "V(X) is undefined"
      }
      else{
        document.getElementById('expected_value_label').innerHTML = "E(X) = " + ((n * r)/N).toFixed(4)
        variance = (n * (r/N) * ((N-r)/N) * ((N-n)/(N-1))).toFixed(4)
        document.getElementById('variance_label').innerHTML = "V(X) = " + variance
      }
      for (var x=0; x<used_ids.length; x++){
        update_answers(used_ids[x],N, r, n);
      }
    } 
  
  }
  
  function update_answers(id, N, r, n){
  
    var answer_id = id.concat("_answer");
  
    switch(id){
      case "equal_input":
        var y = parseInt(document.getElementById('equal_input').value);
        document.getElementById(answer_id).innerHTML = equal_probability(y,N, r, n).toFixed(7);
        break;
      
      case "less_input":
        var y = parseInt(document.getElementById('less_input').value);
        document.getElementById(answer_id).innerHTML = less(y,N, r, n);
        break;
      case "greater_input":
        var y = parseInt(document.getElementById('greater_input').value);
        document.getElementById(answer_id).innerHTML = greater(y,N, r, n);
        break;
      case "less_equal_input":
        var y = parseInt(document.getElementById('less_equal_input').value);
        document.getElementById(answer_id).innerHTML = less_equal(y,N, r, n);
        break;
      case "greater_equal_input":
        var y = parseInt(document.getElementById('greater_equal_input').value);
        document.getElementById(answer_id).innerHTML = greater_equal(y,N, r, n);
        break;
      case "double_bound_left_input":
        var left = parseInt(document.getElementById('double_bound_left_input').value)
        var right = parseInt(document.getElementById('double_bound_right_input').value)
        document.getElementById(answer_id).innerHTML = double_bound(left, right,N, r, n);
        break;
      default:
        break;
    }
  }
  
  function fetch_and_clean_data(ids){

    var used_ids = [];
  
    for(var i = 0; i < ids.length; i++){
  
      current_id = ids[i];
  
      if(current_id == "population_input"){
  
        var value = (document.getElementById(current_id).value);
  
        if(isInteger(value) && parseInt(value) >= 1){
          used_ids.push(current_id);
          var N = parseInt(value);
        }
        else{
          alert("Population size must be an integer and >= 1");
          return [];
        }
  
      }

      else if(current_id == "number_success_input"){
        
        var value = (document.getElementById(current_id).value);

        if(isInteger(value) && parseInt(value) >= 0){
            used_ids.push(current_id);
            var r = parseInt(value);
        }
        else{
          alert("Number of successes in population must be an integer and >= 0");
          return [];
        }
  
      }

      else if(current_id == "sample_size_input"){
  
        var value = (document.getElementById(current_id).value);
  
        if(isInteger(value) && parseInt(value) >= 1){
          var n = parseInt(value);
          var check1 = n <= N
          var check2 = r <= N
          if(!check1){
            alert("Sample size must be less than or equal to population size: n <= N");
            return [];
          }
          if(!check2){
            alert("Number of successes in population must be less than or equal to population: r <= N");
            return [];
          }
          used_ids.push(current_id);

        }
        else{
          alert("Sample size must be an integer and >= 1");
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
        //var check3 = ((n-y) >= 0) && ((n-y) <= (N-r))
        else if(n <= r){
            if(isInteger(value) && parseInt(value) >= 0 && parseInt(value) <= n){
                used_ids.push(current_id);
            }
            else{
                alert("Bounds must be integers and 0 <= bound <= n");
                return [];
            }
        }

        else if(n > r){
            if(isInteger(value) && parseInt(value) >= 0 && parseInt(value) <= r){
                used_ids.push(current_id);
            }
            else{
                alert("Bounds must be integers and 0 <= bound <= r");
                return [];
            }
        }
  
      }
  
    }
  
    return used_ids;
  }
  
  
  
  function equal_probability(y,N, r, n){
  
    if(!((0 <= y) && (y <= r))){
      return 0
    }
  
    if(!((0 <= (n-y)) && ((n-y) <= (N-r)))){
      return 0
    }
  
    var a = factorial(r)/(factorial(y) * factorial(r-y))
    var b = factorial(N-r)/ (factorial(n-y) * factorial(N-r-n+y))
    var c = factorial(N)/(factorial(n) * factorial(N-n))
    probability = (a * b)/c
    return probability
    
  }
  
  function hypergeometric_cdf(y, N, r, n){
      
    prob = 0.0
  
    for(var i = 0; i <= y; i++){
      prob += equal_probability(i, N, r , n)
    }
    return prob
    
  }
  
  function hypergeometric_cdf_comp(y, N, r, n){
    return (1 - hypergeometric_cdf(y, N, r, n))
  }
  
  function greater_equal(y, N, r, n){
  
    if(y == 0){
      return (1.0).toFixed(7)
    }
  
    high_eq = hypergeometric_cdf_comp(y-1, N, r, n)
    return high_eq.toFixed(7)
  }
  
  function less_equal(y, N, r, n){
    return parseFloat(hypergeometric_cdf(y, N, r, n)).toFixed(7)
  }
  
  function greater(y, N, r, n){
    high = hypergeometric_cdf_comp(y, N, r, n)
    return high.toFixed(7)
  }
  
  function less(y, N, r, n){
  
    return (1 - greater_equal(y, N, r, n)).toFixed(7)
  }
  
  function double_bound(a , b, N, r, n){
    var prob = 0.0
    for(var i = a; i <= b; i++){
      prob += equal_probability(i, N, r, n)
    }
    return prob.toFixed(7)
  }