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
                var daysObject = {};
                var firstLetter = req.params.username.substring(0, 1);
                var uppercase = req.params.username.substring(0, 1).toUpperCase()
                var username = req.params.username.replace(firstLetter, uppercase);
                var days = req.body.day;

                if (!Array.isArray(days)) {
                        days = [days]
                }

                days.forEach(function(day) {
                        daysObject[day] = true

                });

                models.waiterInfo.findOne({
                        waiterName: username
                }, function(err, results) {
                        if (err) {
                                return next(err)
                        }

                        console.log(results);
                        if (results !== null) {

                                console.log('results exits');

                                var waiterData = {
                                        waiterName: results.waiterName,
                                        days: results.daysToWork
                                }
                                res.render('days', waiterData)
                        }
                        if (results == null) {
                                console.log('creating');
                                models.waiterInfo.create({
                                        waiterName: username,
                                        daysToWork: daysObject
                                }, function(err, results) {
                                        if (err) {
                                                return next(err)
                                        }
                                        var waiterData = {
                                                waiterName: results.waiterName,
                                                days: results.daysToWork
                                        }
                                        res.render('days', waiterData)

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
                }, function(err, result) {
                        if (err) {
                                console.log(err);
                        } else if (!result) {
                                models.waiterInfo.create({
                                        waiterName: username,
                                        daysToWork: daysObject
                                });
                        }
                });


                req.flash('error', "Thank you, shift updated.")
                res.redirect('/waiters/' + username);


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
                                        var curDays = reslt[i].daysToWork;
                                        for (var day in curDays) {
                                                if (day == 'Monday') {
                                                        Monday.push(reslt[i].waiterName);
                                                } else if (day == 'Tuesday') {
                                                        Tuesday.push(reslt[i].waiterName);
                                                }else if (day == 'Wednesday') {
                                                        Wednesday.push(reslt[i].waiterName);
                                                }else if (day == 'Thursday') {
                                                        Thursday.push(reslt[i].waiterName);
                                                }else if (day == 'Friday') {
                                                        Friday.push(reslt[i].waiterName);
                                                }else if (day == 'Saturday') {
                                                        Saturday.push(reslt[i].waiterName);
                                                }else if (day == 'Sunday') {
                                                        Sunday.push(reslt[i].waiterName);
                                                }
                                        }
                                }
                        }
                        res.render("admin", {
                                mon: Monday,
                                tue: Tuesday,
                                wed: Wednesday,
                                thur: Thursday,
                                fri: Friday,
                                sat: Saturday,
                                sun: Sunday
                        });
                });
        }


        return {
                waiters,
                waiterAccess,
                days,
                admin
        }
}
