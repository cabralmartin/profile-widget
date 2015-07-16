var DataSource = function (authToken, userId) {
    "use strict"

    // TODO: Extract to cfg file
    this.apiBaseUri = 'https://mysampleapp.auth0.com/api/v2/users/' + userId;

    this.authHeader = 'Bearer ' + authToken;
};

DataSource.prototype.queryServerSecure = function (method, url, callback, errorCallback, data) {
    var request = new XMLHttpRequest();

    request.open(method, url, true);
    request.setRequestHeader("Authorization", this.authHeader);
    request.setRequestHeader('Content-type','application/json; charset=utf-8');

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                if (callback) {
                    callback(JSON.parse(request.responseText));
                }
            } else  if (errorCallback) {
                errorCallback({ code: 1, msg: 'Comm Error'});
            }
        }
    };

    request.send(JSON.stringify(data));
};

DataSource.prototype.getUserProfile = function (callback, errorCallback) {
    this.queryServerSecure('GET', this.apiBaseUri, callback, errorCallback);
};

DataSource.prototype.submitUserProfile = function (payload, callback, errorCallback) {
    this.queryServerSecure('PATCH', this.apiBaseUri, callback, errorCallback, payload);
};
