	
$("a.jewelButton[name='notifications']").on('click', function() {
	$('li[data-gt*="notif_type":"like"],li[data-gt*="notif_type":"like_tagged"]').delay(800).remove();
});