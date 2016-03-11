Template.programexplorer.events({
});

Template.programexplorer.helpers({
  courses: function() {
    return Courses.find().fetch();
  },
  fase1: function() {
    return Grades.find({"student": Session.get("student"), "status":"Failed"}).fetch()
  },
  fase2: function() {
    return Grades.find({"student": Session.get("student"), "status":"Failed"}).fetch()
  },
  fase3: function() {

  },
  fase4: function() {

  },
  fase5: function() {

  },
  fase6: function() {

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
      group: {
        name: "added",
        put: ["available"]
      },
      animation: 100
    });

  },3500);
};
