// The following code can be used in a custom javascript audience in GO.

function () {
  var me_group_number = window.localStorage.getItem('cro_me_experiment');

  // check to see if user has been bucketed into the ME group yet
  if (!me_group_number) {
    var NUMBER_OF_EXPERIMENTS_IN_GROUP = 2;
    var randomNumber = Math.floor(Math.random() * Math.floor(NUMBER_OF_EXPERIMENTS_IN_GROUP)) + 1;
    window.localStorage.setItem('cro_me_experiment', randomNumber);
    me_group_number = randomNumber;
  }
  return me_group_number;
}
