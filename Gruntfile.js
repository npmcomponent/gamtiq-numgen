module.exports = function(grunt) {
    
    // Configuration
    grunt.initConfig({
        
        name: "numgen",
        destName: "dist/<%= name %>",
        dest: "<%= destName %>.js",
        src: "<%= name %>.js",
        
        jshint: {
            files: ["*.js", "test/*.js"],
            
            options: {
                // Enforcing
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: true,
                undef: true,
                unused: true,
                
                // Environment
                node: true
            }
        },
        
        jsdoc: {
            dist: {
                src: ["<%= src %>"],
                options: {
                    destination: "doc"
                }
            }
        },
        
        mochacli: {
            numgen: {}
        },
        
        uglify: {
            minify: {
                src: "<%= dest %>",
                dest: "<%= destName %>.min.js"
            }
        },
        
        umd: {
            dist: {
                template: "unit",
                src: "<%= src %>",
                dest: "<%= dest %>",
                objectToExport: "NumberGenerator",
                globalAlias: "NumGen"
            }
        }
        
    });
    
    // Plugins
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-jsdoc");
    grunt.loadNpmTasks("grunt-mocha-cli");
    grunt.loadNpmTasks("grunt-umd");
    
    // Tasks
    grunt.registerTask("build", ["umd", "uglify"]);
    grunt.registerTask("doc", ["jsdoc"]);
    grunt.registerTask("test", ["mochacli"]);
    grunt.registerTask("default", ["jshint", "mochacli"]);
    grunt.registerTask("all", ["default", "build", "doc"]);
};
