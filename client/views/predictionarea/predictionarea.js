Template.predictionarea.events({
  "change #currentList": function(event,template){
    console.log("asd");
  },
  "click .course": function(event,template) {
    $(".c").css("background","#ebebeb");
    Session.set("courseOverlay",this);
  },
  "click .adjust-p": function(event, template) {
    $(".prediction").fadeOut(function(){
      $(".adjust-p").text("reset");
      $(".performance-slider").fadeIn();
    });
  }
});

Template.predictionarea.helpers({
  prediction: function() {
    var rv = Session.get("riskValue");
    if (rv >=  0) $(".prediction-bar").find("#primaryProgress").css("background","#e74c3c");
    if (rv >= 20) $(".prediction-bar").find("#primaryProgress").css("background","#e74c3c");
    if (rv >= 40) $(".prediction-bar").find("#primaryProgress").css("background","#f39c12");
    if (rv >= 60) $(".prediction-bar").find("#primaryProgress").css("background","#27ae60");
    if (rv >= 80) $(".prediction-bar").find("#primaryProgress").css("background","#27ae60");
    return rv;
  },
  performance: function() {
    return Math.round(Session.get("performance")*100);
  },
  text: function(){
    var p = Session.get("performance");
    var t = "";
    if(p > 0.0) t= "Insufficient";
    if(p > 0.2) t= "More Work is Required";
    if(p > 0.4) t= "Sufficient";
    if(p > 0.6) t= "Good";
    if(p > 0.8) t= "Excellent";
    return t;
  },
  success: function() {
    var success = Math.round(Session.get("riskValue")*100);
    console.log(success);
    return success;
  },
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
