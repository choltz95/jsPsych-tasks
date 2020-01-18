document.addEventListener('DOMContentLoaded', (event) => {

  var colors = ["blue", "red"];
  var practice_wordlist = ["ZZZZZ","BBBBB","VVVVV","WWWWW","SSSSS","NNNNN","QQQQQ","UUUUU","HHHHH","IIIII","DDDDD","PPPPP"];
  var practice2_wordlist = ["CCCCC","EEEEE","XXXXX","MMMMM","AAAAA","LLLLL","RRRRR","TTTTT","KKKKK","GGGGG","OOOOO","YYYYY"];
  var suicide_wordlist = ["suicide","die","funeral","overdose","drowning","poisoning","dead","lifeless","disappear","jumping","fatal","hanging","cutting","escape","deadly","dying","crisis","lethal","death","suicidal"];
  var negative_wordlist = ["alone","rejected","pathetic","worthless","lonely","worried","numb","gloomy","frightened","miserable","crying","failure","hurting","disappointing","pain","stupid","ugly","fear","disgust","anger"];
  var neutral_wordlist = ["dresser","shelf","cupboard","closet","laundry","drawer","oven","stool","sofa","couch","cabinet","dishwasher","chair","bench","bed","towel","shower","window","carpet","curtains"];

  var test_wordlist = {'suicide':suicide_wordlist, 'negative':negative_wordlist,'neutral':neutral_wordlist};
  var practice_stimuli = [];
  var practice2_stimuli = [];
  var test_stimuli = []; // blocks
  var trial_index = 0;
  var test_trial_index = 0;
  var tti = 0;
  var test_flag = true;

  /* define instructions block */
  var instructions_block = {
    type: "text",
    cont_key: [70,74],
    display_element: $('.instructions'),
    text: "<p>In this task, you will see a series of words appear on the screen. During each trial, a word will appear in either <font color='red'>red</font> or <font color='blue'>blue</font>. If the word is in <font color='blue'>blue</font>, press the '<font color='blue'>J</font>' key on the keyboard. If the word is in <font color='red'>red</font>, press the '<font color='red'>F</font>' key on the keyboard. A '+' will appear on the screen before each word to show you where to look.</p>" +
           "<p>Your task is to indicate the color of each word (by pressing the '<font color='red'>F</font>' or '<font color='blue'>J</font>' keys on the keyboard) as quickly and as accurately as you can. Try to not make mistakes, but try to be fast. Your responses will be timed.</p>" +
           "<p>First, you will be presented with a set of practice trials that can be repeated, if needed. Next, you will be presented with the test trials that cannot be repeated. The task will take less than 10 minutes to complete.</p>" +
           "<p>Press the '<font color='red'>F</font>' or '<font color='blue'>J</font>' key to start...</p>",

    on_load: function() {
      resizeDisplay();
    },
    timing_post_trial: 4000
  };

  var fixation_block = {
    type: "single-stim",
    stimulus:"<h1>&#10010;<h1>",
    is_html: true,
    timing_response: 500,
    timing_post_trial: 0,
    response_ends_trial: false,
    data:{
      block: 'fixation',
      correct_response: ''
    }
  };

  var practice_colors = jsPsych.randomization.repeat(colors, 6);
  for(var i=0;i<practice_wordlist.length;i++) {
    var color = practice_colors[i];
    var stim = {
      is_html: true,
      stimulus: "<h1 style='color:" + color + "; text-align:center;'>" + practice_wordlist[i] + "</h1>",
      data:{word: practice_wordlist[i],
            color: color,
            block: 'practice',
            block_num: 0,
            word_type: 'practice'
          }
    }
    practice_stimuli.push(stim);
  }

  var practice_trials = jsPsych.randomization.repeat(practice_stimuli, 1);
  for(var i=0;i<practice_trials.length; i+=2) {
    practice_trials.splice(i,0,fixation_block); // insert fixation block between each trial
  }

  var practice2_colors = jsPsych.randomization.repeat(colors, 6);
  for(var i=0;i<practice2_wordlist.length;i++) {
    var color = practice2_colors[i];
    var stim2 = {
      is_html: true,
      stimulus: "<h1 style='color:" + color + "; text-align:center;'>" + practice2_wordlist[i] + "</h1>",
      data:{word: practice2_wordlist[i],
            color: color,
            block: 'practice2',
            block_num: 0,
            word_type: 'practice'
          }
    }
    practice2_stimuli.push(stim2);
  }

  var practice2_trials = jsPsych.randomization.repeat(practice2_stimuli, 1);
  for(var i=0;i<practice2_trials.length; i+=2) {
    practice2_trials.splice(i,0,fixation_block); // insert fixation block between each trial
  }

  var k = 0;
  for (var w_type in test_wordlist) {
    var wordlist = test_wordlist[w_type];
    var shuffled_wordlist = jsPsych.randomization.repeat(wordlist, 1);
    test_stimuli[k] = [];
    for(var i=0;i<wordlist.length;i++) {
      var stimb = {
        is_html: true,
        stimulus: "<h1 style='color:blue; text-align:center;'>" + shuffled_wordlist[i] + "</h1>",
        data:{word: shuffled_wordlist[i],
              color: 'blue',
              block: 'test',
              block_num: 0,
              word_type: w_type
            }
      }
      var stimr = {
        is_html: true,
        stimulus: "<h1 style='color:red; text-align:center;'>" + shuffled_wordlist[i] + "</h1>",
        data:{word: shuffled_wordlist[i],
              color: 'red',
              block: 'test',
              block_num: 0,
              word_type: w_type
            }
      }
      test_stimuli[k].push(jQuery.extend(true, {}, stimb));
      test_stimuli[k].push(jQuery.extend(true, {}, stimr));
    }
    k+=1;
  }
  var test_trials1 = jsPsych.randomization.repeat(test_stimuli[0], 1);
  var test_trials2 = jsPsych.randomization.repeat(test_stimuli[1], 1);
  var test_trials3 = jsPsych.randomization.repeat(test_stimuli[2], 1);
  for (var i = 0; i < test_trials1.length; i++) {
    test_trials1[i]['data']['block_num'] = 1;
    test_trials2[i]['data']['block_num'] = 2;
    test_trials3[i]['data']['block_num'] = 3;
  }

  for(var i=0;i<test_trials1.length; i+=2) {
    test_trials1.splice(i,0,fixation_block); // insert fixation block between each trial
    test_trials2.splice(i,0,fixation_block);
    test_trials3.splice(i,0,fixation_block);
  }

  var practice_block = {
    type: "single-stim",
    choices: ['f','j'],
    timing_response: -1,
    timing_post_trial: 1000,
    on_finish: function(data){
      trial_index++;
      d = jsPsych.data.getLastTrialData();
      if(data.key_press != -1) {
        jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase()});
      }
      if(data.block == "practice" || data.block == "test") {
        if(data.key_press == 70) {
          jsPsych.data.addDataToLastTrial({key_pressed: 'f', participant_response:'red'});
          if(d['color'] == 'blue') {
            jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
          } else {
            jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
          }
        } else if (data.key_press == 74) {
          jsPsych.data.addDataToLastTrial({key_pressed: 'j', participant_response:'blue'});
          if(d['color'] == 'red') {
            jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
          } else {
            jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
          }
        } else if(data.key_press == -1) {
          jsPsych.data.addDataToLastTrial({correct_response: 'noresponse'});
        } else { jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase(), correct_response: 'incorrect'}); }
      }
    },
    timeline: practice_trials
  };

  var practice2_block = {
    type: "single-stim",
    choices: ['f','j'],
    timing_response: -1,
    timing_post_trial: 1000,
    on_finish: function(data){
      trial_index++;
      d = jsPsych.data.getLastTrialData();
      if(data.key_press != -1) {
        jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase()});
      }
      if(data.block == "practice2" || data.block == "test") {
        if(data.key_press == 70) {
          jsPsych.data.addDataToLastTrial({key_pressed: 'f', participant_response:'red'});
          if(d['color'] == 'blue') {
            jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
          } else {
            jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
          }
        } else if (data.key_press == 74) {
          jsPsych.data.addDataToLastTrial({key_pressed: 'j', participant_response:'blue'});
          if(d['color'] == 'red') {
            jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
          } else {
            jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
          }
        } else if(data.key_press == -1) {
          jsPsych.data.addDataToLastTrial({correct_response: 'noresponse'});
        } else { jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase(), correct_response: 'incorrect'}); }
      }
    },
    timeline: practice2_trials
  };

  /*var practice_debrief_block = {
    type: "text",
    cont_key: [49,70,74],
    text: function() {
      return "<p>Great job, you've just completed the practice trials! If you would like to repeat the practice trials, please press <b>1</b>. If you would like to continue on to the task, please press the '<font color='red'>F</font>' or '<font color='blue'>J</font>' keys to start.</p>" +
             "<br><p><b>Remember</b>: make sure your fingers are on the '<font color='red'>F</font>' and '<font color='blue'>J</font>' keys on the keyboard.</p>";
    }
  };*/
    var practice_debrief_block = {
    type: "text",
    cont_key: [49,70,74],
    text: function() {
      return "<p>You have completed the PRACTICE phase. If you would like to repeat the practice trials, please press <b>1</b>. If you would like to continue onto the TEST phase, press the '<font color='red'>F</font>' or '<font color='blue'>J</font>' key on the keyboard.</p>" + 
        "<br><p><b>Remember</b>: make sure your fingers are on the '<font color='red'>F</font>' and '<font color='blue'>J</font>' keys on the keyboard.</p>";
      }
  };

  var practice_debrief_block_error = {
    type: "text",
    cont_key: [70,74],
    text: function() {
      return "<p>It looks like you're having trouble with the task. Remember, if the word is in <font color='red'>red</font>, press the '<font color='red'>F</font>' key on the keyboard.  If the word is in <font color='blue'>blue</font>, press the '<font color='blue'>J</font>' key on the keyboard.</p>" +
              "<br><p>Please press the '<font color='red'>F</font>' or '<font color='blue'>J</font>' key to try the practice again.</p>" +
              "<br><p><b>Remember</b>: make sure your fingers are on the '<font color='red'>F</font>' and '<font color='blue'>J</font>' keys on the keyboard.</p>";
    }
  };

  var practice_debrief_block_error2 = {
    type: "text",
    cont_key: [70,74],
    text: function() {
      return "<p>It looks like you might be having trouble with the task and it may be helpful to check what keys you're pressing. Remember, if the word is in <font color='red'>red</font>, press the '<font color='red'>F</font>' key on the keyboard.  If the word is in <font color='blue'>blue</font>, press the '<font color='blue'>J</font>' key on the keyboard.</p>" +
        "<br><p>Please press the '<font color='red'>F</font>' or '<font color='blue'>J</font>' key to move onto the TEST phase.</p>" +
        "<br><p><b>Remember</b>: make sure your fingers are on the '<font color='red'>F</font>' and '<font color='blue'>J</font>' keys on the keyboard.</p>";
    }
  };

  var practice_debrief_block_end = {
    type: "text",
    cont_key: [70,74],
    text: function() {
      return "<p>You have completed the PRACTICE phase. If you would like to continue onto the TEST phase, press the '<font color='red'>F</font>' or '<font color='blue'>J</font>' key on the keyboard.</p>" + 
        "<br><p><b>Remember</b>: make sure your fingers are on the '<font color='red'>F</font>' and '<font color='blue'>J</font>' keys on the keyboard.</p>";
    }
  };

  var practice_break_block = {
    type: "textTimed",
    cont_key: null,
    timeLeft: 30,

    text: function() {
      return "<div id='break_block'><div id='time' style='text-align:center; font-size: 150%;'></div><div style='text-align:center;'>Take a brief 30 second break. Get ready to start again when the countdown reaches zero.</div></div><script>display = document.querySelector('#time');startTimer(30, display);</"+"script>"
    }
  };

  var practice_timeline = [];
  practice_timeline.push(instructions_block);
  practice_timeline.push(practice_block);
  //practice_timeline.push(practice_debrief_node);
  //practice_timeline.push(practice_break_block);

  var practice_node = {
    type: "single-stim",
    timeline: practice_timeline,
    on_finish: function(data){
      /*
      if(49 == data[data.length-2].key_press) {
        return true;
      } else {
        return false;
      }*/
    }
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
              if(data[i]['correct_response']=='correct') {
                correct += 1;
              }
              if(data[i]['correct_response']=='incorrect') {
                incorrect += 1;
              }
              if(data[i]['correct_response']=='noresponse') {
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
              if(data[i]['correct_response']=='correct') {
                correct += 1;
              }
              if(data[i]['correct_response']=='incorrect') {
                incorrect += 1;
              }
              if(data[i]['correct_response']=='noresponse') {
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
              if(data[i]['correct_response']=='correct') {
                correct += 1;
              }
              if(data[i]['correct_response']=='incorrect') {
                incorrect += 1;
              }
              if(data[i]['correct_response']=='noresponse') {
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
              if(data[i]['correct_response']=='correct') {
                correct += 1;
              }
              if(data[i]['correct_response']=='incorrect') {
                incorrect += 1;
              }
              if(data[i]['correct_response']=='noresponse') {
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
              if(data[i]['correct_response']=='correct') {
                correct += 1;
              }
              if(data[i]['correct_response']=='incorrect') {
                incorrect += 1;
              }
              if(data[i]['correct_response']=='noresponse') {
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

  var test_block1 = {
    type: "single-stim",
    choices: ['f','j'],
    timing_response: -1,
    timing_post_trial: 1000,
    on_finish: function(data){
      trial_index++;
      test_trial_index++;
      d = jsPsych.data.getLastTrialData();
      if(data.key_press != -1) {
        jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase()});
      }
      if(data.block == "practice" || data.block == "test") {
        if(data.key_press == 70) {
          jsPsych.data.addDataToLastTrial({key_pressed: 'f', participant_response:'red'});
          if(d['color'] == 'blue') {
            jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
          } else {
            jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
          }
        } else if (data.key_press == 74) {
          jsPsych.data.addDataToLastTrial({key_pressed: 'j', participant_response:'blue'});
          if(d['color'] == 'red') {
            jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
          } else {
            jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
          }
        } else if(data.key_press == -1) {
          jsPsych.data.addDataToLastTrial({correct_response: 'noresponse'});
        } else { jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase(), correct_response: 'incorrect'}); }
      }
    },
    timeline: test_trials1
  };

  var test_block2 = {
    type: "single-stim",
    choices: ['f','j'],
    timing_response: -1,
    timing_post_trial: 1000,
    on_finish: function(data){
      trial_index++;
      test_trial_index++;
      d = jsPsych.data.getLastTrialData();
      if(data.key_press != -1) {
        jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase()});
      }
      if(data.block == "practice" || data.block == "test") {
        if(data.key_press == 70) {
          jsPsych.data.addDataToLastTrial({key_pressed: 'f', participant_response:'red'});
          if(d['color'] == 'blue') {
            jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
          } else {
            jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
          }
        } else if (data.key_press == 74) {
          jsPsych.data.addDataToLastTrial({key_pressed: 'j', participant_response:'blue'});
          if(d['color'] == 'red') {
            jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
          } else {
            jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
          }
        } else if(data.key_press == -1) {
          jsPsych.data.addDataToLastTrial({correct_response: 'noresponse'});
        } else { jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase(), correct_response: 'incorrect'}); }
      }
    },
    timeline: test_trials2
  };

  var test_block3 = {
    type: "single-stim",
    choices: ['f','j'],
    timing_response: -1,
    timing_post_trial: 1000,
    on_finish: function(data){
      trial_index++;
      test_trial_index++;
      d = jsPsych.data.getLastTrialData();
      if(data.key_press != -1) {
        jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase()});
      }
      if(data.block == "practice" || data.block == "test") {
        if(data.key_press == 70) {
          jsPsych.data.addDataToLastTrial({key_pressed: 'f', participant_response:'red'});
          if(d['color'] == 'blue') {
            jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
          } else {
            jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
          }
        } else if (data.key_press == 74) {
          jsPsych.data.addDataToLastTrial({key_pressed: 'j', participant_response:'blue'});
          if(d['color'] == 'red') {
            jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
          } else {
            jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
          }
        } else if(data.key_press == -1) {
          jsPsych.data.addDataToLastTrial({correct_response: 'noresponse'});
        } else { jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase(), correct_response: 'incorrect'}); }
      }
    },
    timeline: test_trials3
  };

  var test_break_block = {
    type: "textTimed",
    cont_key: null,
    timeLeft: 30,
    text: function() {
      tti++;
      //return "<div id='break_block'><div id='time' style='text-align:center; font-size: 150%;'></div><div style='text-align:center;'>Nice job! You've completed " + (Math.round(test_trial_index/60)).toString() + " sets of trials. You have " + (3 - Math.round(test_trial_index/60)).toString() + " sets of trials to go.</div></div><script>display = document.querySelector('#time');startTimer(30, display);</"+"script>"
      if (tti == 1) {
        return "<div id='break_block'><div id='time' style='text-align:center; font-size: 150%;'></div><div style='text-align:center;'>Nice job! You've completed " + (tti).toString() + " set of trials. You have " + (3 - tti).toString() + " sets of trials to go. <br> <br> <b>Remember</b>: make sure your fingers are on the '<font color='red'>F</font>' and '<font color='blue'>J</font>' keys on the keyboard. </div></div><script>display = document.querySelector('#time');startTimer(30, display);</"+"script>"
      } else if (tti == 2) {
        return "<div id='break_block'><div id='time' style='text-align:center; font-size: 150%;'></div><div style='text-align:center;'>Nice job! You have " + (3 - tti).toString() + " more set of trials to go. <br> <br> <b>Remember</b>: make sure your fingers are on the '<font color='red'>F</font>' and '<font color='blue'>J</font>' keys on the keyboard.</div></div><script>display = document.querySelector('#time');startTimer(30, display);</"+"script>"
      } else {
          return "<div id='break_block'><div id='time' style='text-align:center; font-size: 150%;'></div><div style='text-align:center;'>Nice job! You've completed " + (tti).toString() + " sets of trials. You have " + (3 - tti).toString() + " sets of trials to go. <br> <br> <b>Remember</b>: make sure your fingers are on the '<font color='red'>F</font>' and '<font color='blue'>J</font>' keys on the keyboard. </div></div><script>display = document.querySelector('#time');startTimer(30, display);</"+"script>"
      }
    }
  };

  var test_debrief_block = {
    type: "textTimed",
    cont_key: null,
    timeLeft: 1,

    text: function() {
      //return "<div style='text-align:center;'><p>Thank you for completing the task. Please hit the next button.</p></div>"
      return "";
    }
  };

  var test_timeline = [];
  test_timeline.push(test_block1);
  test_timeline.push(test_block2);
  test_timeline.push(test_block3);
  test_timeline_rand = jsPsych.randomization.repeat(test_timeline, 1);
  test_timeline_rand.splice(1,0,test_break_block);
  test_timeline_rand.splice(3,0,test_break_block);
  test_timeline_rand.push(test_debrief_block);

  var test_node = {
    type: "single-stim",
    timeline: test_timeline_rand
  }

  /* start the experiment */
  jsPsych.init({
    timeline: [practice_node,practice_errcheck_node,practice_debrief_node,practice2_node, practice_errcheck2_node, practice_debrief2_node, test_node],
    on_finish: function() {
      //jsPsych.data.localSave('data.csv', 'csv');
      console.log('done');
      $('.jspsych-display-element').append("<div style='text-align:center;'><p>Thank you for completing the task. Please hit the next button.</p></div>");
      window.parent.postMessage(jsPsych.data.dataAsCSV(), "*");
    }
  });

});