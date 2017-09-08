/* eslint-env node */
const fs = require('fs');
const git = require('git-rev-sync');
const fetch = require('node-fetch');
const RSVP = require('rsvp');
const FormData = require('form-data');

const rollbarUrl = 'https://api.rollbar.com/api/1/sourcemap/download';

function gitCommit() {
  try {
    return git.long();
  } catch (e) {
    // returns undefined
  }
}

module.exports = {
  name: 'notify-rollbar-sourcemaps',
  description: 'Notify Rollbar about new version of source maps and trigger automatic download.',
  works: 'insideProject',

  availableOptions: [
    { name: 'token', type: String, aliases: ['t'], required: true },
    { name: 'host', type: String, aliases: ['h'], required: true },
    { name: 'version', type: String, aliases: ['v'], default: gitCommit() },
    { name: 'assets-dir', type: String, default: 'dist/assets', aliases: ['d'] },
    { name: 'assets-url', type: String, default: 'assets', aliases: ['p'] },
  ],

  run(options) {
    let host = options.host;
    let token = options.token;
    let version = options.version;
    let assetsDir = options.assetsDir;
    let assetsUrl = options.assetsUrl;

    let assetsPath = `${this.project.root}/${assetsDir}`;
    let assets = fs.readdirSync(assetsPath);
    let jsFiles = assets.filter((path) => /.js$/.test(path));

    this.ui.writeLine('Notifying Rollbar...');

    let promises = jsFiles.map((fileName) => {
      return this._notifyRollbar(host, version, token, assetsUrl, fileName);
    });

    return RSVP.all(promises).then(() => this.ui.writeLine('Notifying completed successfully!'));
  },

  _notifyRollbar(host, version, token, assetsUrl, fileName) {
    let formData = new FormData();
    let filePath = `${host}/${assetsUrl}/${fileName}`;

    formData.append('version', version);
    formData.append('access_token', token);
    formData.append('minified_url', filePath);

    return fetch(rollbarUrl, { method: 'POST', body: formData })
      .then((res) => res.json())
      .then((json) => {
        if (json.err) {
          this.ui.writeLine('Notifying error!');
          throw `Rollbar status: '${json.message}'`;
        } else {
          this.ui.writeLine(`Reported file: '${filePath}'`);
        }
      });
  }
}
