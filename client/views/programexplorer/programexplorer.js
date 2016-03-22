Template.programexplorer.events({
  "change #currentList": function(event,template){
    console.log("asd");
  }
});

Template.programexplorer.helpers({
  courses: function() {
    return Courses.find().fetch();
  },
  sem1: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Eerste Semester", "fase": "eerste fase"},{sort: {"score": "1"}}).fetch();
    for (i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
    }
    return sc;
  },
  sem2: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Tweede Semester", "fase": "eerste fase"},{sort: {"score": "1"}}).fetch();
    for (i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
    }
    return sc;
  },
  sem3: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Tweede Semester", "fase": "eerste fase"},{sort: {"score": "1"}}).fetch();
    for (i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
    }
    return sc;
  },
  sem4: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Tweede Semester", "fase": "eerste fase"},{sort: {"score": "1"}}).fetch();
    for (i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
    }
    return sc;
  },
  sem5: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Tweede Semester", "fase": "eerste fase"},{sort: {"score": "1"}}).fetch();
    for (i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
    }
    return sc;
  },
  sem6: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Tweede Semester", "fase": "eerste fase"},{sort: {"score": "1"}}).fetch();
    for (i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
    }
    return sc;
  },
  workload: function() {
    var a = Session.get("workload");
    if (a <  30 ) $(".workload").css("border-bottom", "2px solid #27ae60");
    if (a == 30 ) $(".workload").css("border-bottom", "2px solid #f39c12");
    if (a >  30 ) $(".workload").css("border-bottom", "2px solid #e74c3c");
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
      animation: 100
    });

    Sortable.create(currentList, {
      filter: ".last",
      group: {
        name: "added",
        put: ["available"]
      },
      animation: 100,
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
      }
    });

  },3500);
};
