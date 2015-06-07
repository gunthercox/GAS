var feed_url = "http://blog.salvius.org/feeds/posts/default?alt=json&max-results=3";

$feed = $(".js-feed");

$post_template = $(
    '<a target="blank">' +
        '<div class="card grey darken-1">' +
            '<div class="card-content white-text">' +
                '<span class="card-title">' +
                    '<span class="js-title"></span>' +
                    '<span class="btn-floating deep-orange lighten-1 center white-text right">' +
                        '<span class="mdi-hardware-cast-connected"></span>' +
                    '</span>' +
                '</span>' +
                '<p class="white-text js-text"></p>' +
            '</div>' +
        '</div>' +
    '</a>');

$.get(feed_url, function(data) {

    for (var i = 0; i < data.feed.entry.length; i++) {
        var $post = $post_template.clone();

        $post.attr("href", data.feed.entry[i].link[2]["href"]);
        $post.find(".js-title").html(data.feed.entry[i].title.$t);

        $feed.append($post);
    }

});
