const router = require('express').Router();
let Shipwreck = require('../models/shipwreck.model');

router.route('/').get((req,res) => {
    Shipwreck.find()
    .then(shipwrecks => res.json(shipwrecks))
    .catch (err => res.status(400).json('EError:' + err));
});

router.route('/add').post((req,res) => {
    const recrd = req.body.recrd;
    const vesslterms = req.body.vesslterms;
    const feature_type = req.body.feature_type;
    const chart = req.body.chart;
    const latdec = Number(req.body.latdec);
    const londec = Number(req.body.londec);
    const gp_quality = req.body.gp_quality;
    const depth = req.body.depth;
    const sounding_type = req.body.sounding_type;
    const history = req.body.history;
    const quasou = req.body.quasou;
    const watlev = req.body.watlev;

    const newShipwreck = new Shipwreck({
        recrd,
        vesslterms,
        feature_type,
        chart,
        latdec,
        londec,
        gp_quality,
        depth,
        sounding_type,
        history,
        quasou,
        watlev,
    });

    newShipwreck.save()
    .then(() => res.json('Shipwreck added'))
    .catch(err => res.status(400).json('errorr: ' + err));
});

router.route('/:id').get((req, res) => {
    Shipwreck.findById(req.params.id)
      .then(shipwreck => res.json(shipwreck))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Shipwreck.findByIdAndDelete(req.params.id)
      .then(() => res.json('Shipwreck deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Shipwreck.findById(req.params.id)
      .then(shipwreck => {
        recrd = req.body.recrd;
        vesslterms = req.body.vesslterms;
        feature_type = req.body.feature_type;
        chart = req.body.chart;
        latdec = Number(req.body.latdec);
        londec = Number(req.body.londec);
        gp_quality = req.body.gp_quality;
        depth = req.body.depth;
        sounding_type = req.body.sounding_type;
        history = req.body.history;
        quasou = req.body.quasou;
        watlev = req.body.watlev;
  
        shipwreck.save()
          .then(() => res.json('Shipwreck updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });



module.exports = router; 
