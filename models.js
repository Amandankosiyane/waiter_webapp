const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
        mongoose.connect(mongoUrl);
        const waiterSchema = mongoose.Schema({
                waiterName: String,
                daysToWork: Object

        });

        const waiterInfo = mongoose.model('waiterInfo', waiterSchema);

        return {
                waiterInfo
        }
}
