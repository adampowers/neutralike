
$("a.jewelButton[name='notifications']").on('click', function() {

	$('#fbNotificationsFlyout li[data-gt*="notif_type":"like"],#fbNotificationsFlyout li[data-gt*="notif_type":"like_tagged"]').delay(800).remove();

// http://stackoverflow.com/questions/12596231/can-jquery-selectors-be-used-with-dom-mutation-observers/12597182#12597182

	var targetNodes         = $("#fbNotificationsFlyout");
	var MutationObserver    = window.MutationObserver || window.WebKitMutationObserver;
	var myObserver          = new MutationObserver (mutationHandler);
	var obsConfig           = { childList: true, characterData: true, attributes: true, subtree: true };

	//--- Add a target node to the observer. Can only add one node at a time.
	targetNodes.each ( function () {
	    myObserver.observe (this, obsConfig);
	} );

	function mutationHandler (mutationRecords) {
	    console.info ("mutationHandler:");

	    mutationRecords.forEach( function (mutation) {
	        console.log (mutation.type);

	        if (typeof mutation.addedNodes == "object") {
	            var jq = $(mutation.addedNodes);
            	if (jq.is('li[data-gt*="notif_type":"like"],li[data-gt*="notif_type":"like_tagged"]')) {
	            	jq.remove();
	            }
	        }
	    });
	}

 });
