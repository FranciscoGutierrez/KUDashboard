Template.topribbon.helpers({
  studentId: function () {
    return Session.get("student");
  }
});

Template.topribbon.events({
  "click .ribbon-title": function (event,template) {
    if (template.$(".ribbon-icon").attr("icon") != "icons:arrow-drop-up") {
      template.$(".top-ribbon").animate({height:"240px"}, 200, function() {});
      template.$(".ribbon-icon").attr("icon","icons:arrow-drop-up");
      template.$(".top-ribbon-hidden").fadeIn();
    } else {
      template.$(".top-ribbon").animate({height:"24px"}, 200, function() {});
      template.$(".ribbon-icon").attr("icon","icons:arrow-drop-down");
      template.$(".top-ribbon-hidden").fadeOut(100);
    }
  },
  "click": function(event,template){
    /*** Interaction Recorder ***/
    var self = this;
    var myEvent = event;
    Recorder.insert({
      "user": Meteor.connection._lastSessionId,
      "template": template.view.name,
      "target": $(event.target).first().attr('class'),
      "screenX": event.screenX,
      "screenY": event.screenY,
      "offsetX": event.offsetX,
      "offsetY": event.offsetY,
      "timestamp": new Date()
    });
  },
  "click paper-input": function(event,template) {
    template.$(".top-ribbon-save").attr("raised","true");
  },
  "click .top-ribbon-save": function(event,template) {
    Session.set("user-name", template.$("paper-input").val());
  }
});
