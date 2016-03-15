Template.programexplorer.events({
});

Template.programexplorer.helpers({
  courses: function() {
    return Courses.find().fetch();
  },
  sem1: function() {
    var sc = Grades.find({"student": Session.get("student")}).fetch();
    for (i = 0; i < sc.length; i++) {
      if(sc[i].grade >= 10) sc[i].color = "#27ae60";
      if(sc[i].grade <  10) sc[i].color = "#f39c12";
      if(sc[i].grade <   8) sc[i].color = "#e74c3c";
    }
    return sc;
  },
  sem2: function() {
    var sc = Grades.find({"student": Session.get("student")}).fetch();
    for (i = 0; i < sc.length; i++) {
      if(sc[i].grade >= 10) sc[i].color = "#27ae60";
      if(sc[i].grade <  10) sc[i].color = "#f39c12";
      if(sc[i].grade <   8) sc[i].color = "#e74c3c";
    }
    return sc;
  },
  sem3: function() {

  },
  sem4: function() {

  },
  sem5: function() {

  },
  sem6: function() {

  },

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
