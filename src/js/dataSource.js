var DataSource = function (authToken, userId, $) {
    "use strict"
    
    // TODO: Extract to cfg file
    var apiBaseUri = 'https://mysampleapp.auth0.com/api/v2/users/';

    this.getUserProfileByToken = function (callback, errorCallback) {
        console.log('fetching user')
        $.ajax({
            url: apiBaseUri + userId,
            headers: {"Authorization": "Bearer " + authToken},
            type: 'GET',
        }).done(callback).fail(errorCallback);
    };

    this.submitUserProfile = function (payload, callback, errorCallback) {
        $.ajax({
            url: apiBaseUri + userId,
            data: payload,
            headers: {"Authorization": "Bearer " + authToken},
            type: 'PATCH',
        }).done(callback).fail(errorCallback);
    };
};
