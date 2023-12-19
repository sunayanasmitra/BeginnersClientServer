/*CREATED BY SUNAYANA MITRA*/

var start_req = new Date().getTime(); 
require(["require_map"], function(map) {
	require(["bootstrap"], function(y) {    //juery included
			require(["underscore"], function(y) {
				require(["handlebar"], function(y) {
					
					require(["DEV/SARA/build/client/router"], function(y) {
						require(["DEV/SARA/build/client/start"], function(y) { 
							//console.log("finished....");
						});
					});
					/*
					require(["eChart"], function(y) {
						require(["moment"], function(y) {
							require(["datepicker"], function(y) {																								
								require(["aes"], function(y) {
								require(["jquerytable"], function(y) {	
															
									require(["common_sett"], function(y) {
										require(["mani_sett"], function(y) {	
											require(["common"], function(y) {
												require(["client_gen"], function(y) {
													require(["client_mil"], function(y) {
														require(["client_def"], function(y) {
														require(["client_func"], function(y) {  
															require(["controller"], function(y) {
																require(["route"], function(y) {
																	require(["starter"], function(y) {  
																		var end_req = new Date().getTime() - start_req;	
																	});
																});	
															});
														});
													});
												});
											});
										});
									});
									});
								});
							});
						});
					});
				});
				*/
			});
		});
	});
});
