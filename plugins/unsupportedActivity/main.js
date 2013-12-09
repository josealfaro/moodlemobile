var templates = [
    "root/externallib/text!root/plugins/unsupportedActivity/unsupportedActivity.html"
];

define(templates, function(unsupportedActivityTpl) {
    var plugin = {
        settings: {
            name: "unsupportedActivity",
            type: "user",
            lang: {
                component: "core"
            }
        },

        templates: {
            unsupportedActivity: { html: unsupportedActivityTpl }
        },

        routes: [,
            [
                "courses/:courseID/unsupported-activity/:courseModuleID", 
                "unsupportedActivity", 
                "unsupportedActivity"
            ]
        ],

        storage: {
            courseModule: {type: "model"},
            courseModules: {type: "collection", model: "courseModule"}
        },

        sizes: undefined,

        _getSizes: function() {
            MM.plugins..sizes = {
                withSideBar: {
                    center:$(document).innerWidth() - MM.navigation.getWidth(),
                    left:MM.navigation.getWidth()
                },
                withoutSideBar: {
                    center:$(document).innerWidth(),
                    left:0
                }
            };
        },

        resize: function() {
            if (MM.plugins.pluginname.sizes == undefined) {
                MM.plugins.pluginname._getSizes();
            }

            if (MM.navigation.visible === true) {
                $("#panel-center").css({
                    'width':MM.plugins.pluginname.sizes.withSideBar.center,
                    'left':MM.plugins.pluginname.sizes.withSideBar.left
                });
            } else {
                $("#panel-center").css({
                    'width':MM.plugins.pluginname.sizes.withoutSideBar.center,
                    'left':MM.plugins.pluginname.sizes.withoutSideBar.left
                });
            }
            $("#panel-right").hide();
        },

        cleanUp: function() {
            $("#panel-center").html("");
            $("#panel-right").show();
        },
        unsupportedActivity: function(courseID, courseModuleID) {
            MM.panels.showLoading("center");
            var courseModule = MM.db.get("courseModules", courseModuleID);
            var template = MM.plugins.unsupportedActivity.templates.unsupportedActivity;
            var context = { courseID: courseID, courseModule: courseModule };
            var html = MM.tpl.render(template.html, context);
            MM.panels.show("center", html);
        },

    }

    MM.registerPlugin(plugin);
});