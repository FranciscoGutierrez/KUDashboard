Template.coursedetails.events({
  "change #currentList": function(event,template){
    console.log("asd");
  },
  "click .course": function(event,template) {
    $(".c").css("background","#ebebeb");
    Session.set("courseOverlay",this);
  }
});

Template.coursedetails.helpers({
  overlay: function() {
    var course = Session.get("courseOverlay");
    if(course) {
      course.difficulty = Math.round(course.difficulty * 10);
      course.success  = Math.round(Math.random() * (90 - 60) + 60);
      course.usuccess = course.success - 25;
      $(".c").css("background","#ebebeb");
      $(".c:lt("+course.difficulty+")").css("background","#b45c7e");
    }
    return course;
  }
});

Template.coursedetails.rendered = function () {};
