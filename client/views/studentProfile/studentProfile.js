/*
* Event Handling:
* Y = 14.65x + 3.86 x(0.1-1.0)
*/
Template.studentprofile.events({
  "click .sf-student": function(event,template){
    if(template.$(".sf-student").attr("checked")){
      StudentFactorsChart.datasets[1].points[0].value = Students.findOne().f1*100;
      StudentFactorsChart.datasets[1].points[1].value = Students.findOne().f2*100;
      StudentFactorsChart.datasets[1].points[2].value = Students.findOne().f3*100;
      StudentFactorsChart.datasets[1].points[3].value = Students.findOne().f4*100;
      StudentFactorsChart.datasets[1].points[4].value = Students.findOne().f5*100;
      StudentFactorsChart.update();
    } else {
      StudentFactorsChart.datasets[1].points[0].value = 0;
      StudentFactorsChart.datasets[1].points[1].value = 0;
      StudentFactorsChart.datasets[1].points[2].value = 0;
      StudentFactorsChart.datasets[1].points[3].value = 0;
      StudentFactorsChart.datasets[1].points[4].value = 0;
      StudentFactorsChart.update();
    }
  },
  "click .sf-toggle": function(event,template) {
    if(template.$(".sf-toggle").attr("checked")){
      Session.set("sf-toggle",true);
      template.$(".card-content-middle").fadeIn();
      template.$(".card-subtitle").fadeIn();
      template.$(".card-content-bottom").fadeIn();
      template.$(".control-title").fadeIn(300, function(){
        template.$(".cf-nothing").fadeOut();
      });
    }
    else {
      Session.set("sf-toggle",false);
      template.$(".card-content-middle").fadeOut();
      template.$(".card-subtitle").fadeOut();
      template.$(".card-content-bottom").fadeOut();
      template.$(".control-title").fadeIn(300, function(){
        template.$(".cf-nothing").css("display","flex");
      });
    }
  },
  "click .card-info": function (event,template) {
    template.$(".help-info").fadeIn();
  },
  "click .close-info": function (event,template) {
    template.$(".help-info").fadeOut();
  },
  "click .help-info": function (event,template) {
    template.$(".help-info").fadeOut();
  },
  "click .tab-a": function (event,template) {
    if(Session.get("stab")=="p") {
      template.$(".personal-content").fadeOut(300, function(){
        template.$(".academic-content").fadeIn();
      });
      Session.set("stab","a");
    }
  },
  "click .tab-p": function (event,template) {
    if(Session.get("stab")=="a") {
      template.$(".academic-content").fadeOut(300, function(){
        template.$(".personal-content").fadeIn();
      });
      Session.set("stab","p");
    }
  },
  "change .timesp-slider": function(){
    var a = $(".timesp-slider").attr("value");
    if(a==1) Session.set("riskValue",(14.65*0.00 + 3.86)/20);
    if(a==2) Session.set("riskValue",(14.65*0.12 + 3.86)/20);
    if(a==3) Session.set("riskValue",(14.65*0.25 + 3.86)/20);
    if(a==4) Session.set("riskValue",(14.65*0.37 + 3.86)/20);
    if(a==5) Session.set("riskValue",(14.65*0.50 + 3.86)/20);
    if(a==6) Session.set("riskValue",(14.65*0.62 + 3.86)/20);
    if(a==7) Session.set("riskValue",(14.65*0.75 + 3.86)/20);
    if(a==8) Session.set("riskValue",(14.65*0.84 + 3.86)/20);
    if(a==9) Session.set("riskValue",(14.65*0.96 + 3.86)/20);
    if(a==10) Session.set("riskValue",(14.65*1.0 + 3.86)/20);
    if(a==11) Session.set("riskValue",(14.65*1.0 + 3.86)/20);
    if(a==12) Session.set("riskValue",(14.65*1.0 + 3.86)/20);
    if(a==13) Session.set("riskValue",(14.65*1.0 + 3.86)/20);
    if(a==14) Session.set("riskValue",(14.65*1.0 + 3.86)/20);
    if(a==15) Session.set("riskValue",(14.65*1.0 + 3.86)/20);
    if(a==16) Session.set("riskValue",(14.65*1.0 + 3.86)/20);
  },
  "click": function(event,template){
    /*** Interaction Recorder ***/
    var self = this;
    var myEvent = event;
    var trackName = $(event.target).attr('track');
    if($(event.target).attr("id") === "checkboxContainer") trackName = "studentskills.bottomcontent.checkbox." + $(event.target).next().text();
    if($(event.target).hasClass("toggle-container")) trackName = "studentskills.topcontent.togglebutton";
    if($(event.target).attr("id") === "toggleButton") trackName = "studentskills.topcontent.togglebutton";
    if(Session.get("user-session")) {
      Actions.insert({
        "sessionId": Meteor.connection._lastSessionId,
        "user": Session.get("user-name"),
        "profile": Session.get("user-profile"),
        "prediction": Session.get("riskValue"),
        "uncertainty":Session.get("qualityValue"),
        "courses":Session.get("courses"),
        "load":Session.get("load"),
        "template": template.view.name,
        "target": trackName,
        "extended": false,
        "toggle": Session.get("sf-toggle"),
        "x": (event.pageX - $('.studentskills-paper').offset().left) + $(".content").scrollLeft(),
        "y": (event.pageY - $('.studentskills-paper').offset().top)  + $(".content").scrollTop(),
        "timestamp": new Date(),
        "timestampms": new Date().getTime()
      });
    }
  }
});

Template.studentprofile.helpers({
  "studentid" : function() {
    return Session.get("student");
  }
});

Template.studentprofile.rendered = function () {
  setTimeout(function() {
    var ctx = document.getElementById("sf-chart").getContext("2d");
    var data = {
      labels: ["Algemeen vormende", "Informatie", "Wiskunde", "Materie en energie", "P&O"],
      datasets: [{
        label: "Similar Students",
        fillColor:  "rgba(207, 207, 207,0.5)",
        strokeColor:"rgba(207, 207, 207,1.0)",
        pointColor: "rgba(207, 207, 207,1.0)",
        pointStrokeColor:  "#fff",
        pointHighlightFill:"#fff",
        pointHighlightStroke:"rgba(207, 207, 207,1.0)",
        data: [
          _.random(40, 70),
          _.random(30, 80),
          _.random(40, 90),
          _.random(30, 70),
          _.random(20, 70)
        ]},
        {
          label: "This Student",
          fillColor:  "rgba(179,93,126,0.5)",
          strokeColor:"rgba(179,93,126,1.0)",
          pointColor: "rgba(179,93,126,1.0)",
          pointStrokeColor:  "#fff",
          pointHighlightFill:"#fff",
          pointHighlightStroke:"rgba(179,93,126,1.0)",
          data: [
            Students.findOne().f1*100,
            Students.findOne().f2*100,
            Students.findOne().f3*100,
            Students.findOne().f4*100,
            Students.findOne().f5*100
          ]}
        ]
      };
      StudentFactorsChart = new Chart(ctx).Radar(data, {
        responsive: false,
        pointDotRadius: 3,
        pointLabelFontSize: 12,
        animation: true
      });
    },3500);
  };
