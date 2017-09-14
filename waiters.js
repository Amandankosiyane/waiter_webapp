module.exports = function(models) {

        var Monday = [];
        var Tuesday = [];
        var Wednesday = [];
        var Thursday = [];
        var Friday = [];
        var Saturday = [];
        var Sunday = [];

        const waiters = function(req, res, next) {
                res.render('waiters')
        }

        const waiterAccess = function(req, res, next) {

                var firstLetter = req.params.username.substring(0, 1);
                var uppercase = req.params.username.substring(0, 1).toUpperCase()
                var username = req.params.username.replace(firstLetter, uppercase);


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
                                                req.flash("name", "Hello  " + results.waiterName + ",   Welcome back")
                                                res.render("days", data)
                                        }
                                        if (!results) {
                                                models.waiterInfo.create({
                                                        waiterName: username,
                                                        // daysToWork: daysObject
                                                }, function(err, result) {
                                                        if (err) {
                                                                return next(err)
                                                        }
                                                        req.flash("name", "Hello  " + result.waiterName + ",   Please select your working days")
                                                        res.render('days')
                                                })
                                        }
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
                        var message = "Please select atleast one day"
                        res.render('days', {
                                output: message
                        })
                        return
                }

                if (!Array.isArray(days)) {
                        days = [days]
                }

                days.forEach(function(day) {
                        daysObject[day] = true

                });

                models.waiterInfo.findOneAndUpdate({
                                waiterName: username
                        }, {
                                daysToWork: daysObject
                        },
                        function(err, result) {
                                if (err) {
                                        return next(err)
                                } else {
                                        console.log(result);
                                }
                        })
                        req.flash('error', "Thank you, shift updated.")
                        res.redirect('/waiters/' + username);
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
                        res.render("admin")
                })
        }


        return {
                waiters,
                waiterAccess,
                days,
                admin,
                clearHistory
        }
}
