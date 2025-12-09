1. maptyApp initialization:
   - Get user position (Geolocation API)
     - Initialize map (async)
       - Load localStorage data
         → Rebuild workout instances
         → Render workout list in sidebar
         → Render markers & routes on map
       - Setup one-time map click listener (for mark 1)
       - Initialize Tool UI behavior
   - Register all app-level event listeners
     → Form submit
     → Type change
     → Workout list click (sidebar)
     → Sort
     → Delete All
     → Show All
2. User click on the map( first click)
   - Store mark 1
   - Render mark 1 on map
   - Enable one-time listener for mark 2
3. User click second point on the map
   - Store mark 2
   - Render mark 2
   - Generate route from mark 1 → 2
   - Render route on map
4. User submits workout form
   - Validate form inputs
   - Create workout instance (Running / Cycling)
   - Store workout + route values
   - Render workout list item
   - Update localStorage
5. User change type of workout
   - Toggle input fields to match workout type (Running / Cycling)
   - Update UI units accordingly
6. User click form item in the sidebar
   - Find workout by ID
   - Sidebar mini-size toggle
   - Find corresponding route by workout id
   - Render map view: show 2 markers + route
   - Move mapView to workout location
7. User click form Sort button
   - Sort workouts by distance
   - Re-render sidebar list
   - Save sorted order to localStorage
8. User click DelAll button
   - Remove all markers from map
   - Remove all routes
   - Clear localStorage
   - Reset workout list UI
   - Reset tool states (UI reset)
9. User click ShowAll button
   - Check map is initialized
   - Expand sidebar if minimized
   - Fit map view to include all markers
10. TooUI initialization
    - Register all Tool UI event listeners
      → Edit button click
      → Edit button hover
      → Delete All button hover
      → Show All hover
      → Sort hover
11. User click edit button
    - Toggle visibility of Delete All button
    - Change icon img src
    - Show / hide tooltip
12. User hovers over Tool button (edit, deAll, ShowAll, Sort button)
    - Show tooltip on hover
    - Hide tooltip on mouseout
13. Workout base initialization
    - Set workout id
    - Generate description
14. Running extends Workout
    - Set type = 'running'
    - calcPace()
    - setDescription()
15. Cycling initialization extend form Workout
    - Set type = 'cycling'
    - calcSpeed()
    - setDescription()
