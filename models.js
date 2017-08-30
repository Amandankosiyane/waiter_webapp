const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
        mongoose.connect(mongoUrl);
        const waiterSchema = mongoose.Schema({
                waiterUser: String,
                weekdays: Array

        });
        waiterSchema.index({
                waiterUser: 1
        },{
        required: true
},{
        unique: true
});

        const waiterInfo = mongoose.model('waiterInfo', waiterSchema);

        return{
                waiterInfo
        }
}
