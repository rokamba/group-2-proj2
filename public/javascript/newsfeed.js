const path = require('path');
const helpers = require('./utils/helpers'); 
const { Post, User } = require('../../models');
const { hasSubscribers } = require('diagnostics_channel');


let fileName = Post.upload;

let reqPath = path.join(__dirname, '../..','uploads/' + fileName);

Handlebars.registerHelper("img_picker", context => {
        sendFile(reqPath)
});