Template.courseprevious.events({
  "change #currentList": function(event,template){
    //console.log("asd");
  },
  "click .course": function(event,template) {
    template.$(".p").css("background","#ebebeb");
    Session.set("courseOverlay",this);
  }
});

Template.courseprevious.helpers({
  overlay: function() {
    var course = Session.get("courseOverlayP");
    if(course) {
      course.difficulty = Math.round(course.difficulty * 10);
      course.success    = Math.round(((course.a + (course.b*Session.get("performance")))/20)*100);
      course.usuccess   = course.success - 16;
      if (course.success >= 0) {
        course.text = "Very Hard";
        $(".success-barp").find("#primaryProgress").css("background","#e74c3c");
      }
      if (course.success >= 20) {
        course.text = "Hard";
        $(".success-barp").find("#primaryProgress").css("background","#e74c3c");
      }
      if (course.success >= 40) {
        course.text = "Regular";
        $(".success-barp").find("#primaryProgress").css("background","#f39c12");
      }
      if (course.success >= 60) {
        course.text = "Very Easy";
        $(".success-barp").find("#primaryProgress").css("background","#27ae60");
      }
      if (course.success >= 80) {
        course.text = "Very Easy";
        $(".success-barp").find("#primaryProgress").css("background","#27ae60");
      }
      $(".p").css("background","#ebebeb");
      $(".p:lt("+course.difficulty+")").css("background","#b45c7e");
    }
    return course;
  }
});

Template.courseprevious.rendered = function () {};
