document.addEventListener(
    'rating-widget-initialsed',
    () => {
        if (window.ratingSnippet === undefined) return false;

        window.ratingSnippet('ruk_rating_snippet', {
            store: 'maap',
            color: '#000',
            linebreak: true,
            writeButton: true,

            callback: function() {
                //by default the widget adds "22 Reviews" beneath the stars.  This will change it to "Read Reviews (22)"
                var completeRatingSnippets = document.querySelectorAll(
                    '.ruk_rating_snippet[data-done]'
                );
                var completeRatingSnippet = false;

                for (var i = 0; i < completeRatingSnippets.length; i++) {
                    completeRatingSnippet = document.querySelector(
                        '.ruk-rating-snippet-count',
                        completeRatingSnippets[i]
                    );
                    completeRatingSnippet.innerText =
                        'Read Reviews ' + completeRatingSnippet.innerText;
                }
            },
        });

        return true;
    },
    { once: true }
);
