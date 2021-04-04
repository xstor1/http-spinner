# HttpSpinner

This library is used for displaying loading spinner when http calls begins.

## How to use
### Registration to module
It is so simple to use, just register `HttpSpinnerModule` to imports.
After that add this: 
`  {
provide: HTTP_INTERCEPTORS,
useClass: InterceptorService,
multi: true
}`
to providers and all configuration is done.
### Specify place where you want to have a loading spinner
Now the magic will happen. Choose place where you want to have a spinner and that place wrap with this components:
`<http-spinner>`
Something like that: `<http-spinner><my-custom-components></my-custom-components></http-spinner>`
#### Inputs
The component has 2 inputs: 
####customLoading
Custom loading is simple bool value by default TRUE. And it activate my custom loading bar. (In future you will define your custom loading svg)
If you choose FALSE it will you mat-spinner from angular material library.
####filterBy
Filter by is string or array of strings where you can type part of URL's and the spinner will react only to urls which includes your strings. 
###Demo
Demo is not done yet! If you have a time do it yourself and contact me i will provide it here
