# waiter_webapp

## About
My sister owns a coffee shop, so she asked me to build her a web-Application that will allow her waiters to select the days that they would like to work on.

She also want to see the available waiters per day.

## Waiters are able to:
- Enter their name in the URL(the URL page will redirect them to a page where they will select the days).
- Select 3 working days.
Also update their working days.

## Admin will be able to:
- See available waiter per day.
- Reset schedule for the following week.
- See the days that have less, enough or more waiters.
- See the background-color changes when there are enough(background-color should be green), more(background-color should be orange) and less waiters(background-color should be red).

## Let's start
- Clone my [repository](https://github.com/Amandankosiyane/waiter_webapp/tree/master) from github to your machine.
- Copy and paste the following code to your terminal:
```
 $ git clone https://github.com/Amandankosiyane/waiter_webapp.git.

```
- Before you start anything you first need to make sure that you have the following _installed:_
> NodeJS.

> MongoDB.

> Package.JSON dependencies.

### Installation:
###### NodeJS
- First check if you have NodeJS installed in your machine by typing **node -v**. if you already have NodeJS, your terminal will show you the version of NodeJS that you have. If you do not have NodeJS installed, then install it in your terminal following [these](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04) commands.
###### MongoDB
- Click [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04) to get guidance on how to install mongoDB, **NB:** do part 1 only.
###### Package.JSON dependencies
- Since you already have Package.JSON file, you need to install the dependencies by typing the following command:
```
npm install

```
- Now that you have installed your dependencies JSON file should look like this:
```javascript

{
  "name": "waiter_webapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "body-parser": "^1.17.2",
    "express": "^4.15.4",
    "express-flash": "0.0.2",
    "express-handlebars": "^3.0.0",
    "express-session": "^1.15.5",
    "mongoose": "^4.11.8"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


```
## Let's run the Application locally
- If you installed everything correctly by now you should be able to run the Application locally.
- In your terminal type the following command:
```
- nodemon
or
- node index.js

```
- If you do not have errors you should see this in your terminal(in my case i used nodemon to run the Application):
```
[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index.js`
`open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mongo-client
express-session deprecated undefined resave option; provide resave option index.js:20:9
express-session deprecated undefined saveUninitialized option; provide saveUninitialized option index.js:20:9
web app started on port: 3016

```
- Run the Application in the browser by typing in the localhost number:
```
http://localhost:3016

```
- Then you should be able to run the application.
- If you want to check the admin side just type in the following URL:
```
http://localhost:3016/admin

```

## Let's run the Application on Heroku
- I assume that you already have the following:
> Node.js and npm installed.

> An existing Node.js app.

> A free Heroku account if not then [create](https://signup.heroku.com/dc) one.
- Now you have heroku account so let's deploy on Heroku. Follow these steps to deploy using Heroku:
```
- $ git add .
- $ git commit -m "type in a message"
- $ heroku login
> enter your heroku logins
- $ heroku create
- $ git push heroku master

```
- To run the Application online:
```
$ heroku open

```
- You can now run the Application.
## Tools used to run the online Application
- [MLAB](https://mlab.com/) - Cloud database service that hosts [MongoDB](https://www.mongodb.com/) databases.
- [npm](https://www.npmjs.com/) - Package manager for JavaScript software.

## By:
[Amanda Nkosiyane](https://github.com/Amandankosiyane) codeX student.


































<!--












module.exports = function(models) {

        var Monday = [];
        var Tuesday = [];
        var Wednesday = [];
        var Thursday = [];
        var Friday = [];
        var Saturday = [];
        var Sunday = [];

// var username = req.params.username;
        const waiters = function(req, res, next) {
                res.render('waiters')
        }

        var users = {
                "admin": "admin",
                "Andre": "waiter"
        };
        const loginPage = function(req, res, next) {
                var username = req.params.username;

                var password = req.body.password
                var userRoles = users[username]
                req.session.username = req.body.username
                if (!userRoles && req.body.password === "pass123") {
                        req.session.username = req.body.username
                        req.session.userRoles = userRoles
                        if (userRoles === "waiter") {
                                res.redirect('/waiters')
                        } else {

                        return  res.render('days')
                        }

                }
                // else {
                // return  res.redirect('/login')
                // }

        }

        const saveLogin = function(req, res, next) {

                // res.render('login')

        }

        const logoutPage = function(req, res, next) {
                destroy.req.session.username
                res.redirect('/login')
        }

        const accessDenied = function(req, res, next) {
                res.render('accessDenied')
        }

        const waiterAccess = function(req, res, next) {

                var firstLetter = req.params.username.substring(0, 1);
                var uppercase = req.params.username.substring(0, 1).toUpperCase()
                var username = req.params.username.replace(firstLetter, uppercase);
                var days = req.body.day

                models.waiterInfo.findOne({
                                waiterName: username
                        },
                        function(err, results) {
                                console.log(results);
                                if (err) {
                                        return next(err)
                                } else {
                                        if (results) {
                                                var data = {
                                                        waiterName: results.waiterName,
                                                        days: results.daysToWork
                                                }
                                                req.flash("name", "Welcome back  " + results.waiterName + ",   Please update your working days")
                                                res.render("days", data)
                                        }
                                }
                                if (!results) {
                                        models.waiterInfo.create({
                                                waiterName: username,
                                        }, function(err, results) {
                                                if (err) {
                                                        return next(err)
                                                }
                                                req.flash("name", "Hello  " + results.waiterName + ",   Please select your working days")
                                                res.render('days')
                                        })
                                }
                        })
        }


        const days = function(req, res, next) {

                var daysObject = {};
                var firstLetter = req.params.username.substring(0, 1);
                var uppercase = req.params.username.substring(0, 1).toUpperCase()
                var username = req.params.username.replace(firstLetter, uppercase);
                var days = req.body.day;
                console.log(days);

                if (days === undefined) {
                        var message = username + ", Please select  days first"
                        res.render('days', {
                                output: message
                        })
                        return
                } else if (days.length < 3) {
                        var message = username + ", Please select 3 working days "
                        res.render('days', {
                                output: message
                        })
                        return
                } else if (days.length > 3) {
                        console.log(typeof(days) == 'object');
                        if (typeof(days) == 'object') {
                                console.log('Loop');
                                var message = username + ", You selected more days try to select  3 working days "
                        } else if (typeof(days) == 'string') {
                                console.log('Loop 2');
                                var message = username + ", Please select 3 working days "
                        }

                        res.render('days', {
                                output: message
                        })
                } else {


                        if (!Array.isArray(days)) {
                                days = [days]
                        }

                        days.forEach(function(day) {
                                daysObject[day] = true

                        });

                        console.log(daysObject);
                        console.log('========================');


                        models.waiterInfo.findOneAndUpdate({
                                waiterName: username
                        }, {
                                daysToWork: daysObject
                        }, {
                                new: true,
                                returnNewDocument: true
                        }, function(err, results) {
                                console.log(results);
                                console.log('========================');
                                if (err) {
                                        return next(err)
                                }

                        });
                        req.flash('error', "Thank you, " + username + " shift updated.")
                        res.redirect('/waiters/' + username);
                }
        }

        function backgroundColor(colors) {
                if (colors === 3) {
                        return "enough";
                } else if (colors < 3) {
                        return "notEnough";
                } else if (colors > 3) {
                        return "moreThanEnough";
                }
        }


        const admin = function(req, res, next) {
                Monday = [];
                Tuesday = [];
                Wednesday = [];
                Thursday = [];
                Friday = [];
                Saturday = [];
                Sunday = [];
                models.waiterInfo.find({}, function(err, reslt) {
                        console.log(reslt);
                        if (err) {
                                return next(err)
                        } else {
                                for (var i = 0; i < reslt.length; i++) {
                                        console.log(reslt[i]);
                                        var curDays = reslt[i].daysToWork;
                                        for (var day in curDays) {
                                                if (day == 'Monday') {
                                                        Monday.push(reslt[i].waiterName);
                                                } else if (day == 'Tuesday') {
                                                        Tuesday.push(reslt[i].waiterName);
                                                } else if (day == 'Wednesday') {
                                                        Wednesday.push(reslt[i].waiterName);
                                                } else if (day == 'Thursday') {
                                                        Thursday.push(reslt[i].waiterName);
                                                } else if (day == 'Friday') {
                                                        Friday.push(reslt[i].waiterName);
                                                } else if (day == 'Saturday') {
                                                        Saturday.push(reslt[i].waiterName);
                                                } else if (day == 'Sunday') {
                                                        Sunday.push(reslt[i].waiterName);
                                                } else {
                                                        if (day != 'Monday') {
                                                                req.flash("error", "No waiters for this day")
                                                                render('days')
                                                        }
                                                        if (day != 'Tuesday') {
                                                                req.flash("error", "No waiters for this day")
                                                                render('days')
                                                        }
                                                        if (day != 'Wednesday') {
                                                                req.flash("error", "No waiters for this day")
                                                                render('days')
                                                        }
                                                        if (day != 'Thursday') {
                                                                req.flash("error", "No waiters for this day")
                                                                render('days')
                                                        }
                                                        if (day != 'Friday') {
                                                                req.flash("error", "No waiters for this day")
                                                                render('days')
                                                        }
                                                        if (day != 'Saturday') {
                                                                req.flash("error", "No waiters for this day")
                                                                render('days')
                                                        }
                                                        if (day != 'Sunday') {
                                                                req.flash("error", "No waiters for this day")
                                                                render('days')
                                                        }
                                                }
                                        }
                                }
                        }
                        res.render("admin", {
                                mon: Monday,
                                mondayColor: backgroundColor(Monday.length),

                                tue: Tuesday,
                                tuesdayColor: backgroundColor(Tuesday.length),

                                wed: Wednesday,
                                wednesdayColor: backgroundColor(Wednesday.length),

                                thur: Thursday,
                                thursdayColor: backgroundColor(Thursday.length),

                                fri: Friday,
                                fridayColor: backgroundColor(Friday.length),

                                sat: Saturday,
                                saturdayColor: backgroundColor(Saturday.length),

                                sun: Sunday,
                                sundayColor: backgroundColor(Sunday.length)

                        });
                });
        }

        const clearHistory = function(req, res, next) {
                models.waiterInfo.remove({}, function(err, data) {
                        if (err) {
                                return next(err)
                        }
                        req.flash("error", " Schedule ready for next week")
                        res.render("admin")
                })
        }


        return {
                waiters,
                waiterAccess,
                days,
                admin,
                clearHistory,
                loginPage,
                saveLogin,
                logoutPage,
                accessDenied
        }
} -->
