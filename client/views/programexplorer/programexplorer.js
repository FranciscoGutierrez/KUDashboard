Template.programexplorer.events({
});

Template.programexplorer.helpers({
  courses: function() {
    return Courses.find().fetch();
  },
  sem1: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Eerste Semester", "fase": "eerste fase"}).fetch();
    for (i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
    }
    return sc;
  },
  sem2: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Tweede Semester", "fase": "eerste fase"}).fetch();
    for (i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
    }
    return sc;
  },
  sem3: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Tweede Semester", "fase": "eerste fase"}).fetch();
    for (i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
    }
    return sc;
  },
  sem4: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Tweede Semester", "fase": "eerste fase"}).fetch();
    for (i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
    }
    return sc;
  },
  sem5: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Tweede Semester", "fase": "eerste fase"}).fetch();
    for (i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
    }
    return sc;
  },
  sem6: function() {
    var sc = Grades.find({"student": Session.get("student"), "academischeperiode": "Tweede Semester", "fase": "eerste fase"}).fetch();
    for (i = 0; i < sc.length; i++) {
      if(sc[i].score >= 10) sc[i].color = "#27ae60";
      if(sc[i].score <  10) sc[i].color = "#f39c12";
      if(sc[i].score <   8) sc[i].color = "#e74c3c";
    }
    return sc;
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
      animation: 100
    });

  },3500);
};
