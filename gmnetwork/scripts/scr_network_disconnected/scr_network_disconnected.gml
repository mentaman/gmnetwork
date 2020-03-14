var map = argument0;
show_debug_message("disconnected"+string(argument0));
with(oNetworkSocketBase)
{
	if(socket == map[?"id"])
	{
		instance_destroy();
	}
}