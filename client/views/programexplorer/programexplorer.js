Template.programexplorer.events({
  "click .course": function(event,template) {
    Session.set("courseOverlayP", Session.get("courseOverlay"));
    Session.set("courseOverlay",this);
    $(".course").css("border","0");
    $("#"+this._id).css("border","3px solid #b45c7e");
  }
});

Template.programexplorer.helpers({
  prediction: function() {
    var c = Session.get("courses");
    var p = Session.get("performance");
    var a = 0;
    var b = 0;
    var r = 0;
    if (c.length > 0) {
      for(var i=0; i < c.length; i ++){
        a += Courses.findOne({"_id": c[i]}).a;
        b += Courses.findOne({"_id": c[i]}).b;
      }
      r = Math.round((((a/c.length)+((b/c.length)*p))/20)*100);
      Session.set("riskValue",r);
    }
    if (r >=   0 ) $(".pscore").css("border-bottom", "2px solid #e74c3c");
    if (r >=  20 ) $(".pscore").css("border-bottom", "2px solid #e74c3c");
    if (r >=  40 ) $(".pscore").css("border-bottom", "2px solid #f39c12");
    if (r >=  60 ) $(".pscore").css("border-bottom", "2px solid #27ae60");
    if (r >=  80 ) $(".pscore").css("border-bottom", "2px solid #27ae60");
    return r;
  },
  overlay: function() {
    return Session.get("courseOverlay");
  },
  firstyear: function() {
    var sc = Grades.findOne({"student": Session.get("student"), "academischeperiode": "Eerste Semester", "fase": "eerste fase"});
    return sc;
  },
  secondyear: function() {
    var sc = Grades.findOne({"student": Session.get("student"), "academischeperiode": "Eerste Semester", "fase": "tweede fase"});
    return sc;
  },
  courses: function() {
    return Courses.find().fetch();
  },
  sc1: function() {
    var sc = Session.get("sem1");
    var color = "#f39c12";
    if(sc >= 10) color = "#27ae60";
    if(sc <  10) color = "#f39c12";
    if(sc <   8) color = "#e74c3c";
    $(".sc1").css("border-bottom","2px solid" + color);
    return sc;
  },
  sc2: function() {
    var sc = Session.get("sem2");
    var color = "#f39c12";
    if(sc >= 10) color = "#27ae60";
    if(sc <  10) color = "#f39c12";
    if(sc <   8) color = "#e74c3c";
    $(".sc2").css("border-bottom","2px solid" + color);
    return sc;
  },
  sc3: function() {
    var sc = Session.get("sem3");
    var color = "#f39c12";
    if(sc >= 10) color = "#27ae60";
    if(sc <  10) color = "#f39c12";
    if(sc <   8) color = "#e74c3c";
    $(".sc3").css("border-bottom","2px solid" + color);
    return sc;
  },
  sc4: function() {
    var sc = Session.get("sem4");
    var color = "#f39c12";
    if(sc >= 10) color = "#27ae60";
    if(sc <  10) color = "#f39c12";
    if(sc <   8) color = "#e74c3c";
    $(".sc4").css("border-bottom","2px solid" + color);
    return sc;
  },
  sc5: function() {
    var sc = Session.get("sem5");
    var color = "#f39c12";
    if(sc >= 10) color = "#27ae60";
    if(sc <  10) color = "#f39c12";
    if(sc <   8) color = "#e74c3c";
    $(".sc5").css("border-bottom","2px solid" + color);
    return sc;
  },
  sc6: function() {
    var sc = Session.get("sem6");
    var color = "#f39c12";
    if(sc >= 10) color = "#27ae60";
    if(sc <  10) color = "#f39c12";
    if(sc <   8) color = "#e74c3c";
    $(".sc6").css("border-bottom","2px solid" + color);
    return sc;
  },
  sem1: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Eerste Semester", "fase": "eerste fase"},{sort: {"score": 1}}).fetch();
    var av = 0.0;
    for (var i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
      sc[i].opleidingsonderdeel.toLowerCase();
      if(!isNaN(sc[i].score)) av = Number(sc[i].score) + av;
    }
    if(sc.length > 0) av = av/sc.length;
    Session.set("sem1",Math.round((av/20)*100));
    return sc;
  },
  sem2: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Tweede Semester", "fase": "eerste fase"},{sort: {"score": 1}}).fetch();
    var av = 0.0;
    for (var i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
      if(!isNaN(sc[i].score)) av = Number(sc[i].score) + av;
      sc[i].opleidingsonderdeel.toLowerCase();
    }
    if(sc.length > 0) av = av/sc.length;
    Session.set("sem2",Math.round((av/20)*100));
    return sc;
  },
  sem3: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Eerste Semester", "fase": "tweede fase"},{sort: {"score": 1}}).fetch();
    var av = 0.0;
    for (var i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
      sc[i].opleidingsonderdeel.toLowerCase();
      if(!isNaN(sc[i].score)) av = Number(sc[i].score) + av;
    }
    if(sc.length > 0) av = av/sc.length;
    Session.set("sem3",Math.round((av/20)*100));
    return sc;
  },
  sem4: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Tweede Semester", "fase": "tweede fase"},{sort: {"score": 1}}).fetch();
    var av = 0.0;
    for (var i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
      sc[i].opleidingsonderdeel.toLowerCase();
      if(!isNaN(sc[i].score)) av = Number(sc[i].score) + av;
    }
    if(sc.length > 0) av = av/sc.length;
    Session.set("sem4",Math.round((av/20)*100));
    return sc;
  },
  sem5: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Eerste Semester", "fase": "derde fase"},{sort: {"score": 1}}).fetch();
    var av = 0.0;
    for (var i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
      sc[i].opleidingsonderdeel.toLowerCase();
      if(!isNaN(sc[i].score)) av = Number(sc[i].score) + av;
    }
    if(sc.length > 0) av = av/sc.length;
    Session.set("sem5",Math.round((av/20)*100));
    return sc;
  },
  sem6: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Tweede Semester", "fase": "derde fase"},{sort: {"score": 1}}).fetch();
    var av = 0.0;
    for (var i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
      sc[i].opleidingsonderdeel.toLowerCase();
      if(!isNaN(sc[i].score)) av = Number(sc[i].score) + av;
    }
    if(sc.length > 0) av = av/sc.length;
    Session.set("sem6",Math.round((av/20)*100));
    return sc;
  },
  workload: function() {
    return Session.get("workload");
  }
});

Template.programexplorer.rendered = function () {
  setTimeout(function() {
    Sortable.create(availableList, {
      group: {
        name: "available",
        put: ["added"]
      },
      animation: 100,
      onStart: function (evt) {
        $("#currentList").css("border","1px dashed #b45c7e");
      },
      onEnd: function (evt) {
        $("#currentList").css("border","1px dashed #c5c5c5");
      }
    });

    Sortable.create(currentList, {
      filter: ".last",
      group: {
        name: "added",
        put: ["available"]
      },
      animation: 100,
      onStart: function (evt) {
        $("#currentList").css("border","1px dashed #fafafa");
        $(".available-courses").css("border","1px dashed #b45c7e");
      },
      onEnd: function (evt) {
        $("#currentList").css("border","1px dashed #c5c5c5");
        $(".available-courses").css("border","1px dashed white");
      },
      onAdd: function (evt) {
        // evt.from;  // previous list
        var c = Session.get("courses");
        var w = Session.get("workload") + 0;
        c.push(evt.item.id);
        w = Number(w) + Number(evt.item.getAttribute("credits"));
        Session.set("courses",c);
        Session.set("workload",w);
      },
      onRemove: function (evt) {
        var c = Session.get("courses");
        var w = Session.get("workload") + 0;
        w = Number(w) - Number(evt.item.getAttribute("credits"));
        Session.set("courses",c);
        Session.set("workload",w);

        var courses = Session.get("courses");
        for(var i = courses.length; i--;) {
          if(courses[i] === evt.item.id) {
            courses.splice(i, 1);
          }
        }
        Session.set("courses",courses);
        Session.set("riskValue",Math.round(Math.random() * (90 - 60) + 60)/100);
      }
    });

  },3500);
};
