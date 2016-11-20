/*
This file contains references to the vendor libraries
we're using in this project. This is used by webpack
in the production build only. A separate build for vendor
code is useful since it's unlikely to change as often
as the application's code.

All the libraries we reference here will be written to
vendor.js so they can be cached until one of them
changes. This avoids customers having to download a huge
js file anytime a line of our code changes.

Any files that aren't referenced here will be bundled
into main.js for the production build.
*/

/* eslint-disable no-unused-vars */

import fetch from 'whatwg-fetch';
