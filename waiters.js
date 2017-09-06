module.exports = function(models) {

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

                                var amanda = {
                                        waiterName: results.waiterName,
                                        days: results.daysToWork
                                }
                                res.render('days', amanda)
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
                                        var amanda = {
                                                waiterName: results.waiterName,
                                                days: results.daysToWork
                                        }
                                        res.render('days', amanda)

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
                var daysMap = {};
                // var firstLetter = req.params.username.substring(0, 1);
                // var uppercase = req.params.username.substring(0, 1).toUpperCase()
                // var username = req.params.username.replace(firstLetter, uppercase);
                // var username = req.params.username;
                // console.log(username);
                // var day = req.body.day;
                models.waiterInfo.find({}, function(err,reslt){
                        if (err) {
                                return next(err)
                        }
                        var dayys = [{
                                daysToWork: 'Monday',
                                waiterName: []
                        },{
                                daysToWork: 'Tuesday',
                                waiterName: []
                        },{
                                daysToWork: 'Wednesday',
                                waiterName: []
                        },{
                                daysToWork: 'Thursday',
                                waiterName: []
                        },{
                                daysToWork: 'Friday',
                                waiterName: []
                        },{
                                daysToWork: 'Saturday',
                                waiterName: []
                        },{
                                daysToWork: 'Sunday',
                                waiterName: []
                        }];
                        for (var i = 0; i < dayys.length; i++) {
                                var newDay = dayys[i]
                        }
                        if (newDay== 'Monday') {
                                Monday.push(waiterName)
                        }else if (newDay== 'Tuesday') {
                                Tuesday.push(waiterName)
                        }else if (newDay == 'Wednesday') {
                                Wednesday.push(waiterName)
                        }else if (newDay == 'Thursday') {
                                Thursday.push(waiterName)
                        }else if (newDay == 'Friday') {
                                Friday.push(waiterName)
                        }else if (newDay == 'Saturday') {
                                Saturday.push(waiterName)
                        }else if (newDay == 'Sunday') {
                                Sunday.push(waiterName)
                        }
                        console.log(reslt);
                        res.render("admin", {
                                dataCollected: reslt
                        })
                })
        }


        return {
                waiters,
                waiterAccess,
                days,
                admin
        }
}
