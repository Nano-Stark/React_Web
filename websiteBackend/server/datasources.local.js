//using myFile or "myFile" will work
module.exports = {
      "myFile": {
        "name": "myFile",
        "connector": "loopback-component-storage",
        "provider": "filesystem",
        "root": "./server/storage",
        "nameConflict": "makeUnique"
      }
}