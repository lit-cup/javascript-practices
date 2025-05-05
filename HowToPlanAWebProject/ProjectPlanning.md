How could we planning method using project 6 Mapty to example

# 1. PLANNING STEP 

```
1. USER STORIES -> 2. FEATURES -> 3. FLOWCHART -> 4. ARCHITECURE
```
  - **USER STORIES:** Description of the application's functionality from the user's perspective. All user stories put together describe the entrie appliction
  - **FLOWCHART:** WHAT we will build
  - **ARCHITECTURE:** HOW we will build it  


---

1. User Stories:
   Description of the application's functionality from the user's perspective.

- Common Format: 
   
   ```
   As a [type of user], i want [an action] so that [a benefit].
    ```
  *type of user: Who? ex: user, admin, etc.* 
  *an action: What?* 
  *a benefit: why?*

- 1. As a user, I want to log my running workouts with loaction, distance, time, pace and steps/minute, so i can keep a log of all my running.
- 2. As a user, I want to log my cycling workouts with loaction, distance, time, speed and elevation gain, so i can keep a log of all my cycling.
- 3. As a user, I want to see all my workouts at a glance, so i can easily track my progress over time
- 4. As a user, I want to also see my workouts on a map, so i can easily check where i work out the most
- 5. As a user, I want to see all my workouts when i leave the app and come back later, so that i can keep using there app over time.
**- 6. As a user, I want to see how maney times i going to workouts loaction, so that i could check where is the closest place we could go**


---


2. FEATURE:

   # from user stories:

   1. log my running workouts with location, distance, time, pace and steps/minute
   
      - Map where user clicks to add new workout(best way to get location coordinates)
      - Use Geoloaction to display map at current location (more user friendly)
      - Form to distance, time, pace, steps/minute
   
   2. log my cycling workouts with location, distacnce, time, speed and elevation gain
      - Form to input distance, time, speed, elevation gain.
  
   3. See all my workouts at a glance
      - Display all workouts in a list
  
   4. See my workouts on a map
      - Display all workouts on the map

   5. See all my workouts when I leave  the app and come back later
      - Sotre workout data in the browser using local storage API
      - On page load, read the saved data from loacl storage and display
   
   6. See the how maney times we going to workout loaction.
      - count the times and display with 4


---


3. FLOWCHART
![image](HowToPlanAWebProject\flowchart.png)


---


4. ARCHITECURE


# 2. DEVELOPMENT STEP - Implementation of our plan using code
