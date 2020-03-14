/// @description Insert description here
// You can write your code in this editor

switch(async_load[?"type"])
{
	case network_type_data:
		if(async_load[?"id"] == socket)
		{
			var buffer = async_load[?"buffer"];
			show_debug_message("size: "+string(buffer_get_size(buffer)-buffer_tell(buffer)));
			var type = buffer_read(buffer, buffer_u8);
			show_debug_message("size: "+string(buffer_get_size(buffer)-buffer_tell(buffer)));
			if(type == 10)
			{
				if(success_script != -1)
				{
					script_execute(success_script, async_load);
				}
				instance_destroy();
			}
			else
			{
				show_debug_message("message before connected. type: "+string(type));
			}
		}
		break;
	case network_type_non_blocking_connect:
		if(async_load[?"socket"] == socket)
		{
			if(async_load[?"succeeded"])
			{
				show_message_async("created a connection to "+string(async_load[?"ip"]));
				scr_network_send_connected(async_load[?"socket"]);
			}
			else
			{
				if(failed_script != -1)
				{
					script_execute(failed_script, async_load);
				}
				alarm[0] = room_speed*timeout;
				instance_destroy();
			}
		}
	break;
}