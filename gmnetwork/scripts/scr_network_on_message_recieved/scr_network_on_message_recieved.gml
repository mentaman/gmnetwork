var map = argument0;
var buffer = map[?"buffer"];
while(buffer_get_size(buffer)-buffer_tell(buffer) > 0)
{
	var type = buffer_read(buffer, buffer_u8);
	show_debug_message("message type: "+string(type));
	script_execute(global.messages_handlers[?type], type, buffer, map);
}
