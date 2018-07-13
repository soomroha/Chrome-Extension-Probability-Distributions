document.getElementById('calculate').onclick = function () {

    var ids = ["r_input", "p_input", "equal_input"];
  
    var used_ids = fetch_and_clean_data(ids);
  
    if (used_ids.length < 1){
      return;
    }
    else{
      var r = parseInt(document.getElementById('r_input').value);
      var p = parseFloat(document.getElementById('p_input').value);
      
      if(p == 0){
        document.getElementById('expected_value_label').innerHTML = "E(X) is undefined"
        document.getElementById('variance_label').innerHTML = "V(X) is undefined"
      }
      else{
        document.getElementById('expected_value_label').innerHTML = "E(X) = " + (r/p).toFixed(4)
        variance = ((r * (1-p))/(Math.pow(p, 2))).toFixed(4)
        document.getElementById('variance_label').innerHTML = "V(X) = " + variance
      }

      var y = parseInt(document.getElementById('equal_input').value);
      document.getElementById('equal_input_answer').innerHTML = equal_probability(y, r, p).toFixed(7);
    }
  
  }
  
  
  function fetch_and_clean_data(ids){
  
    var used_ids = [];
  
    for(var i = 0; i < ids.length; i++){
  
      current_id = ids[i];
  
      if(current_id == "r_input"){
  
        var value = (document.getElementById(current_id).value);
  
        if(isInteger(value) && parseInt(value) >= 1){
          used_ids.push(current_id);
          var r = parseInt(value);
        }
        else{
          alert("r must be an integer and >= 1");
          return [];
        }
  
      }
      else if(current_id == "p_input"){
        
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
  
        if(isInteger(value) && parseInt(value) >= r){
            used_ids.push(current_id);
        }
        else if (value == ""){
  
        }
        else{
          alert("Bounds must be integers and bound >= r");
          return [];
        }
  
      }
  
    }
  
    return used_ids;
  }
  
  
  
  function equal_probability(y, r, p){
    comb = (factorial(y-1)) /((factorial(r-1)) * factorial(y-r));
    probability = comb * Math.pow(p, r) * Math.pow(1-p, y-r);
    return probability
  }
  
  