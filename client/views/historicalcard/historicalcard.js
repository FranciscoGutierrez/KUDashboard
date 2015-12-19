Template.historicalcard.events({
  "click .settings-icon": function (event,template) {
    if(!template.$(".card-settings-icon").hasClass("opened")) {
      template.$(".card-settings-icon").addClass("opened");
      template.$(".card-content").animate({"min-width":"+=350px"},"slow", function(){
        template.$(".card-settings-icon > iron-icon").fadeOut(300, function(){
          template.$(".card-settings-icon > iron-icon").attr("icon","icons:close").fadeIn(300);
        });
      });
    } else {
      template.$(".card-settings-icon").removeClass("opened");
      template.$(".card-content").animate({"min-width":"-=350px"},"slow ", function(){
        template.$(".card-settings-icon > iron-icon").fadeOut(300, function(){
          template.$(".card-settings-icon > iron-icon").attr("icon","icons:settings").fadeIn(300);
        });
      });
    }
  },
  "click .hc-toggle": function(event,template) {
    if(template.$(".hc-toggle").attr("checked")){
      Session.set("hc-toggle",true);
      Session.set("data-from","2010");
      Session.set("data-to","2015");
      setTimeout(function() {
        $("#selector").ionRangeSlider({
          type: 'double ',
          min: 2010,
          max: 2015,
          step: 1,
          grid: true,
          grid_snap: true,
          onChange: function(data) {
            Session.set("data-from",data.from);
            Session.set("data-to",data.to);
          }
        });

        var data = [
          { x: 0,  y: 6013},
          { x: 1,  y: 16512},
          { x: 2,  y: 23558},
          { x: 3,  y: 24498},
          { x: 4,  y: 25086},
          { x: 5,  y: 24412}
        ];

        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width  = 335,
        height = 170;

        var x = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.x; })])
        .range([0, width]);

        var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([height, 0]);

        var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        var area = d3.svg.area()
        .x(function(d) { return x(d.x); })
        .y0(height)
        .y1(function(d) { return y(d.y); });

        var svg = d3.select("svg#area")
        .attr("width",width)
        .attr("height",height)
        .insert("g")
        .attr("transform", "translate(0,0)")
        .attr("class", "animated flipInX");

        svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

      },250);
    } else {
      Session.set("hc-toggle",false);
      template.$(".historicalcard-paper").css("opacity","1");
      Session.set("data-from","1999");
      Session.set("data-to","2012");
    }
  },
  "change .hc-paper-slider": function(event,template) {
    var n = template.$(".hc-paper-slider").attr("value");
    Session.set("hc-compliance", n);
    // Websocket.send('{"reuqestId": "5645f7f7ef0bde57344c84de"}');
    if(n==5) template.$(".historicalcard-paper").css("opacity","1");
    if(n==4) template.$(".historicalcard-paper").css("opacity","0.85");
    if(n==3) template.$(".historicalcard-paper").css("opacity","0.75");
    if(n==2) template.$(".historicalcard-paper").css("opacity","0.65");
    if(n==1) template.$(".historicalcard-paper").css("opacity","0.55");
    if(n==0) template.$(".historicalcard-paper").css("opacity","0.45");
  },
  "click .card-info": function (event,template) {
    template.$(".help-info").fadeIn();
  },
  "click .close-info": function (event,template) {
    template.$(".help-info").fadeOut();
  },
  "click .help-info": function (event,template) {
    template.$(".help-info").fadeOut();
  },
  "click": function(event,template){
    /*** Interaction Recorder ***/
    var self = this;
    var myEvent = event;
    if(Session.get("user-session")) {
      Actions.insert({
        "sessionId": Meteor.connection._lastSessionId,
        "user": Session.get("user-name"),
        "profile": Session.get("user-profile"),
        "prediction": Session.get("riskValue"),
        "uncertainty":Session.get("qualityValue"),
        "courses":Session.get("courses"),
        "load":Session.get("load"),
        "template": template.view.name,
        "target": $(event.target).first().attr('class'),
        "x": (event.pageX - $('.coursescard-paper').offset().left) + $(".content").scrollLeft(),
        "y": (event.pageY - $('.coursescard-paper').offset().top)  + $(".content").scrollTop(),
        "timestamp": new Date()
      });
    }
  }
});

Template.historicalcard.helpers({
  isOn: function() {
    return Session.get("hc-toggle");
  },
  compliance: function() {
    return Session.get("hc-compliance");
  },
  students: function () {
    var result = 0;
    var x = Historial.find({}).fetch();
    for (i=0; i < x.length; i++) {
      if ((Session.get("data-from") <= parseInt(x[i].year)) && (Session.get("data-to") >= parseInt(x[i].year)))
      result = parseInt(x[i].students) + result;
    }
    return result.toLocaleString();
  },
  courses: function () {
    var result = 0;
    var x = Historial.find({}).fetch();
    for (i=0; i < x.length; i++) {
      if ((Session.get("data-from") <= parseInt(x[i].year)) && (Session.get("data-to") >= parseInt(x[i].year)))
      result = parseInt(x[i].courses) + result;
    }
    return result.toLocaleString();
  },
  from: function () {
    return Session.get("data-from");
  },
  to: function () {
    return Session.get("data-to");
  }
});

Template.historicalcard.rendered = function () {
  Session.set("hc-toggle", true);
  setTimeout(function() {
    $("#selector").ionRangeSlider({
      type: 'double ',
      min: 2010,
      max: 2015,
      step: 1,
      grid: true,
      grid_snap: true,
      onChange: function(data) {
        Session.set("data-from",data.from);
        Session.set("data-to",data.to);
        var courses = Session.get('courses');
        var student = Session.get('student');
        if(Websocket.readyState == 1) {
          var str = "";
          if(courses) {
            for (var i=0; i<courses.length-1; i++){ str += '{"id": "'+courses[i]+'", "compliance": 5},'; }
            str+= '{"id": "'+courses[courses.length-1]+'", "compliance": 5}';
            Websocket.send('{"requestId": "'+Meteor.connection._lastSessionId+'",'+
            '"student": [{"id": '+student+',"gpa": 7.0793,'+
            '"performance": 0.6,"compliance": 3}],'+
            '"courses": ['+ str + '],'+
            '"data": [{"from": '+data.from+',"to": '+data.to+','+
            '"program": true,'+
            '"sylabus": true,'+
            '"evaluation": false,'+
            '"instructors": true,'+
            '"compliance": 2}]}');
          }
        } else if (Websocket.readyState == 3) {
          // $("#paperToast").attr("text","Lost connection...");
          // document.querySelector('#paperToast').show();
        }
      }
    });

    var data = [
      { x: 0,  y: 6013},
      { x: 1,  y: 16512},
      { x: 2,  y: 23558},
      { x: 3,  y: 24498},
      { x: 4,  y: 25086},
      { x: 5,  y: 24412}
    ];


    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width  = 335,
    height = 170;

    var x = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.x; })])
    .range([0, width]);

    var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.y; })])
    .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

    var area = d3.svg.area()
    .x(function(d) { return x(d.x); })
    .y0(height)
    .y1(function(d) { return y(d.y); });

    var svg = d3.select("svg#area")
    .attr("width",width)
    .attr("height",height)
    .insert("g")
    .attr("transform", "translate(0,0)")
    .attr("class", "animated flipInX");

    svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area);

  },250);
};
