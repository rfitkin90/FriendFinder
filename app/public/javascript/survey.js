$(document).ready(function () {


    // var to store potential friend array locally
    var potentialFriends;
    $.get("/api/friends/", function (data) {
        potentialFriends = data;
    });

    // user submits survey answers
    $('#survey-submit').on('click', function (e) {
        e.preventDefault();

        // array to hold answers
        var answersArr = [];
        // object to store score deltas for each potential friend
        var scoreDeltas = [];

        // push the answers to the answersArr
        for (var i = 0; i < 10; i++) {
            var answer = Number($(`#answer-${i}`).val());
            answersArr.push(answer);
        }

        console.log(potentialFriends);

        // for each potential friend...
        potentialFriends.forEach(elem => {
            // push a new object to scoreDeltas array with a name key and total delta key
            scoreDeltas.push({
                name: elem.name,
                totalDelta: 0
            });
            // for each answer that potential friend gave...
            for (var i = 0; i < elem.scores.length; i++) {
                // find the delta between yours and his/her score
                var delta = Math.abs(elem.scores[i] - answersArr[i]);
                // add each delta to the value of the object.key pair you just pushed to scoreDeltas array
                scoreDeltas[scoreDeltas.length - 1].totalDelta += delta;
            }
        });

        // sort the score deltas array based on the scoreDelta property value
        function compare(a, b) {
            if (a.totalDelta < b.totalDelta)
                return -1;
            if (a.totalDelta > b.totalDelta)
                return 1;
            return 0;
        }
        scoreDeltas.sort(compare);

        console.log(scoreDeltas);

        // set user with the lowest delta's name to variable
        var selectedFriend = scoreDeltas[0].name;

        // find the index in the potentialFriends array with that user's name
        var i = potentialFriends.findIndex(elem => elem.name === selectedFriend);

        // show the modal and set its html content to the chosen friend's name/picture
        $('#suggested-friend-modal-body').html(`
            <p>${potentialFriends[i].name}!</p>
            <img src="${potentialFriends[i].photo}" alt="${potentialFriends[i].name}">
        `);
        $('#suggested-friend-modal').modal('show');

        // create an new user object to be posted to the database
        var newUser = {
            name: $("#name-input").val().trim(),
            photo: $("#photo-input").val().trim(),
            scores: []
        };
        for (var i = 0; i < 10; i++) {
            newUser.scores.push($(`#answer-${i}`).val().trim())
        }
        console.log(newUser);

        // post the object to database
        $.post("/api/friends", newUser,
            function () {

                // Clear the form when submitting
                $("#name-input").val("");
                $("#photo-input").val("");
                for (var i = 0; i < 10; i++) {
                    $(`#answer-${i}`).val("1");
                }

            });
        ;
    });


});