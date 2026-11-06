Chef's Menu Manager

Student Info
*Name:* Nompumelelo Tshabalala
*Student Number:* ST10099914
*Module:* MAST5112 - Final POE


Overview
Chef's Menu Manager is a React Native app built in Snack. It allows a chef to manage a restaurant menu digitally — add dishes, edit dishes, delete dishes, search, filter, and view live statistics.

The GitHub repo also includes supporting HTML, CSS, and JS files to demonstrate web structure and documentation.

Demo Video
Watch the demo here: https://youtube.com/shorts/8VHrFFzBvYg?si=1grZBlxCNTS-OCEP

Goals & Features

*Menu Management:*
- Add dishes with name, description, course, and price
- Validate required fields (no empty name, price, or course)
- View full menu list with clean card layout
- Edit existing menu item
- Update menu item and save changes
- Delete menu item with confirmation

*Search & Filter:*
- Search menu items by name
- Filter by course using filter buttons: All, Starter, Main, Dessert
- Clear Filter functionality to show full menu again

*Statistics Dashboard:*
- Displays total number of menu items
- Displays average menu price
- Displays Starter course count
- Displays Main Course count
- Displays Dessert count

*Additional Screens:*
- Enquiry form with validation
- Contact page with organisation details

Sitemap
- Home → http://index.html
- About Us → http://about.html
- Products → http://products.html
- Enquiry → http://enquiry.html
- Contact → http://contact.html

File Structure

/index.html
/about.html
/products.html
/enquiry.html
/contact.html
/css/style.css
/js/script.js
App.js
package.json
README.md

Change Log - Features Added Since Part 2

*New Functionality:*
- Added Edit Menu Item functionality
- Added Update Menu Item functionality
- Added Delete Menu Item functionality
- Added Search Menu Item by name
- Added Course Filter using custom filter buttons
- Added Clear Filter functionality
- Improved menu item display layout
- Added better validation for user input
- Added additional success and error messages

*Refactoring Changes:*
- Created reusable `clearForm()` function
- Improved code organisation
- Improved variable and function naming
- Reduced repeated code
- Improved screen navigation
- Improved user feedback and alerts
- Improved consistency across screens
- Improved overall user experience

*Technical Fix - Final POE:*
- Removed `@react-native-picker/picker` dependency from `package.json` due to Expo Snack build conflict
- Replaced Picker with native `TouchableOpacity` filter buttons for course filtering (All / Starter / Main / Dessert)
- This improves compatibility, removes external dependency, and keeps full filter functionality working in Snack

*Statistics Improvements:*
- Displays total number of menu items
- Displays average menu price
- Displays Starter course count
- Displays Main Course count
- Displays Dessert count
