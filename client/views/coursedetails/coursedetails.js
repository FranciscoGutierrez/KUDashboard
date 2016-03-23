Template.coursedetails.events({
  "change #currentList": function(event,template){
    console.log("asd");
  },
  "click .course": function(event,template) {
    console.log(this);
    Session.set("courseOverlay",this);
  }
});

Template.coursedetails.helpers({
  overlay: function() {
    return Session.get("courseOverlay");
  }
});

Template.coursedetails.rendered = function () {};
