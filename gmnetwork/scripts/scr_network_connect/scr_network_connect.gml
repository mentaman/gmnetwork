///@param ip
///@param port
///@param connected_script
///@param failed_script
var timeout = 1000;
network_set_config(network_config_use_non_blocking_socket, 1);
network_set_config(network_config_connect_timeout, timeout);
var socket = network_create_socket(network_socket_tcp);
show_message("connecting!");
var server = network_connect_raw(socket, argument0, argument1);
if(server < 0)
{
	if(argument3 != -1)
	{
		script_execute(argument3, -1);
	}
}
else
{
	with(instance_create_depth(0, 0, 0, oNetworkConnect)) 
	{
		id.timeout = timeout;
		id.socket = socket;
		id.success_script = argument2;
		id.failed_script = argument3;
	}
}
return socket;