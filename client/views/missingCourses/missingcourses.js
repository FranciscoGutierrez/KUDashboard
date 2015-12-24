/*
* Template life Cycle (Events)
*/
Template.studentdata.events({
  "click .mc-all": function(event,template) {
    Session.set("studentdata","all");
  },
  "click .mc-passed": function(event,template) {
    Session.set("studentdata","passed");
  },
  "click .mc-failed": function(event,template) {
    Session.set("studentdata","failed");
  },
  "click .mc-redo": function(event,template) {
    Session.set("studentdata","redo");
  },
  "click .mc-radio-all": function(event,template) {
    template.$(".mc-radio-level").attr("checked",false);
    template.$(".mc-radio-all").attr("checked",true);
    Session.set("studentYear","all");
  },
  "click .mc-radio-level": function(event,template) {
    template.$(".mc-radio-level").attr("checked",false);
    template.$(".mc-radio-all").attr("checked",false);
    template.$(".mc-radio-"+this.number).attr("checked",true);
    Session.set("studentYear",this.year);
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
  "mouseenter .name": function (event, template) {
    template.$(".name").attr("title", $(event.target).text());
  },
  "click": function(event,template){
    /*** Interaction Recorder ***/
    var self = this;
    var myEvent = event;
    var className = $(event.target).attr('class').split(' ')[0];
    var trackName = $(event.target).attr('track');
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
        "target": className+" "+trackName,
        "values": JSON.stringify(Session.keys),
        "x": (event.pageX - $('.missingcourses-paper').offset().left) + $(".content").scrollLeft(),
        "y": (event.pageY - $('.missingcourses-paper').offset().top)  + $(".content").scrollTop(),
        "timestamp": new Date(),
        "timestampms": new Date().getTime()
      });
    }
  }
});

Template.reactiveTable.onCreated(function () {
  Filter = new ReactiveTable.Filter('group', ['group']);
});

/*
* Display data from helpers
*/
Template.studentdata.helpers({
  selectedCourses: function() {
    var selected = Session.get("studentdata");
    var year     = Session.get("studentYear");
    var query = [];
    if((selected != "redo") && (year != "all")) query = Grades.find({"student": Session.get("student"), "year": Session.get("studentYear")}, {sort: {year: 1}}).fetch();
    if((selected != "redo") && (year == "all")) query = Grades.find({"student": Session.get("student")}, {sort: {year: 1}}).fetch();
    /* Show me redo's Specific years */
    if((selected == "redo") && (year != "all")) query = Grades.find({"student": Session.get("student"), "year": Session.get("studentYear"), "status":"Failed", "status":{$not: "Passed"}}, {sort: {year: 1}}).fetch();
    /* Show me redo's All years */
    if((selected == "redo") && (year == "all")) query = Grades.find({"student": Session.get("student"), "status":"Failed"}).fetch();
    /****/
    for (i = 0; i < query.length; i++) query[i].grade = parseFloat(query[i].grade);
    return query;
  },
  academicYears: function() {
    var selected = Session.get("studentdata");
    var query = Grades.find({"student": Session.get("student")}, {sort: {year: 1}}).fetch();
    var shit = _.uniq(_.pluck(query,"year"));
    var obj = [];
    for (i = 0; i < shit.length; i++) {
      obj.push({year: shit[i], number: i});
    }
    return obj;
  },
  isOn: function() {
    return Session.get("mc-toggle");
  },
  student: function() {
    return Session.get("student");
  },
  settings: function () {
    return {
      rowsPerPage: 5,
      showFilter: false,
      showRowCount: false,
      showNavigationRowsPerPage: false,
      fields: ['course','name', 'grade', 'year', 'status']
    };
  }
});

Template.studentdata.rendered = function () {
  Session.set("mc-toggle",false);
};
