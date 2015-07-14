# profile-widget

A widget to update the `user_metadata` field of a user entity. This widget assumes the user has already logged in and an authZ token is ready. For information about how to produce such token you can refer to the [auth0 docs](https://auth0.com/docs).

If you would like to use this widget you will need to go trough a quick setup on both your dashboard and code. Below, the details.

## How this works?
The widget will query the [auth0 API](https://auth0.com/docs/api/v2) for the details of a user and parse the `user_metadata` object in the response. From this object the widget will acquire metadata for each field we want to modify and will create a form for such purpose. The results of this form will also be stored on the `user_metadata` field.

## Usage
### Code

Add the profile-widget script to your HTML. You can choose the minified version (comming soon!) or the commented version.

``` HTML
<script type="text/javascript" src="fwd.link/profile-widget.js"></script>
```

In your code, initialize a new instance of the `ProfileWidget` by passing the authZ token and the user id and (optionally) an error callback which will be call on any error. 

> *Note:* You can get more information on how to aquire a user token by browsing the [auth0 docs](https://auth0.com/docs)

``` JS
// Instantiate the widget with the token and user id
var profile = new ProfileWidget(token, userId, function (error) {
  console.error(error.code);
  console.error(error.msg);
});
```

Once initialized, you will need to tell the widget where it should append to the DOM. You can do this with the `render` function passing a selector as a parameter.

``` JS
// Render the profile widget at the target location.
profile.render("#el");
```

You are all set! The widget will render itself at the target location!

### Dashboard
The  `user_metadata` object serves two purposes, it holds the user information and it describes it in a meaningful way we can use to render a form for it.

You will need to define the metadata for the widget's form in the `user_metadata` object. This object will describe each field and its mapping to the underlying property.

````
"user_metadata" {
  fields: [{
      "key": "name",                // Property name to map to
      "label": "Name",              // Form Label
      "type": "input",              // Type of field
      "required": true              // Is this field mandatory?
    }, ... , {
      "key": "sex",
      "label": "Sex",
      "type": "select",
      "options": [{ 
          "key": "Male", 
          "value": "male"
        }, {
          "key": "Female",
          "value": "female",
        }, {
          "key": "N/A",
          "value": "na"
        }],
      "required": true
    }
  ],
  "name": "Anna",
  ...,
  "sex": "female"
}
```

#### Available field types
At this point we support the following field types
* Input - Classic user input
* Select - Dropdown with multiple options

We will be adding more types as we continue working on this project

##### Select Field
If a field is described with `type: select` we will expect to find at the same level an `options` property with an array of valid options. Options objects are expected to have a `key` field (value to be rendered) and a `value` field with the underlaying value.

Options with missing `key`/`value` information will be ignored.
Select fields with empty `options` will be ignored.

### Validations
At this point we support the following field validations
* required (bool) - Mark the field as mandatory

All validations are optional.

We will be adding more types as we continue working on this project.

## Out of scope - Things for the future
* Ability of toggling which fields should be rendered
* Testing (lots of!)
* Extra field types (radio, radio groups, multi-select, etc)
* Custom Validations
* Further error handling
