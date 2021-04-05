const fs = require('fs');
const path = require('path');

const mkdirp = require('mkdirp');
const axios = require('axios');

const { siteMap } = require('./files-generators/sitemapGernerator');

/**
 * @description generate XML file
 * @param {*} fileData file content
 * @param {*} locationToSave dir to save file
 * @param {*} fileName exmaple sitemape.xml
 */
const generateXmlFile = async (fileData, locationToSave, fileName) => {
  // dir to save file
  const dirToSaveFile = path.join(__dirname, locationToSave);

  // create dir if not exist
  const made = await mkdirp(dirToSaveFile);

  // create file in storage
  fs.writeFile(`${dirToSaveFile}/${fileName}`, fileData, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(`${fileName} was saved!`);
  });

  console.log(`made directories, starting with ${made}`);
};

// generate file with data
const generateSiteMap = async () => {
  try {
    const data = await siteMap(axios);

    await generateXmlFile(data, '', 'sitemap.xml');
  } catch (err) {
    console.log(err);
  }
};

// generate sitemap.xml
generateSiteMap();

// to generate and update files every 1 hour
setInterval(generateSiteMap, 1 * 60 * 60 * 1000); // 1 hour
