(function (ProfileWidget) {
    "use strict"

    var AuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJDOExFZkVmcEVMV0xCUExHcGVsSFF5ODdXemR6VDVEdyIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiLCJ1cGRhdGUiXX19LCJpYXQiOjE0MzY4OTk5NzAsImp0aSI6ImNkZGQyMWIxYWU3ZDBkYjg1N2JlYWJlM2U2ZjBlMmRlIn0.THBuc6BY4aonSgCjnC52t6aYRKlqLwUuxcUNGhsDbyI',
        UserId = 'auth0%7C559efb74253eb1ba031515d4';

    var onError,
        showErrorMessage;

    onError = function () {
        var errorLabel = document.querySelector('.error-label');
        errorLabel.style.display = 'block';
    };

    // Construct the ProfileWidget object
    var profileWidget = new ProfileWidget(AuthToken, UserId, onError);

    document.addEventListener('DOMContentLoaded', function () {
        profileWidget.populateForm();
    }, false);

}(ProfileWidget));
