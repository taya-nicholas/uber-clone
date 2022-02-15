# About

This is a proof of concept clone of Uber, written in React Native, and based on various online resources (eg. Sonny Sangha).

## Tech stack

- React native: the framework. It allows the app to be exported to both Android and IOS.
- Tailwind: for styling components.
- Redux: for state managament, in this case storing origin and destination locations.
- Google APIS:
  -- Google places autocomplete: gives a dropdown menu to select locations
  -- Google maps: displays selected origin and destination as markers on a map.
  -- Google distance matrix: allow distance and shorted path to be calculated between two points.

# How to run

The app has be published on expo (https://expo.dev/@taya-nicholas/uber-clone?serviceType=eas&disttribution=expo-go), run on physical device by installing expo go, and scanning the QR code from the provided link.
Alternatively, clone the repo, install expo cli, and run expo start in the project root directory.

- You can install expo-cli with the command:
- $ npm install -g expo-cli

# Example use

![intial home screen](/images/1-initial-home-screen.jpg)
![select origin](/images/2-select-origin.jpg)
![origin selected](/images/3-origin-selected.jpg)
![select destination](/images/4-select-destination.jpg)
![destination selected](/images/5-destination-selected.jpg)
![choose car](/images/5-destination-selected.jpg)

# What it does

- Requires you to select a NZ location through google places autocomplete.
- Button to navigate to the 'get ride' page.
- Displays google maps for the currently selected location.
- Requires a destination to be selected (through google places autocomplete).
- Calculates shortest path between origin and destination - displays distance, path on map, and cost estimate for different car types.
- Once a car is selected, it is highlighted, and the choose button becomes pressable.

# What it doesn't do

- The order food page is empty.
- Home and work shortcuts currently don't affect the location redux store. There is also no way add or remove them (they are essentially just UI elements.).
- The eats button (when selecting destination) does not do anything.
- The cost of a given ride is sometimes not properly rounded.
- Choosing a car for a given ride does not do anything.

# Current problems

1. When selecting destination, autocomplete dropdown is hidden by rides/eats buttons.
   -- Possibel reason: The rides/eats buttons have higher priority, or are not included in the keyboard ignoring view.
   -- Possible solution: Use some sort of keyboard ignoring view for dropdown, or rides/eats buttons, or both.
   -- Alternatively, find a way to hide the map while typing.

2. After selecting destination, the map is not automatically resized. However, it is resized if you return to previous page and tap the destination text.
   -- Possible reason: resizing happens with the map onLayout property. Somehow adding the destinaton doesn't trigger this.
   -- Possible solution: Either change the onLayout properity to something that does trigger, or find a way to resize without marker bounds.