
document.getElementById('calculate').onclick = function () {

    var ids = ["degrees_input", "less_equal_input", "greater_equal_input", "double_bound_left_input", "double_bound_right_input"];
  
    var used_ids = fetch_and_clean_data(ids);
  
    if (used_ids.length < 1){
      return;
    }
    else{
      var df = parseInt(document.getElementById('degrees_input').value);
      document.getElementById('expected_value_label').innerHTML = "E(X) = " + df
      document.getElementById('variance_label').innerHTML = "V(X) = " + (2 * df)
      for (var x=0; x<used_ids.length; x++){
        update_answers(used_ids[x],df);
      }
    }
  
  }
  
  function update_answers(id, df){
  
    var answer_id = id.concat("_answer");
  
    switch(id){
      case "less_equal_input":
        var y = parseFloat(document.getElementById('less_equal_input').value);
        document.getElementById(answer_id).innerHTML = less_equal(y, df).toFixed(7);
        break;
      case "greater_equal_input":
        var y = parseFloat(document.getElementById('greater_equal_input').value);
        document.getElementById(answer_id).innerHTML = greater_equal(y, df).toFixed(7);
        break;
      case "double_bound_left_input":
        var left = parseFloat(document.getElementById('double_bound_left_input').value)
        var right = parseFloat(document.getElementById('double_bound_right_input').value)
        document.getElementById(answer_id).innerHTML = double_bound(left,right, df).toFixed(7);
        break;
      default:
        break;
    }
  }
  
  function fetch_and_clean_data(ids){
  
    var used_ids = [];
  
    for(var i = 0; i < ids.length; i++){
  
      current_id = ids[i];
  
      if(current_id == "degrees_input"){
  
        var value = (document.getElementById(current_id).value);
  
        if(isInteger(value) && parseInt(value) >= 1){
            used_ids.push(current_id);
        }
        else{
          alert("d.f. must be an integer >= 1");
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

    
  function chisquare_cdf(Cv, Dof)
  {
      if(Cv <= 0 || Dof < 1)
      {
          return 0.0;
      }
  
      var K = Dof * 0.5;
      var X = Cv * 0.5;
      if(Dof == 2)
      {
        return Math.exp(-1.0 * X);
      }
   
      var PValue = igf(K, X);
  /*     if(isNaN(PValue.valueOf()) || (!(isFinite(PValue.valueOf()))) || PValue.valueOf() <= 1e-8)
      {
          return 1e-14;
      }   */
  
      PValue = PValue.div(gamma(K));
      return PValue.valueOf()
  }
  
  function greater_equal(y, df){
    var one = new Decimal(1.0);
    one = one.minus(chisquare_cdf(y, df));
    return parseFloat(one.valueOf());
  }

  function less_equal(y, df){
    return parseFloat(chisquare_cdf(y ,df));
  }

  function double_bound(a , b, df){

    var prob = less_equal(b, df) - less_equal(a, df);
    return prob;
  }

  