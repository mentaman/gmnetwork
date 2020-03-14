/// @description Insert description here
// You can write your code in this editor
if(async_load[?"type"] == network_type_disconnect)
{
	if(async_load[?"id"] == socket)
	{
		scr_network_disconnected(async_load);
		instance_destroy();
	}
}