// TODO: Extract the 'controller' code to a controller object and the initialization code / setup to another

(function ($, DataSource) {
    "use strict"

    // TODO: Define how the token / user Id will be adquired
    var AuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJDOExFZkVmcEVMV0xCUExHcGVsSFF5ODdXemR6VDVEdyIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiLCJ1cGRhdGUiXX19LCJpYXQiOjE0MzY4OTk5NzAsImp0aSI6ImNkZGQyMWIxYWU3ZDBkYjg1N2JlYWJlM2U2ZjBlMmRlIn0.THBuc6BY4aonSgCjnC52t6aYRKlqLwUuxcUNGhsDbyI',
        UserId = 'auth0%7C559efb74253eb1ba031515d4';

    var dataSource = new DataSource(AuthToken, UserId, $),
        submitButton = $('button[type=submit]'),
        onGetUserSuccess,
        onUpdateUserSuccess,
        onSubmitClicked,
        onError,
        disableForm,
        showErrorMessage;

    onError = function () {
        showErrorMessage(false);
    };

    showErrorMessage = function (shouldShow) {
        var errorLabel = $('.error-label');
        shouldShow ? errorLabel.show() : errorLabel.hide();
    }

    disableForm = function (shouldDisable) {
        $(".user-profile-form :input, .user-profile-form :button").attr("disabled", shouldDisable);
    };

    onGetUserSuccess = function (data) {
        var nameField = $('#nameInput'),
            familyNameField = $('#familyNameInput'),
            emailField = $('.current-user');

        if (!data || !data.user_metadata) {
            return;
        }

        emailField.text(data.email);
        nameField.val(data.user_metadata.name);
        familyNameField.val(data.user_metadata.familyName);

        disableForm(false);
    };

    onUpdateUserSuccess = function () {
        disableForm(false);
    };

    onSubmitClicked = function () {
        var payload = {
            "user_metadata": {
                "name": $('#nameInput').val(),
                "familyName": $('#familyNameInput').val()
            }
        };

        disableForm(true);
        showErrorMessage(false);

        dataSource.submitUserProfile(payload, onUpdateUserSuccess, onError);
    };

    submitButton.on('click', onSubmitClicked);

    $(function () {
        disableForm(true);
        dataSource.getUserProfileByToken(onGetUserSuccess, onError);
    });

}(jQuery, DataSource));
