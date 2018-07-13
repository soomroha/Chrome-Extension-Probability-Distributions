
document.getElementById('calculate').onclick = function () {

    var ids = ["a_input", "b_input", "less_equal_input", "greater_equal_input", "double_bound_left_input", "double_bound_right_input"];
  
    var used_ids = fetch_and_clean_data(ids);
  
    if (used_ids.length < 1){
      return;
    }
    else{
      var a = parseFloat(document.getElementById('a_input').value);
      var b = parseFloat(document.getElementById('b_input').value);
      document.getElementById('expected_value_label').innerHTML = "E(X) = " + ((a+b)/2).toFixed(4)
      variance = (Math.pow(b-a, 2)) / 12
      document.getElementById('variance_label').innerHTML = "V(X) = " + variance.toFixed(4)
      for (var x=0; x<used_ids.length; x++){
        update_answers(used_ids[x], a , b);
      }
    }
  
  }
  
  function update_answers(id, a, b){
  
    var answer_id = id.concat("_answer");
  
    switch(id){
      case "less_equal_input":
        var y = parseFloat(document.getElementById('less_equal_input').value);
        document.getElementById(answer_id).innerHTML = less_equal(y, a, b);
        break;
      case "greater_equal_input":
        var y = parseFloat(document.getElementById('greater_equal_input').value);
        document.getElementById(answer_id).innerHTML = greater_equal(y, a, b);
        break;
      case "double_bound_left_input":
        var left = parseFloat(document.getElementById('double_bound_left_input').value)
        var right = parseFloat(document.getElementById('double_bound_right_input').value)
        document.getElementById(answer_id).innerHTML = double_bound(left, right, a, b);
        break;
      default:
        break;
    }
  }
  
  function fetch_and_clean_data(ids){
  
    var used_ids = [];
  
    for(var i = 0; i < ids.length; i++){
  
      current_id = ids[i];
  
      if(current_id == "a_input"){
  
        var value = (document.getElementById(current_id).value);
  
        if(!(isNaN(value))){
            used_ids.push(current_id);
            var a = parseFloat(value);
        }
        else{
          alert("a must be a real number");
          return [];
        }
  
      }
      else if(current_id == "b_input"){

        var value = (document.getElementById(current_id).value);

        if(!(isNaN(value)) && a < parseFloat(value)){
          used_ids.push(current_id);
        }
        else{
          alert("b must be a real number and b must be greater than a");
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
  
  

  function uniform_cdf(y, a, b) 
  {
      if(y <= a){
          return (0).toFixed(7);
      }
      else if(y >= b){
          return (1).toFixed(7);
      }
      else{
          return ((y - a)/(b - a)).toFixed(7);
      }
    
  }
  
  function greater_equal(y, a, b){
    return (1 - uniform_cdf(y, a, b)).toFixed(7)
  }
  
  function less_equal(y, a, b){

    return parseFloat(uniform_cdf(y ,a, b)).toFixed(7)
  }
  
  
  function double_bound(a , b, a1, b1){
    return (less_equal(b, a1, b1) - less_equal(a, a1, b1)).toFixed(7)
  }
  
