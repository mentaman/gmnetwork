///@param socket
///@param message_script
with(instance_create_depth(0, 0, 0, oNetworkRecieveMessages))
{
	show_debug_message("waiting for messages!");
	socket = argument0;
	message_script = argument1;
}
