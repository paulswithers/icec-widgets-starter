var departments = [
    {"id": 0, "departmentName": "Corporate", "homepage": "https://apps.na.collabserv.com/xcc/cloud"},
    {"id": 1, "parentDepartment": 0, "departmentName": "Marketing", "homepage": "https://apps.na.collabserv.com/xcc/cloud"},
    {"id": 2, "parentDepartment": 0, "departmentName": "Accounting", "homepage": "https://apps.na.collabserv.com/xcc/cloud"},
    {"id": 3, "parentDepartment": 0, "departmentName": "Engineering", "homepage": "https://apps.na.collabserv.com/xcc/cloud"},
    {"id": 4, "parentDepartment": 0, "departmentName": "Sales", "homepage": "https://apps.na.collabserv.com/xcc/cloud"},
    {"id": 5, "parentDepartment": 3, "departmentName": "Engineering", "homepage": "https://apps.na.collabserv.com/xcc/cloud"},
    {"id": 6, "parentDepartment": 3, "departmentName": "Engineering","homepage": "https://apps.na.collabserv.com/xcc/cloud"},
    {"id": 7, "parentDepartment": 1, "departmentName": "Marketing", "homepage": "https://apps.na.collabserv.com/xcc/cloud"},
    {"id": 8, "parentDepartment": 1, "departmentName": "Marketing", "homepage": "https://apps.na.collabserv.com/xcc/cloud"},
    {"id": 9, "parentDepartment": 4, "departmentName": "Sales", "homepage": "https://apps.na.collabserv.com/xcc/cloud"},
    {"id": 10, "parentDepartment": 4, "departmentName": "Sales", "homepage": "https://apps.na.collabserv.com/xcc/cloud"},
    {"id": 11, "parentDepartment": 3, "departmentName": "Engineering", "homepage": "https://apps.na.collabserv.com/xcc/cloud"}
];

exports.findAll = function (req, res, next) {
    var name = req.query.name;
    if (name) {
        res.send(departments.filter(function(department) {
            return (department.departmentName).toLowerCase().indexOf(name.toLowerCase()) > -1;
        }));
    } else {
        res.send(departments);
    }
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(departments[id]);
};