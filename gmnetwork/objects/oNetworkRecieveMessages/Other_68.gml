/// @description Insert description here
// You can write your code in this editor
if(async_load[?"type"] == network_type_data)
{
	if(async_load[?"id"] == socket)
	{
		script_execute(message_script, async_load);
	}
}