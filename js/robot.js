var robot_count = 0;
var robot_count_element = $(".js-robot-count");
var robot_list = $(".robot-list");


// http://192.168.1.11:4000/api/robots/Smith/devices/lightSensor/events
var test_robot_ip = "192.168.1.9";
var test_robot_response = {
    "name": "salvius@salvius.org"
};



var Gravatar = function(email) {
    if (this.email_is_valid(email)) {

        var hash = md5($.trim(email).toLowerCase());
        var base = "http://www.gravatar.com/";
        var url = base + hash + ".json";

        return $.get(url);
    }

    return null;
};

Gravatar.prototype.email_is_valid = function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};



var Robot = function(container, element) {
    this.container = container;
    this.element = element;


    var gravatar = new Gravatar(test_robot_response["name"]);

    gravatar.done(function(data) {
        var thumbnail_url = data.entry[0].thumbnailUrl + "?s=200";

        console.log(data.entry[0].displayName, thumbnail_url);
    });

    gravatar.error(function() {
        // TODO: In the case that a gravatar was not found, use the default
    });

};

Robot.prototype.create = function(data, ip) {
    robot_count += 1;
    robot_count_element.text(robot_count);
    this.container.append(this.element);

    var accordion = $('<ul class="collapsible z-depth-1" data-collapsible="accordion"></ul>');

    var avatar = $(
        '<li class="white">' +
            '<img class="responsive-img"/>' +
        '</li>');

    avatar.find("img").prop("src", "salvius.png");

    accordion.append(avatar);

    var settings = $('<li class="white"></li>');

    var header = $(
        '<div class="collapsible-header teal white-text">' +
            '<strong></strong>' +
        '</div>');

    header.find("strong").html('<span><i class="mdi-action-settings"></i> ' + data.name + '</span>');

    var body = $(
        '<div class="collapsible-body">' +
            '<p>' +
                '<a class="btn orange">' +
                    'Unfriend' +
                '</a>' +
            '</p>' +
        '</div>');

    settings.append(header);
    settings.append(body);
    accordion.append(settings);
    this.element.append(accordion);

};

Robot.prototype.destroy = function() {
    robot_count -= 1;
    robot_count_element.text(robot_count);
    this.element.remove();
};



var e = $('<div class="col s6 m4 l4"></div>');
var robot = new Robot(robot_list, e);
robot.create(test_robot_response, test_robot_ip);

/*
$("add-robot").click(function() {
    var e = $("<div></div>");
    var robot = new Robot(list, e);
    robot.create();
});*/
