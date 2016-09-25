let fs = require('fs');
let path = require('path');

function fileWalker(currentDirPath, callback) {
    const filesAndFolders = fs.readdirSync(currentDirPath);
    filesAndFolders.forEach(function (name) {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, false);
        } else if (stat.isDirectory()) {
            callback(filePath, true);
            jsCodeFilesWalker(filePath);
        }
    });
}

function fileHasExtensionThatMayContainJavaScriptCode(filePath) {
    return fileHasExtension(filePath, ["js", "html", "htm", "xhtml", "xhtm", "vm", "jsp"])
}
function fileHasExtension(filePath, fileExtensions) {
    return fileExtensions.indexOf(fileExtension(filePath)) !== -1;
}
function fileExtension(filePath) {
    const pathParts = filePath.split(".");
    if (pathParts.length === 1) {
        // file has no extension
        return undefined;
    }
    return pathParts[pathParts.length - 1];
}

function jsCodeFilesWalker(baseDir) {
    const filesToProcess = [];

    fileWalker(baseDir, function (filePath, isDir) {
        if (!isDir && fileHasExtensionThatMayContainJavaScriptCode(filePath)) {
            filesToProcess.push({fullPath: filePath, extension: fileExtension(filePath)});
        }
    });

    return filesToProcess;
}

module.exports = jsCodeFilesWalker;