module.exports = function(models) {
        const showForm = function(req, res, next) {
                var accessName = req.body.userName
                if (!accessName) {
                        req.flash('error', 'please enter your name first');
                        res.render('waiter');
                } else {
                        models.waiterInfo.findOne({
                                waiterUser: req.body.userName
                        }, function(err, name) {
                                if (err) {
                                        return next(err)
                                } else

                                if (name) {
                                        req.flash("error", "Name already added!!!")
                                        res.redirect('/')
                                } else {

                                        models.waiterInfo.create({
                                                waiterUser: req.body.userName
                                        }, function(err, name) {
                                                if (err) {
                                                        return next(err)
                                                }
                                                var waiterData = {
                                                        person: name
                                                }
                                                res.render('waiter', waiterData)

                                        })

                                }
                        })
                }
        }

        const showInfo = function(req, res) {
                res.render('waiter');
        }
        const waiterAccess = function(req, res, next) {
        // 
        //         var user_id = req.params.user_id;
        //         models.waiterInfo.findOne({
        //                 'user_id': user_id
        //         }, function(err, result) {
        //                 if (err) {
        //                         return next(err)
        //                 }
        //                 res.render('waiter', result)
        //
        //
        // })
}

        const daysToWork = function(req, res, next) {

        }


        return {
                showInfo,
                showForm,
                waiterAccess,
                daysToWork
        }
}
