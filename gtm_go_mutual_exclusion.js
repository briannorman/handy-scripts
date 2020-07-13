/**
 * This Mutual Exclusion module takes in a number of experiments on the PDP page and 
 * sends an activation event to the dataLayer in the following form: cro_pdp_me_activation_1
 * 
 * If there are 3 experiments, the activation events to use in GO would be cro_pdp_me_activation_1, cro_pdp_me_activation_2, and cro_pdp_me_activation_3
 * The GO experiments will use these dataLayer events to activate.
 */

// Feel free to update this number to reflect the number of experiments in the ME group
var NUMBER_OF_EXPERIMENTS_IN_GROUP = 3;

if (window.localStorage.getItem('cro_pdp_me_experiment')) {
  window.dataLayer.push({
    'event': 'cro_pdp_me_activation_' + window.localStorage.getItem('cro_pdp_me_experiment').toString()
  });
} else {
  var randomNumber = Math.floor(Math.random() * Math.floor(NUMBER_OF_EXPERIMENTS_IN_GROUP)) + 1;
  window.localStorage.setItem('cro_pdp_me_experiment', randomNumber);
  window.dataLayer.push({
    'event': 'cro_pdp_me_activation_' + randomNumber.toString()
  });
}
