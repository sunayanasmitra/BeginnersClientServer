require.config({
    "baseUrl": '',
	"paths": {
		"jquery": "sys/lib/jquery_1_12_3/jquery.min",
		"jquerytable": "sys/lib/jqueryDataTable/jquery.dataTables",
		"bootstrap": "sys/lib/bootstrap_3_3_7/js/bootstrap.min",
		"underscore": "sys/lib/underscore_1_8_3/underscore.min",
		"handlebar": "sys/lib/handlebar/handlebars-v4.7.7",
		"eChart": "sys/node/node_modules/echarts/dist/echarts.min",
		"eChart_old": "sys/lib/eCharts/eCharts.min",
		"moment": "sys/lib/bootstrap_3_3_7/moment",
		"datepicker": "sys/lib/bootstrap_datepicker/bootstrap-datetimepicker.min",
		"aes": "DEV/JS/aes",

		"client_def": "DEV/JS/milieu/m_biz/conf/client/client_def",
		"common_sett": "DEV/JS/milieu/m_util/common_settings",
		"common": "DEV/JS/common_lib",		
		"client_gen": "DEV/JS/milieu/m_gen/conf/client/client_settings",
		"client_mil": "DEV/JS/milieu/m_biz/conf/client/client_settings",
		"client_func": "DEV/JS/milieu/m_util/client/client_func",
		"controller": "DEV/JS/milieu/m_util/client/controller",
		"route": "DEV/JS/milieu/m_util/client/routes",
		"starter": "DEV/JS/milieu/m_biz/conf/client/starter",

		
		"mani_sett": "DEV/JS/milieu/m_biz/conf/client/mani_cli",
		
		
		
		
		
		
		
		"jqueryui": "sys/lib/jquery-ui-1.12.1.custom/jquery-ui.min",

		"chart": "DEV/JS/milieu/m_util/client/chartist.min",
		"datetime": "sys/lib/bootstrap_3_3_7/datepicker",
		"backbone": "sys/lib/backbone_1_3_3/backbone.min",
		"angular": "sys/lib/angular_1_5_5/angular.min",

		"client": "DEV/JS/milieu/m_util/client/client_lib",
		
		"client_tech": "DEV/JS/milieu/m_util/client/client_tech",
		"control": "DEV/JS/milieu/m_util/client/control",
		

	},
	"shim": {
		"backbone": ["jquery", "underscore"],
		"bootstrap": ["jquery"]
	},
});