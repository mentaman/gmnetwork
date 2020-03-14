/// @description Insert description here
// You can write your code in this editor
switch(async_load[?"type"])
{
	case network_type_non_blocking_connect:
		if(async_load[?"socket"] == socket)
		{
			if(async_load[?"succeeded"])
			{
				if(success_script != -1)
				{
					script_execute(success_script, async_load);
				}
				
			}
			else
			{
				if(failed_script != -1)
				{
					script_execute(failed_script, async_load);
				}
			}
			instance_destroy();
		}
	break;
}