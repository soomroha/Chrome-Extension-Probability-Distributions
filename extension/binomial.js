//var cdf = require("gsl-cdf");

document.getElementById('calculate').onclick = function () {

  var ids = ["trials_input", "success_input", "equal_input", "less_input", "greater_input", "less_equal_input", "greater_equal_input", "double_bound_left_input", "double_bound_right_input"];

  var used_ids = fetch_and_clean_data(ids);

  if (used_ids.length < 1){
    return;
  }
  else{
    for (var x=0; x<used_ids.length; x++){
      update_answers(used_ids[x]);
    }
  }

}

function update_answers(id){

  alert(id);
  var answer_id = id.concat("_answer");

  switch(id){
    case "equal_input":
      var n = parseInt(document.getElementById('trials_input').value);
      var p = parseFloat(document.getElementById('success_input').value);
      var a = parseInt(document.getElementById('equal_input').value);
      break;
    
    case "less_input":
      break;
    case "greater_input":
      break;
    case "less_equal_input":
      break;
    case "greater_equal_input":
      break;
    case "double_bound_left_input":
      break;
    case "double_bound_right_input":
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

      if(isFloat(value) && parseFloat(value) >= 0.0 && parseFloat(value) <= 1.0){
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
        alert("Bounds must be 0 <= bound <= n");
        return [];
      }

    }

  }

  return used_ids;
}



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
