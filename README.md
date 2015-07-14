# profile-widget

A widget to update the `user_metadata` field of a user entity. This widget assumes the user has already logged in and an authZ token is ready. For information about how to produce such token you can refer to the [auth0 docs](https://auth0.com/docs).

If you would like to use this widget you will need to go trough a quick setup on both your dashboard and code. Below, the details.

## How does it work?
Once initialized, this is what happens under the hood
1. Query the [auth0 API](https://auth0.com/docs/api/v2) for the details of a user and parse the `user_metadata` object in the response. 
2. Extract metadata for the different properties to track.
3. Search the DOM for a `form` element with class `user-metadata-form` and bind to it's `submit` event.
4. For each field specified in the server response, look inside the form for a matching input field and populate it.
5. On form submit, grab the value of the tracked input fields and send it back to the server.

## Usage
### Code
#### HTML

1. Add the profile-widget script to your HTML.

``` HTML
<script type="text/javascript" src="fwd.link/profile-widget.js"></script>
```

2. Create a form with class `user-metadata-form` for editing the user profile. 
3. For each field add the attribute `data-user-property` with the corresponding value defined on the `user_metadata` field.
4. Add a button with `type=submit`.

``` HTML
<form class="user-metadata-form">
  First name:<br>
  <input type="text" data-user-property="firstname">
  <br>
  Last name:<br>
  <input type="text" data-user-property="lastname">
  <br>
  <button type="submit">Submit</button>
</form>
```

#### JavaScript

1. Initialize a new instance of the `ProfileWidget` with a valid token and userId. Optionally you can specify an error callback.

> *Note:* You can get more information on how to aquire a user token and id by browsing the [auth0 docs](https://auth0.com/docs)

``` JS
// Instantiate the widget with the token and user id
var profile = new ProfileWidget(authToken, userId, function (error) {
  console.log(error.code);
  console.log(error.msg);
});
```

That's it! The widget is now functional! 

### Dashboard
The  `user_metadata` object serves two purposes, it holds the user information and it describes it in a meaningful way we can use to render a form for it.

You will need to define the metadata for the widget's form in the `user_metadata` object. This object will describe each field and its mapping to the underlying property.

````
"user_metadata" {
  fields: [{
      "key": "name",                // Name of the backing property on the user_metadata object
      "fieldKey": "name"            // Value of the data-user-property to map to this field
    }, ... , {
      "key": "lastName",
      "fieldKey": "lastName"
    }
  ],
  "name": "Anna",
  ...,
  "lastName": "Richards"
}
```

## Limitations
At this time the widget only supports `input` fields of `type=text`.

## Comming up
* Tests
* More Examples
* Minified sources
