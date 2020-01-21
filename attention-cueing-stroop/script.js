document.addEventListener('DOMContentLoaded', (event) => {

var api_key = "11082366813cdc167d41fea137939cb35142673bc71a98d823";
  var api_secret = "A9UlsF6.fbaTE";
  var base_url = "https://restapi.surveygizmo.com/v5/survey/";
  //https://restapi.surveygizmo.com/v5/survey/3808247/surveypage/1/surveyquestion/1415/surveyoption?_method=PUT&title=data&value='{rvar:test}'&api_token=11082366813cdc167d41fea137939cb35142673bc71a98d823&api_token_secret=A9UlsF6.fbaTE

  var practice_wordlist = ["ZZZZZ","BBBBB","VVVVV","WWWWW","SSSSS","NNNNN","QQQQQ","UUUUU","HHHHH","IIIII","DDDDD","PPPPP"];
  var practice_wordlist2 = ["CCCCC","EEEEE","XXXXX","MMMMM","AAAAA","LLLLL","RRRRR","TTTTT","KKKKK","GGGGG","OOOOO","YYYYY"];

  var suicide_wordlist = ["suffocation", "gunshot", "funeral", "blood", "overdose", "noose", "corpse", "death", "dead", "die", "cutting", "dying", "suicide", "hanging", "killing", "deceased"];
  var negative_wordlist = ["hate", "vomit", "pathetic", "crying", "filthy","abuse", "cruel", "failure", "assault", "rejected", "bomb", "torture", "ashamed", "alone", "stupid", "worthless"];
  var positive_wordlist = ["healthy", "attraction", "great", "paradise", "love", "bravery", "pleasure", "enthusiasm", "kiss", "strong", "smile", "happy", "passionate", "ecstatic", "laugh", "success"];
  var neutral_wordlist = ["statue", "folded", "image", "cheese", "horse", "foam", "table", "paper", "closet", "meter", "museum", "green", "frame", "double", "structure", "engine"];

  var test_wordlist =  suicide_wordlist.concat(negative_wordlist, positive_wordlist, neutral_wordlist)
  var practice_stimuli = [];
  var stim_practice_set = []; // temporary object array for randomization of stim order
  var practice_stimuli2 = [];
  var stim_practice_set2 = []; // temporary object array for randomization of stim order
  var stim_test_set = []; // temporary object array for randomization of stim order
  var test_stimuli1 = []; // block 1
  var test_stimuli2 = []; // block 2
  var test_stimuli3 = []; // block 3
  var test_stimuli4 = []; // block 4
  var trial_index = 0;

  /* define instructions block */
  var instructions_block = {
    type: "text",
    cont_key: ['f','j'],
    display_element: $('.instructions'),
    text: "<p>You will shortly see a series of words on the screen. At the beginning of each trial, a '&#10010;' will appear on the screen to show you where to look. Next, you will see a pair of words appear in either the left or right box. Then, a ''&#9679;'' will appear on the screen in either the left or right box after each pair of words disappears. Your task is to indicate which side the ''&#9679;'' appeared on. If the ''&#9679;'' appears on the left side of the screen, press the '<b>F</b>' key on the keyboard. If the ''&#9679;'' appears on the right side of the screen, press the '<b>J</b>' key on the keyboard. </p>" +

      "<p>Remember, your task is to indicate which side the ''&#9679;'' appeared on (by pressing the '<b>F</b>' or '<b>J</b>' keys on the keyboard) as quickly and as accurately as you can. Try to not make mistakes, but try to be fast. Your responses will be timed. </p>" +

      "<p>First, you will be presented with a set of practice trials that can be repeated, if needed. Then, you will be presented with the test trials that cannot be repeated. The task will take approximately 10 minutes to complete.</p>" +

      "<p>Press the '<b>F</b>' or '<b>J</b>' key to start...</p>",
    on_trial_start: function() {
      $(".side-ind").css('display','none'); 
      $(".fixation_gap").css('display','none'); 
      $(".box1").css('display','none'); 
      $(".box2").css('display','none'); 
      $(".spacer").css('display','none'); 
    },
    on_finish: function() { 
      $(".instructions").css('display','none');
      $(".side-ind").css('display','block'); 
      $(".side-ind").css('visibility','visible');  
      $(".fixation_gap").css('display','block'); 
      $(".fixation_gap").css('visibility','visible');
      $(".spacer").css('display','block'); 
      $(".box1").css('display','block'); 
      $(".box2").css('display','block'); 
      $(".box1").css('visibility','visible'); 
      $(".box2").css('visibility','visible');  
    },
    timing_post_trial: 4000
  };

  var fixation_block = {
    type: "single-stim",
    display_element: $('.box1'),
    stimulus:"",
    is_html: true,
    timing_response: 1000,
    timing_post_trial: 0,
    response_ends_trial: false,
    on_trial_start: function() { 
      $(".fixation_gap").css('visibility','visible'); 
    },
    on_finish: function() { 
      $(".fixation_gap").css('visibility','hidden'); 
    },
    data:{
      block: 'fixation'
    }
  };

  var trial_end_block = {
    type: "single-stim",
    display_element: $('.box1'),
    stimulus:"",
    is_html: true,
    on_trial_start: function() { 
      $(".fixation_gap").css('visibility','hidden'); 
    },
    on_finish: function() { 
      $(".fixation_gap").css('visibility','visible'); 
    },
    timing_response: 1000,
    timing_post_trial: 0,
    response_ends_trial: false,
    data:{
      block: 'trial_end'
    }
  };

  var responsel_block = {
    type: "single-stim",
    choices: ['f','j'],
    display_element: $('.box1'),
    stimulus:"<div class='dot'><font size='+24'>&#9679;</font></div>",
    is_html: true,
    timing_response: -1,
    timing_post_trial: 10,
    response_ends_trial: true,
    data:{key_pressed:-1},
    on_finish: function(data){
      trial_index++;
      //tldat = jsPsych.data.getLastTimelineData();
      //wpos = tldat[tldat.length - 2]['word_position'];
      if(data.key_press == 70) {
        jsPsych.data.addDataToLastTrial({key_pressed: 'f', participant_response:'left', correct_response: 'correct' });
      } else if (data.key_press == 74) {
        jsPsych.data.addDataToLastTrial({key_pressed: 'j', participant_response:'right', correct_response: 'incorrect' });
      } else if(data.key_press == -1) {
        jsPsych.data.addDataToLastTrial({correct_response: 'noresponse'});
      } else { jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase(), correct_response: 'incorrect'}); }
    },
    data:{
      dot_position: 'left'
    }
  };

  var responser_block = {
    type: "single-stim",
    choices: ['f','j'],
    display_element: $('.box2'),
    stimulus:"<div class='dot'><font size='+24'>&#9679;</font></div>",
    is_html: true,
    timing_response: -1,
    timing_post_trial: 10,
    response_ends_trial: true,
    data:{key_pressed:-1},
    on_finish: function(data){
      trial_index++;
      //tldat = jsPsych.data.getLastTimelineData();
      //wpos = tldat[tldat.length - 2]['word_position'];
      if(data.key_press == 74) {
        jsPsych.data.addDataToLastTrial({key_pressed: 'j', participant_response:'right', correct_response: 'correct' });
      } else if (data.key_press == 70) {
        jsPsych.data.addDataToLastTrial({key_pressed: 'f', participant_response:'left', correct_response: 'incorrect' });
      } else if(data.key_press == -1) {
        jsPsych.data.addDataToLastTrial({correct_response: 'noresponse'});
      } else { jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase(), correct_response: 'incorrect'}); }
    },
    data:{
      dot_position: 'right'
    }
  };

  for(var i=0;i<practice_wordlist.length;i++) {
    var rand1 = Math.floor(Math.random() * 2) + 1;
    var rand2 = Math.floor(Math.random() * 2) + 1;
    var wp = "";
    if(rand1 == 1) {
      wp = "left";
    } else { wp = "right";}
    var stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box' + rand1),
      stimulus: "<div class='text'><span><h3>" + practice_wordlist[i] + "</h3></span>" + "<span><h3>" + practice_wordlist[i] + "</h3></span></div>",
      data:{word: practice_wordlist[i],
            word_position: wp,
            validity: 'practice',
            block: 'practice',
            block_num: 0
      }
    }
    stim_practice_set = [];
    stim_practice_set.push(fixation_block);
    stim_practice_set.push(stim);
    if(rand2 == 1) {
      stim_practice_set.push(responser_block);
    } else {
      stim_practice_set.push(responsel_block);
    }
    stim_practice_set.push(trial_end_block); // trick to preserve order of stimuli set
    practice_stimuli.push(stim_practice_set);
  }
  var practice_trials = jsPsych.randomization.repeat(practice_stimuli, 1);
  practice_trials = [].concat.apply([], practice_trials); // flatten

  for(var i=0;i<practice_wordlist2.length;i++) {
    var rand1 = Math.floor(Math.random() * 2) + 1;
    var rand2 = Math.floor(Math.random() * 2) + 1;
    var wp = "";
    if(rand1 == 1) {
      wp = "left";
    } else { wp = "right";}
    var stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box' + rand1),
      stimulus: "<div class='text'><span><h3>" + practice_wordlist2[i] + "</h3></span>" + "<span><h3>" + practice_wordlist2[i] + "</h3></span></div>",
      data:{word: practice_wordlist2[i],
            word_position: wp,
            validity: 'practice2',
            block: 'practice2',
            block_num: 0
      }
    }
    stim_practice_set2 = [];
    stim_practice_set2.push(fixation_block);
    stim_practice_set2.push(stim);
    if(rand2 == 1) {
      stim_practice_set2.push(responser_block);
    } else {
      stim_practice_set2.push(responsel_block);
    }
    stim_practice_set2.push(trial_end_block); // trick to preserve order of stimuli set
    practice_stimuli2.push(stim_practice_set2);
  }
  var practice_trials2 = jsPsych.randomization.repeat(practice_stimuli2, 1);
  practice_trials2 = [].concat.apply([], practice_trials2); // flatten

  var practice_block = {
    type: "single-stim",
    timeline: practice_trials
  };

    var practice2_block = {
    type: "single-stim",
    timeline: practice_trials2
  };

  var practice_debrief_block = {
    type: "text",
    cont_key: [49,70,74],
    display_element: $('.instructions'),
    on_trial_start: function() {
      $(".instructions").css('display','block');
      $(".fixation_gap").css('display','none'); 
      $(".box1").css('display','none'); 
      $(".box2").css('display','none');
    },
    on_finish: function() { 
      $(".instructions").css('display','none');
      $(".fixation_gap").css('display','block'); 
      $(".box1").css('display','block'); 
      $(".box2").css('display','block');
      $(".fixation_gap").css('visibility','visible'); 
      $(".box1").css('visibility','visible'); 
      $(".box2").css('visibility','visible'); 
      $("jspsych-single-stim-stimulus").css('visibility','visible') 
    },
    text: function() {
      return "<p>You have completed the PRACTICE phase. If you would like to repeat the PRACTICE phase, press <b>1</b>. To continue onto the TEST phase, press the '<b>F</b>' or '<b>J</b>' keys on the keyboard.</p>" + 
             "<br><p><b>Remember</b>: press the '<b>F</b>' key if the ''&#9679;'' is on the left. Press the '<b>J</b>' key if the ''&#9679;'' is on the right.</p>";
    }
  };

  var practice_debrief_block_error = {
    type: "text",
    cont_key: [70,74],
    display_element: $('.instructions'),
    on_trial_start: function() { 
      $(".instructions").css('display','block');
      $(".fixation_gap").css('display','none'); 
      $(".box1").css('display','none'); 
      $(".box2").css('display','none');
    },
    on_finish: function() { 
      $(".instructions").css('display','none');
      $(".fixation_gap").css('display','block'); 
      $(".box1").css('display','block'); 
      $(".box2").css('display','block');
    },
    text: function() {
      return "<p>It looks like you're having trouble with the task. Let’s try the practice again. Remember, if the ''&#9679;'' is on the left side of the screen, press the '<b>F</b>' key on the keyboard. If the ''&#9679;'' is on the right side of the screen, press the '<b>J</b>' key on the keyboard.</p>" +
              "<br><p>Please press the '<b>F</b>' or '<b>J</b>' key to try the practice again.</p>" +
              "<br><p><b>Remember</b>: make sure your fingers are on the '<b>F</b>' and '<b>J</b>' keys on the keyboard.</p>";
    }
  };

  var practice_debrief_block_error2 = {
    type: "text",
    cont_key: [70,74],
    display_element: $('.instructions'),
    on_trial_start: function() { 
      $(".instructions").css('display','block');
      $(".fixation_gap").css('display','none'); 
      $(".box1").css('display','none'); 
      $(".box2").css('display','none');
    },
    on_finish: function() { 
      $(".instructions").css('display','none');
      $(".fixation_gap").css('display','block'); 
      $(".box1").css('display','block'); 
      $(".box2").css('display','block'); 
    },
    text: function() {
      return "<p>It looks like you're having trouble with the task and it may be helpful to check what keys you're pressing. Remember, if the ''&#9679;'' is on the left side of the screen, press the '<b>F</b>' key on the keyboard. If the ''&#9679;'' is on the right side of the screen, press the '<b>J</b>' key on the keyboard.</p>" +
        "<br><p>Please press the '<b>F</b>' or '<b>J</b>' key to move onto the TEST phase.</p>" +
        "<br><p><b>Remember</b>: make sure your fingers are on the '<b>F</b>' and '<b>J</b>' keys on the keyboard.</p>";
    }
  };

  var practice_debrief_block_end = {
    type: "text",
    cont_key: [49,70,74],
    display_element: $('.instructions'),
    on_trial_start: function() { 
      $(".instructions").css('display','block');
      $(".fixation_gap").css('display','none'); 
      $(".box1").css('display','none'); 
      $(".box2").css('display','none');
    },
    on_finish: function() { 
      $(".instructions").css('display','none');
      $(".fixation_gap").css('display','block'); 
      $(".box1").css('display','block'); 
      $(".box2").css('display','block'); 
    },
    text: function() {
      return "<p>You have completed the PRACTICE phase.  If you would like to repeat the PRACTICE phase, press 1. To continue onto the TEST phase, press the '<b>F</b>' or '<b>J</b>' keys on the keyboard.</p>" + 
        "<br><p><b>Remember</b>: make sure your fingers are on the '<b>F</b>' and '<b>J</b>' keys on the keyboard.</p>";
    }
  };

  var test_debrief_block = {
    type: "text",
    cont_key: null,
    timeLeft: 1,
    display_element: $('.instructions'),
    text: function() {
      $(".box1").remove();
      $(".box2").remove();
      $(".fixation_gap").remove();
      $(".dot").remove();
      //return "<p>Thank you for completing the task. Please hit the next button.</p>";
      return "";
    }
  };

  /* for future reference, this block may cause problems */
  var test_break_block = {
    type: "textTimed",
    cont_key: null,
    timeLeft: 30,
    timing_post_trial: 500,
    display_element: $('.instructions'),
    on_trial_start: function() { 
      $(".instructions").css('display','block');
      $(".fixation_gap").css('display','none'); 
      $(".box1").css('display','none'); 
      $(".box2").css('display','none');
    },
    on_finish: function() { 
      $(".instructions").css('display','none');
      $(".fixation_gap").css('display','block'); 
      $(".box1").css('display','block'); 
      $(".box2").css('display','block'); 
    },
    text: function() {
        return "<div id='break_block'><div id='time' style='text-align:center; font-size: 150%;'></div><div style='text-align:center;'>Nice job! You've completed the first half of the task!" +
                "<br><p><b>Remember</b>: press the '<b>F</b>' key if the ''&#9679;'' is on the left. Press the '<b>J</b>' key if the ''&#9679;'' is on the right.</p> </div></div><script>display = document.querySelector('#time');startTimer(30, display);</"+"script>"
    }
  };


  /* create practice timeline */
  var practice_timeline = [];
  practice_timeline.push(instructions_block);
  practice_timeline.push(practice_block);
  //practice_timeline.push(practice_debrief_block);

  var practice_node = {
    type: "single-stim",
    timeline: practice_timeline,
    on_finish: function(data){ } 
    /*
    loop_function: function(data){
      if(70 == data[data.length-1].key_pres || 74 == data[data.length-1].key_presss) {
        return true;
      } else {
        return false;
      }
    } */
  };

  var practice_debrief_timeline = [];
  practice_debrief_timeline.push(practice_debrief_block);
  var practice_debrief_node = {
    type: "textTimed",
    cont_key: null,
    timeLeft: 30,
    timeline: practice_debrief_timeline,
    conditional_function: function(){
         var data = jsPsych.data.getData();
         var correct = 0;
         var incorrect = 0;
         var noresponse = 0;
         var arrayLength = data.length;
         for (var i = 0; i < arrayLength; i++) {
            if(data[i]['block'] == 'practice'){
              if(data[i+1]['correct_response']=='correct') {
                correct += 1;
              }
              if(data[i+1]['correct_response']=='incorrect') {
                incorrect += 1;
              }
              if(data[i+1]['correct_response']=='noresponse') {
                noresponse += 1;
              }
            }
         }
         perror_rate = (noresponse+incorrect)/(correct + noresponse+incorrect);

        console.log('debrief');
        console.log(perror_rate);

        if(perror_rate < 0.25){
            console.log('accept');
            return true;
        } else {
            console.log('reject');
            return false;
        }
    }
  }

    var practice_errcheck_timeline = [];
    practice_errcheck_timeline.push(practice_debrief_block_error);
    practice_errcheck_timeline.push(practice2_block);
    //practice_errcheck_timeline.push(practice_debrief_block_end);
    var practice_errcheck_node = {
      type: "textTimed",
      cont_key: null,
      timeLeft: 30,
      timeline: practice_errcheck_timeline,
      conditional_function: function(){
           var data = jsPsych.data.getData();
           var correct = 0;
           var incorrect = 0;
           var noresponse = 0;
           var arrayLength = data.length;
           for (var i = 0; i < arrayLength; i++) {
              if(data[i]['block'] == 'practice'){
                if(data[i+1]['correct_response']=='correct') {
                  correct += 1;
                }
                if(data[i+1]['correct_response']=='incorrect') {
                  incorrect += 1;
                }
                if(data[i+1]['correct_response']=='noresponse') {
                  noresponse += 1;
                }
              }
           }
           perror_rate = (noresponse+incorrect)/(correct+noresponse+incorrect);

          console.log('errcheck');
          console.log(perror_rate);

          if(perror_rate >= 0.25){
              console.log('accept');
              return true;
          } else {
              console.log('reject');
              return false;
          }
      }
    }

  var practice2_timeline = [];
  practice2_timeline.push(practice2_block);
  //practice2_timeline.push(practice_debrief_block_end);
  var practice2_node = {
    type: "textTimed",
    cont_key: null,
    timeLeft: 10,
    timeline: practice2_timeline,
    conditional_function: function(){
         var data = jsPsych.data.getData();
         var correct = 0;
         var incorrect = 0;
         var noresponse = 0;
         var arrayLength = data.length;
         for (var i = 0; i < arrayLength; i++) {
            if(data[i]['block'] == 'practice'){
              if(data[i+1]['correct_response']=='correct') {
                correct += 1;
              }
              if(data[i+1]['correct_response']=='incorrect') {
                incorrect += 1;
              }
              if(data[i+1]['correct_response']=='noresponse') {
                noresponse += 1;
              }
            }
         }
         perror_rate = (noresponse+incorrect)/(correct + noresponse + incorrect);
        console.log('practice2');
        console.log(perror_rate);

        var d = jsPsych.data.getLastTrialData(); //most recent trial is bad keys
        if(d.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1') && perror_rate < 0.75){
            console.log('accept');
            return true;
        } else {
            console.log('reject');
            return false;
        }
    }
  }

  var practice_errcheck2_timeline = [];
    practice_errcheck2_timeline.push(practice_debrief_block_error2);
    var practice_errcheck2_node = {
      type: "textTimed",
      cont_key: null,
      timeLeft: 30,
      timeline: practice_errcheck2_timeline,
      conditional_function: function(){
           var data = jsPsych.data.getData();
           var correct = 0;
           var incorrect = 0;
           var noresponse = 0;
           var arrayLength = data.length;
           for (var i = 0; i < arrayLength; i++) {
              if(data[i]['block'] == 'practice2'){ // practice 2
                if(data[i+1]['correct_response']=='correct') {
                  correct += 1;
                }
                if(data[i+1]['correct_response']=='incorrect') {
                  incorrect += 1;
                }
                if(data[i+1]['correct_response']=='noresponse') {
                  noresponse += 1;
                }
              }
           }
           perror_rate = (noresponse+incorrect)/(correct+noresponse+incorrect);

          console.log('errcheck');
          console.log(perror_rate);

          if(perror_rate >= 0.25){
              console.log('accept');
              return true;
          } else {
              console.log('reject');
              return false;
          }
      }
    }

  var practice_debrief2_timeline = [];
  practice_debrief2_timeline.push(practice_debrief_block_end);
  var practice_debrief2_node = {
    type: "textTimed",
    cont_key: null,
    timeLeft: 30,
    timeline: practice_debrief2_timeline,
    conditional_function: function(){
         var data = jsPsych.data.getData();
         var correct = 0;
         var incorrect = 0;
         var noresponse = 0;
         var arrayLength = data.length;
         for (var i = 0; i < arrayLength; i++) {
            if(data[i]['block'] == 'practice2'){
              if(data[i+1]['correct_response']=='correct') {
                correct += 1;
              }
              if(data[i+1]['correct_response']=='incorrect') {
                incorrect += 1;
              }
              if(data[i+1]['correct_response']=='noresponse') {
                noresponse += 1;
              }
            }
         }
         perror_rate = (noresponse+incorrect)/(correct + noresponse+incorrect);

        console.log('debrief');
        console.log(perror_rate);

        if(perror_rate < 0.25){
            console.log('accept');
            return true;
        } else {
            console.log('reject');
            return false;
        }
    }
  }


  practice_timeline_complete = [practice_node, practice_errcheck_node,practice_debrief_node, practice2_node, practice_errcheck2_node, practice_debrief2_node]

    var practice_timeline_complete_node = {
    type: "textTimed",
    cont_key: null,
    timeLeft: 30,
    timeline: practice_timeline_complete,
    loop_function: function(data){
        var d = jsPsych.data.getLastTrialData();
        if(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1') == d.key_press){
            //practice_timeline_complete_node.timeline[0].timeline = practice_timeline_complete_node.timeline[0].timeline.shift();
            return true;
        } else {
            return false;
        }
    }
  }


/*********************************/

  // Block 1
  for(var i=0; i<4; i++) {
    var suicide_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + suicide_wordlist[i] + "</h3></span>" + "<span><h3>" + suicide_wordlist[i] + "</h3></span></div>",
      data:{word: suicide_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 1,
            word_type:'suicide'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(suicide_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli1.push(stim_test_set);
  }
  for(var i=0; i<4; i++) {
    var neutral_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + neutral_wordlist[i] + "</h3></span>" + "<span><h3>" + neutral_wordlist[i] + "</h3></span></div>",
      data:{word: neutral_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 1,
            word_type:'neutral'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(neutral_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli1.push(stim_test_set);
  }
  for(var i=0; i<4; i++) {
    var positive_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + positive_wordlist[i] + "</h3></span>" + "<span><h3>" + positive_wordlist[i] + "</h3></span></div>",
      data:{word: positive_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 1,
            word_type:'positive'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(positive_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli1.push(stim_test_set);
  }
  for(var i=0; i<4; i++) {
    var negative_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + negative_wordlist[i] + "</h3></span>" + "<span><h3>" + negative_wordlist[i] + "</h3></span></div>",
      data:{word: negative_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 1,
            word_type:'negative'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(negative_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli1.push(stim_test_set);
  }
  // test_stimuli1[][0] fixation block
  // test_stimuli1[][1] stim
  // test_stimuli1[][2] response block
  // test_stimuli1[][3] trial end block

  // suicide
  test_stimuli1[0][1]['display_element'] = $('.box1');
  test_stimuli1[0][1]['data']['word_position'] = 'left';
  test_stimuli1[0][1]['data']['validity'] = 'invalid';
  test_stimuli1[0][2] = responser_block;

  test_stimuli1[1][1]['display_element'] = $('.box2');
  test_stimuli1[1][1]['data']['word_position'] = 'right';
  test_stimuli1[1][2] = responser_block;

  test_stimuli1[2][1]['display_element'] = $('.box2');
  test_stimuli1[2][1]['data']['word_position'] = 'right';
  test_stimuli1[2][2] = responser_block;

  test_stimuli1[3][1]['display_element'] = $('.box1');
  test_stimuli1[3][1]['data']['word_position'] = 'left';
  test_stimuli1[3][2] = responsel_block;

  // neutral
  test_stimuli1[4][1]['display_element'] = $('.box2');
  test_stimuli1[4][1]['data']['word_position'] = 'right';
  test_stimuli1[4][1]['data']['validity'] = 'invalid';
  test_stimuli1[4][2] = responsel_block;

  test_stimuli1[5][1]['display_element'] = $('.box1');
  test_stimuli1[5][1]['data']['word_position'] = 'left';
  test_stimuli1[5][2] = responsel_block;

  test_stimuli1[6][1]['display_element'] = $('.box1');
  test_stimuli1[6][1]['data']['word_position'] = 'left';
  test_stimuli1[6][2] = responsel_block;

  test_stimuli1[7][1]['display_element'] = $('.box2');
  test_stimuli1[7][1]['data']['word_position'] = 'right';
  test_stimuli1[7][2] = responser_block;

  // positive
  test_stimuli1[8][1]['display_element'] = $('.box1');
  test_stimuli1[8][1]['data']['word_position'] = 'left';
  test_stimuli1[8][1]['data']['validity'] = 'invalid';
  test_stimuli1[8][2] = responser_block;

  test_stimuli1[9][1]['display_element'] = $('.box2');
  test_stimuli1[9][1]['data']['word_position'] = 'right';
  test_stimuli1[9][2] = responser_block;

  test_stimuli1[10][1]['display_element'] = $('.box2');
  test_stimuli1[10][1]['data']['word_position'] = 'right';
  test_stimuli1[10][2] = responser_block;

  test_stimuli1[11][1]['display_element'] = $('.box1');
  test_stimuli1[11][1]['data']['word_position'] = 'left';
  test_stimuli1[11][2] = responsel_block;

  // negative
  test_stimuli1[12][1]['display_element'] = $('.box2');
  test_stimuli1[12][1]['data']['word_position'] = 'right';
  test_stimuli1[12][1]['data']['validity'] = 'invalid';
  test_stimuli1[12][2] = responsel_block;

  test_stimuli1[13][1]['display_element'] = $('.box1');
  test_stimuli1[13][1]['data']['word_position'] = 'left';
  test_stimuli1[13][2] = responsel_block;

  test_stimuli1[14][1]['display_element'] = $('.box1');
  test_stimuli1[14][1]['data']['word_position'] = 'left';
  test_stimuli1[14][2] = responsel_block;

  test_stimuli1[15][1]['display_element'] = $('.box2');
  test_stimuli1[15][1]['data']['word_position'] = 'right';
  test_stimuli1[15][2] = responser_block;

  var test_trials1 = jsPsych.randomization.repeat(test_stimuli1, 1);
  test_trials1 = [].concat.apply([], test_trials1); // flatten

  // Block 2
  for(var i=4; i<8; i++) {
    var suicide_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + suicide_wordlist[i] + "</h3></span>" + "<span><h3>" + suicide_wordlist[i] + "</h3></span></div>",
      data:{word: suicide_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 2,
            word_type:'suicide'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(suicide_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli2.push(stim_test_set);
  }
  for(var i=4; i<8; i++) {
    var neutral_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + neutral_wordlist[i] + "</h3></span>" + "<span><h3>" + neutral_wordlist[i] + "</h3></span></div>",
      data:{word: neutral_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 2,
            word_type:'neutral'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(neutral_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli2.push(stim_test_set);
  }
  for(var i=4; i<8; i++) {
    var positive_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + positive_wordlist[i] + "</h3></span>" + "<span><h3>" + positive_wordlist[i] + "</h3></span></div>",
      data:{word: positive_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 2,
            word_type:'positive'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(positive_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli2.push(stim_test_set);
  }
  for(var i=4; i<8; i++) {
    var negative_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + negative_wordlist[i] + "</h3></span>" + "<span><h3>" + negative_wordlist[i] + "</h3></span></div>",
      data:{word: negative_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 2,
            word_type:'negative'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(negative_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli2.push(stim_test_set);
  }
  // test_stimuli1[][0] fixation block
  // test_stimuli1[][1] stim
  // test_stimuli1[][2] response block
  // test_stimuli1[][3] trial end block

  // suicide
  test_stimuli2[0][1]['display_element'] = $('.box2');
  test_stimuli2[0][1]['data']['word_position'] = 'right';
  test_stimuli2[0][1]['data']['validity'] = 'invalid';
  test_stimuli2[0][2] = responsel_block;

  test_stimuli2[1][1]['display_element'] = $('.box1');
  test_stimuli2[1][1]['data']['word_position'] = 'left';
  test_stimuli2[1][2] = responsel_block;

  test_stimuli2[2][1]['display_element'] = $('.box1');
  test_stimuli2[2][1]['data']['word_position'] = 'left';
  test_stimuli2[2][2] = responsel_block;

  test_stimuli2[3][1]['display_element'] = $('.box2');
  test_stimuli2[3][1]['data']['word_position'] = 'right';
  test_stimuli2[3][2] = responser_block;

  // neutral
  test_stimuli2[4][1]['display_element'] = $('.box1');
  test_stimuli2[4][1]['data']['word_position'] = 'left';
  test_stimuli2[4][1]['data']['validity'] = 'invalid';
  test_stimuli2[4][2] = responser_block;

  test_stimuli2[5][1]['display_element'] = $('.box2');
  test_stimuli2[5][1]['data']['word_position'] = 'right';
  test_stimuli2[5][2] = responser_block;

  test_stimuli2[6][1]['display_element'] = $('.box2');
  test_stimuli2[6][1]['data']['word_position'] = 'right';
  test_stimuli2[6][2] = responser_block;

  test_stimuli2[7][1]['display_element'] = $('.box1');
  test_stimuli2[7][1]['data']['word_position'] = 'left';
  test_stimuli2[7][2] = responsel_block;

  // positive
  test_stimuli2[8][1]['display_element'] = $('.box2');
  test_stimuli2[8][1]['data']['word_position'] = 'right';
  test_stimuli2[8][1]['data']['validity'] = 'invalid';
  test_stimuli2[8][2] = responsel_block;

  test_stimuli2[9][1]['display_element'] = $('.box1');
  test_stimuli2[9][1]['data']['word_position'] = 'left';
  test_stimuli2[9][2] = responsel_block;

  test_stimuli2[10][1]['display_element'] = $('.box1');
  test_stimuli2[10][1]['data']['word_position'] = 'left';
  test_stimuli2[10][2] = responsel_block;

  test_stimuli2[11][1]['display_element'] = $('.box2');
  test_stimuli2[11][1]['data']['word_position'] = 'right';
  test_stimuli2[11][2] = responser_block;

  // negative
  test_stimuli2[12][1]['display_element'] = $('.box1');
  test_stimuli2[12][1]['data']['word_position'] = 'left';
  test_stimuli2[12][1]['data']['validity'] = 'invalid';
  test_stimuli2[12][2] = responser_block;

  test_stimuli2[13][1]['display_element'] = $('.box2');
  test_stimuli2[13][1]['data']['word_position'] = 'right';
  test_stimuli2[13][2] = responser_block;

  test_stimuli2[14][1]['display_element'] = $('.box2');
  test_stimuli2[14][1]['data']['word_position'] = 'right';
  test_stimuli2[14][2] = responser_block;

  test_stimuli2[15][1]['display_element'] = $('.box1');
  test_stimuli2[15][1]['data']['word_position'] = 'left';
  test_stimuli2[15][2] = responsel_block;

  var test_trials2 = jsPsych.randomization.repeat(test_stimuli2, 1);
  test_trials2 = [].concat.apply([], test_trials2); // flatten

  // Block 3
  for(var i=8; i<12; i++) {
    var suicide_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + suicide_wordlist[i] + "</h3></span>" + "<span><h3>" + suicide_wordlist[i] + "</h3></span></div>",
      data:{word: suicide_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 3,
            word_type:'suicide'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(suicide_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli3.push(stim_test_set);
  }
  for(var i=8; i<12; i++) {
    var neutral_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + neutral_wordlist[i] + "</h3></span>" + "<span><h3>" + neutral_wordlist[i] + "</h3></span></div>",
      data:{word: neutral_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 3,
            word_type:'neutral'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(neutral_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli3.push(stim_test_set);
  }
  for(var i=8; i<12; i++) {
    var positive_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + positive_wordlist[i] + "</h3></span>" + "<span><h3>" + positive_wordlist[i] + "</h3></span></div>",
      data:{word: positive_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 3,
            word_type:'positive'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(positive_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli3.push(stim_test_set);
  }
  for(var i=8; i<12; i++) {
    var negative_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + negative_wordlist[i] + "</h3></span>" + "<span><h3>" + negative_wordlist[i] + "</h3></span></div>",
      data:{word: negative_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 3,
            word_type: 'negative'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(negative_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli3.push(stim_test_set);
  }
  // test_stimuli1[][0] fixation block
  // test_stimuli1[][1] stim
  // test_stimuli1[][2] response block
  // test_stimuli1[][3] trial end block

  // suicide
  test_stimuli3[0][1]['display_element'] = $('.box1');
  test_stimuli3[0][1]['data']['word_position'] = 'left';
  test_stimuli3[0][1]['data']['validity'] = 'invalid';
  test_stimuli3[0][2] = responser_block;

  test_stimuli3[1][1]['display_element'] = $('.box2');
  test_stimuli3[1][1]['data']['word_position'] = 'right';
  test_stimuli3[1][2] = responser_block;

  test_stimuli3[2][1]['display_element'] = $('.box2');
  test_stimuli3[2][1]['data']['word_position'] = 'right';
  test_stimuli3[2][2] = responser_block;

  test_stimuli3[3][1]['display_element'] = $('.box1');
  test_stimuli3[3][1]['data']['word_position'] = 'left';
  test_stimuli3[3][2] = responsel_block;

  // neutral
  test_stimuli3[4][1]['display_element'] = $('.box2');
  test_stimuli3[4][1]['data']['word_position'] = 'right';
  test_stimuli3[4][1]['data']['validity'] = 'invalid';
  test_stimuli3[4][2] = responsel_block;

  test_stimuli3[5][1]['display_element'] = $('.box1');
  test_stimuli3[5][1]['data']['word_position'] = 'left';
  test_stimuli3[5][2] = responsel_block;

  test_stimuli3[6][1]['display_element'] = $('.box1');
  test_stimuli3[6][1]['data']['word_position'] = 'left';
  test_stimuli3[6][2] = responsel_block;

  test_stimuli3[7][1]['display_element'] = $('.box2');
  test_stimuli3[7][1]['data']['word_position'] = 'right';
  test_stimuli3[7][2] = responser_block;

  // positive
  test_stimuli3[8][1]['display_element'] = $('.box2');
  test_stimuli3[8][1]['data']['word_position'] = 'right';
  test_stimuli3[8][1]['data']['validity'] = 'invalid';
  test_stimuli3[8][2] = responsel_block;

  test_stimuli3[9][1]['display_element'] = $('.box1');
  test_stimuli3[9][1]['data']['word_position'] = 'left';
  test_stimuli3[9][2] = responsel_block;

  test_stimuli3[10][1]['display_element'] = $('.box1');
  test_stimuli3[10][1]['data']['word_position'] = 'left';
  test_stimuli3[10][2] = responsel_block;

  test_stimuli3[11][1]['display_element'] = $('.box2');
  test_stimuli3[11][1]['data']['word_position'] = 'right';
  test_stimuli3[11][2] = responser_block;

  // negative
  test_stimuli3[12][1]['display_element'] = $('.box1');
  test_stimuli3[12][1]['data']['word_position'] = 'left';
  test_stimuli3[12][1]['data']['validity'] = 'invalid';
  test_stimuli3[12][2] = responser_block;

  test_stimuli3[13][1]['display_element'] = $('.box2');
  test_stimuli3[13][1]['data']['word_position'] = 'right';
  test_stimuli3[13][2] = responser_block;

  test_stimuli3[14][1]['display_element'] = $('.box2');
  test_stimuli3[14][1]['data']['word_position'] = 'right';
  test_stimuli3[14][2] = responser_block;

  test_stimuli3[15][1]['display_element'] = $('.box1');
  test_stimuli3[15][1]['data']['word_position'] = 'left';
  test_stimuli3[15][2] = responsel_block;

  var test_trials3 = jsPsych.randomization.repeat(test_stimuli3, 1);
  test_trials3 = [].concat.apply([], test_trials3); // flatten

  // Block 4
  for(var i=12; i<16; i++) {
    var suicide_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + suicide_wordlist[i] + "</h3></span>" + "<span><h3>" + suicide_wordlist[i] + "</h3></span></div>",
      data:{word: suicide_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 4,
            word_type:'suicide'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(suicide_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli4.push(stim_test_set);
  }
  for(var i=12; i<16; i++) {
    var neutral_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + neutral_wordlist[i] + "</h3></span>" + "<span><h3>" + neutral_wordlist[i] + "</h3></span></div>",
      data:{word: neutral_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 4,
            word_type:'neutral'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(neutral_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli4.push(stim_test_set);
  }
  for(var i=12; i<16; i++) {
    var positive_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + positive_wordlist[i] + "</h3></span>" + "<span><h3>" + positive_wordlist[i] + "</h3></span></div>",
      data:{word: positive_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 4,
            word_type:'positive'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(positive_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli4.push(stim_test_set);
  }
  for(var i=12; i<16; i++) {
    var negative_stim = {
      is_html: true,
      timing_response: 1000,
      timing_post_trial: 50,
      response_ends_trial: false,
      display_element: $('.box1'),
      stimulus: "<div class='text'><span><h3>" + negative_wordlist[i] + "</h3></span>" + "<span><h3>" + negative_wordlist[i] + "</h3></span></div>",
      data:{word: negative_wordlist[i],
            word_position: 'left',
            validity: 'valid',
            block: 'test',
            block_num: 4,
            word_type:'negative'
      }
    }
    stim_test_set = [];
    stim_test_set.push(fixation_block);
    stim_test_set.push(negative_stim);
    stim_test_set.push(responser_block);
    stim_test_set.push(trial_end_block);
    test_stimuli4.push(stim_test_set);
  }
  // test_stimuli1[][0] fixation block
  // test_stimuli1[][1] stim
  // test_stimuli1[][2] response block
  // test_stimuli1[][3] trial end block

  // suicide
  test_stimuli4[0][1]['display_element'] = $('.box2');
  test_stimuli4[0][1]['data']['word_position'] = 'right';
  test_stimuli4[0][1]['data']['validity'] = 'invalid';
  test_stimuli4[0][2] = responsel_block;

  test_stimuli4[1][1]['display_element'] = $('.box1');
  test_stimuli4[1][1]['data']['word_position'] = 'left';
  test_stimuli4[1][2] = responsel_block;

  test_stimuli4[2][1]['display_element'] = $('.box1');
  test_stimuli4[2][1]['data']['word_position'] = 'left';
  test_stimuli4[2][2] = responsel_block;

  test_stimuli4[3][1]['display_element'] = $('.box2');
  test_stimuli4[3][1]['data']['word_position'] = 'right';
  test_stimuli4[3][2] = responser_block;

  // neutral
  test_stimuli4[4][1]['display_element'] = $('.box1');
  test_stimuli4[4][1]['data']['word_position'] = 'left';
  test_stimuli4[4][1]['data']['validity'] = 'invalid';
  test_stimuli4[4][2] = responser_block;

  test_stimuli4[5][1]['display_element'] = $('.box2');
  test_stimuli4[5][1]['data']['word_position'] = 'right';
  test_stimuli4[5][2] = responser_block;

  test_stimuli4[6][1]['display_element'] = $('.box2');
  test_stimuli4[6][1]['data']['word_position'] = 'right';
  test_stimuli4[6][2] = responser_block;

  test_stimuli4[7][1]['display_element'] = $('.box1');
  test_stimuli4[7][1]['data']['word_position'] = 'left';
  test_stimuli4[7][2] = responsel_block;

  // positive
  test_stimuli4[8][1]['display_element'] = $('.box1');
  test_stimuli4[8][1]['data']['word_position'] = 'left';
  test_stimuli4[8][1]['data']['validity'] = 'invalid';
  test_stimuli4[8][2] = responser_block;

  test_stimuli4[9][1]['display_element'] = $('.box2');
  test_stimuli4[9][1]['data']['word_position'] = 'right';
  test_stimuli4[9][2] = responser_block;

  test_stimuli4[10][1]['display_element'] = $('.box2');
  test_stimuli4[10][1]['data']['word_position'] = 'right';
  test_stimuli4[10][2] = responser_block;

  test_stimuli4[11][1]['display_element'] = $('.box1');
  test_stimuli4[11][1]['data']['word_position'] = 'left';
  test_stimuli4[11][2] = responsel_block;

  // negative
  test_stimuli4[12][1]['display_element'] = $('.box2');
  test_stimuli4[12][1]['data']['word_position'] = 'right';
  test_stimuli4[12][1]['data']['validity'] = 'invalid';
  test_stimuli4[12][2] = responsel_block;

  test_stimuli4[13][1]['display_element'] = $('.box1');
  test_stimuli4[13][1]['data']['word_position'] = 'left';
  test_stimuli4[13][2] = responsel_block;

  test_stimuli4[14][1]['display_element'] = $('.box1');
  test_stimuli4[14][1]['data']['word_position'] = 'left';
  test_stimuli4[14][2] = responsel_block;

  test_stimuli4[15][1]['display_element'] = $('.box2');
  test_stimuli4[15][1]['data']['word_position'] = 'right';
  test_stimuli4[15][2] = responser_block;

  var test_trials4 = jsPsych.randomization.repeat(test_stimuli4, 1);
  test_trials4 = [].concat.apply([], test_trials4); // flatten

  var test_block1 = {
    type: "single-stim",
    timeline: test_trials1
  };
  var test_block2 = {
    type: "single-stim",
    timeline: test_trials2
  };
  var test_block3 = {
    type: "single-stim",
    timeline: test_trials3
  };
  var test_block4 = {
    type: "single-stim",
    timeline: test_trials4
  };

  var test_timeline = [];
  test_timeline.push(test_block1);
  test_timeline.push(test_block2);
  test_timeline.push(test_block3);
  test_timeline.push(test_block4);
  test_timeline_rand = jsPsych.randomization.repeat(test_timeline, 1);
  //test_timeline_rand.push(test_break_block);
  //test_timeline_rand.push(test_debrief_block);

  var test_node1 = {
    type: "single-stim",
    timeline: test_timeline_rand
  }

  var test_timeline2 = [];
  test_timeline2.push(test_block1);
  test_timeline2.push(test_block2);
  test_timeline2.push(test_block3);
  test_timeline2.push(test_block4);
  test_timeline_rand2 = jsPsych.randomization.repeat(test_timeline2, 1);
  
  test_timeline_rand2.push(test_debrief_block);

  var test_node2 = {
    type: "single-stim",
    timeline: test_timeline_rand2
  }

  //var rid = getParameterByName('rid');
  //console.log(rid);

  /* start the experiment */
  // Surveygizmo data ids
  //ids = [13414,13415,13416,13417,13418]
  idds = [1542, 1718, 1719, 1720, 1721,1807,1808,1809,1811,1812,1813,1814,1815,1816,1817]
  numpartitions = 15

  jsPsych.init({
    timeline: [practice_timeline_complete_node, test_node1, test_node2],
    
    on_finish: function() {
     //jsPsych.data.localSave('data.csv', 'csv');
     $('.jspsych_target').text("Thank you for completing the task. Please hit the next button.");
     window.parent.postMessage(jsPsych.data.dataAsJSON(), "*");
     /*
      console.log('done');
      var json_data = JSON.parse(jsPsych.data.dataAsJSON());
      
      var chunksize = Math.ceil(json_data.length/numpartitions);
      var json_datas = [];
      while (json_data.length > 0){
        json_datas.push(json_data.splice(0, chunksize));
      }
      
      json_data_strs = []
      for(var i = 0; i < json_datas.length; i++) {
        findAndRemove(json_datas[i],'block','fixation');
        json_data_strs.push(JSON.stringify(json_datas[i]))
      }
      
      var responseid = -1
      var ridqid = 1913
      var url = `${base_url}3808247/surveyresponse.jsonp?_method=PUT&api_token=${api_key}&api_token_secret=${api_secret}&data[${ridqid}][value]=${rid}`;

      $.ajax({
          url: url,
          type: 'PUT',
          jsonp: "callback",
          dataType: "jsonp",
          success: function( response ) {
            console.log(response);
            responseid = response['data']['id']; // server response
            console.log(responseid)
            
              //for(var i = 0; i<numpartitions; i++){
              var i = 0;
              (testt = function() {
                  d = encodeURIComponent(json_data_strs[i]);
                  //var url = `${base_url}3808247/surveypage/1/surveyquestion/${idds[i]}.jsonp?_method=POST&api_token=${api_key}&api_token_secret=${api_secret}&properties[defaulttext]=${d}`;
                  var url = `${base_url}3808247/surveyresponse/${responseid}.jsonp?_method=POST&api_token=${api_key}&api_token_secret=${api_secret}&data[${idds[i]}][value]=${d}`;
      
                  $.ajax({
                      async: true,
                      url: url,
                      type: 'POST',
                      jsonp: "callback",
                      dataType: "jsonp",
                      //data: {value: encodeURIComponent(json_data_strs[i])},
                      success: function( response ) {
                        console.log(response);
                        i++;
                        if(i < numpartitions) { setTimeout(testt(),1200);}
                        else { $("#go").css("background", "green"); }
                          //rid = response['data']['id']; // server response
                      }
                  });
                })();
            //}
          }
      }); */
    }
  });
      //the event occurred
})