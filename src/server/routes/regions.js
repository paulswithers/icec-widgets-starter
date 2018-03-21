var regions = [
    {"id": 1, "region": "East", "shortName": "fadams"},
    {"id": 2, "region": "West", "shortName": "bheinz"},
    {"id": 3, "region": "SouthEast", "shortName": "bjordan"},
];

exports.findAll = function (req, res, next) {
    var shortName = req.query.shortName;
    if (shortName) {
        res.send(regions.filter(function(region) {
            return (region.shortName).toLowerCase().indexOf(shortName.toLowerCase()) > -1;
        }));
    } else {
        res.send(regions);
    }
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(regions[id]);
};