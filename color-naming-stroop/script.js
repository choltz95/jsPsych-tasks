document.addEventListener('DOMContentLoaded', (event) => {
  var colors = ["blue", "red"];
  var practice_wordlist = ["ZZZZZ","BBBBB","VVVVV","WWWWW","SSSSS","NNNNN","QQQQQ","UUUUU","HHHHH","IIIII","DDDDD","PPPPP"];
  var practice_colors = jsPsych.randomization.repeat(colors, 6);
  var suicide_wordlist = ["suicide","dead","funeral"];
  var negative_wordlist = ["alone","rejected","stupid"];
  var positive_wordlist = ["happy","success","pleasure"];
  var neutral_wordlist = ["museum","paper","engine"];

  var test_wordlist =  suicide_wordlist.concat(negative_wordlist, positive_wordlist, neutral_wordlist)
  var practice_stimuli = [];
  var practice_stimuli2 = [];
  var test_stimuli1 = []; // block 1
  var test_stimuli2 = []; // block 2
  var trial_index = 0;

  var post_trial_gap_time = 4000;
  var fixation_display_time = 1000;
  var post_cross_gap_time = 1000;

  /* define instructions block */
  var instructions_block = {
    type: "text",
    cont_key: ['f','j'],
    display_element: $('.instructions'),
    text: "<p>You will shortly see a series of words on the screen. During each experimental trial, a word will appear printed in either red or blue. If the word is in <font color='red'>red</font>, press the '<font color='red'>F</font>' on the keyboard. If the word is in <font color='blue'>blue</font>, press the '<font color='blue'>J</font>' key.</p>" +

      "<p>A &quot;+&quot; will appear on the screen before each word appears to show you where to look.</p>" +

      "<p>Your task is to indicate the color of each word as quickly and as accurately as you can. Try not to make mistakes, but try to be fast. Your reactions will be timed.</p>" +
    
      "<p>Press the '<font color='red'>F</font>' or '<font color='blue'>J</font>' key to start...</p>",
    timing_post_trial: post_trial_gap_time
  };


 var practice_debrief_block = {
    type: "text",
    cont_key: [49,70,74],
    text: function() {
      return "<p>You have completed the PRACTICE phase. If you would like to repeat the practice trials, please press <b>1</b>. To continue onto the TEST phase, press the '<font color='red'>F</font>' or '<font color='blue'>J</font>' key on the keyboard.</p>" + 
        "<br><p><b>Remember</b>: make sure your fingers are on the '<font color='red'>F</font>' and '<font color='blue'>J</font>' keys on the keyboard.</p>";
    }
  };

  var practice_debrief_block_error = {
    type: "text",
    cont_key: [70,74],
    text: function() {
      return "<p>It looks like you're having trouble with the task. Remember, if the word is in <font color='red'>red</font>, press the '<font color='red'>F</font>' key on the keyboard. If the word is in <font color='blue'>blue</font>, press the '<font color='blue'>J</font>' key on the keyboard.</p>" +
              "<br><p>Please press the '<font color='red'>F</font>' or '<font color='blue'>J</font>' key to try the practice again.</p>" +
              "<br><p><b>Remember</b>: make sure your fingers are on the '<font color='red'>F</font>' and '<font color='blue'>J</font>' keys on the keyboard.</p>";
    }
  };

  var practice_debrief_block_error2 = {
    type: "text",
    cont_key: [70,74],
    text: function() {
      return "<p>It looks like you're having trouble with the task and it may be helpful to check what keys you're pressing. Remember, if the word is in <font color='red'>red</font>, press the '<font color='red'>F</font>' key on the keyboard. If the word is in <font color='blue'>blue</font>, press the '<font color='blue'>J</font>' key on the keyboard.</p>" +
        "<br><p>Please press the '<font color='red'>F</font>' or '<font color='blue'>J</font>' key to move onto the TEST phase.</p>" +
        "<br><p><b>Remember</b>: make sure your fingers are on the '<font color='red'>F</font>' and '<font color='blue'>J</font>' keys on the keyboard.</p>";
    }
  };

  var practice_debrief_block_end = {
    type: "text",
    cont_key: [49,70,74],
    text: function() {
      return "<p>You have completed the PRACTICE phase.  If you would like to repeat the PRACTICE phase, press 1. To continue onto the TEST phase, press the '<font color='red'>F</font>' or '<font color='blue'>J</font>' keys on the keyboard.</p>" + 
        "<br><p><b>Remember</b>: make sure your fingers are on the '<font color='red'>F</font>' and '<font color='blue'>J</font>' keys on the keyboard.</p>";
    }
  };
  
  var fixation_block = {
    type: "single-stim",
    stimulus:"<h1>&#10010;<h1>",
    is_html: true,
    timing_response: fixation_display_time,
    timing_post_trial: post_cross_gap_time,
    response_ends_trial: false,
    data:{
      block: 'fixation'
    }
  };
  
  for(var i=0;i<practice_wordlist.length;i++) {
    var color = practice_colors[i];
    var stim = {
      is_html: true,
      stimulus: "<h1 style='color:" + color + ";'>" + practice_wordlist[i] + "</h1>",
      data:{word: practice_wordlist[i],
            color: color,
            block: 'practice',
            block_num: 0,
            word_type: 'practice'
          }
    }
    practice_stimuli.push(stim);
  }

  for(var i=0;i<practice_wordlist.length;i++) {
    var color = practice_colors[i];
    var stim = {
      is_html: true,
      stimulus: "<h1 style='color:" + color + ";'>" + practice_wordlist[i] + "</h1>",
      data:{word: practice_wordlist[i],
            color: color,
            block: 'practice2',
            block_num: 0,
            word_type: 'practice'
          }
    }
    practice_stimuli2.push(stim);
  }
  
  var practice_trials = jsPsych.randomization.repeat(practice_stimuli, 1);
  for(var i=0;i<practice_trials.length; i+=2) {
    practice_trials.splice(i,0,fixation_block); // insert fixation block between each trial
  }

  var practice_trials2 = jsPsych.randomization.repeat(practice_stimuli2, 1);
  for(var i=0;i<practice_trials2.length; i+=2) {
    practice_trials2.splice(i,0,fixation_block); // insert fixation block between each trial
  }
  
  for(var i=0;i<test_wordlist.length;i++) {
    w_type = ''
    if(suicide_wordlist.includes(test_wordlist[i])){
      w_type = 'suicide'
    } else if(negative_wordlist.includes(test_wordlist[i])) {
      w_type = 'negative'
    } else if(neutral_wordlist.includes(test_wordlist[i])) {
      w_type = 'neutral'
    } else {
      w_type = 'positive'
    }
    var stimb = {
      is_html: true,
      stimulus: "<h1 style='color:blue;'>" + test_wordlist[i] + "</h1>",
      data:{word: test_wordlist[i],
            color: 'blue',
            block: 'test',
            block_num: 0,
            word_type: w_type
          }
    }
    var stimr = {
      is_html: true,
      stimulus: "<h1 style='color:red;'>" + test_wordlist[i] + "</h1>",
      data:{word: test_wordlist[i],
            color: 'red',
            block: 'test',
            block_num: 0,
            word_type: w_type
          }
    }
    test_stimuli1.push(jQuery.extend(true, {}, stimb));
    test_stimuli1.push(jQuery.extend(true, {}, stimr));
    test_stimuli2.push(jQuery.extend(true, {}, stimb));
    test_stimuli2.push(jQuery.extend(true, {}, stimr));
  }
  var test_trials1 = jsPsych.randomization.repeat(test_stimuli1, 1);
  var test_trials2 = jsPsych.randomization.repeat(test_stimuli2, 1);
  for (var i = 0; i < test_trials1.length; i++) {
    test_trials1[i]['data']['block_num'] = 1;
    test_trials2[i]['data']['block_num'] = 2;
  }

  for(var i=0;i<test_trials1.length; i+=2) {
    test_trials1.splice(i,0,fixation_block); // insert fixation block between each trial
    test_trials2.splice(i,0,fixation_block); // insert fixation block between each trial
  }

  var practice_block = {
    type: "single-stim",
    choices: ['f','j'],
    timing_post_trial: post_trial_gap_time,
    on_finish: function(data){
      trial_index++;
      d = jsPsych.data.getLastTrialData()
      if(data.key_press == 70) {
        jsPsych.data.addDataToLastTrial({key_pressed: 'f', participant_response:'red'});
        if(d['color'] == 'red') {
          jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
        } else {
          jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
        }
      } else if (data.key_press == 74) {
        jsPsych.data.addDataToLastTrial({key_pressed: 'j', participant_response:'blue'});
        if(d['color'] == 'blue') {
          jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
        } else {
          jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
        }
      } else if(data.key_press == -1) {
        jsPsych.data.addDataToLastTrial({correct_response: 'noresponse'});
      } else { jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase(), correct_response: 'incorrect'}); }
    },
    timeline: practice_trials
  };

  var practice2_block = {
    type: "single-stim",
    choices: ['f','j'],
    timing_post_trial: post_trial_gap_time,
    on_finish: function(data){
      trial_index++;
      d = jsPsych.data.getLastTrialData()
      if(data.key_press == 70) {
        jsPsych.data.addDataToLastTrial({key_pressed: 'f', participant_response:'red'});
        if(d['color'] == 'red') {
          jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
        } else {
          jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
        }
      } else if (data.key_press == 74) {
        jsPsych.data.addDataToLastTrial({key_pressed: 'j', participant_response:'blue'});
        if(d['color'] == 'blue') {
          jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
        } else {
          jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
        }
      } else if(data.key_press == -1) {
        jsPsych.data.addDataToLastTrial({correct_response: 'noresponse'});
      } else { jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase(), correct_response: 'incorrect'}); }
    },
    timeline: practice_trials2
  };

/*
  var practice_debrief_block = {
    type: "text",
    text: function() {
      return "<p>You have completed the PRACTICE phase. If you would like to repeat the PRACTICE phase, press 1. If you would like to continue onto the TEST phase, press the spacebar.</p>";
    }
  };
*/

  /* create experiment timeline array */
  /*
  var practice_timeline = [];
  practice_timeline.push(instructions_block);
  practice_timeline.push(practice_block);
  practice_timeline.push(practice_debrief_block);
  
  var practice_node = {
    timeline: practice_timeline,
    loop_function: function(data){
      if(49 == data[data.length-1].key_press) {
        return true;
      } else {
        return false;
      }
    }
  };
  */


  var practice_timeline = [];
  practice_timeline.push(instructions_block);
  practice_timeline.push(practice_block);

  var practice_node = {
    type: "single-stim",
    timeline: practice_timeline,
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

  practice_timeline_complete = [practice_node, practice_errcheck_node,practice_debrief_node, practice2_node, practice_errcheck2_node, practice_debrief2_node]

  var practice_timeline_complete_node = {
    type: "textTimed",
    cont_key: null,
    timeLeft: 30,
    timeline: practice_timeline_complete,
    loop_function: function(data){
        var d = jsPsych.data.getLastTrialData();
        if(jsPsych.pluginAPI.convertKeyCharacterToKeyCode('1') == d.key_press){
            return true;
        } else {
            return false;
        }
    }
  }

  var test_block1 = {
    type: "single-stim",
    choices: ['f','j'],
    timing_post_trial: post_trial_gap_time,
    on_finish: function(data){
      trial_index++;
      d = jsPsych.data.getLastTrialData()
      if(data.key_press == 70) {
        jsPsych.data.addDataToLastTrial({key_pressed: 'f', participant_response:'red'});
        if(d['color'] == 'red') {
          jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
        } else {
          jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
        }
      } else if (data.key_press == 74) {
        jsPsych.data.addDataToLastTrial({key_pressed: 'j', participant_response:'blue'});
        if(d['color'] == 'blue') {
          jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
        } else {
          jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
        }
      } else if(data.key_press == -1) {
        jsPsych.data.addDataToLastTrial({correct_response: 'noresponse'});
      } else { jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase(), correct_response: 'incorrect'}); }
    },
    timeline: test_trials1
  };


  
  var test_block2 = {
    type: "single-stim",
    choices: ['f','j'],
    timing_post_trial: post_trial_gap_time,
    on_finish: function(data){
      trial_index++;
      d = jsPsych.data.getLastTrialData()
      if(data.key_press == 70) {
        jsPsych.data.addDataToLastTrial({key_pressed: 'f', participant_response:'red'});
        if(d['color'] == 'red') {
          jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
        } else {
          jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
        }
      } else if (data.key_press == 74) {
        jsPsych.data.addDataToLastTrial({key_pressed: 'j', participant_response:'blue'});
        if(d['color'] == 'blue') {
          jsPsych.data.addDataToLastTrial({correct_response: 'correct'});
        } else {
          jsPsych.data.addDataToLastTrial({correct_response: 'incorrect'});
        }
      } else if(data.key_press == -1) {
        jsPsych.data.addDataToLastTrial({correct_response: 'noresponse'});
      } else { jsPsych.data.addDataToLastTrial({key_pressed: String.fromCharCode(data.key_press).toLowerCase(), correct_response: 'incorrect'}); }
    },
    timeline: test_trials2
  };
  
  var test_debrief_block = {
    type: "textTimed",
    cont_key: null,
    timeLeft: 1,
    text: function() {
      //return "<p>Thank you for completing the task. Please hit the next button.</p>";
      return "";
    }
  };

  var test_break_block = {
    type: "textTimed",
    cont_key: null,
    timeLeft: 30,
    text: function() {
      tti++;
      return "<div id='break_block'><div id='time' style='text-align:center; font-size: 150%;'></div><div style='text-align:center;'>Nice job! You've completed 1 set of trials. You have 1 set of trials to go. <br> <br> <b>Remember</b>: make sure your fingers are on the '<font color='red'>F</font>' and '<font color='blue'>J</font>' keys on the keyboard. </div></div><script>display = document.querySelector('#time');startTimer(30, display);</"+"script>"
    }
  };
  
  var test_timeline = [];
  test_timeline.push(test_block1);
  //test_timeline.push(test_break_block);
  test_timeline.push(test_block2);
  //test_timeline.push(test_debrief_block);
  
  var test_node = {
    type: "single-stim",
    timeline: test_timeline
  }


  jsPsych.init({
    timeline: [practice_timeline_complete_node, test_node],
    //timeline: [practice_timeline_complete_node],
    on_finish: function() {
      //jsPsych.data.localSave('data.csv', 'csv');
      console.log('done');
      $('.jspsych_target').append("<p>Thank you for completing the task. Please hit the next button.</p>");

      var numpartitions = 5

      var json_data = JSON.parse(jsPsych.data.dataAsJSON());
      var chunksize = Math.ceil(json_data.length/numpartitions);

      var json_datas = [];
      while (json_data.length > 0){
        json_datas.push(json_data.splice(0, chunksize));
      }
      
      for(var i = 0; i < json_datas.length; i++) {
        findAndRemove(json_datas[i],'block','fixation');
        var json_string = JSON.stringify(json_datas[i]).replace(/(\r\n|\n|\r|\\n)/gm, "");
        window.parent.postMessage(
            {
                event_id: 'Stroop1-'.concat((i+1).toString()),
                data: json_string
            },
            "*"
        ); 
      }     
    }
  });
});