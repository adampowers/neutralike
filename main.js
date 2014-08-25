
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
