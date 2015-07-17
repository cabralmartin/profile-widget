# profile-widget

A widget to work with the `user_metadata` field of a user entity. This widget assumes the user has already logged in and an authZ token is ready. For information about how to produce such token you can refer to the [auth0 docs](https://auth0.com/docs).

If you would like to use this widget you will need to go trough a quick setup on both your on code which is discribed further below.

## How does it work?
Once initialized, this is what happens under the hood:

1. Query the [auth0 API](https://auth0.com/docs/api/v2) for the details of a user and parse the `user_metadata` object in the response. 
2. Extract metadata for the different properties to track.
3. Search the DOM for a `form` element with data attribute `data-user-form` and enumerate its properties.
4. For each form property, look for a backing field in the `user_metadata` response object and if present use it to populate the field.
5. Attach to the form submit event.
5. On form submit, grab the values of the form's fields and sent it back to the server.

## Usage
### Code
#### HTML

1. Add the profile-widget script to your HTML.

``` HTML
<script type="text/javascript" src="fwd.link/profile-widget.js"></script>
```

2. Create a form with an attribue `data-user-form` for editing the user profile. 
3. For each field add the attribute `name` with the key you want to match on the `user_metadata` object. Alternatively, you can specify a `data-user-property` attribute for the same purpose. When both `name` and data attribute are present, the data attribute takes precedence.
5. Add a button with `type=submit`.

``` HTML
<form data-user-editing-form>
  First name:<br>
  <input type="text" name="firstname">
  <br>
  Last name:<br>
  <input type="text" name="surname" data-user-property="lastname">
  <br>
  <button type="submit">Submit</button>
</form>
```

#### JavaScript

1. Initialize a new instance of the `ProfileWidget` with a valid token and userId. Optionally you can specify an error callback.

> *Note:* You can get more information on how to aquire a user token and id by browsing the [auth0 docs](https://auth0.com/docs)

``` JS
// Instantiate the widget with the token and user id
var profileWidget = new ProfileWidget(authToken, userId, function (error) {
  console.log(error.code);
  console.log(error.msg);
});
```

2. When you are ready call the `populateForm` method. This will launch the query to the server to get back the user's information.

``` JS
profileWidget.populateForm
```

That's it! The widget is now functional! 

### Dashboard
The  `user_metadata` object serves as a backing field to where the user information will be stored. Here you can play with the fields values.

``` JS
"user_metadata" {
  "name": "Anna",
  ...,
  "lastName": "Richards"
}
```

## Comming up
* Tests
* More Examples
* Minified sources
