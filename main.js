if ($.cookie('alert-box') != 'closed') {
	$('<div></div>')
		.addClass("scienceCTA fade in")
		.html('\
			<span>Thanks for using Neutralike! I\'m trying to gather data on how it affects Facebook usage. Will you help me out by filling out a short survey?</span><br/><br/>\
			<label class="uiLinkButton comment_link" title="It\'s a real short survey, I swear.">\
				<input id="nlsciYes" class="uiLinkButtonInput" type="button" value="I\'ll help, FOR SCIENCE">\
			</label><span class="dot">&nbsp;·&nbsp;</span>\
	 		<label class="uiLinkButton comment_link" title="And I won\'t, promise.">\
				<input id="nlsciNo" class="uiLinkButtonInput" type="button" value="No thanks, and don\'t ask me again">\
			</label>\
			<br/><iframe id="surveyForm" src="https://docs.google.com/forms/d/1X5t97D5ohM9SCjyXiBUQRLD7laq8pWJwaKEPsrQlVJE/viewform?embedded=true" width="480" height="950" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>\
			')
		.prependTo("#contentArea");

	$("#nlsciYes").on('click',function(){
		$("#surveyForm").show("slow");

		$('#surveyForm').load(function(){
			$("#surveyForm").delay(1000).hide('slow');
			$(".scienceCTA #nlsciYes").hide();
			$(".scienceCTA .dot").hide();
			$(".scienceCTA #nlsciNo").attr("value","Dismiss");
			$(".scienceCTA span").html("Thanks for your survey response! We won't ask you again.");
		});
	});

	$("#nlsciNo").on('click',function(){
    	$.cookie('alert-box', 'closed', { path: '/' });
		$(".scienceCTA").hide('slow');
	});
}

$("a.jewelButton[name='notifications']").on('click', function() {

	// When the user clicks on the notifications flyout, waits a lil' bit (so the flyout can get rendered) then removes like notifications. HAX
	$('#fbNotificationsFlyout li[data-gt*="notif_type":"like"],#fbNotificationsFlyout li[data-gt*="notif_type":"like_tagged"]').delay(1200).remove();

	// MutationObserver: http://stackoverflow.com/questions/12596231/can-jquery-selectors-be-used-with-dom-mutation-observers/12597182#12597182
	var targetNodes         = $("#fbNotificationsFlyout");
	var MutationObserver    = window.MutationObserver || window.WebKitMutationObserver;
	var myObserver          = new MutationObserver (mutationHandler);
	var obsConfig           = { childList: true, characterData: true, attributes: true, subtree: true };

	//--- Add a target node to the observer. Can only add one node at a time.
	targetNodes.each ( function () {
	    myObserver.observe (this, obsConfig);
	} );

	function mutationHandler (mutationRecords) {
	    mutationRecords.forEach( function (mutation) {
	        if (typeof mutation.addedNodes == "object") {
	            var jq = $(mutation.addedNodes);
            	if (jq.is('li[data-gt*="notif_type":"like"],li[data-gt*="notif_type":"like_tagged"]')) {
	            	jq.remove();
	            }
	        }
	    });
	}
 });
