/// @description Insert description here
// You can write your code in this editor
if(async_load[?"type"] == network_type_data)
{
	if(async_load[?"id"] == socket)
	{
		show_debug_message("recieved a message. message_script");
		script_execute(message_script, async_load);
	}
}