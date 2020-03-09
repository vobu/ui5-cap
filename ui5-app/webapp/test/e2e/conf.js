exports.config = {
    profile: "integration",
    reporters: {
        disabled: [{ name: "./reporter/screenshotReporter" }] // turn off screenshotting
    },

    // continue w/ standard config
    // attention: bootstrapping via local UI5 npm module causes UIveri5 to detect a wrong version number
    // baseUrl: "http://localhost:4081/index.html" -> reports UI5 0.1.5 :)
    baseUrl: "http://localhost:4081/index-cdn.html" // bootstrapping from CDN works
}
