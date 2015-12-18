Template.riskwidget.helpers({
  risk: function() {
    var risk = Math.round(Session.get("riskValue")*100);
    return parseInt(risk) || 0;
  },
  riskText: function() {
    var risk = Session.get("riskValue");
    var text;
    if (risk >= 0.0) text = "Very Hard";
    if (risk >= 0.2) text = "Hard";
    if (risk >= 0.5) text = "Regular";
    if (risk >= 0.7) text = "Easy";
    if (risk >= 0.8) text = "Very Easy";
    return text;
  },
  riskColor: function() {
    var risk = Session.get("riskValue");
    if (risk >= 0.0) $("#svgCircle").css("stroke","#e74c3c");
    if (risk >= 0.2) $("#svgCircle").css("stroke","#e67e22");
    if (risk >= 0.5) $("#svgCircle").css("stroke","#f1c40f");
    if (risk >= 0.7) $("#svgCircle").css("stroke","#27ae60");
    if (risk >= 0.8) $("#svgCircle").css("stroke","#25a085");
    return risk;
  },
  riskKnob: function() {
    var risk = Session.get("riskValue");
    return (Math.round(Session.get("riskValue")*100) * 2)-12;
  }
});

Template.riskwidget.events({
  "click .risk-info": function (event,template) {
    template.$(".help-info").css("display","flex");
  },
  "click .close-info": function (event,template) {
    template.$(".help-info").fadeOut();
  },
  "click .help-info": function (event,template) {
    template.$(".help-info").fadeOut();
  },
  "click": function(event,template){
    /*** Interaction Recorder ***/
    var self = this;
    var myEvent = event;
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
        "target": $(event.target).first().attr('class'),
        "x": (event.pageX - $('.coursescard-paper').offset().left) + $(".content").scrollLeft(),
        "y": (event.pageY - $('.coursescard-paper').offset().top)  + $(".content").scrollTop(),
        "timestamp": new Date()
      });
    }
  }
});

Template.riskwidget.rendered = function () {
  setTimeout(function() {
    var risk = Session.get("riskValue");
    if (risk >= 0.0) $("#svgCircle").css("stroke","#e74c3c");
    if (risk >= 0.2) $("#svgCircle").css("stroke","#e67e22");
    if (risk >= 0.4) $("#svgCircle").css("stroke","#f1c40f");
    if (risk >= 0.6) $("#svgCircle").css("stroke","#27ae60");
    if (risk >= 0.8) $("#svgCircle").css("stroke","#25a085");
  },1300);
};
