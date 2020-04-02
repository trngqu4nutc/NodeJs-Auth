const db = require("../models");
const Tutorial = db.tutorials;
// const Op = db.Sequelize.Op;

//create and update new tutorial
exports.save = async (req, res) => {
    // Create a Tutorial
    const tutorial = req.body;

    // Save Tutorial in the database
    try {
        let data;
        if (req.body.id) {
            data = await Tutorial.update(tutorial, { where: { id: req.body.id } });
            if (data == 1) {
                res.send({
                    message: "Tutorial was update successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete update with id=${id}!`
                });
            }
        } else {
            data = await Tutorial.create(tutorial);
            res.send(data);
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while saving the Tutorial."
        });
    }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
    let id = req.params.id;
    try {
        let data = await Tutorial.destroy({ where: { id: id } });
        if (data == 1) {
            res.send({
                message: "Tutorial was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Tutorial with id=${id}!`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
        });
    }
}

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    let { page, limit } = req.query;
    limit = parseInt(limit);
    page = (parseInt(req.query.page) - 1) * limit;
    try {
        res.send(await Tutorial.findAll({ offset: page, limit: limit }));
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving tutorials."
        });
    }
};

exports.findOneById = async (req, res) => {
    try {
        return res.send(await Tutorial.findByPk(req.params.id));
    } catch (error) {
        return res.send({
           message: "Error retrieving Tutorial with id = " + req.params.id
        });
    }
};