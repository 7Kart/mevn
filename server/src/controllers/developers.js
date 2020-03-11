const Developer = require("../models/developer");

exports.getAllDevelopers = async (req, res, next) => {
    try {
        const developers = await Developer.getAllDevelopersName();
        res.json(developers);
    } catch (e) {
        next(e);
    }
};

exports.getDevelopersProjects = async (req, res, next) => {

    let projects = [];

    if (req.query.ids && req.query.ids.length > 0) {
        projects = await Developer.getDevelopersProjects(req.query.ids);
        projects = projects.length > 0 ? projects[0].projects : projects;
    }
    res.json({
        projects: projects
    })
}