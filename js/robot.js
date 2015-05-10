var robot_count = 0;
var robot_count_element = $(".js-robot-count");


// http://192.168.1.11:4000/api/robots/Smith/devices/lightSensor/events
var test_robot_ip = "192.168.1.9";
var test_robot_response = {
    "name": "salvius@salvius.org"
};


// TODO: robot head icon


var RobotList = function(list_container) {
    this.data = {};
    this.element = $(list_container);
};

RobotList.prototype.add = function(robot) {
    console.log(robot.ip);

    // TODO: Check to see if the robot is already in the list

    this.element.append(robot.element);

    this.data[robot.ip] = robot;
};




var Gravatar = function(email) {
    if (this.email_is_valid(email)) {

        var hash = md5($.trim(email).toLowerCase());
        var base = "http://www.gravatar.com/";
        var url = base + hash + ".json";

        return $.get(url);
    } else {
        // TODO: Return the default avatar if there is not a valid email address
    }

    return null;
};

Gravatar.prototype.email_is_valid = function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};



var Robot = function(list) {
    this.list = list;
    this.element = $('<div class="col s6 m4 l4"></div>');


    var gravatar = new Gravatar(test_robot_response["name"]);

    gravatar.done(function(data) {
        var thumbnail_url = data.entry[0].thumbnailUrl + "?s=200";

        console.log(data.entry[0].displayName, thumbnail_url);
    });

    gravatar.error(function() {
        // TODO: If an avatar could not be loaded
    });

};

Robot.prototype.create = function(data, ip) {
    robot_count += 1;
    robot_count_element.text(robot_count);

    this.data = data;
    this.ip = ip;

    var accordion = $('<ul class="collapsible teal z-depth-1" data-collapsible="accordion"></ul>');

    var avatar = $(
        '<li class="white">' +
            '<img class="responsive-img"/>' +

            '<div class="fixed-action-btn right" style="position: relative; right: 5px; top: -45px;">' +
                '<a class="btn-floating btn-large teal lighten-2">' +
                    '<i class="large mdi-action-settings"></i>' +
                '</a>' +
                '<ul>' +
                    '<li><a class="btn-floating red js-unfriend"><i class="large mdi-content-clear"></i></a></li>' +
                  '</ul>' +
              '</div>' +

        '</li>');

    avatar.find("img").prop("src", "salvius.png");

    var name = $('<li class="collapsible-header teal white-text truncate center-align"></li>');
    name.text(data.name);

    accordion.append(avatar);
    accordion.append(name);

    this.element.append(accordion);

    var robot = this;

    avatar.find(".js-unfriend").click(function() {
        robot.destroy();
    });

    robot.list.add(this);
};

Robot.prototype.destroy = function() {
    robot_count -= 1;
    robot_count_element.text(robot_count);
    this.element.remove();
};

var robots = new RobotList(".robot-list");

var robot = new Robot(robots);
robot.create(test_robot_response, test_robot_ip);



$(".js-add-robot").click(function() {

    var ip = $(".js-ip").val();

    Materialize.toast("A friend request has been sent to " + ip, 4000)

    var new_robot = new Robot(robots);

    new_robot.create(test_robot_response, ip);

    Materialize.toast(test_robot_response.name + " has accepted your friend request.", 4000)
});

$(document).ready(function(){
    $('a[href="#about"]').leanModal();
});
