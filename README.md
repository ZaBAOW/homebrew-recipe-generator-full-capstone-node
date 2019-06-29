# Homebrew Recipe generator (Node)

## Description
The main goal of the homebrew recipe generator is to allow for the sharing
and promoting of brew recipes created by and shared between fellow
homebrewers

### Active demo

## API enpoint purposes

### Brew Router
    #### GET
        '/getArchive/:id':
                parses database for current user's id and retrieves all
                brews that have the matching user id value.
                
        '/viewBrew/:id':
                parses for and retrieves all parts of the selected brew
                to be viewed either on the browser page or archive page.
                
        '/get-all':
                retrieves all brews currently in the database
                
        '/get-one/:keyword':
                retrieves all brews that have a brewName value that
                includes the string value provided by the user's 
                search input
                
    #### DELETE
        '/deleteRecipe/:id':
                removes the requested brew and respective recipe elements
                from the database. (to be implemented further down development)
                
    #### PUT
        '/:id':
                updates values of requested brew recipe with values given by the user
                
    #### POST
        '/':
                posts a brew and its respective recipe elements to the 
                database
                
### User Router
    #### GET
        '/':
                retrieves all existing users from the database 
                
        '/:id':
                retrieves a single user with the matching given user id
                
    #### DELETE
        there are no DELETE enpoints
        
    #### PUT
        there are not PUT enpoints
        
    #### POST
        '/':
                creates a new user in database after user has singed up for
                the site.
                
### Auth Router
    #### GET
        "/userLoggedIn":
                retireves a list of users that are currently logged into the site
                
    #### DELETE
        "/userLoggedIn"
                removes a user from the logged in list after logging out
                
    #### PUT
        There are no PUT endpoints
    #### POST
        '/login':
                creates an authToken for the user to verify their logged in status on the site
                
        '/refresh':
                refreshes a users authToken in the event of authToken expiration in order to perserver the user's "logged in" status
                
        "/userLoggedIn":
                addes the user to the list of logged in users so it can be accessed in by the other respective endpoints
                
## Technical
Homebrew-recipe-generator was built with:

### Front end
    - HTML5
    - CSS
    - Javascript
    - jQuery
    - Reactjs
    
### Back end
    - Node.js
    - Mongoose.js
    - Express
    - Morgan
    - Mocha and Chai (for testing yet to be implemented)
    - mLab database
    
## Roadmap
(include discussions of ambitious impovemnent and thoughts of monotization of website)
- Allowing users to comment on and like a brew recipes
- Allow users to like/dislike brews found by the browser

## Typical Commands for Node.js and React.js
### React command lines
    - npm intall ==> install all node modules
    - npm start ==> run react server on http://localhost:3000
    
### Node command lines
    - npm install ==> install all node modules
    - npm nodemon ==> run node server