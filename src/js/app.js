// TODO: Extract the 'controller' code to a controller object and the initialization code / setup to another

(function (DataSource) {
    "use strict"

    // TODO: Define how the token / user Id will be adquired
    var AuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJDOExFZkVmcEVMV0xCUExHcGVsSFF5ODdXemR6VDVEdyIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiLCJ1cGRhdGUiXX19LCJpYXQiOjE0MzY4OTk5NzAsImp0aSI6ImNkZGQyMWIxYWU3ZDBkYjg1N2JlYWJlM2U2ZjBlMmRlIn0.THBuc6BY4aonSgCjnC52t6aYRKlqLwUuxcUNGhsDbyI',
        UserId = 'auth0%7C559efb74253eb1ba031515d4';

    var dataSource = new DataSource(AuthToken, UserId),
        form = document.querySelector('[data-user-form]'),
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
        var errorLabel = document.querySelector('.error-label');
        errorLabel.style.display = shouldShow ? 'block' : 'none';
    }

    disableForm = function (shouldDisable) {
        var form = document.querySelector('[data-user-form]'),
            elementsLength = form.elements.length,
            i;

        for (i = 0; i < elementsLength; i ++) {
            form.elements[i].disabled = shouldDisable;
        }
    };

    onGetUserSuccess = function (data) {
        var nameField = document.querySelector('#nameInput'),
            familyNameField = document.querySelector('#familyNameInput'),
            emailField = document.querySelector('.current-user');

        disableForm(false);

        if (!data || !data.user_metadata) {
            return;
        }

        emailField.textContent = data.email;
        nameField.value = data.user_metadata.name;
        familyNameField.value = data.user_metadata.familyName;
    };

    onUpdateUserSuccess = function () {
        disableForm(false);
    };

    onSubmitClicked = function (e) {
        var payload = {
            "user_metadata": {
                "name": document.querySelector('#nameInput').value,
                "familyName": document.querySelector('#familyNameInput').value
            }
        };

        disableForm(true);
        showErrorMessage(false);

        dataSource.submitUserProfile(payload, onUpdateUserSuccess, onError);

        e.preventDefault();
    };

    form.addEventListener('submit', onSubmitClicked);

    document.addEventListener('DOMContentLoaded', function () {
        disableForm(true);
        dataSource.getUserProfile(onGetUserSuccess, onError);
    }, false);

}(DataSource));
