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
      course.success    = Math.round(((course.a + (course.b*Session.get("performance")))/20)*100);
      course.usuccess   = course.success - 16;
      if (course.success >= 0) {
        course.text = "Very Hard";
        $(".success-bar").find("#primaryProgress").css("background","#e74c3c");
      }
      if (course.success >= 20) {
        course.text = "Hard";
        $(".success-bar").find("#primaryProgress").css("background","#e74c3c");
      }
      if (course.success >= 40) {
        course.text = "Regular";
        $(".success-bar").find("#primaryProgress").css("background","#f39c12");
      }
      if (course.success >= 60) {
        course.text = "Very Easy";
        $(".success-bar").find("#primaryProgress").css("background","#27ae60");
      }
      if (course.success >= 80) {
        course.text = "Very Easy";
        $(".success-bar").find("#primaryProgress").css("background","#27ae60");
      }
      $(".c").css("background","#ebebeb");
      $(".c:lt("+course.difficulty+")").css("background","#b45c7e");
    }
    return course;
  }
});

Template.coursedetails.rendered = function () {};
