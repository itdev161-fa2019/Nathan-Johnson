const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shipwreckSchema = new Schema({
    recrd: { type: String, required: false},
    vesslterms: { type: String, required: false},
    feature_type: {type: String, required: true},
    chart: { type: String, required: false},
    latdec: {type: Number, required: true },
    londec: {type: Number, required: true },
    gp_quality: { type: String, required: false},
    depth: { type: String, required: false},
    sounding_type: { type: String, required: false},
    history: { type: String, required: false},
    quasou: { type: String, required: false},
    watlev: { type: String, required: false},
    
},
 {
    timestamps: true,
});


const Shipwreck = mongoose.model('Shipwreck', shipwreckSchema);

module.exports = Shipwreck;
