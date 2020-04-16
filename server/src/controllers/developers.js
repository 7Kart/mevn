const Developer = require("../models/developer"),
    to = require('await-to-js').default;

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

exports.getAllDevelopersProjects = async (req, res, next) => {
    let [err, projects] = await to(Developer.getAllProjects());
    if (err) next(err)
    res.json(projects)
}