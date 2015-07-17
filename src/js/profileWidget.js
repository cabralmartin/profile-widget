// TODO: Add more error handling
// TODO: Extract error constants to separate file
var ProfileWidget = function (authToken, userId, errorCallback) {
    this.apiBaseUri = 'https://mysampleapp.auth0.com/api/v2/users/' + userId;
    this.authHeader = 'Bearer ' + authToken;
    this.errorCallback = errorCallback;
};

ProfileWidget.prototype.queryServerSecure = function (method, url, callback, errorCallback, data) {
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

ProfileWidget.prototype.getUserProfile = function (callback, errorCallback) {
    this.queryServerSecure('GET', this.apiBaseUri, callback, errorCallback);
};

ProfileWidget.prototype.submitUserProfile = function (payload, callback, errorCallback) {
    this.queryServerSecure('PATCH', this.apiBaseUri, callback, errorCallback, payload);
};

ProfileWidget.prototype.disableForm = function (shouldDisable) {
    var form = document.querySelector('[data-user-form]'),
        elementsLength = form.elements.length,
        i;

    for (i = 0; i < elementsLength; i ++) {
        form.elements[i].disabled = shouldDisable;
    }
};

ProfileWidget.prototype.onGetUserSuccess = function (data) {
    var form = document.querySelector('[data-user-form]'),
        emailField = document.querySelector('.current-user');

    if (!form || !data || !data.user_metadata) {
        this.disableForm(false);
        return;
    }

    data = data.user_metadata;

    var elementsCount = form.length;

    for (var i = 0; i < elementsCount; i++) {
        var element = form.elements[i];

        if (data.hasOwnProperty(element.getAttribute('data-user-property'))) {
            element.value = data[element.getAttribute('data-user-property')]
        } else if (data.hasOwnProperty(element.name)) {
            element.value = data[element.name];
        }

    }

    this.disableForm(false);
};

ProfileWidget.prototype.populateForm = function () {
    var form = document.querySelector('[data-user-form]');

    if (!form) {
        if (this.errorCallback) {
            this.errorCallback({ code: 2, msg: 'Form not found'});
        }
        return;
    }

    this.disableForm(true);

    form.addEventListener('submit', this.onSubmitClicked.bind(this));
    this.getUserProfile(this.onGetUserSuccess.bind(this), this.errorCallback.bind(this));
};

ProfileWidget.prototype.onSubmitClicked = function (e) {
    var form = document.querySelector('[data-user-form]'),
        payload = { "user_metadata": {} };

    this.disableForm(true);

    var elementsCount = form.length;

    for (var i = 0; i < elementsCount; i++) {
        var element = form.elements[i];

        if (element.getAttribute('data-user-property')) {
            payload.user_metadata[element.getAttribute('data-user-property')] = element.value;
        } else if (element.name) {
            payload.user_metadata[element.name]  = element.value;
        }
    }

    var self = this;

    this.submitUserProfile(payload, function () { self.disableForm(false); }, this.errorCallback.bind(this));
    e.preventDefault();
};
