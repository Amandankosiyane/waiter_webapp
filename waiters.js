module.exports = function(models) {
        const waiters = function(req, res, next) {
                res.render('waiters')
        }

        const waiterAccess = function(req, res, next) {
                var firstLetter = req.params.username.substring(0,1);
                var uppercase = req.params.username.substring(0,1).toUpperCase()
                var username = req.params.username.replace(firstLetter, uppercase);


                res.render('days', {
                        waiter: username
                });
        }

        const days = function(req, res, next) {

                var daysObject = {};
                var firstLetter = req.params.username.substring(0,1);
                var uppercase = req.params.username.substring(0,1).toUpperCase()
                var username = req.params.username.replace(firstLetter, uppercase);

                var days = req.body.day;

                // loop through the days and push them to the days object with value of true
                if (days.length == 1 ) {

                        for (var i =0; i < days.length; i++) {
                                var currentDay = days[i];
                                daysObject[currentDay] = true
                        }
                } else {
                        daysObject[days] = true;
                }

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



                res.redirect('/waiters/' + username);


        }


        return {
                waiters,
                waiterAccess,
                days
        }
}
